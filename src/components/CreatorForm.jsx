import { useState } from 'react';
import { handleSubmit } from '../lib/handleSubmit';

function CreatorForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onFormSubmit = async (e) => {
        setIsSubmitting(true);
        const result = await handleSubmit(e);
        setIsSubmitting(false);
        if (!result.success) {
            return;
        }

        setIsSubmitted(true);
        e.target.reset();
        setTimeout(() => {
            setIsSubmitted(false);
        }, 3000);
    };

    return (
        <section className="py-24 relative fade-in-section" id="apply">
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white border border-charcoal/5 rounded-[3rem] p-8 md:p-16 shadow-xl shadow-charcoal/5">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold mb-4 text-charcoal">Creator Profile Submission</h2>
                        <p className="text-charcoal/60">Share your details to be considered for premium C3A opportunities.</p>
                    </div>

                    {isSubmitted ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-4xl text-green-600">check_circle</span>
                            </div>
                            <h3 className="text-2xl font-bold text-charcoal mb-3">Profile Submitted!</h3>
                            <p className="text-charcoal/60">
                                Thank you for submitting your profile. Our team will review it and respond shortly.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={onFormSubmit} className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-charcoal uppercase tracking-widest ml-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        className="w-full bg-sand/30 border border-charcoal/10 rounded-2xl px-6 py-4 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder:text-charcoal/20"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-charcoal uppercase tracking-widest ml-1">
                                        Nationality
                                    </label>
                                    <input
                                        type="text"
                                        name="nationality"
                                        className="w-full bg-sand/30 border border-charcoal/10 rounded-2xl px-6 py-4 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder:text-charcoal/20"
                                        placeholder="e.g. Indian"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold text-charcoal uppercase tracking-widest ml-1">
                                    Address
                                </label>
                                <textarea
                                    name="address"
                                    rows="3"
                                    className="w-full bg-sand/30 border border-charcoal/10 rounded-2xl px-6 py-4 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder:text-charcoal/20"
                                    placeholder="Enter your address"
                                    required
                                ></textarea>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-charcoal uppercase tracking-widest ml-1">
                                        Age
                                    </label>
                                    <input
                                        type="number"
                                        name="age"
                                        min="13"
                                        className="w-full bg-sand/30 border border-charcoal/10 rounded-2xl px-6 py-4 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder:text-charcoal/20"
                                        placeholder="e.g. 24"
                                        required
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-charcoal uppercase tracking-widest ml-1">
                                        Social Platform
                                    </label>
                                    <select
                                        name="social_platform"
                                        className="w-full bg-sand/30 border border-charcoal/10 rounded-2xl px-6 py-4 focus:ring-1 focus:ring-saffron outline-none transition-all appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="Instagram">Instagram</option>
                                        <option value="YouTube">YouTube</option>
                                        <option value="LinkedIn">LinkedIn</option>
                                        <option value="ShareChat">ShareChat</option>
                                        <option value="Moj">Moj</option>
                                        <option value="TikTok">TikTok</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-charcoal uppercase tracking-widest ml-1">
                                        Follower Count
                                    </label>
                                    <input
                                        type="number"
                                        name="follower_count"
                                        min="0"
                                        className="w-full bg-sand/30 border border-charcoal/10 rounded-2xl px-6 py-4 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder:text-charcoal/20"
                                        placeholder="e.g. 12500"
                                        required
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-charcoal uppercase tracking-widest ml-1">
                                        Content Type
                                    </label>
                                    <select
                                        name="content_type"
                                        className="w-full bg-sand/30 border border-charcoal/10 rounded-2xl px-6 py-4 focus:ring-1 focus:ring-saffron outline-none transition-all appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="Lifestyle">Lifestyle</option>
                                        <option value="Education">Education</option>
                                        <option value="Entertainment">Entertainment</option>
                                        <option value="Tech">Tech</option>
                                        <option value="Fashion">Fashion</option>
                                        <option value="Fitness">Fitness</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold text-charcoal uppercase tracking-widest ml-1">
                                    Profile Links
                                </label>
                                <input
                                    type="text"
                                    name="profile_links"
                                    className="w-full bg-sand/30 border border-charcoal/10 rounded-2xl px-6 py-4 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder:text-charcoal/20"
                                    placeholder="https://instagram.com/you, https://youtube.com/@you"
                                    required
                                />
                            </div>

                            <div className="space-y-4 p-6 bg-sand/30 rounded-2xl border border-charcoal/10">
                                <div className="flex gap-3 items-start">
                                    <span className="material-symbols-outlined text-blue-600 mt-0.5">verified</span>
                                    <p className="text-xs text-charcoal/60 leading-relaxed">
                                        Your information is used only for creator program evaluation and partnership matching.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-5 bg-charcoal text-white font-bold rounded-2xl text-lg transition-all mt-4 ${isSubmitting
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:bg-black'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Submitting...
                                    </span>
                                ) : (
                                    'Submit Profile'
                                )}
                            </button>
                            <p className="text-center text-[10px] text-charcoal/40 font-bold mt-6 leading-relaxed">
                                OUR TEAM WILL REVIEW YOUR APPLICATION AND REACH OUT TO YOU.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}

export default CreatorForm;
