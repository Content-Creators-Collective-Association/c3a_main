import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
    import.meta.env.VITE_SUPABASE_URL ||
    import.meta.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseAnonKey =
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export async function insertCreatorProfile(profile) {
    if (!isSupabaseConfigured || !supabase) {
        return { error: new Error('Supabase is not configured.') };
    }

    return supabase
        .from('creator_profiles')
        .insert([profile]);
}

export async function getAdminStatistics() {
    // Returning richer placeholder data for complex admin dashboard
    const mockApplications = [
        {
            id: '1',
            full_name: 'Aarav Sharma',
            email: 'aarav.sharma@example.in',
            created_at: new Date().toISOString(),
            content_type: 'Gaming',
            follower_count: 500000,
            status: 'pending',
            social_links: ['youtube.com/aaravgaming', 'twitch.tv/aarav'],
            age: 24,
            location: 'Mumbai, MH'
        },
        {
            id: '2',
            full_name: 'Priya Patel',
            email: 'priya.p@example.in',
            created_at: new Date(Date.now() - 86400000).toISOString(),
            content_type: 'Lifestyle',
            follower_count: 1200000,
            status: 'approved',
            social_links: ['instagram.com/priyapatel', 'tiktok.com/@priya'],
            age: 28,
            location: 'Ahmedabad, GJ'
        },
        {
            id: '3',
            full_name: 'Rohan Desai',
            email: 'rohan.d@example.in',
            created_at: new Date(Date.now() - 172800000).toISOString(),
            content_type: 'Tech',
            follower_count: 850000,
            status: 'pending',
            social_links: ['youtube.com/rohandtech', 'x.com/rohand'],
            age: 31,
            location: 'Bengaluru, KA'
        },
        {
            id: '4',
            full_name: 'Kavya Singh',
            email: 'kavya.s@example.in',
            created_at: new Date(Date.now() - 259200000).toISOString(),
            content_type: 'Fitness',
            follower_count: 3000000,
            status: 'rejected',
            social_links: ['instagram.com/kavyafit'],
            age: 27,
            location: 'Delhi, DL'
        },
        {
            id: '5',
            full_name: 'Vikram Iyer',
            email: 'vikram.iyer@example.in',
            created_at: new Date(Date.now() - 345600000).toISOString(),
            content_type: 'Travel',
            follower_count: 450000,
            status: 'approved',
            social_links: ['youtube.com/vikramtravels'],
            age: 35,
            location: 'Chennai, TN'
        },
        {
            id: '6',
            full_name: 'Neha Gupta',
            email: 'neha.g@example.in',
            created_at: new Date(Date.now() - 432000000).toISOString(),
            content_type: 'Comedy',
            follower_count: 2200000,
            status: 'pending',
            social_links: ['instagram.com/nehacomedy'],
            age: 22,
            location: 'Pune, MH'
        }
    ];

    return {
        data: {
            applications: mockApplications
        }
    };
}
