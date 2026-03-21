function AboutUs() {
    return (
        <section className="py-24 fade-in-section" id="about">
            <div className="max-w-5xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-extrabold mb-6 text-charcoal">About C3A</h2>
                        <div className="space-y-6 text-charcoal/70 leading-relaxed">
                            <p>
                                C3A stands for Content Creators Collective Association — a community-driven platform that bridges the gap between talented creators and global brands seeking authentic partnerships.
                            </p>
                            <p>
                                We were founded with a simple belief: that the creator economy thrives when creators are equipped with the right tools, network, and opportunities to turn their passion into a sustainable profession.
                            </p>
                            <p>
                                Too many creators struggle in isolation, lacking access to premium opportunities and professional development. At the same time, brands search endlessly for authentic voices. We created C3A to solve this disconnect.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div className="p-10 rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200">
                            <h3 className="text-2xl font-extrabold mb-4 text-charcoal">Our Mission</h3>
                            <p className="text-charcoal/70">
                                To empower creators worldwide by providing exclusive access to premium partnerships, professional development, and a thriving community of like-minded individuals.
                            </p>
                        </div>
                        <div className="p-10 rounded-3xl bg-gradient-to-br from-blue-50/50 to-white border border-charcoal/5">
                            <h3 className="text-2xl font-extrabold mb-4 text-charcoal">Why We Exist</h3>
                            <p className="text-charcoal/70">
                                The creator economy is growing exponentially, but many talented creators lack the platform and recognition they deserve. We exist to level the playing field and create meaningful opportunities for every creator, regardless of their current follower count.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-20 pt-20 border-t border-charcoal/5">
                    <h3 className="text-3xl font-extrabold mb-12 text-center text-charcoal">What We Offer</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-3xl text-blue-600">handshake</span>
                            </div>
                            <h4 className="text-lg font-bold mb-3 text-charcoal">Brand Partnerships</h4>
                            <p className="text-charcoal/60">
                                Direct access to carefully curated brand partnership opportunities aligned with your content and values.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-3xl text-blue-600">school</span>
                            </div>
                            <h4 className="text-lg font-bold mb-3 text-charcoal">Professional Development</h4>
                            <p className="text-charcoal/60">
                                Workshops, mentorship, and resources to help you grow your channel and monetization strategies.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-3xl text-blue-600">groups</span>
                            </div>
                            <h4 className="text-lg font-bold mb-3 text-charcoal">Community Support</h4>
                            <p className="text-charcoal/60">
                                Connect with fellow creators, share insights, and collaborate on projects within our thriving community.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutUs;
