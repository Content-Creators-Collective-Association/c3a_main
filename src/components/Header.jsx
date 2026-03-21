function Header() {
    const handleSmoothScroll = (e, targetId) => {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-blue-100 bg-sand/90 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                        <span className="material-symbols-outlined block text-2xl font-bold">verified_user</span>
                    </div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-charcoal">C3A</h2>
                </div>
                <nav className="hidden md:flex items-center gap-10">
                    <a
                        className="text-sm font-semibold text-charcoal/70 hover:text-blue-600 transition-colors cursor-pointer"
                        onClick={(e) => handleSmoothScroll(e, '#about')}
                    >
                        About Us
                    </a>
                    <a
                        className="text-sm font-semibold text-charcoal/70 hover:text-blue-600 transition-colors cursor-pointer"
                        onClick={(e) => handleSmoothScroll(e, '#benefits')}
                    >
                        Opportunities
                    </a>
                    <a
                        className="text-sm font-semibold text-charcoal/70 hover:text-saffron transition-colors cursor-pointer"
                        onClick={(e) => handleSmoothScroll(e, '#how-it-works')}
                    >
                        The Process
                    </a>
                    <a
                        className="text-sm font-semibold text-charcoal/70 hover:text-blue-600 transition-colors cursor-pointer"
                        onClick={(e) => handleSmoothScroll(e, '#qualify')}
                    >
                        Eligibility
                    </a>
                    <a
                        className="text-sm font-semibold text-charcoal/70 hover:text-saffron transition-colors cursor-pointer"
                        onClick={(e) => handleSmoothScroll(e, '#membership-subscriptions')}
                    >
                        Pricing
                    </a>
                    <a
                        className="bg-charcoal text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-black transition-all cursor-pointer"
                        onClick={(e) => handleSmoothScroll(e, '#apply')}
                    >
                        Apply Now
                    </a>
                </nav>
            </div>
        </header>
    );
}

export default Header;
