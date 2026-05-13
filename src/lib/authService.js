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