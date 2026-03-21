function MembershipSubscription() {
    const subscriptionPlans = [
        {
            name: 'Starter',
            price: '₹10',
            period: '/month',
            description: 'Perfect for emerging creators just starting their journey',
            features: [
                'Access to C3A community',
                'Monthly brand opportunity alerts',
                'Basic analytics dashboard',
                'Email support',
                'Portfolio verification badge'
            ],
            cta: 'Get Started',
            highlighted: false
        },
        {
            name: 'Professional',
            price: '₹60',
            period: '/month',
            description: 'For growing creators looking to scale their impact',
            features: [
                'Everything in Starter',
                'Priority brand partnership access',
                'Advanced analytics & insights',
                'One-on-one strategy consultation (monthly)',
                'Content optimization tools',
                'Priority email & chat support',
                'Exclusive professional network events',
                'Negotiation assistance for contracts'
            ],
            cta: 'Choose Professional',
            highlighted: true
        },
        {
            name: 'Elite',
            price: '₹120',
            period: '/month',
            description: 'For established creators maximizing their growth potential',
            features: [
                'Everything in Professional',
                'Dedicated account manager',
                'White-glove brand placement service',
                'Custom campaign strategy development',
                'Revenue optimization consulting',
                'VIP-only partnership opportunities',
                'Monthly live strategy sessions',
                '24/7 priority support',
                'Legal & contract review support'
            ],
            cta: 'Go Elite',
            highlighted: false
        }
    ];

    return (
        <section className="py-24 fade-in-section" id="membership-subscriptions">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-extrabold mb-6 text-charcoal">
                        Membership <span className="text-blue-600">Subscriptions</span>
                    </h2>
                    <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
                        Choose the plan that fits your creator journey. Scale up anytime as you grow.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
                    {subscriptionPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative rounded-3xl transition-all ${
                                plan.highlighted
                                    ? 'md:scale-105 bg-gradient-to-b from-blue-50 to-white border-2 border-blue-600 shadow-xl shadow-blue-200/40'
                                    : 'bg-white border border-charcoal/5 hover:border-blue-200'
                            }`}
                        >
                            {plan.highlighted && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                                        MOST POPULAR
                                    </span>
                                </div>
                            )}

                            <div className="p-10 h-full flex flex-col">
                                <div className="mb-8">
                                    <h3 className="text-2xl font-extrabold text-charcoal mb-2">{plan.name}</h3>
                                    <p className="text-charcoal/60 text-sm mb-6">{plan.description}</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-extrabold text-charcoal">{plan.price}</span>
                                        <span className="text-charcoal/60">{plan.period}</span>
                                    </div>
                                </div>

                                <button
                                    className={`w-full py-3 rounded-xl font-bold transition-all mb-10 ${
                                        plan.highlighted
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'bg-charcoal text-white hover:bg-black'
                                    }`}
                                >
                                    {plan.cta}
                                </button>

                                <div className="space-y-4 flex-grow">
                                    <p className="text-xs font-bold text-charcoal/40 uppercase tracking-widest mb-6">
                                        What's included
                                    </p>
                                    {plan.features.map((feature, featureIndex) => (
                                        <div key={featureIndex} className="flex gap-3">
                                            <span className="material-symbols-outlined text-blue-600 flex-shrink-0 text-lg">
                                                check_circle
                                            </span>
                                            <p className="text-sm text-charcoal/70">{feature}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 pt-20 border-t border-charcoal/5">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-3xl p-12 text-center">
                        <h3 className="text-2xl font-extrabold mb-4 text-charcoal">
                            Flexible Payment Options
                        </h3>
                        <p className="text-charcoal/60 mb-8 max-w-2xl mx-auto">
                            All plans support monthly and annual billing. Save 20% with annual subscriptions. Cancel anytime with no penalties.
                        </p>
                        <div className="flex flex-col md:flex-row gap-12 justify-center">
                            <div>
                                <p className="text-sm text-charcoal/50 mb-2">Money-Back Guarantee</p>
                                <p className="font-bold text-lg text-charcoal">30 Days</p>
                            </div>
                            <div>
                                <p className="text-sm text-charcoal/50 mb-2">Payment Methods</p>
                                <p className="font-bold text-lg text-charcoal">Cards, UPI, Bank Transfer</p>
                            </div>
                            <div>
                                <p className="text-sm text-charcoal/50 mb-2">Support</p>
                                <p className="font-bold text-lg text-charcoal">24/7 Available</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MembershipSubscription;
