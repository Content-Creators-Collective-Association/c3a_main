import { useState, useEffect, useMemo } from 'react';
import { getAdminStatistics } from '../lib/supabaseClient';
import { 
    LayoutDashboard, Users, FileText, Settings, 
    Search, Filter, CheckCircle2, XCircle, ChevronRight, 
    LogOut, Check, X
} from 'lucide-react';

function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [adminId, setAdminId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('Overview');
    
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all'); // all, pending, approved, rejected
    
    const [selectedApp, setSelectedApp] = useState(null); // For detail modal

    const handleLogin = (e) => {
        e.preventDefault();
        if (adminId === 'admin' && password === 'C3ASecureAdmin2026!') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Invalid Admin ID or Password');
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            const fetchStats = async () => {
                setLoading(true);
                const result = await getAdminStatistics();
                if (result.data?.applications) {
                    setApplications(result.data.applications);
                }
                setLoading(false);
            };
            fetchStats();
        }
    }, [isAuthenticated]);

    // Computed Stats
    const stats = useMemo(() => {
        const total = applications.length;
        const pending = applications.filter(a => a.status === 'pending').length;
        const approved = applications.filter(a => a.status === 'approved').length;
        const rejected = applications.filter(a => a.status === 'rejected').length;
        const followers = applications.filter(a => a.status === 'approved').reduce((acc, curr) => acc + (curr.follower_count || 0), 0);
        return { total, pending, approved, rejected, followers };
    }, [applications]);

    // Filtered Applications
    const filteredApps = useMemo(() => {
        return applications.filter(app => {
            const matchesSearch = app.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  app.email.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [applications, searchQuery, statusFilter]);

    // Actions
    const updateStatus = (id, newStatus) => {
        setApplications(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
        setSelectedApp(null); // Close modal if open
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-sand flex flex-col justify-center items-center px-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-charcoal/10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-charcoal">Admin Login</h2>
                        <p className="text-charcoal/60 mt-2">Enter your credentials to access the dashboard</p>
                    </div>
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-semibold mb-4 text-center">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-charcoal mb-1">Admin ID</label>
                            <input
                                type="text"
                                value={adminId}
                                onChange={(e) => setAdminId(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-saffron focus:ring-2 focus:ring-saffron/20 outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-charcoal mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-saffron focus:ring-2 focus:ring-saffron/20 outline-none transition-all"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-saffron text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const renderSidebar = () => (
        <aside className="w-64 bg-charcoal text-white min-h-screen flex flex-col">
            <div className="p-6 border-b border-white/10">
                <h2 className="text-2xl font-extrabold tracking-tight">C3A Admin</h2>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {[
                    { name: 'Overview', icon: <LayoutDashboard size={20} /> },
                    { name: 'Applications', icon: <FileText size={20} /> },
                    { name: 'Creators', icon: <Users size={20} /> },
                    { name: 'Settings', icon: <Settings size={20} /> },
                ].map((item) => (
                    <button
                        key={item.name}
                        onClick={() => setActiveTab(item.name)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                            activeTab === item.name ? 'bg-saffron text-white font-bold' : 'text-white/70 hover:bg-white/10'
                        }`}
                    >
                        {item.icon}
                        {item.name}
                    </button>
                ))}
            </nav>
            <div className="p-4 border-t border-white/10">
                <button
                    onClick={() => setIsAuthenticated(false)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 transition-colors"
                >
                    <LogOut size={20} />
                    Sign Out
                </button>
            </div>
        </aside>
    );

    const renderOverview = () => (
        <div className="space-y-8 animate-in fade-in duration-500">
            <h2 className="text-3xl font-extrabold text-charcoal">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Applications', value: stats.total, color: 'text-saffron' },
                    { label: 'Pending Review', value: stats.pending, color: 'text-amber-500' },
                    { label: 'Approved Creators', value: stats.approved, color: 'text-india-green' },
                    { label: 'Total Network Followers', value: new Intl.NumberFormat('en-US', { notation: 'compact' }).format(stats.followers), color: 'text-purple-600' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-charcoal/10 transition-all hover:shadow-md">
                        <h3 className="text-sm font-bold text-charcoal/50 uppercase tracking-wider mb-2">{stat.label}</h3>
                        <p className={`text-4xl font-extrabold ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-charcoal/10 p-6">
                <h3 className="text-xl font-bold text-charcoal mb-6">Recent Activity</h3>
                <div className="space-y-4">
                    {applications.slice(0, 5).map(app => (
                        <div key={app.id} className="flex items-center gap-4 text-sm">
                            <div className="w-2 h-2 rounded-full bg-saffron"></div>
                            <p className="text-charcoal/70">
                                <strong>{app.full_name}</strong> application is currently <span className="font-bold">{app.status}</span>.
                            </p>
                            <span className="text-charcoal/40 ml-auto">{new Date(app.created_at).toLocaleDateString()}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderApplications = () => (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-3xl font-extrabold text-charcoal">Applications Pipeline</h2>
                
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search name or email..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-charcoal/20 focus:border-saffron focus:ring-2 focus:ring-saffron/20 outline-none transition-all"
                        />
                    </div>
                    <div className="relative">
                        <select 
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="appearance-none pl-4 pr-10 py-2 rounded-xl border border-charcoal/20 focus:border-saffron focus:ring-2 focus:ring-saffron/20 outline-none transition-all bg-white font-semibold text-charcoal/70"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 pointer-events-none" size={16} />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-charcoal/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-charcoal/5 border-b border-charcoal/10">
                                <th className="p-4 text-xs font-bold text-charcoal/50 uppercase tracking-wider">Applicant</th>
                                <th className="p-4 text-xs font-bold text-charcoal/50 uppercase tracking-wider">Content Type</th>
                                <th className="p-4 text-xs font-bold text-charcoal/50 uppercase tracking-wider">Followers</th>
                                <th className="p-4 text-xs font-bold text-charcoal/50 uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-bold text-charcoal/50 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-charcoal/10">
                            {filteredApps.length > 0 ? filteredApps.map((app) => (
                                <tr key={app.id} className="hover:bg-orange-50/50 transition-colors">
                                    <td className="p-4">
                                        <div className="font-bold text-charcoal">{app.full_name}</div>
                                        <div className="text-sm text-charcoal/60">{app.email}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-3 py-1 bg-charcoal/5 text-charcoal rounded-full text-xs font-bold">
                                            {app.content_type}
                                        </span>
                                    </td>
                                    <td className="p-4 font-semibold text-charcoal">
                                        {new Intl.NumberFormat('en-US', { notation: 'compact' }).format(app.follower_count)}
                                    </td>
                                    <td className="p-4">
                                        {app.status === 'pending' && <span className="inline-flex items-center gap-1 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md text-xs font-bold"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> Pending</span>}
                                        {app.status === 'approved' && <span className="inline-flex items-center gap-1 text-india-green bg-green-50 px-2.5 py-1 rounded-md text-xs font-bold"><CheckCircle2 size={12}/> Approved</span>}
                                        {app.status === 'rejected' && <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-2.5 py-1 rounded-md text-xs font-bold"><XCircle size={12}/> Rejected</span>}
                                    </td>
                                    <td className="p-4 text-right">
                                        <button 
                                            onClick={() => setSelectedApp(app)}
                                            className="text-sm font-semibold text-saffron hover:text-orange-700 transition-colors px-4 py-2 rounded-lg hover:bg-orange-50"
                                        >
                                            Review
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-charcoal/50">No applications match your search.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderModal = () => {
        if (!selectedApp) return null;
        
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b border-charcoal/10 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-md z-10">
                        <h3 className="text-2xl font-extrabold text-charcoal">Applicant Review</h3>
                        <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-charcoal/5 rounded-full transition-colors text-charcoal/60">
                            <X size={24} />
                        </button>
                    </div>
                    <div className="p-6 space-y-8">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-100 to-green-100 border border-orange-200 flex items-center justify-center text-3xl font-bold text-orange-800">
                                {selectedApp.full_name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="text-3xl font-extrabold text-charcoal">{selectedApp.full_name}</h4>
                                <p className="text-charcoal/60 font-medium">{selectedApp.email} • {selectedApp.age} years old • {selectedApp.location}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-sand/50 p-4 rounded-2xl border border-charcoal/5">
                                <p className="text-xs font-bold text-charcoal/40 uppercase tracking-widest mb-1">Content Niche</p>
                                <p className="text-lg font-bold text-charcoal">{selectedApp.content_type}</p>
                            </div>
                            <div className="bg-sand/50 p-4 rounded-2xl border border-charcoal/5">
                                <p className="text-xs font-bold text-charcoal/40 uppercase tracking-widest mb-1">Total Audience</p>
                                <p className="text-lg font-bold text-charcoal">{new Intl.NumberFormat('en-US').format(selectedApp.follower_count)}</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-bold text-charcoal/40 uppercase tracking-widest mb-3">Social Profiles</p>
                            <div className="flex flex-wrap gap-3">
                                {selectedApp.social_links?.map((link, i) => (
                                    <a key={i} href={`https://${link}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-saffron rounded-xl text-sm font-bold hover:bg-orange-100 transition-colors">
                                        {link} <ChevronRight size={14} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {selectedApp.status === 'pending' && (
                            <div className="pt-6 border-t border-charcoal/10 flex gap-4">
                                <button 
                                    onClick={() => updateStatus(selectedApp.id, 'approved')}
                                    className="flex-1 flex items-center justify-center gap-2 bg-india-green text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-200/50"
                                >
                                    <Check size={20} /> Approve Creator
                                </button>
                                <button 
                                    onClick={() => updateStatus(selectedApp.id, 'rejected')}
                                    className="flex-1 flex items-center justify-center gap-2 bg-white text-red-600 border-2 border-red-100 py-4 rounded-xl font-bold hover:bg-red-50 hover:border-red-200 transition-colors"
                                >
                                    <X size={20} /> Reject Application
                                </button>
                            </div>
                        )}
                        
                        {selectedApp.status !== 'pending' && (
                            <div className="pt-6 border-t border-charcoal/10">
                                <div className={`p-4 rounded-xl font-bold text-center ${selectedApp.status === 'approved' ? 'bg-green-50 text-india-green' : 'bg-red-50 text-red-700'}`}>
                                    This application has been {selectedApp.status}.
                                </div>
                                <button 
                                    onClick={() => updateStatus(selectedApp.id, 'pending')}
                                    className="w-full mt-4 text-sm font-bold text-charcoal/40 hover:text-charcoal/80 transition-colors"
                                >
                                    Reset to Pending
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex min-h-screen bg-sand">
            {renderSidebar()}
            
            <main className="flex-1 p-8 lg:p-12 overflow-y-auto h-screen">
                {loading ? (
                    <div className="flex items-center justify-center h-full text-charcoal/50 font-semibold">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-saffron mr-3"></div>
                        Loading Dashboard Data...
                    </div>
                ) : (
                    <>
                        {activeTab === 'Overview' && renderOverview()}
                        {activeTab === 'Applications' && renderApplications()}
                        {(activeTab === 'Creators' || activeTab === 'Settings') && (
                            <div className="flex items-center justify-center h-64 text-charcoal/40 font-bold text-xl border-2 border-dashed border-charcoal/10 rounded-3xl mt-12">
                                {activeTab} View Coming Soon
                            </div>
                        )}
                    </>
                )}
            </main>
            
            {renderModal()}
        </div>
    );
}

export default AdminPage;
