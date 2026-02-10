function CreatorFit() {
    return (
        <section className="py-24 bg-charcoal text-white rounded-[3rem] mx-6 fade-in-section" id="qualify">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-extrabold mb-8">Who We Partner With</h2>
                        <p className="text-white/60 text-lg mb-12">
                            We value quality and engagement over raw numbers. Our community is built on authenticity and professional potential.
                        </p>
                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <span className="material-symbols-outlined text-saffron">check_circle</span>
                                <div>
                                    <p className="font-bold text-lg">Selective Entry</p>
                                    <p className="text-white/50 text-sm">Minimum 1k+ active followers on primary social channels.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="material-symbols-outlined text-saffron">check_circle</span>
                                <div>
                                    <p className="font-bold text-lg">Original Voice</p>
                                    <p className="text-white/50 text-sm">Creators who produce unique content with high production value.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="material-symbols-outlined text-saffron">check_circle</span>
                                <div>
                                    <p className="font-bold text-lg">Consistent Growth</p>
                                    <p className="text-white/50 text-sm">A track record of positive audience sentiment and organic growth.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-12 rounded-[2.5rem] bg-white/5 border border-white/10">
                        <h3 className="text-2xl font-bold mb-8 opacity-80">Our Criteria</h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between py-4 border-b border-white/10">
                                <span className="text-white/70">Minimum Following</span>
                                <span className="font-bold">1k+</span>
                            </div>
                            <div className="flex items-center justify-between py-4 border-b border-white/10">
                                <span className="text-white/70">Engagement Rate</span>
                                <span className="font-bold">2.5% Average</span>
                            </div>
                            <div className="flex items-center justify-between py-4 border-b border-white/10">
                                <span className="text-white/70">Content Quality</span>
                                <span className="font-bold">Verified Professional</span>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <span className="text-white/70">Application Status</span>
                                <span className="text-saffron font-bold">Now Open</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CreatorFit;
