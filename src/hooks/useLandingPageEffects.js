import { useEffect, useState } from 'react';
import { LANGUAGE_STORAGE_KEY } from '../components/LanguagePrompt';

export function useLandingPageEffects() {
    const [showLanguagePrompt, setShowLanguagePrompt] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        const sections = document.querySelectorAll('.fade-in-section');
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
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

    return {
        showLanguagePrompt,
        hideLanguagePrompt: () => setShowLanguagePrompt(false)
    };
}