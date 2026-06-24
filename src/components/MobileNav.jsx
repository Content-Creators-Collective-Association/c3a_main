import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { createPortal } from 'react-dom'; // 1. Import createPortal

export default function MobileNav({ t, language, changeLanguage, onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // 2. Wrap your entire JSX markup inside createPortal
  return createPortal(
    <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm">
      <div className="absolute right-0 top-0 w-11/12 max-w-xs h-full bg-white shadow-lg p-6 overflow-y-auto">
        <button onClick={onClose} aria-label="Close menu" className="mb-6 text-gray-700 text-xl">✕</button>
        <nav className="flex flex-col gap-4">
          <a onClick={onClose} href="#about" className="text-lg font-semibold text-charcoal" >{t('header.aboutUs')}</a>
          <a onClick={onClose} href="#how-it-works" className="text-lg font-semibold text-charcoal">{t('header.theProcess')}</a>
          <a onClick={onClose} href="#qualify" className="text-lg font-semibold text-charcoal">{t('header.eligibility')}</a>
          <a onClick={onClose} href="#membership-subscriptions" className="text-lg font-semibold text-charcoal">{t('header.pricing')}</a>
          <Link to="/creators-lab" onClick={onClose} className="text-lg font-semibold text-charcoal">{t('header.creatorsLab')}</Link>
          <Link to="/merchandise" onClick={onClose} className="text-lg font-semibold text-charcoal">{t('header.merchandise')}</Link>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">Language</label>
            <select value={language} onChange={(e)=>changeLanguage(e.target.value)} className="w-full border rounded px-3 py-2 bg-white text-black">
              <option value="en">English</option>
              <option value="gu">ગુજરાતી</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मরাঠী</option>
              <option value="ta">தமிழ்</option>
              <option value="bn">বাংলা</option>
              <option value="as">অসমীয়া</option>
            </select>
          </div>

          <Link to="/auth" onClick={onClose} className="mt-4 inline-block w-full text-center px-4 py-3 border rounded font-bold text-black">{t('header.creatorLogin')}</Link>
        </nav>
      </div>
    </div>,
    document.body // 3. Inject it directly into the document body container
  );
}