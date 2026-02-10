function ValueProps() {
    return (
        <section className="py-24 fade-in-section" id="benefits">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-extrabold mb-6 text-charcoal">
                        Professional Support, <span className="text-saffron">Premium Access</span>
                    </h2>
                    <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
                        We provide the network and analytics necessary for creators to transition from passion to profession.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-10 rounded-3xl bg-white border border-charcoal/5 hover:border-saffron/20 transition-all">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 text-saffron flex items-center justify-center mb-8">
                            <span className="material-symbols-outlined text-3xl">hub</span>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-charcoal">Brand Ecosystem</h3>
                        <p className="text-charcoal/60 leading-relaxed text-sm">
                            Direct access to established and emerging brands seeking long-term creative partnerships.
                        </p>
                    </div>
                    <div className="p-10 rounded-3xl bg-white border border-charcoal/5 hover:border-saffron/20 transition-all">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 text-saffron flex items-center justify-center mb-8">
                            <span className="material-symbols-outlined text-3xl">insights</span>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-charcoal">Advanced Analytics</h3>
                        <p className="text-charcoal/60 leading-relaxed text-sm">
                            Actionable data insights to refine your content strategy across multiple social platforms.
                        </p>
                    </div>
                    <div className="p-10 rounded-3xl bg-white border border-charcoal/5 hover:border-saffron/20 transition-all">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 text-saffron flex items-center justify-center mb-8">
                            <span className="material-symbols-outlined text-3xl">verified</span>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-charcoal">Verification Program</h3>
                        <p className="text-charcoal/60 leading-relaxed text-sm">
                            Earn professional certification that builds trust with agencies and global marketing partners.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ValueProps;
