import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

type ApprovePayload = {
    profileId?: string;
    password?: string;
};

function generateTemporaryPassword(length = 14): string {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*';
    const bytes = crypto.getRandomValues(new Uint8Array(length));
    return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
}

Deno.serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        // Accept either SERVICE_ROLE_KEY (preferred for CLI secrets) or SUPABASE_SERVICE_ROLE_KEY
        const serviceRoleKey = Deno.env.get('SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

        if (!supabaseUrl || !serviceRoleKey) {
            return new Response(JSON.stringify({ error: 'Missing Supabase server configuration' }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        const adminClient = createClient(supabaseUrl, serviceRoleKey, {
            auth: { autoRefreshToken: false, persistSession: false }
        });

        const payload: ApprovePayload = await req.json();
        const { profileId, password } = payload;

        if (!profileId) {
            return new Response(JSON.stringify({ error: 'profileId is required' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        const { data: profile, error: profileError } = await adminClient
            .from('creator_profiles')
            .select('id, full_name, email, approval_status')
            .eq('id', profileId)
            .single();

        if (profileError || !profile) {
            return new Response(JSON.stringify({ error: 'Creator profile not found' }), {
                status: 404,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        if (!profile.email) {
            return new Response(JSON.stringify({ error: 'Creator profile email is empty' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        const normalizedEmail = String(profile.email).trim().toLowerCase();
        const requestedPassword = typeof password === 'string' ? password.trim() : '';
        const temporaryPassword = requestedPassword || generateTemporaryPassword();

        const { data: existingMapping, error: mappingError } = await adminClient
            .from('approved_users')
            .select('id, auth_user_id')
            .eq('creator_profile_id', profile.id)
            .maybeSingle();

        if (mappingError) {
            throw mappingError;
        }

        let authUserId: string | null = existingMapping?.auth_user_id ?? null;

        if (profile.approval_status === 'approved' && authUserId) {
            return new Response(
                JSON.stringify({
                    success: true,
                    alreadyApproved: true,
                    profileId: profile.id,
                    authUserId,
                    email: normalizedEmail,
                    message: 'Creator is already approved. No changes were made.'
                }),
                {
                    status: 200,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                }
            );
        }

        if (!authUserId) {
            const { data: createdUser, error: createUserError } = await adminClient.auth.admin.createUser({
                email: normalizedEmail,
                password: temporaryPassword,
                email_confirm: true,
                user_metadata: {
                    full_name: profile.full_name ?? null,
                    creator_profile_id: profile.id
                }
            });

            if (createUserError) {
                if (createUserError.message.toLowerCase().includes('already been registered')) {
                    const { data: usersByEmail, error: listError } = await adminClient.auth.admin.listUsers({
                        page: 1,
                        perPage: 1000
                    });

                    if (listError) {
                        throw listError;
                    }

                    const matched = usersByEmail.users.find(
                        (user: { email?: string | null; id: string }) => (user.email ?? '').toLowerCase() === normalizedEmail
                    );

                    if (!matched) {
                        throw createUserError;
                    }

                    authUserId = matched.id;
                } else {
                    throw createUserError;
                }
            } else {
                authUserId = createdUser.user?.id ?? null;
            }
        } else {
            const { error: updatePasswordError } = await adminClient.auth.admin.updateUserById(authUserId, {
                password: temporaryPassword,
                email_confirm: true
            });

            if (updatePasswordError) {
                throw updatePasswordError;
            }
        }

        if (!authUserId) {
            throw new Error('Could not resolve auth user id');
        }

        if (!existingMapping) {
            const { error: insertMappingError } = await adminClient
                .from('approved_users')
                .insert({
                    creator_profile_id: profile.id,
                    auth_user_id: authUserId,
                    email: normalizedEmail,
                    status: 'active',
                    login_issued_at: new Date().toISOString()
                });

            if (insertMappingError) {
                throw insertMappingError;
            }
        } else {
            const { error: updateMappingError } = await adminClient
                .from('approved_users')
                .update({
                    email: normalizedEmail,
                    status: 'active',
                    login_issued_at: new Date().toISOString()
                })
                .eq('creator_profile_id', profile.id);

            if (updateMappingError) {
                throw updateMappingError;
            }
        }

        const { error: updateProfileError } = await adminClient
            .from('creator_profiles')
            .update({
                approval_status: 'approved',
                approved_at: new Date().toISOString()
            })
            .eq('id', profile.id);

        if (updateProfileError) {
            throw updateProfileError;
        }

        return new Response(
            JSON.stringify({
                success: true,
                alreadyApproved: false,
                profileId: profile.id,
                authUserId,
                email: normalizedEmail,
                password: temporaryPassword,
                message: 'Creator approved and login credentials created.'
            }),
            {
                status: 200,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: error instanceof Error ? error.message : 'Unexpected error'
            }),
            {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
        );
    }
});
