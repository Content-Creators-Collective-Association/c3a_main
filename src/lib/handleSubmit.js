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
        age,
        nationality: String(formData.get('nationality') || '').trim(),
        street: String(formData.get('street') || '').trim(),
        city: String(formData.get('city') || '').trim(),
        state: String(formData.get('state') || '').trim(),
        country: String(formData.get('country') || '').trim(),
        postal_code: String(formData.get('postal_code') || '').trim(),
        phone: String(formData.get('phone') || '').trim(),
        email: String(formData.get('email') || '').trim().toLowerCase(),
        profile_links: String(formData.get('profile_links') || '').trim(),
        social_platform: String(formData.get('social_platform') || '').trim(),
        follower_count: followerCount,
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
