import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const isFirebaseConfigured = Boolean(
    firebaseConfig.apiKey && 
    firebaseConfig.authDomain && 
    firebaseConfig.projectId
);

const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;
const auth = app ? getAuth(app) : null;
const db = app ? getFirestore(app) : null;
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider, signInWithPopup, signOut, isFirebaseConfigured, collection, addDoc, getDocs, query, where, doc, updateDoc };

export async function getAdminStatistics() {
    if (!isFirebaseConfigured || !db) {
        return { data: { applications: [] } };
    }

    try {
        const q = query(collection(db, 'creator_profiles'));
        const querySnapshot = await getDocs(q);
        const applications = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        return {
            data: {
                applications
            }
        };
    } catch (error) {
        console.error("Error fetching admin statistics:", error);
        return { data: { applications: [] } };
    }
}

export async function updateAdminApplicationStatus(applicationId, newStatus) {
    if (!isFirebaseConfigured || !db) {
        return { ok: false, error: new Error('Firebase not configured') };
    }
    
    try {
        const applicationRef = doc(db, 'creator_profiles', applicationId);
        await updateDoc(applicationRef, {
            status: newStatus
        });
        return { ok: true };
    } catch (error) {
        console.error("Error updating application status:", error);
        return { ok: false, error };
    }
}

export async function updateCreatorProfile(profileId, updateData) {
    if (!isFirebaseConfigured || !db) {
        return { ok: false, error: new Error('Firebase not configured') };
    }
    
    try {
        const profileRef = doc(db, 'creator_profiles', profileId);
        await updateDoc(profileRef, updateData);
        return { ok: true };
    } catch (error) {
        console.error("Error updating creator profile:", error);
        return { ok: false, error };
    }
}
