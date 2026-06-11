import { useLanguage } from '../context/LanguageContext';

function AboutUs() {
    const { t } = useLanguage();
    const founders = [
        {
            name: 'Pavan Kumar',
            role: 'Managing Director',
            image: '/founders/pavan-kumar.jpeg',
            bio: 'Pavan is a veteran in the field and is passionate about helping creators build sustainable careers. He has a track record of building creator-focused platforms and communities that prioritize growth and support.'
        },
        {
            name: 'Shubhankar Pandey',
            role: 'Operations Head',
            image: '/founders/shubhankar-pandey.jpeg',
            bio: 'Shubhankar has a background in operations and community management within the creator economy. He is passionate about building creator-first systems that prioritize growth and support.'
        },
        {
            name: 'Arya Pandey',
            role: 'Technical Head',
            image: '/founders/arya-pandey.jpeg',
            bio: 'Arya is a product and engineering leader with experience building creator platforms and tools. He is passionate about creating technology that empowers creators to grow their careers.'
        },
        {
            name: 'Shubham Pandey',
            role: 'Legal Head',
            image: '/founders/shubham-pandey.jpeg',
            bio: 'Shubham is a legal expert with a focus on creator rights and compliance. He has helped numerous creators navigate the legal aspects of their careers.'
        },
        {
            name: 'Shiv Kumar',
            role: 'Marketing Lead',
            image: '/founders/shiv-kumar.jpeg',
            bio: 'Shiv is a marketing strategist with experience in digital campaigns and creator branding. He has worked with creators to amplify their reach and connect them with their audiences.'
        },
        {
            name: 'Sonu Kumar Dubey',
            role: 'Communications Lead',
            image: '/founders/sonu-kumar-dubey.jpeg',
            bio: 'Sonu is a communications expert with a background in PR and content strategy. He has worked closely with creators to amplify their voices and connect them with their audiences.'
        }
    ];

    return (
        <section className="py-24 fade-in-section" id="about">
            <div className="max-w-5xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-extrabold mb-6 text-charcoal">{t('aboutUs.title')}</h2>
                        <div className="space-y-6 text-charcoal/70 leading-relaxed">
                            <p>
                                {t('aboutUs.intro1')}
                            </p>
                            <p>
                                {t('aboutUs.intro2')}
                            </p>
                            <p>
                                {t('aboutUs.intro3')}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div className="p-10 rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200">
                            <h3 className="text-2xl font-extrabold mb-4 text-charcoal">{t('aboutUs.mission')}</h3>
                            <p className="text-charcoal/70">
                                {t('aboutUs.missionDesc')}
                            </p>
                        </div>
                        <div className="p-10 rounded-3xl bg-gradient-to-br from-blue-50/50 to-white border border-charcoal/5">
                            <h3 className="text-2xl font-extrabold mb-4 text-charcoal">{t('aboutUs.whyExist')}</h3>
                            <p className="text-charcoal/70">
                                {t('aboutUs.whyExistDesc')}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-20 pt-20 border-t border-charcoal/5">
                    <h3 className="text-3xl font-extrabold mb-12 text-center text-charcoal">{t('aboutUs.whatWeOffer')}</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-3xl text-blue-600">handshake</span>
                            </div>
                            <h4 className="text-lg font-bold mb-3 text-charcoal">{t('aboutUs.brandPartnerships')}</h4>
                            <p className="text-charcoal/60">
                                {t('aboutUs.brandPartnershipsDesc')}
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-3xl text-blue-600">school</span>
                            </div>
                            <h4 className="text-lg font-bold mb-3 text-charcoal">{t('aboutUs.professionalDevelopment')}</h4>
                            <p className="text-charcoal/60">
                                {t('aboutUs.professionalDevelopmentDesc')}
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-3xl text-blue-600">groups</span>
                            </div>
                            <h4 className="text-lg font-bold mb-3 text-charcoal">{t('aboutUs.communitySupport')}</h4>
                            <p className="text-charcoal/60">
                                {t('aboutUs.communitySupportDesc')}
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-3xl text-blue-600">gavel</span>
                            </div>
                            <h4 className="text-lg font-bold mb-3 text-charcoal">{t('aboutUs.legalHelp')}</h4>
                            <p className="text-charcoal/60">
                                {t('aboutUs.legalHelpDesc')}
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-3xl text-blue-600">map</span>
                            </div>
                            <h4 className="text-lg font-bold mb-3 text-charcoal">{t('aboutUs.regionalDirectory')}</h4>
                            <p className="text-charcoal/60">
                                {t('aboutUs.regionalDirectoryDesc')}
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-3xl text-blue-600">campaign</span>
                            </div>
                            <h4 className="text-lg font-bold mb-3 text-charcoal">{t('aboutUs.campaignSupport')}</h4>
                            <p className="text-charcoal/60">
                                {t('aboutUs.campaignSupportDesc')}
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-3xl text-blue-600">payments</span>
                            </div>
                            <h4 className="text-lg font-bold mb-3 text-charcoal">{t('aboutUs.revenueGuidance')}</h4>
                            <p className="text-charcoal/60">
                                {t('aboutUs.revenueGuidanceDesc')}
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-3xl text-blue-600">diversity_3</span>
                            </div>
                            <h4 className="text-lg font-bold mb-3 text-charcoal">{t('aboutUs.collaborationCircles')}</h4>
                            <p className="text-charcoal/60">
                                {t('aboutUs.collaborationCirclesDesc')}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-20 border-t border-charcoal/5">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-extrabold text-charcoal mb-4">Meet the Founders</h3>
                        <p className="text-charcoal/60 max-w-2xl mx-auto">
                            C3A is led by a team deeply rooted in the creator economy, with a shared mission to build fair and growth-focused opportunities for creators.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {founders.map((founder) => (
                            <article key={founder.name} className="bg-white border border-charcoal/5 rounded-3xl p-8 shadow-sm">
                                <div className="flex flex-col sm:flex-row gap-6 items-start">
                                    <img
                                        src={founder.image}
                                        alt={founder.name}
                                        className="w-24 h-24 rounded-lg object-cover border border-charcoal/10"
                                        loading="lazy"
                                    />
                                    <div>
                                        <h4 className="text-2xl font-extrabold text-charcoal mb-1">{founder.name}</h4>
                                        <p className="text-blue-600 font-semibold mb-4">{founder.role}</p>
                                        <p className="text-charcoal/70 leading-relaxed">{founder.bio}</p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutUs;
