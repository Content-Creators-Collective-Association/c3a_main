import { useState } from 'react';

const LANGUAGE_STORAGE_KEY = 'c3a-language';

function LanguagePrompt({ onConfirm }) {
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const handleConfirm = () => {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, selectedLanguage);
        document.documentElement.lang = selectedLanguage;
        onConfirm(selectedLanguage);
    };

    return (
        <div className="fixed inset-0 z-[100] bg-charcoal/45 backdrop-blur-sm flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-3xl border border-charcoal/10 shadow-2xl p-8">
                <h2 className="text-2xl font-extrabold text-charcoal mb-3">Choose Language</h2>
                <p className="text-charcoal/60 text-sm mb-6">
                    Select your preferred language for viewing this website.
                </p>

                <label htmlFor="site-language" className="text-xs font-bold text-charcoal uppercase tracking-widest ml-1">
                    Language
                </label>
                <select
                    id="site-language"
                    name="siteLanguage"
                    value={selectedLanguage}
                    onChange={(event) => setSelectedLanguage(event.target.value)}
                    className="w-full mt-2 bg-sand/30 border border-charcoal/10 rounded-2xl px-5 py-4 focus:ring-1 focus:ring-blue-600 outline-none transition-all"
                >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="bn">Bengali</option>
                    <option value="te">Telugu</option>
                    <option value="mr">Marathi</option>
                    <option value="ta">Tamil</option>
                    <option value="ur">Urdu</option>
                    <option value="gu">Gujarati</option>
                    <option value="kn">Kannada</option>
                    <option value="ml">Malayalam</option>
                    <option value="or">Odia</option>
                    <option value="pa">Punjabi</option>
                    <option value="as">Assamese</option>
                    <option value="mai">Maithili</option>
                </select>

                <button
                    type="button"
                    onClick={handleConfirm}
                    className="w-full mt-7 bg-charcoal text-white font-bold rounded-2xl py-4 hover:bg-black transition-colors"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}

export { LANGUAGE_STORAGE_KEY };
export default LanguagePrompt;
