import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isFirebaseConfigured } from '../lib/firebaseClient';
import { getCurrentSession, signInWithGoogle, getCreatorProfileByEmail, signOutCreator } from '../lib/authService';

function AuthPage() {
    const navigate = useNavigate();
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;

        async function checkExistingSession() {
            const result = await getCurrentSession();

            if (!isMounted || !result.ok) {
                return;
            }

            if (result.session) {
                navigate('/dashboard', { replace: true });
            }
        }

        checkExistingSession();

        return () => {
            isMounted = false;
        };
    }, [navigate]);

    const handleGoogleSignIn = async () => {
        setStatus({ type: '', message: '' });
        setLoading(true);

        try {
            const result = await signInWithGoogle();
            if (!result.ok) {
                throw result.error;
            }

            const profileResult = await getCreatorProfileByEmail(result.user.email);
            
            if (!profileResult.ok || !profileResult.profile) {
                await signOutCreator();
                setStatus({
                    type: 'error',
                    message: 'Access denied. You must apply and be approved first.'
                });
                setLoading(false);
                return;
            }

            if (profileResult.profile.status !== 'approved') {
                await signOutCreator();
                setStatus({
                    type: 'error',
                    message: `Your application is currently ${profileResult.profile.status || 'pending'}. You can log in once approved.`
                });
                setLoading(false);
                return;
            }

            navigate('/dashboard', { replace: true });
        } catch (error) {
            setStatus({
                type: 'error',
                message: error?.message || 'Google Sign-In failed. Please try again.'
            });
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-sand to-white px-6 py-14 flex items-center justify-center">
            <div className="w-full max-w-md rounded-3xl border border-blue-100 bg-white/90 p-8 md:p-10 shadow-xl shadow-blue-100/60">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal/70 hover:text-charcoal mb-8"
                >
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    Back to landing page
                </Link>

                <h1 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-2">Welcome</h1>
                <p className="text-charcoal/70 mb-8">
                    {!isFirebaseConfigured 
                        ? 'Authentication is disabled until Firebase environment variables are configured.'
                        : 'Sign in to access your creator account dashboard.'}
                </p>

                <button
                    type="button"
                    disabled={loading || !isFirebaseConfigured}
                    onClick={handleGoogleSignIn}
                    className="w-full rounded-xl bg-charcoal text-white py-3.5 font-bold hover:bg-black transition-colors disabled:opacity-60 flex items-center justify-center gap-3"
                >
                    <svg className="w-5 h-5 bg-white rounded-full p-[2px]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    {loading ? 'Please wait...' : 'Continue with Google'}
                </button>

                {status.message && (
                    <p
                        className={`mt-5 rounded-xl px-4 py-3 text-sm font-semibold ${
                            status.type === 'success'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                    >
                        {status.message}
                    </p>
                )}
            </div>
        </main>
    );
}

export default AuthPage;
