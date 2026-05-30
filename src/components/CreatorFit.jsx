import { useLanguage } from '../context/LanguageContext';

function CreatorFit() {
    const { t } = useLanguage();
    return (
        <section className="py-24 bg-charcoal text-white rounded-[3rem] mx-6 fade-in-section" id="qualify">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-extrabold mb-8">{t('creatorFit.title')}</h2>
                        <p className="text-white/60 text-lg mb-12">
                            {t('creatorFit.description')}
                        </p>
                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <span className="material-symbols-outlined text-blue-600">check_circle</span>
                                <div>
                                    <p className="font-bold text-lg">{t('creatorFit.purposeDriven')}</p>
                                    <p className="text-white/50 text-sm">{t('creatorFit.purposeDrivenDesc')}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="material-symbols-outlined text-blue-600">check_circle</span>
                                <div>
                                    <p className="font-bold text-lg">{t('creatorFit.originalVoice')}</p>
                                    <p className="text-white/50 text-sm">{t('creatorFit.originalVoiceDesc')}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="material-symbols-outlined text-blue-600">check_circle</span>
                                <div>
                                    <p className="font-bold text-lg">{t('creatorFit.communityLeadership')}</p>
                                    <p className="text-white/50 text-sm">{t('creatorFit.communityLeadershipDesc')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-12 rounded-[2.5rem] bg-white/5 border border-white/10">
                        <h3 className="text-2xl font-bold mb-8 opacity-80">{t('creatorFit.ourCriteria')}</h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between py-4 border-b border-white/10">
                                <span className="text-white/70">{t('creatorFit.socialImpact')}</span>
                                <span className="font-bold">{t('creatorFit.socialImpactValue')}</span>
                            </div>
                            <div className="flex items-center justify-between py-4 border-b border-white/10">
                                <span className="text-white/70">{t('creatorFit.authenticity')}</span>
                                <span className="font-bold">{t('creatorFit.authenticityValue')}</span>
                            </div>
                            <div className="flex items-center justify-between py-4 border-b border-white/10">
                                <span className="text-white/70">{t('creatorFit.communityValues')}</span>
                                <span className="font-bold">{t('creatorFit.communityValuesValue')}</span>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <span className="text-white/70">{t('creatorFit.applicationStatus')}</span>
                                <span className="text-blue-600 font-bold">{t('creatorFit.applicationStatusValue')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CreatorFit;
