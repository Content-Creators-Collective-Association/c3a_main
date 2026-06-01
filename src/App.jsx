import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import CreatorFit from './components/CreatorFit';
import HowItWorks from './components/HowItWorks';
import CreatorForm from './components/CreatorForm';
import MembershipSubscription from './components/MembershipSubscription';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import LanguagePrompt from './components/LanguagePrompt';
import AuthPage from './components/AuthPage';
import CreatorsLab from './components/CreatorsLab';
import Merchandise from './components/Merchandise';
import { useLandingPageEffects } from './hooks/useLandingPageEffects';

function LandingPage() {
    const { showLanguagePrompt, hideLanguagePrompt } = useLandingPageEffects();

    return (
        <>
            {showLanguagePrompt && (
                <LanguagePrompt onConfirm={hideLanguagePrompt} />
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

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/creators-lab" element={<><Header /><CreatorsLab /><Footer/></>} />
            <Route path="/merchandise" element={<><Header /><Merchandise /><Footer/></>} />
            <Route path="/auth" element={<AuthPage />} />
        </Routes>
    );
}

export default App;
