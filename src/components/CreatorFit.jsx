function CreatorFit() {
    return (
        <section className="py-24 bg-charcoal text-white rounded-[3rem] mx-6 fade-in-section" id="qualify">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-extrabold mb-8">Who We Partner With</h2>
                        <p className="text-white/60 text-lg mb-12">
                            We partner with creators who inspire change, amplify important voices, and use content to create meaningful social good.
                        </p>
                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <span className="material-symbols-outlined text-blue-600">check_circle</span>
                                <div>
                                    <p className="font-bold text-lg">Purpose-Driven Storytelling</p>
                                    <p className="text-white/50 text-sm">Creators whose work educates, uplifts, and motivates communities toward positive action.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="material-symbols-outlined text-blue-600">check_circle</span>
                                <div>
                                    <p className="font-bold text-lg">Original Voice</p>
                                    <p className="text-white/50 text-sm">Creators who communicate authentically and represent their values with honesty and consistency.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="material-symbols-outlined text-blue-600">check_circle</span>
                                <div>
                                    <p className="font-bold text-lg">Community Leadership</p>
                                    <p className="text-white/50 text-sm">Creators who foster respectful conversations and contribute to a safe, inclusive creator ecosystem.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-12 rounded-[2.5rem] bg-white/5 border border-white/10">
                        <h3 className="text-2xl font-bold mb-8 opacity-80">Our Criteria</h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between py-4 border-b border-white/10">
                                <span className="text-white/70">Social Impact Focus</span>
                                <span className="font-bold">Required</span>
                            </div>
                            <div className="flex items-center justify-between py-4 border-b border-white/10">
                                <span className="text-white/70">Authenticity & Integrity</span>
                                <span className="font-bold">Essential</span>
                            </div>
                            <div className="flex items-center justify-between py-4 border-b border-white/10">
                                <span className="text-white/70">Positive Community Values</span>
                                <span className="font-bold">Core Standard</span>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <span className="text-white/70">Application Status</span>
                                <span className="text-blue-600 font-bold">Open to All Impact Creators</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CreatorFit;
