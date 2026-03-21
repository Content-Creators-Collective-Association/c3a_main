import { useState } from 'react';

function CreatorForm() {
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        platform: 'Instagram',
        followerRange: '500 - 1k',
        profileUrl: '',
        termsAccepted: false
    });

    // Validation errors
    const [errors, setErrors] = useState({});

    // Form submission state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // URL validation
        if (!formData.profileUrl.trim()) {
            newErrors.profileUrl = 'Profile URL is required';
        } else if (!/^https?:\/\/.+/.test(formData.profileUrl)) {
            newErrors.profileUrl = 'Please enter a valid URL (must start with http:// or https://)';
        }

        // Terms validation
        if (!formData.termsAccepted) {
            newErrors.termsAccepted = 'You must accept the Terms and Conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call with delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Log form data to console (as per requirements)
        console.log('Creator Application Submitted:', formData);

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setFormData({
                name: '',
                email: '',
                platform: 'Instagram',
                followerRange: '1k - 10k',
                profileUrl: ''
            });
            setIsSubmitted(false);
        }, 3000);
    };

    // Check if form is valid for button state
    const isFormValid = formData.name.trim() &&
        formData.email.trim() &&
        formData.profileUrl.trim() &&
        formData.termsAccepted &&
        Object.keys(errors).length === 0;

    return (
        <section className="py-24 relative fade-in-section" id="apply">
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white border border-charcoal/5 rounded-[3rem] p-8 md:p-16 shadow-xl shadow-charcoal/5">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold mb-4 text-charcoal">Apply for Membership</h2>
                        <p className="text-charcoal/60">Complete the form below to begin your verification process.</p>
                    </div>

                    {isSubmitted ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-4xl text-green-600">check_circle</span>
                            </div>
                            <h3 className="text-2xl font-bold text-charcoal mb-3">Application Submitted!</h3>
                            <p className="text-charcoal/60">
                                Thank you for applying. Our team will review your application and respond within 5 business days.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-charcoal uppercase tracking-widest ml-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full bg-sand/30 border ${errors.name ? 'border-red-400' : 'border-charcoal/10'} rounded-2xl px-6 py-4 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder:text-charcoal/20`}
                                        placeholder="Enter your name"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name}</p>}
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-charcoal uppercase tracking-widest ml-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full bg-sand/30 border ${errors.email ? 'border-red-400' : 'border-charcoal/10'} rounded-2xl px-6 py-4 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder:text-charcoal/20`}
                                        placeholder="hello@creator.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email}</p>}
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-charcoal uppercase tracking-widest ml-1">
                                        Primary Platform
                                    </label>
                                    <select
                                        name="platform"
                                        value={formData.platform}
                                        onChange={handleChange}
                                        className="w-full bg-sand/30 border-charcoal/10 rounded-2xl px-6 py-4 focus:ring-1 focus:ring-saffron outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option>Instagram</option>
                                        <option>YouTube</option>
                                        <option>LinkedIn</option>
                                        <option>ShareChat</option>
                                        <option>Moj</option>
                                        <option>TikTok</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-charcoal uppercase tracking-widest ml-1">
                                        Follower Range
                                    </label>
                                    <select
                                        name="followerRange"
                                        value={formData.followerRange}
                                        onChange={handleChange}
                                        className="w-full bg-sand/30 border-charcoal/10 rounded-2xl px-6 py-4 focus:ring-1 focus:ring-saffron outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option>500 - 1k</option>
                                        <option>1k - 10k</option>
                                        <option>10k - 50k</option>
                                        <option>50k - 250k</option>
                                        <option>250k - 1M</option>
                                        <option>1M+</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-charcoal uppercase tracking-widest ml-1">
                                    Profile / Portfolio Link
                                </label>
                                <input
                                    type="url"
                                    name="profileUrl"
                                    value={formData.profileUrl}
                                    onChange={handleChange}
                                    className={`w-full bg-sand/30 border ${errors.profileUrl ? 'border-red-400' : 'border-charcoal/10'} rounded-2xl px-6 py-4 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder:text-charcoal/20`}
                                    placeholder="https://social.com/yourprofile"
                                />
                                {errors.profileUrl && <p className="text-red-500 text-xs ml-1">{errors.profileUrl}</p>}
                            </div>
                            <div className="space-y-4 p-6 bg-sand/30 rounded-2xl border border-charcoal/10">
                                <div className="flex gap-3">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        name="termsAccepted"
                                        checked={formData.termsAccepted}
                                        onChange={handleChange}
                                        className={`w-5 h-5 rounded border-2 ${errors.termsAccepted ? 'border-red-400' : 'border-charcoal/20'} cursor-pointer accent-saffron mt-0.5 flex-shrink-0`}
                                    />
                                    <label htmlFor="terms" className="cursor-pointer">
                                        <p className="text-sm text-charcoal font-semibold mb-2">
                                            I agree to the Terms and Conditions
                                        </p>
                                        <p className="text-xs text-charcoal/60 leading-relaxed">
                                            By joining C3A, members commit to maintaining professional standards and creating authentic content. Members must not engage in or post negative, defamatory, or harmful content that could damage brand reputations or community trust. Violations may result in membership suspension or termination.
                                        </p>
                                    </label>
                                </div>
                                {errors.termsAccepted && <p className="text-red-500 text-xs ml-8">{errors.termsAccepted}</p>}
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
                                    'Submit Application'
                                )}
                            </button>
                            <p className="text-center text-[10px] text-charcoal/40 font-bold mt-6 leading-relaxed">
                                DUE TO HIGH VOLUME, OUR TEAM TYPICALLY RESPONDS WITHIN 5 BUSINESS DAYS.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}

export default CreatorForm;
