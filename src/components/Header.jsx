import { Link } from 'react-router-dom';
import { scrollToSection } from '../lib/scrollToSection';
import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';
import MobileNav from './MobileNav';

function Header() {
    const { t, changeLanguage, language } = useLanguage();

    const handleSmoothScroll = (e, targetId) => {
        e.preventDefault();
        scrollToSection(targetId);
    };

    const [showMobile, setShowMobile] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-blue-100 bg-sand/90 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center">
                    <Link to="/" className="inline-block" aria-label="Go to homepage">
                        <img
                            src="/favicon.svg"
                            alt="C3A logo"
                            className="h-11 w-11 md:h-12 md:w-12 rounded-xl object-contain cursor-pointer"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        />
                    </Link>
                </div>
                <nav className="hidden md:flex items-center gap-10">
                    <a
                        className="text-sm font-semibold text-charcoal/70 hover:text-blue-600 transition-colors cursor-pointer"
                        onClick={(e) => handleSmoothScroll(e, '#about')}
                    >
                        {t('header.aboutUs')}
                    </a>
                    <a
                        className="text-sm font-semibold text-charcoal/70 hover:text-saffron transition-colors cursor-pointer"
                        onClick={(e) => handleSmoothScroll(e, '#how-it-works')}
                    >
                        {t('header.theProcess')}
                    </a>
                    <a
                        className="text-sm font-semibold text-charcoal/70 hover:text-blue-600 transition-colors cursor-pointer"
                        onClick={(e) => handleSmoothScroll(e, '#qualify')}
                    >
                        {t('header.eligibility')}
                    </a>
                    <a
                        className="text-sm font-semibold text-charcoal/70 hover:text-saffron transition-colors cursor-pointer"
                        onClick={(e) => handleSmoothScroll(e, '#membership-subscriptions')}
                    >
                        {t('header.pricing')}
                    </a>
                    <a
                        className="bg-charcoal text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-black transition-all cursor-pointer"
                        onClick={(e) => handleSmoothScroll(e, '#apply')}
                    >
                        {t('header.applyNow')}
                    </a>
                    <Link
                        to="/creators-lab"
                        className="text-sm font-semibold text-charcoal/70 hover:text-blue-600 transition-colors"
                    >
                        {t('header.creatorsLab')}
                    </Link>
                    <Link
                        to="/merchandise"
                        className="text-sm font-semibold text-charcoal/70 hover:text-blue-600 transition-colors"
                    >
                        {t('header.merchandise')}
                    </Link>

                    <select
                        value={language}
                        onChange={(e) => changeLanguage(e.target.value)}
                        className="ml-2 text-sm font-semibold text-charcoal/70 bg-transparent border border-charcoal/10 rounded px-2 py-1"
                        aria-label="Language selector"
                    >
                        <option value="en">English</option>
                        <option value="gu">ગુજરાતી</option>
                        <option value="hi">हिन्दी</option>
                        <option value="mr">मराठी</option>
                        <option value="ta">தமிழ்</option>
                        <option value="bn">বাংলা</option>
                        <option value="as">অসমীয়া</option>
                    </select>
                    <Link
                        to="/auth"
                        className="border border-charcoal/20 text-charcoal px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white transition-colors"
                    >
                        {t('header.creatorLogin')}
                    </Link>
                </nav>
                {/* Mobile menu button */}
                <div className="md:hidden flex items-center">
                    <button aria-label="Open menu" onClick={() => setShowMobile(true)} className="p-2 rounded-md hover:bg-charcoal/5">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-charcoal">
                            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                {showMobile && (
                    <MobileNav t={t} language={language} changeLanguage={(l)=>{ changeLanguage(l); setShowMobile(false); }} onClose={() => setShowMobile(false)} />
                )}
            </div>
        </header>
    );
}

export default Header;
