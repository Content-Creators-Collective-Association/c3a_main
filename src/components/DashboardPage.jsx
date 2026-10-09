import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCreatorProfileByEmail, getCurrentSession, signOutCreator } from '../lib/authService';
import { isFirebaseConfigured, updateCreatorProfile } from '../lib/firebaseClient';
import { 
    CheckCircle2, AlertTriangle, Wallet, Briefcase, 
    FileText, TrendingUp, PlayCircle 
} from 'lucide-react';

function DashboardPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [signingOut, setSigningOut] = useState(false);
    const [error, setError] = useState('');
    const [profile, setProfile] = useState(null);
    const [sessionEmail, setSessionEmail] = useState('');
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [editFormData, setEditFormData] = useState({});
    const [savingProfile, setSavingProfile] = useState(false);

    useEffect(() => {
        let isMounted = true;

        async function loadDashboard() {
            const sessionResult = await getCurrentSession();
            if (!isMounted) return;

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
            
            if (!isMounted) return;
            if (!profileResult.ok) {
                setError(profileResult.error.message);
                setLoading(false);
                return;
            }

            if (!profileResult.profile) {
                await signOutCreator();
                setError('No creator profile found. Please apply first.');
                setLoading(false);
                return;
            }

            if (profileResult.profile.status !== 'approved') {
                await signOutCreator();
                setError(`Your application is currently ${profileResult.profile.status || 'pending'}. You can log in once approved.`);
                setLoading(false);
                return;
            }

            setProfile(profileResult.profile);
            setLoading(false);
        }

        loadDashboard();
        return () => { isMounted = false; };
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

    const handleEditProfileOpen = () => {
        setEditFormData({
            full_name: profile.full_name || '',
            about: profile.about || '',
            content_type: profile.content_type || '',
            city: profile.city || '',
            state: profile.state || '',
            country: profile.country || ''
        });
        setIsEditingProfile(true);
    };

    const handleEditSave = async (e) => {
        e.preventDefault();
        setSavingProfile(true);
        const result = await updateCreatorProfile(profile.id, editFormData);
        setSavingProfile(false);
        if (result.ok) {
            setProfile(prev => ({ ...prev, ...editFormData }));
            setIsEditingProfile(false);
        } else {
            alert('Failed to update profile: ' + result.error.message);
        }
    };

    const firstName = profile?.full_name ? profile.full_name.split(' ')[0] : 'Creator';
    
    // Check if loading or error
    if (loading) {
        return (
            <main className="min-h-screen bg-[#f9f7f2] px-6 py-10 md:py-14 flex items-center justify-center">
                <div className="rounded-[2rem] border border-charcoal/10 bg-white p-10 text-center shadow-lg shadow-charcoal/5">
                    <p className="text-lg font-semibold text-charcoal">Loading your studio...</p>
                    <p className="mt-2 text-sm text-charcoal/60">Fetching your profile data.</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-[#f9f7f2] px-6 py-10 md:py-14 flex items-center justify-center">
                <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-8 text-rose-800 shadow-lg shadow-rose-100/60 max-w-lg">
                    <h2 className="text-xl font-bold">Could not load dashboard</h2>
                    <p className="mt-2 text-sm">{error}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link to="/auth" className="rounded-full bg-rose-700 px-4 py-2 text-sm font-semibold text-white">Return to login</Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,153,51,0.12),_transparent_40%),linear-gradient(180deg,_#f9f7f2_0%,_#fff_100%)] px-4 py-8 md:px-8 md:py-12">
            <div className="mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-charcoal md:text-4xl">Good evening, {firstName}</h1>
                        <p className="mt-2 max-w-xl text-charcoal/60">Two brands viewed your profile today. Your rate card hasn't changed since March — worth a look.</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                        <button onClick={handleSignOut} disabled={signingOut} className="rounded-lg border border-charcoal/10 bg-white px-4 py-2.5 text-sm font-semibold text-charcoal shadow-sm transition-all hover:bg-charcoal/5 disabled:opacity-50">
                            {signingOut ? 'Signing out...' : 'Sign out'}
                        </button>
                        <button onClick={handleEditProfileOpen} className="rounded-lg bg-charcoal px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-black">
                            Edit profile
                        </button>
                    </div>
                </div>

                {!isFirebaseConfigured && (
                    <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 shrink-0" />
                        <p>Firebase environment variables are not configured. Displaying placeholder data.</p>
                    </div>
                )}

                {/* Verification Banner */}
                <div className="mb-8 flex flex-col items-start gap-4 rounded-2xl border border-saffron/30 bg-saffron/10 p-6 shadow-sm md:flex-row md:items-center">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-saffron/20 text-saffron">
                        <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-charcoal">Finish verification to unlock premium campaigns</h3>
                        <p className="mt-1 text-sm text-charcoal/70">You're one document away. Verified creators receive 4× more brand requests and rank above unverified profiles.</p>
                    </div>
                    <button className="shrink-0 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-charcoal shadow-sm transition-all hover:shadow-md">
                        Continue verification
                    </button>
                </div>

                {/* KPIs */}
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <KpiCard label="Wallet balance" value="₹48,200" subtext="₹12,000 held in escrow" icon={Wallet} />
                    <KpiCard label="Active campaigns" value="3" subtext="1 deliverable due Friday" icon={Briefcase} highlight />
                    <KpiCard label="Applications" value="7" subtext="2 shortlisted" icon={FileText} />
                    <KpiCard label="Profile views" value="1,204" subtext="▲ 34% vs last month" icon={TrendingUp} highlight />
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    {/* Left Column */}
                    <div className="space-y-8">
                        {/* Matched to you */}
                        <div className="rounded-2xl border border-charcoal/5 bg-white p-6 shadow-sm">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-charcoal">Matched to you</h3>
                                <button className="text-sm font-semibold text-saffron hover:text-saffron/80">See all 12</button>
                            </div>
                            <div className="space-y-4">
                                <OpportunityCard 
                                    initials="ZM" 
                                    bgColor="bg-rose-600" 
                                    title="Monsoon menu launch — 3 reels"
                                    meta="Zomato · Mumbai · closes in 4 days"
                                    tags={['Food', '92% match', 'Escrow funded']}
                                    price="₹65,000"
                                    primaryButton
                                />
                                <OpportunityCard 
                                    initials="SW" 
                                    bgColor="bg-orange-500" 
                                    title="Late-night cravings campaign"
                                    meta="Swiggy · Pan-India · closes in 9 days"
                                    tags={['Food', '88% match']}
                                    price="₹42,000"
                                />
                                <OpportunityCard 
                                    initials="BT" 
                                    bgColor="bg-black" 
                                    title="Street food series — 6 shorts"
                                    meta="Boat · Mumbai, Delhi · closes in 12 days"
                                    tags={['Lifestyle', '81% match']}
                                    price="₹1,10,000"
                                />
                            </div>
                        </div>

                        {/* Earnings */}
                        <div className="rounded-2xl border border-charcoal/5 bg-white p-6 shadow-sm">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-charcoal">Earnings</h3>
                                <button className="text-sm font-semibold text-saffron hover:text-saffron/80">Open wallet</button>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-charcoal">₹1,84,200</p>
                                <p className="text-sm font-medium text-charcoal/50">Cleared in the last 6 months</p>
                                
                                <div className="mt-8 flex h-32 items-end gap-2">
                                    {[40, 55, 45, 75, 65, 100].map((height, i) => (
                                        <div key={i} className="group relative flex flex-1 flex-col items-center gap-2">
                                            <div 
                                                className={`w-full rounded-t-md transition-all group-hover:opacity-80 ${i === 5 ? 'bg-saffron' : 'bg-charcoal/10'}`} 
                                                style={{ height: `${height}%` }}
                                            />
                                            <span className="text-xs font-semibold text-charcoal/40">
                                                {['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][i]}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Profile Strength */}
                        <div className="rounded-2xl border border-charcoal/5 bg-white p-6 shadow-sm">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-charcoal">Profile strength</h3>
                                <button className="text-sm font-semibold text-saffron hover:text-saffron/80">Improve</button>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-charcoal/5 border-t-saffron">
                                    <span className="text-sm font-bold text-charcoal">82%</span>
                                </div>
                                <p className="text-sm text-charcoal/60">Three things left. Profiles above 90% appear in twice as many brand searches.</p>
                            </div>
                            <ul className="mt-6 space-y-3">
                                <StrengthItem done text="Socials connected" />
                                <StrengthItem done text="Rate card set" />
                                <StrengthItem text="Add 2 more portfolio pieces" />
                                <StrengthItem text="Upload ID for verification" />
                            </ul>
                        </div>

                        {/* Recent Activity */}
                        <div className="rounded-2xl border border-charcoal/5 bg-white p-6 shadow-sm">
                            <h3 className="mb-6 text-lg font-bold text-charcoal">Recent activity</h3>
                            <div className="space-y-5">
                                <ActivityItem color="bg-green-500" title="Zomato shortlisted your application" time="2 hours ago" />
                                <ActivityItem color="bg-saffron" title="₹28,000 released from escrow to your wallet" time="Yesterday" />
                                <ActivityItem color="bg-blue-500" title="You completed Pricing Your Usage Rights" time="3 days ago" />
                                <ActivityItem color="bg-pink-500" title="Mamaearth viewed your media kit" time="4 days ago" />
                            </div>
                        </div>

                        {/* Learning */}
                        <div className="rounded-2xl border border-charcoal/5 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-charcoal">Learning</h3>
                                <button className="text-sm font-semibold text-saffron hover:text-saffron/80">Continue</button>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-charcoal/5 text-charcoal/60">
                                    <PlayCircle className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-charcoal">Brand Pitching That Converts</p>
                                    <p className="mt-1 text-xs font-medium text-charcoal/50">Lesson 4 of 9 · 22 min left</p>
                                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-charcoal/10">
                                        <div className="h-full w-[44%] rounded-full bg-saffron" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isEditingProfile && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/40 p-4 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                        <h2 className="text-2xl font-bold text-charcoal mb-6">Edit Profile</h2>
                        <form onSubmit={handleEditSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-1">Full Name</label>
                                <input type="text" value={editFormData.full_name} onChange={e => setEditFormData({...editFormData, full_name: e.target.value})} className="w-full rounded-xl border border-charcoal/20 px-4 py-2 outline-none focus:border-saffron focus:ring-1 focus:ring-saffron" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-1">Content Niche</label>
                                <input type="text" value={editFormData.content_type} onChange={e => setEditFormData({...editFormData, content_type: e.target.value})} className="w-full rounded-xl border border-charcoal/20 px-4 py-2 outline-none focus:border-saffron focus:ring-1 focus:ring-saffron" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-1">About Me</label>
                                <textarea value={editFormData.about} onChange={e => setEditFormData({...editFormData, about: e.target.value})} className="w-full rounded-xl border border-charcoal/20 px-4 py-2 outline-none focus:border-saffron focus:ring-1 focus:ring-saffron h-24" required></textarea>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-charcoal mb-1">City</label>
                                    <input type="text" value={editFormData.city} onChange={e => setEditFormData({...editFormData, city: e.target.value})} className="w-full rounded-xl border border-charcoal/20 px-4 py-2 outline-none focus:border-saffron focus:ring-1 focus:ring-saffron" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-charcoal mb-1">State</label>
                                    <input type="text" value={editFormData.state} onChange={e => setEditFormData({...editFormData, state: e.target.value})} className="w-full rounded-xl border border-charcoal/20 px-4 py-2 outline-none focus:border-saffron focus:ring-1 focus:ring-saffron" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-charcoal mb-1">Country</label>
                                    <input type="text" value={editFormData.country} onChange={e => setEditFormData({...editFormData, country: e.target.value})} className="w-full rounded-xl border border-charcoal/20 px-4 py-2 outline-none focus:border-saffron focus:ring-1 focus:ring-saffron" required />
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setIsEditingProfile(false)} className="flex-1 rounded-xl border border-charcoal/20 bg-white py-2.5 font-bold text-charcoal hover:bg-charcoal/5 transition-colors">Cancel</button>
                                <button type="submit" disabled={savingProfile} className="flex-1 rounded-xl bg-saffron py-2.5 font-bold text-white hover:bg-orange-600 transition-colors disabled:opacity-50">{savingProfile ? 'Saving...' : 'Save Changes'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}

function KpiCard({ label, value, subtext, icon: Icon, highlight }) {
    return (
        <div className="rounded-2xl border border-charcoal/5 bg-white p-5 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-charcoal/5 text-charcoal/60">
                    <Icon className="h-4 w-4" />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-charcoal/50">{label}</p>
            </div>
            <p className="mt-4 text-2xl font-bold text-charcoal">{value}</p>
            <p className={`mt-1 text-xs font-medium ${highlight ? 'text-india-green' : 'text-charcoal/50'}`}>{subtext}</p>
        </div>
    );
}

function OpportunityCard({ initials, bgColor, title, meta, tags, price, primaryButton }) {
    return (
        <div className="flex flex-col gap-4 rounded-xl border border-charcoal/10 bg-white p-4 transition-all hover:border-saffron/40 hover:shadow-sm sm:flex-row sm:items-center">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white ${bgColor}`}>
                {initials}
            </div>
            <div className="flex-1">
                <p className="font-bold text-charcoal">{title}</p>
                <p className="mt-0.5 text-xs font-medium text-charcoal/60">{meta}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                        <span key={i} className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                            tag.includes('Escrow') ? 'bg-india-green/10 text-india-green' : 
                            tag.includes('match') ? 'bg-charcoal/5 text-charcoal/70' : 
                            'bg-saffron/10 text-saffron'
                        }`}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-2">
                <p className="text-lg font-bold text-charcoal">{price}</p>
                <button className={`rounded-lg px-4 py-2 text-xs font-bold transition-colors ${
                    primaryButton 
                        ? 'bg-charcoal text-white hover:bg-black' 
                        : 'border border-charcoal/10 bg-white text-charcoal hover:bg-charcoal/5'
                }`}>
                    Apply now
                </button>
            </div>
        </div>
    );
}

function StrengthItem({ done, text }) {
    return (
        <li className={`flex items-center gap-3 text-sm font-medium ${done ? 'text-charcoal/40' : 'text-charcoal'}`}>
            {done ? (
                <CheckCircle2 className="h-4 w-4 text-india-green" />
            ) : (
                <div className="h-4 w-4 rounded-full border-2 border-charcoal/20" />
            )}
            {text}
        </li>
    );
}

function ActivityItem({ color, title, time }) {
    return (
        <div className="flex items-start gap-3">
            <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${color}`} />
            <div>
                <p className="text-sm font-medium text-charcoal">{title}</p>
                <p className="text-xs text-charcoal/50">{time}</p>
            </div>
        </div>
    );
}

export default DashboardPage;