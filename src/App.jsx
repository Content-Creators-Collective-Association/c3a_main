import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import CreatorFit from './components/CreatorFit';
import HowItWorks from './components/HowItWorks';
import CreatorForm from './components/CreatorForm';
import MembershipSubscription from './components/MembershipSubscription';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import LanguagePrompt, { LANGUAGE_STORAGE_KEY } from './components/LanguagePrompt';

function App() {
    const [showLanguagePrompt, setShowLanguagePrompt] = useState(false);

    // IntersectionObserver for scroll-based animations
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);

        // Observe all sections with fade-in-section class
        const sections = document.querySelectorAll('.fade-in-section');
        sections.forEach(section => observer.observe(section));

        return () => {
            sections.forEach(section => observer.unobserve(section));
        };
    }, []);

    useEffect(() => {
        const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLanguage) {
            document.documentElement.lang = savedLanguage;
            return;
        }

        setShowLanguagePrompt(true);
    }, []);

    return (
        <>
            {showLanguagePrompt && (
                <LanguagePrompt onConfirm={() => setShowLanguagePrompt(false)} />
            )}
            <Header />
            <main>
                <Hero />
                <AboutUs />
                <CreatorFit />
                <HowItWorks />
                <CreatorForm />
                <MembershipSubscription />
                <FAQSection />
            </main>
            <Footer />
        </>
    );
}

export default App;
