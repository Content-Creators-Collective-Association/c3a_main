import { auth, db, googleProvider, signInWithPopup, signOut, isFirebaseConfigured, collection, getDocs, query, where } from './firebaseClient';

function ensureFirebaseConfigured() {
    if (!isFirebaseConfigured || !auth) {
        return {
            ok: false,
            error: new Error('Missing Firebase keys. Add VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, and VITE_FIREBASE_PROJECT_ID in your environment.')
        };
    }
    return { ok: true };
}

export async function signInWithGoogle() {
    const configuration = ensureFirebaseConfigured();
    if (!configuration.ok) {
        return configuration;
    }

    try {
        const result = await signInWithPopup(auth, googleProvider);
        return { ok: true, user: result.user };
    } catch (error) {
        return { ok: false, error };
    }
}

export async function getCurrentSession() {
    const configuration = ensureFirebaseConfigured();
    if (!configuration.ok) {
        return configuration;
    }

    // Since firebase doesn't strictly have an async "getSession" that doesn't use onAuthStateChanged,
    // we return the currentUser if it exists. Note: auth.currentUser might be null immediately on load.
    // In a real app we'd wait for auth state to initialize, but for this demo:
    return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe();
            if (user) {
                resolve({ ok: true, session: { user: { email: user.email, ...user } } });
            } else {
                resolve({ ok: true, session: null });
            }
        });
    });
}

export async function signOutCreator() {
    const configuration = ensureFirebaseConfigured();
    if (!configuration.ok) {
        return configuration;
    }

    try {
        await signOut(auth);
        return { ok: true };
    } catch (error) {
        return { ok: false, error };
    }
}

export async function getCreatorProfileByEmail(email) {
    const configuration = ensureFirebaseConfigured();
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

    try {
        const q = query(collection(db, 'creator_profiles'), where('email', '==', normalizedEmail));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            // Return null profile if not found, instead of an error, or just return empty
            return { ok: true, profile: null };
        }
        
        // Return the first match
        return { ok: true, profile: { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } };
    } catch (error) {
        return { ok: false, error };
    }
}