function FAQSection() {
    const faqs = [
        {
            question: 'Who can apply to join C3A?',
            answer:
                'Any creator focused on authentic content and positive social impact can apply, regardless of follower count.'
        },
        {
            question: 'How long does the application review take?',
            answer:
                'Most applications are reviewed within 5 business days. You will be contacted by our team with the next steps.'
        },
        {
            question: 'Do you support regional-language creators?',
            answer:
                'Yes. C3A actively supports creators across Indian languages and regions through community and collaboration opportunities.'
        },
        {
            question: 'What kind of support does C3A provide?',
            answer:
                'Members get access to partnerships, growth resources, legal help guidance, and a creator-first support network.'
        },
        {
            question: 'Can I upgrade my membership later?',
            answer:
                'Yes. You can start with Starter and become eligible for Professional and Elite based on membership duration requirements.'
        }
    ];

    return (
        <section className="py-24 fade-in-section" id="faqs">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-14">
                    <h2 className="text-4xl font-extrabold mb-4 text-charcoal">Frequently Asked Questions</h2>
                    <p className="text-charcoal/60 text-lg">
                        Quick answers to common questions from creators joining C3A.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((item) => (
                        <details
                            key={item.question}
                            className="group bg-white border border-charcoal/10 rounded-2xl p-6 open:border-blue-200 open:shadow-sm"
                        >
                            <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                                <span className="text-charcoal font-bold text-lg">{item.question}</span>
                                <span className="material-symbols-outlined text-charcoal/40 group-open:rotate-45 transition-transform">
                                    add
                                </span>
                            </summary>
                            <p className="text-charcoal/70 mt-4 leading-relaxed">{item.answer}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQSection;
