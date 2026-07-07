import { supabase, isSupabaseConfigured } from './supabaseClient';

function ensureSupabaseConfigured() {
    if (!isSupabaseConfigured || !supabase) {
        return {
            ok: false,
            error: new Error('Missing Supabase keys. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.')
        };
    }

    return { ok: true };
}

export async function signInCreator(email, password) {
    const configuration = ensureSupabaseConfigured();
    if (!configuration.ok) {
        return configuration;
    }

    const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
    });

    if (error) {
        return { ok: false, error };
    }

    return { ok: true };
}

export async function signUpCreator(email, password, fullName) {
    const configuration = ensureSupabaseConfigured();
    if (!configuration.ok) {
        return configuration;
    }

    const { error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
            data: {
                full_name: fullName.trim()
            }
        }
    });

    if (error) {
        return { ok: false, error };
    }

    return { ok: true };
}

export async function getCurrentSession() {
    const configuration = ensureSupabaseConfigured();
    if (!configuration.ok) {
        return configuration;
    }

    const { data, error } = await supabase.auth.getSession();

    if (error) {
        return { ok: false, error };
    }

    return { ok: true, session: data.session };
}

export async function signOutCreator() {
    const configuration = ensureSupabaseConfigured();
    if (!configuration.ok) {
        return configuration;
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
        return { ok: false, error };
    }

    return { ok: true };
}

export async function getCreatorProfileByEmail(email) {
    const configuration = ensureSupabaseConfigured();
    if (!configuration.ok) {
        return configuration;
    }

    const normalizedEmail = String(email || '').trim().toLowerCase();

    if (!normalizedEmail) {
        return {
            ok: false,
            error: new Error('A valid email address is required to load the creator profile.')
        };
    }

    const { data, error } = await supabase
        .from('creator_profiles')
        .select('*')
        .eq('email', normalizedEmail)
        .maybeSingle();

    if (error) {
        return { ok: false, error };
    }

    return { ok: true, profile: data };
}