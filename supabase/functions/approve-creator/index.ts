import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

type ApprovePayload = {
    profileId?: string;
};

function generateTemporaryPassword(length = 14): string {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*';
    const bytes = crypto.getRandomValues(new Uint8Array(length));
    return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
}

Deno.serve(async (req) => {
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

        const { profileId }: ApprovePayload = await req.json();

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

        const { data: existingMapping, error: mappingError } = await adminClient
            .from('authenticated_user')
            .select('id, auth_user_id')
            .eq('creator_profile_id', profile.id)
            .maybeSingle();

        if (mappingError) {
            throw mappingError;
        }

        let authUserId: string | null = existingMapping?.auth_user_id ?? null;
        const temporaryPassword = generateTemporaryPassword();

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
                        (u) => (u.email ?? '').toLowerCase() === normalizedEmail
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
        }

        if (!authUserId) {
            throw new Error('Could not resolve auth user id');
        }

        if (!existingMapping) {
            const { error: insertMappingError } = await adminClient
                .from('authenticated_user')
                .insert({
                    creator_profile_id: profile.id,
                    auth_user_id: authUserId,
                    email: normalizedEmail,
                    status: 'active'
                });

            if (insertMappingError) {
                throw insertMappingError;
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

        // Sends Supabase recovery email so user can securely set their own password.
        const { error: resetError } = await adminClient.auth.resetPasswordForEmail(normalizedEmail, {
            redirectTo: Deno.env.get('AUTH_REDIRECT_URL')
        });

        if (resetError) {
            throw resetError;
        }

        return new Response(
            JSON.stringify({
                success: true,
                profileId: profile.id,
                authUserId,
                email: normalizedEmail,
                message: 'Creator approved, auth record created, and password setup email sent.'
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
