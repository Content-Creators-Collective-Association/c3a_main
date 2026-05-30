import { useLanguage } from '../context/LanguageContext';

function HowItWorks() {
    const { t } = useLanguage();
    return (
        <section className="py-24 fade-in-section" id="how-it-works">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-extrabold mb-6 text-charcoal">{t('howItWorks.title')}</h2>
                    <p className="text-charcoal/60 text-lg">{t('howItWorks.subtitle')}</p>
                </div>
                <div className="grid md:grid-cols-4 gap-12">
                    <div>
                        <div className="text-saffron font-extrabold text-5xl mb-6 opacity-20">01</div>
                        <h4 className="text-xl font-extrabold mb-3">{t('howItWorks.step1')}</h4>
                        <p className="text-charcoal/60 leading-relaxed text-sm">
                            {t('howItWorks.step1Desc')}
                        </p>
                    </div>
                    <div>
                        <div className="text-saffron font-extrabold text-5xl mb-6 opacity-20">02</div>
                        <h4 className="text-xl font-extrabold mb-3">{t('howItWorks.step2')}</h4>
                        <p className="text-charcoal/60 leading-relaxed text-sm">
                            {t('howItWorks.step2Desc')}
                        </p>
                    </div>
                    <div>
                        <div className="text-saffron font-extrabold text-5xl mb-6 opacity-20">03</div>
                        <h4 className="text-xl font-extrabold mb-3">{t('howItWorks.step3')}</h4>
                        <p className="text-charcoal/60 leading-relaxed text-sm">
                            {t('howItWorks.step3Desc')}
                        </p>
                    </div>
                    <div>
                        <div className="text-saffron font-extrabold text-5xl mb-6 opacity-20">04</div>
                        <h4 className="text-xl font-extrabold mb-3">{t('howItWorks.step4')}</h4>
                        <p className="text-charcoal/60 leading-relaxed text-sm">
                            {t('howItWorks.step4Desc')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
