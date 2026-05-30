import { useLanguage } from '../context/LanguageContext';

function FAQSection() {
    const { t } = useLanguage();
    const faqs = [
        {
            questionKey: 'faq.q1',
            answerKey: 'faq.a1'
        },
        {
            questionKey: 'faq.q2',
            answerKey: 'faq.a2'
        },
        {
            questionKey: 'faq.q3',
            answerKey: 'faq.a3'
        },
        {
            questionKey: 'faq.q4',
            answerKey: 'faq.a4'
        },
        {
            questionKey: 'faq.q5',
            answerKey: 'faq.a5'
        }
    ];

    return (
        <section className="py-24 fade-in-section" id="faqs">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-14">
                    <h2 className="text-4xl font-extrabold mb-4 text-charcoal">{t('faq.title')}</h2>
                    <p className="text-charcoal/60 text-lg">
                        {t('faq.subtitle')}
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((item, index) => (
                        <details
                            key={index}
                            className="group bg-white border border-charcoal/10 rounded-2xl p-6 open:border-blue-200 open:shadow-sm"
                        >
                            <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                                <span className="text-charcoal font-bold text-lg">{t(item.questionKey)}</span>
                                <span className="material-symbols-outlined text-charcoal/40 group-open:rotate-45 transition-transform">
                                    add
                                </span>
                            </summary>
                            <p className="text-charcoal/70 mt-4 leading-relaxed">{t(item.answerKey)}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQSection;
