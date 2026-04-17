function Hero() {
    const handleSmoothScroll = (e, targetId) => {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="relative pt-24 pb-32 overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 text-center">
                <div className="mb-8 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-blue-50 p-5 md:p-6 text-left shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <p className="text-xs font-extrabold tracking-widest uppercase text-emerald-700 mb-2">
                                Soft Launch Announcement
                            </p>
                            <h2 className="text-lg md:text-2xl font-extrabold text-charcoal leading-tight">
                                Join Us On Zoom - 19 April 2026
                            </h2>
                            <p className="mt-2 text-sm md:text-base text-charcoal/75 leading-relaxed">
                                Our soft launch happens on 19th April. All interested creators are requested to join our official WhatsApp channel for updates and joining details.
                            </p>
                        </div>
                        <a
                            href="https://whatsapp.com/channel/0029VbCpyQG8qIzqsqXChj3N"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors"
                        >
                            Join WhatsApp Channel
                            <span className="material-symbols-outlined">open_in_new</span>
                        </a>
                    </div>
                </div>
                <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white text-charcoal/60 text-xs font-bold tracking-widest uppercase mb-8 border border-blue-100">
                    Empowering the Creator Economy
                </span>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-charcoal">
                    Elevate Your <br />
                    <span className="text-saffron">Creative Journey</span>
                </h1>
                <p className="text-lg md:text-xl text-charcoal/70 max-w-3xl mx-auto mb-12 leading-relaxed">
                    The premier platform for C3A® verified creators to unlock professional growth. Connect with India-centric opportunities and professionalize your influence.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                    <a
                        className="w-full sm:w-auto px-10 py-5 bg-saffron text-white font-bold rounded-full text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200/40 flex items-center justify-center gap-2 cursor-pointer"
                        onClick={(e) => handleSmoothScroll(e, '#apply')}
                    >
                        Apply to Join <span className="material-symbols-outlined">arrow_forward</span>
                    </a>
                    <a
                        className="w-full sm:w-auto px-10 py-5 border border-charcoal/10 text-charcoal/80 font-bold rounded-full text-lg hover:bg-white transition-colors cursor-pointer"
                        onClick={(e) => handleSmoothScroll(e, '#how-it-works')}
                    >
                        View Benefits
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Hero;
