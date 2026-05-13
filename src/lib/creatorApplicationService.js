import { insertCreatorProfile } from './supabaseClient';

export function buildCreatorApplicationPayload(formData, socialPlatforms) {
    const age = Number.parseInt(formData.get('age'), 10);

    return {
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
        profile_links: socialPlatforms.map((platform) => platform.profile_link).join(', '),
        social_platform: JSON.stringify(
            socialPlatforms.map((platform) => ({
                platform: String(platform.platform || '').trim(),
                profile_link: String(platform.profile_link || '').trim(),
                follower_count: Number.parseInt(platform.follower_count, 10)
            }))
        ),
        follower_count: Math.max(...socialPlatforms.map((platform) => Number.parseInt(platform.follower_count, 10))),
        content_type: String(formData.get('content_type') || '').trim(),
        about: String(formData.get('about') || '').trim()
    };
}

export function validateCreatorApplication(formData, socialPlatforms) {
    const age = Number.parseInt(formData.get('age'), 10);

    if (!Number.isFinite(age)) {
        return { ok: false, error: new Error('Please enter valid numeric values for age.') };
    }

    if (!Array.isArray(socialPlatforms) || socialPlatforms.length === 0) {
        return { ok: false, error: new Error('Please add at least one social platform.') };
    }

    for (const platform of socialPlatforms) {
        if (!platform.profile_link || !platform.follower_count) {
            return { ok: false, error: new Error('Please fill in all fields for each social platform.') };
        }

        const followerCount = Number.parseInt(platform.follower_count, 10);
        if (!Number.isFinite(followerCount) || followerCount < 0) {
            return { ok: false, error: new Error('Please enter valid follower counts for all platforms.') };
        }
    }

    return { ok: true };
}

export async function submitCreatorApplication(formData, socialPlatforms) {
    const validation = validateCreatorApplication(formData, socialPlatforms);
    if (!validation.ok) {
        return validation;
    }

    const payload = buildCreatorApplicationPayload(formData, socialPlatforms);
    const { error } = await insertCreatorProfile(payload);

    if (error) {
        return { ok: false, error, payload };
    }

    return { ok: true, payload };
}