import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import ValueProps from './components/ValueProps';
import CreatorFit from './components/CreatorFit';
import HowItWorks from './components/HowItWorks';
import CreatorForm from './components/CreatorForm';
import MembershipSubscription from './components/MembershipSubscription';
import Footer from './components/Footer';

function App() {
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

    return (
        <>
            <Header />
            <main>
                <Hero />
                <AboutUs />
                <ValueProps />
                <CreatorFit />
                <HowItWorks />
                <CreatorForm />
                <MembershipSubscription />
            </main>
            <Footer />
        </>
    );
}

export default App;
