import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCreatorProfileByEmail, getCurrentSession, signOutCreator } from '../lib/authService';
import { isSupabaseConfigured } from '../lib/supabaseClient';

function DashboardPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [signingOut, setSigningOut] = useState(false);
    const [error, setError] = useState('');
    const [profile, setProfile] = useState(null);
    const [sessionEmail, setSessionEmail] = useState('');

    const memberSince = formatDate(profile?.approved_at || profile?.created_at);
    const memberId = profile?.id ? profile.id.slice(0, 8).toUpperCase() : 'C3A-0000';
    const membershipTier = getMembershipTier(profile?.approval_status);
    const statusLabel = profile?.approval_status || 'pending';
    const initials = getInitials(profile?.full_name || sessionEmail || 'Creator');

    useEffect(() => {
        let isMounted = true;

        async function loadDashboard() {
            const sessionResult = await getCurrentSession();

            if (!isMounted) {
                return;
            }

            if (!sessionResult.ok) {
                setError(sessionResult.error.message);
                setLoading(false);
                return;
            }

            const session = sessionResult.session;

            if (!session?.user?.email) {
                navigate('/auth', { replace: true });
                return;
            }

            setSessionEmail(session.user.email);

            const profileResult = await getCreatorProfileByEmail(session.user.email);

            if (!isMounted) {
                return;
            }

            if (!profileResult.ok) {
                setError(profileResult.error.message);
                setLoading(false);
                return;
            }

            setProfile(profileResult.profile);
            setLoading(false);
        }

        loadDashboard();

        return () => {
            isMounted = false;
        };
    }, [navigate]);

    const handleSignOut = async () => {
        setSigningOut(true);

        const result = await signOutCreator();

        setSigningOut(false);

        if (!result.ok) {
            setError(result.error.message);
            return;
        }

        navigate('/auth', { replace: true });
    };

    const metricCards = [
        { label: 'Approval status', value: profile?.approval_status || 'pending' },
        { label: 'Content type', value: profile?.content_type || 'Coming soon' },
        { label: 'Primary platform', value: profile?.social_platform || 'Coming soon' }
    ];

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,153,51,0.16),_transparent_34%),linear-gradient(180deg,_#f9f7f2_0%,_#fff_100%)] px-6 py-10 md:py-14">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-xl shadow-charcoal/5 backdrop-blur md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-charcoal/50">Creator dashboard</p>
                        <h1 className="mt-2 text-3xl font-black text-charcoal md:text-4xl">Welcome back, {profile?.full_name || 'creator'}</h1>
                        <p className="mt-2 text-sm text-charcoal/70">{sessionEmail || 'Loading session'}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/"
                            className="rounded-full border border-charcoal/10 bg-white px-4 py-2 text-sm font-semibold text-charcoal hover:border-charcoal/20"
                        >
                            Back home
                        </Link>
                        <button
                            type="button"
                            onClick={handleSignOut}
                            disabled={signingOut}
                            className="rounded-full bg-charcoal px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {signingOut ? 'Signing out...' : 'Sign out'}
                        </button>
                    </div>
                </div>

                {!isSupabaseConfigured && (
                    <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                        Supabase environment variables are not configured, so the dashboard cannot load live user data.
                    </div>
                )}

                {loading ? (
                    <div className="rounded-[2rem] border border-charcoal/10 bg-white p-10 text-center shadow-lg shadow-charcoal/5">
                        <p className="text-lg font-semibold text-charcoal">Loading your dashboard...</p>
                        <p className="mt-2 text-sm text-charcoal/60">Fetching your authenticated session and creator profile.</p>
                    </div>
                ) : error ? (
                    <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-8 text-rose-800 shadow-lg shadow-rose-100/60">
                        <h2 className="text-xl font-bold">Could not load dashboard</h2>
                        <p className="mt-2 text-sm">{error}</p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link to="/auth" className="rounded-full bg-rose-700 px-4 py-2 text-sm font-semibold text-white">
                                Return to login
                            </Link>
                            <Link to="/" className="rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-800">
                                Back to landing page
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                        <section className="space-y-6">
                            <div className="overflow-hidden rounded-[2.25rem] border border-white/70 bg-[linear-gradient(135deg,#151515_0%,#262626_55%,#3c2f1f_100%)] p-1 shadow-2xl shadow-charcoal/20">
                                <div className="relative min-h-[22rem] rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.12))] p-6 text-white">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/55">Creator membership</p>
                                            <h2 className="mt-3 text-3xl font-black tracking-tight">{profile?.full_name || 'Creator Member'}</h2>
                                            <p className="mt-2 text-sm text-white/70">{profile?.email || sessionEmail || 'member@c3a.app'}</p>
                                        </div>

                                        <div className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] ${profile?.approval_status === 'approved' ? 'bg-emerald-400/20 text-emerald-200' : 'bg-amber-400/20 text-amber-100'}`}>
                                            {statusLabel}
                                        </div>
                                    </div>

                                    <div className="mt-10 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                                        <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                                            <p className="text-xs uppercase tracking-[0.3em] text-white/45">Member ID</p>
                                            <p className="mt-3 text-2xl font-black tracking-[0.18em]">{memberId}</p>
                                            <p className="mt-4 text-sm text-white/65">Tier: {membershipTier}</p>
                                        </div>

                                        <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                                            <p className="text-xs uppercase tracking-[0.3em] text-white/45">Approved since</p>
                                            <p className="mt-3 text-2xl font-black">{memberSince}</p>
                                            <p className="mt-4 text-sm text-white/65">Virtual card expires: Never</p>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex flex-wrap gap-3">
                                        <span className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/75">Priority access</span>
                                        <span className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/75">Creator perks</span>
                                        <span className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/75">Membership active</span>
                                    </div>

                                    <div className="absolute bottom-5 right-5 flex h-24 w-24 items-center justify-center rounded-3xl border border-white/15 bg-white/10 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
                                        QR
                                        <br />
                                        Placeholder
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-3">
                                {metricCards.map((card) => (
                                    <div key={card.label} className="rounded-[1.5rem] border border-charcoal/10 bg-white p-5 shadow-lg shadow-charcoal/5">
                                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-charcoal/45">{card.label}</p>
                                        <p className="mt-3 break-words text-lg font-semibold text-charcoal">{card.value}</p>
                                        <p className="mt-2 text-xs text-charcoal/45">Placeholder field</p>
                                    </div>
                                ))}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <DetailItem label="Phone" value={profile?.phone || 'Add later'} />
                                <DetailItem label="Nationality" value={profile?.nationality || 'Add later'} />
                                <DetailItem label="Location" value={[profile?.city, profile?.state, profile?.country].filter(Boolean).join(', ') || 'Add later'} />
                                <DetailItem label="Postal code" value={profile?.postal_code || 'Add later'} />
                            </div>
                        </section>

                        <aside className="space-y-6">
                            <div className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-xl shadow-charcoal/5">
                                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-charcoal/45">Membership details</p>
                                <div className="mt-4 space-y-4">
                                    <InfoRow label="Member since" value={memberSince} />
                                    <InfoRow label="Plan" value="Creator Membership" />
                                    <InfoRow label="Status" value={statusLabel} />
                                    <InfoRow label="Renewal" value="Automatic" />
                                </div>
                            </div>

                            <div className="rounded-[2rem] border border-charcoal/10 bg-charcoal p-6 text-white shadow-xl shadow-charcoal/15">
                                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/55">Next placeholders</p>
                                <ul className="mt-4 space-y-3 text-sm text-white/80">
                                    <li>Perks and benefits</li>
                                    <li>Performance analytics</li>
                                    <li>Brand deals / campaigns</li>
                                    <li>Membership history</li>
                                </ul>
                            </div>

                            <div className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-xl shadow-charcoal/5">
                                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-charcoal/45">Profile links</p>
                                <p className="mt-3 break-words text-sm text-charcoal/70">
                                    {profile?.profile_links || 'No profile links added yet.'}
                                </p>
                                <div className="mt-6 rounded-2xl bg-sand/40 p-4 text-sm text-charcoal/70">
                                    This section is reserved for future updates to your creator profile.
                                </div>
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </main>
    );
}

function DetailItem({ label, value }) {
    return (
        <div className="rounded-2xl border border-charcoal/10 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-charcoal/45">{label}</p>
            <p className="mt-2 break-words text-sm font-semibold text-charcoal">{value}</p>
        </div>
    );
}

function InfoRow({ label, value }) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-sand/30 px-4 py-3">
            <p className="text-sm font-semibold text-charcoal/60">{label}</p>
            <p className="text-sm font-bold text-charcoal">{value}</p>
        </div>
    );
}

function getMembershipTier(status) {
    if (status === 'approved') {
        return 'Verified Creator';
    }

    if (status === 'rejected') {
        return 'Restricted';
    }

    return 'Pending Review';
}

function getInitials(name) {
    return String(name)
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0] || '')
        .join('')
        .toUpperCase() || 'CR';
}

function formatDate(value) {
    if (!value) {
        return 'Not available';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return 'Not available';
    }

    return new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date);
}

export default DashboardPage;