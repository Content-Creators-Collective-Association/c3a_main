function AboutUs() {
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
                        <h2 className="text-4xl font-extrabold mb-6 text-charcoal">About C3A</h2>
                        <div className="space-y-6 text-charcoal/70 leading-relaxed">
                            <p>
                                C3A® stands for Content Creators Collective Association - a platform built by creators, for creators. We are not an outside agency looking in; we are people from the creator journey building the support system we wished we had.
                            </p>
                            <p>
                                We were founded on one belief: creators grow faster when they grow together. C3A exists to give creators a home where knowledge is shared openly, wins are celebrated together, and opportunities are distributed fairly.
                            </p>
                            <p>
                                Too many creators build alone and burn out in silence. At C3A, you are part of a collective that understands your challenges, values your voice, and helps you build a long-term career with dignity.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div className="p-10 rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200">
                            <h3 className="text-2xl font-extrabold mb-4 text-charcoal">Our Mission</h3>
                            <p className="text-charcoal/70">
                                To build the most trusted creator-first ecosystem where every member feels seen, supported, and connected to real growth opportunities.
                            </p>
                        </div>
                        <div className="p-10 rounded-3xl bg-gradient-to-br from-blue-50/50 to-white border border-charcoal/5">
                            <h3 className="text-2xl font-extrabold mb-4 text-charcoal">Why We Exist</h3>
                            <p className="text-charcoal/70">
                                Because creators deserve more than transactions. They deserve a community that backs them, mentors that guide them, and a platform where they belong regardless of where they are in their journey.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-20 pt-20 border-t border-charcoal/5">
                    <h3 className="text-3xl font-extrabold mb-12 text-center text-charcoal">What We Offer</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-3xl text-blue-600">handshake</span>
                            </div>
                            <h4 className="text-lg font-bold mb-3 text-charcoal">Brand Partnerships</h4>
                            <p className="text-charcoal/60">
                                Direct access to carefully curated brand partnership opportunities aligned with your content and values.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-3xl text-blue-600">school</span>
                            </div>
                            <h4 className="text-lg font-bold mb-3 text-charcoal">Professional Development</h4>
                            <p className="text-charcoal/60">
                                Workshops, mentorship, and resources to help you grow your channel and monetization strategies.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-3xl text-blue-600">groups</span>
                            </div>
                            <h4 className="text-lg font-bold mb-3 text-charcoal">Community Support</h4>
                            <p className="text-charcoal/60">
                                Connect with fellow creators, share insights, and collaborate on projects within our thriving community.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-3xl text-blue-600">gavel</span>
                            </div>
                            <h4 className="text-lg font-bold mb-3 text-charcoal">Legal Help Team</h4>
                            <p className="text-charcoal/60">
                                Get creator-focused guidance on contracts, usage rights, brand terms, and dispute support from our legal help team.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-3xl text-blue-600">map</span>
                            </div>
                            <h4 className="text-lg font-bold mb-3 text-charcoal">Regional Creators Directory</h4>
                            <p className="text-charcoal/60">
                                Discover and collaborate with impact creators by language and region through our curated regional creators directory.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-3xl text-blue-600">campaign</span>
                            </div>
                            <h4 className="text-lg font-bold mb-3 text-charcoal">Campaign Production Support</h4>
                            <p className="text-charcoal/60">
                                End-to-end assistance for planning, scripting, and delivering creator-brand campaigns with stronger storytelling and impact.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-3xl text-blue-600">payments</span>
                            </div>
                            <h4 className="text-lg font-bold mb-3 text-charcoal">Revenue & Tax Guidance</h4>
                            <p className="text-charcoal/60">
                                Practical guidance on invoicing, payment workflows, and creator income basics so you can grow with financial clarity.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-3xl text-blue-600">diversity_3</span>
                            </div>
                            <h4 className="text-lg font-bold mb-3 text-charcoal">Collaboration Circles</h4>
                            <p className="text-charcoal/60">
                                Curated peer groups where creators co-create, exchange feedback, and launch mission-aligned projects together.
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
