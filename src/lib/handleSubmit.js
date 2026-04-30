import { insertCreatorProfile } from './supabaseClient';

export async function handleSubmit(event, socialPlatforms = []) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const age = Number.parseInt(formData.get('age'), 10);

    if (!Number.isFinite(age)) {
        alert('Please enter valid numeric values for age.');
        return { success: false, error: new Error('Invalid numeric fields.') };
    }

    // Validate social platforms
    if (!socialPlatforms || socialPlatforms.length === 0) {
        alert('Please add at least one social platform.');
        return { success: false, error: new Error('No social platforms provided.') };
    }

    // Validate each platform
    for (let platform of socialPlatforms) {
        if (!platform.profile_link || !platform.follower_count) {
            alert('Please fill in all fields for each social platform.');
            return { success: false, error: new Error('Incomplete platform data.') };
        }
        const followerCount = Number.parseInt(platform.follower_count, 10);
        if (!Number.isFinite(followerCount) || followerCount < 0) {
            alert('Please enter valid follower counts for all platforms.');
            return { success: false, error: new Error('Invalid follower count.') };
        }
    }

    // Process social platforms data
    const processedPlatforms = socialPlatforms.map(p => ({
        platform: String(p.platform || '').trim(),
        profile_link: String(p.profile_link || '').trim(),
        follower_count: Number.parseInt(p.follower_count, 10)
    }));

    // Get the highest follower count and profile links
    const maxFollowerCount = Math.max(...processedPlatforms.map(p => p.follower_count));
    const profileLinks = processedPlatforms.map(p => p.profile_link).join(', ');

    const payload = {
        full_name: String(formData.get('full_name') || '').trim(),
        age,
        nationality: String(formData.get('nationality') || '').trim(),
        street: String(formData.get('street') || '').trim(),
        city: String(formData.get('city') || '').trim(),
        state: String(formData.get('state') || '').trim(),
        country: String(formData.get('country') || '').trim(),
        postal_code: String(formData.get('postal_code') || '').trim(),
        phone: String(formData.get('phone') || '').trim(),
        email: String(formData.get('email') || '').trim().toLowerCase(),
        profile_links: profileLinks,
        social_platform: JSON.stringify(processedPlatforms),
        follower_count: maxFollowerCount,
        content_type: String(formData.get('content_type') || '').trim(),
        about: String(formData.get('about') || '').trim(),
    };

    const { error } = await insertCreatorProfile(payload);

    if (error) {
        console.error('Supabase insert error:', {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint,
            fullError: error
        });
        console.log('Payload sent:', payload);
        alert(`Submission failed: ${error.message}`);
        return { success: false, error };
    }

    alert(`Thanks ${payload.full_name || 'Creator'}! Your profile was submitted successfully.`);
    return { success: true };
}

if (typeof window !== 'undefined') {
    window.handleSubmit = handleSubmit;
}
