import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { isSupabaseConfigured } from '../lib/supabaseClient';
import { signInCreator, signUpCreator } from '../lib/authService';

function AuthPage() {
    const [authMode, setAuthMode] = useState('signin');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const title = useMemo(() => {
        return authMode === 'signin' ? 'Welcome Back' : 'Create Your Account';
    }, [authMode]);

    const description = useMemo(() => {
        if (!isSupabaseConfigured) {
            return 'Authentication is disabled until Supabase environment variables are configured.';
        }

        return authMode === 'signin'
            ? 'Sign in to access your creator account dashboard.'
            : 'Start your creator account and continue your C3A application journey.';
    }, [authMode]);

    const clearStatus = () => {
        setStatus({ type: '', message: '' });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        clearStatus();

        setLoading(true);

        try {
            const result = authMode === 'signin'
                ? await signInCreator(email, password)
                : await signUpCreator(email, password, fullName);

            if (!result.ok) {
                throw result.error;
            }

            if (authMode === 'signin') {
                setStatus({ type: 'success', message: 'Signed in successfully.' });
            } else {
                setStatus({
                    type: 'success',
                    message: 'Account created. Check your email for the verification link.'
                });
            }
        } catch (error) {
            setStatus({
                type: 'error',
                message: error?.message || 'Authentication failed. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-sand to-white px-6 py-14">
            <div className="max-w-xl mx-auto rounded-3xl border border-blue-100 bg-white/90 p-8 md:p-10 shadow-xl shadow-blue-100/60">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal/70 hover:text-charcoal mb-6"
                >
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    Back to landing page
                </Link>

                <div className="inline-flex rounded-full bg-sand p-1 mb-6">
                    <button
                        type="button"
                        onClick={() => {
                            setAuthMode('signin');
                            clearStatus();
                        }}
                        className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${
                            authMode === 'signin'
                                ? 'bg-charcoal text-white'
                                : 'text-charcoal/70 hover:text-charcoal'
                        }`}
                    >
                        Sign In
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setAuthMode('signup');
                            clearStatus();
                        }}
                        className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${
                            authMode === 'signup'
                                ? 'bg-charcoal text-white'
                                : 'text-charcoal/70 hover:text-charcoal'
                        }`}
                    >
                        Sign Up
                    </button>
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-2">{title}</h1>
                <p className="text-charcoal/70 mb-8">{description}</p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {authMode === 'signup' && (
                        <div>
                            <label htmlFor="full_name" className="block text-sm font-semibold text-charcoal mb-2">
                                Full Name
                            </label>
                            <input
                                id="full_name"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full rounded-xl border border-charcoal/15 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-saffron/40"
                                placeholder="Your full name"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-charcoal/15 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-saffron/40"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-charcoal mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-charcoal/15 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-saffron/40"
                            placeholder="Minimum 6 characters"
                            minLength={6}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-charcoal text-white py-3.5 font-bold hover:bg-black transition-colors disabled:opacity-60"
                    >
                        {loading
                            ? 'Please wait...'
                            : authMode === 'signin'
                                ? 'Sign In'
                                : 'Create Account'}
                    </button>
                </form>

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
