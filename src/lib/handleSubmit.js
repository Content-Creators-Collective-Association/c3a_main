import { insertCreatorProfile } from './supabaseClient';

export async function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const age = Number.parseInt(formData.get('age'), 10);
    const followerCount = Number.parseInt(formData.get('follower_count'), 10);

    if (!Number.isFinite(age) || !Number.isFinite(followerCount)) {
        alert('Please enter valid numeric values for age and follower count.');
        return { success: false, error: new Error('Invalid numeric fields.') };
    }

    const payload = {
        full_name: String(formData.get('full_name') || '').trim(),
        address: String(formData.get('address') || '').trim(),
        age,
        nationality: String(formData.get('nationality') || '').trim(),
        profile_links: String(formData.get('profile_links') || '').trim(),
        social_platform: String(formData.get('social_platform') || '').trim(),
        follower_count: followerCount,
        content_type: String(formData.get('content_type') || '').trim(),
    };

    const { error } = await insertCreatorProfile(payload);

    if (error) {
        console.error('Failed to insert creator profile:', error);
        alert('Submission failed. Please try again.');
        return { success: false, error };
    }

    alert('Submission successful. Thank you!');
    return { success: true };
}

if (typeof window !== 'undefined') {
    window.handleSubmit = handleSubmit;
}
