import React from 'react';
import {
    Camera,
    Film,
    MonitorPlay,
    Code,
    PenTool,
    Layout,
    Layers,
    Lightbulb,
    Users,
    Target,
    Rocket,
    Briefcase,
    Scale,
    GraduationCap,
    Cpu,
    Video,
    MessageSquare,
    Play
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CreatorsLab() {
    const { t } = useLanguage();

    return (
        <main className="w-full bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-charcoal text-white py-24 px-6 sm:px-12 lg:px-24">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-saffron rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-india-green rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                </div>
                <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-saffron text-sm font-semibold tracking-wider uppercase border border-white/20 backdrop-blur-sm">
                        Initiative Overview
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                        Content Creator Labs: Building India's <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron to-blue-400">Future-Ready</span> Creative Ecosystem
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
                        Instead of limiting creative education to theory, students should have the opportunity to learn by creating.
                    </p>
                </div>
            </section>

            {/* Intro Section */}
            <section className="py-20 px-6 sm:px-12 lg:px-24 max-w-6xl mx-auto text-lg text-charcoal/80 space-y-6">
                <p>
                    India's digital and creative economy is growing rapidly. Young people are no longer only consuming content—they are creating videos, podcasts, animations, games, digital stories, educational content, and other forms of media.
                </p>
                <p>
                    The growing importance of the creator economy has created a need for structured training, professional infrastructure, access to technology, and industry-oriented learning. In this context, Content Creator Labs can play an important role in preparing students and young creators for the future.
                </p>
                <div className="p-8 mt-8 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-saffron/5 border-l-4 border-l-saffron">
                    <h3 className="text-2xl font-bold text-charcoal mb-4 flex items-center gap-3">
                        <GraduationCap className="w-8 h-8 text-saffron" />
                        What is a Content Creator Lab?
                    </h3>
                    <p>
                        A Content Creator Lab is a dedicated, hands-on learning space where students and aspiring creators gain practical experience in digital content creation, storytelling, media production, animation, gaming, visual effects, branding, and emerging technologies.
                    </p>
                    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        {['Hands-on learning', 'Experimentation', 'Creativity', 'Collaboration', 'Project-based learning', 'Technology', 'Portfolio development', 'Industry-oriented skills'].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm font-semibold text-charcoal/90">
                                <Target className="w-4 h-4 text-india-green" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* AVGC and Government Focus */}
            <section className="py-20 bg-charcoal text-white">
                <div className="px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold">Government Focus on the Creator & Orange Economy</h2>
                        <p className="text-gray-300 text-lg">
                            The Union Budget 2026–27 brought significant attention to India's growing creative and digital economy, highlighting the <strong>Orange Economy</strong>—sectors that generate economic value through creativity, knowledge, innovation, and intellectual property.
                        </p>
                        <p className="text-gray-300 text-lg">
                            The Finance Minister has announced support for the development of AVGC Content Creator Labs across educational institutions (15,000 secondary schools and 500 colleges).
                        </p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-saffron/50 transition-colors duration-500">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-saffron/20 rounded-full mix-blend-screen filter blur-2xl group-hover:bg-saffron/40 transition-all"></div>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-saffron">
                            <Layers className="w-7 h-7" /> What is AVGC-XR?
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { title: 'Animation & Visual Effects', icon: <Film className="w-5 h-5 text-gray-400" /> },
                                { title: 'Gaming & Comics', icon: <Play className="w-5 h-5 text-gray-400" /> },
                                { title: 'Virtual Reality (VR)', icon: <MonitorPlay className="w-5 h-5 text-gray-400" /> },
                                { title: 'Augmented Reality (AR)', icon: <Layers className="w-5 h-5 text-gray-400" /> },
                                { title: 'Immersive Experiences', icon: <Lightbulb className="w-5 h-5 text-gray-400" /> }
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-4 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors">
                                    {item.icon}
                                    <span className="font-medium">{item.title}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Core Components Grid */}
            <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl font-extrabold text-charcoal">Core Components of a Content Creator Lab</h2>
                    <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">A well-designed Content Creator Lab can be organised around several specialized learning areas.</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { title: 'Storytelling & Creative', desc: 'Story development, scriptwriting, copywriting, visual storytelling, and creative research.', icon: <PenTool className="w-8 h-8" /> },
                        { title: 'Media Production', desc: 'Cameras, mobile production, microphones, lighting, green screens, podcasting, and video systems.', icon: <Camera className="w-8 h-8" /> },
                        { title: 'Editing & Post-Production', desc: 'Video and audio editing, motion graphics, graphic design, colour correction, and basic visual effects.', icon: <Layout className="w-8 h-8" /> },
                        { title: 'Animation & VFX', desc: '2D/3D animation, modelling, character design, digital environments, and rendering techniques.', icon: <Video className="w-8 h-8" /> },
                        { title: 'Gaming & Interactive', desc: 'Game design, level design, interactive storytelling, game engines, and user experience.', icon: <Cpu className="w-8 h-8" /> },
                        { title: 'Comics & Digital Storytelling', desc: 'Comic writing, storyboarding, illustration, digital publishing, and visual communication.', icon: <MessageSquare className="w-8 h-8" /> },
                        { title: 'AI & Emerging Tech', desc: 'Responsible use of AI for ideation, design assistance, audio enhancement, and productivity.', icon: <Code className="w-8 h-8" /> },
                        { title: 'Digital Marketing', desc: 'Social media strategy, audience understanding, analytics, community building, and personal branding.', icon: <Users className="w-8 h-8" /> }
                    ].map((component, idx) => (
                        <div key={idx} className="bg-white rounded-3xl p-8 shadow-lg shadow-gray-200/50 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border border-gray-50 group">
                            <div className="w-16 h-16 bg-saffron/10 rounded-2xl flex items-center justify-center text-saffron mb-6 group-hover:scale-110 group-hover:bg-saffron group-hover:text-white transition-all duration-300">
                                {component.icon}
                            </div>
                            <h3 className="text-xl font-bold text-charcoal mb-3">{component.title}</h3>
                            <p className="text-charcoal/70 leading-relaxed">{component.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why It's Important */}
            <section className="py-24 bg-gradient-to-b from-white to-slate-100">
                <div className="px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { title: 'Early Skill Development', desc: 'Begin developing creative and technical skills before entering the workforce.', icon: <Rocket /> },
                            { title: 'Practical Learning', desc: 'Work on real projects such as videos, podcasts, games, and campaigns.', icon: <Target /> },
                            { title: 'Access to Technology', desc: 'Professional cameras, editing systems, and immersive tech in a shared environment.', icon: <MonitorPlay /> },
                            { title: 'Confidence Building', desc: 'Improve communication, presentation, teamwork, and storytelling skills.', icon: <Users /> }
                        ].map((benefit, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-india-green/50 transition-colors">
                                <div className="text-india-green mb-4">{benefit.icon}</div>
                                <h4 className="font-bold text-charcoal mb-2">{benefit.title}</h4>
                                <p className="text-sm text-charcoal/70">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-8">
                        <h2 className="text-4xl font-extrabold text-charcoal leading-tight">Transforming Education Through Creative Learning</h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 mt-1"><Film className="w-6 h-6 text-saffron" /></div>
                                <div>
                                    <h4 className="text-xl font-bold text-charcoal">Learning Through Animation</h4>
                                    <p className="text-charcoal/70 mt-1">Complex subjects like science or mathematics explained through visualization.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 mt-1"><Play className="w-6 h-6 text-saffron" /></div>
                                <div>
                                    <h4 className="text-xl font-bold text-charcoal">Gamified Learning</h4>
                                    <p className="text-charcoal/70 mt-1">Interactive and game-based approaches to make learning more engaging.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 mt-1"><Briefcase className="w-6 h-6 text-saffron" /></div>
                                <div>
                                    <h4 className="text-xl font-bold text-charcoal">Project-Based Education</h4>
                                    <p className="text-charcoal/70 mt-1">Instead of only examinations, students work on projects demonstrating practical skills.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Careers and IP Section */}
            <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-charcoal text-white rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-india-green/20 rounded-full mix-blend-screen filter blur-3xl"></div>
                        <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <Briefcase className="w-8 h-8 text-india-green" />
                            Career Opportunities
                        </h3>
                        <p className="text-gray-300 mb-8">
                            The future creative economy will require more than just traditional employees. It will require freelancers, entrepreneurs, and independent creators.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {['Animation', 'VFX', 'Gaming', 'Media production', 'Digital marketing', 'Graphic design', 'Content strategy', 'Journalism', 'Freelancing'].map((career, idx) => (
                                <span key={idx} className="bg-white/10 px-4 py-2 rounded-full text-sm backdrop-blur-sm border border-white/5">
                                    {career}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-saffron text-white rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full mix-blend-screen filter blur-3xl"></div>
                        <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <Scale className="w-8 h-8 text-white" />
                            IP & Responsibility
                        </h3>
                        <p className="text-saffron-50 mb-8">
                            A modern Content Creator Lab goes beyond technical skills to ensure responsible creation and protection of ideas.
                        </p>
                        <ul className="space-y-4 font-medium text-white/90">
                            <li className="flex items-center gap-3"><Target className="w-5 h-5" /> Copyright & Trademark awareness</li>
                            <li className="flex items-center gap-3"><Target className="w-5 h-5" /> Originality & Intellectual Property Rights</li>
                            <li className="flex items-center gap-3"><Target className="w-5 h-5" /> Fair use & Digital ethics</li>
                            <li className="flex items-center gap-3"><Target className="w-5 h-5" /> Privacy & Online safety</li>
                            <li className="flex items-center gap-3"><Target className="w-5 h-5" /> Responsible use of AI</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Conclusion */}
            <section className="py-24 bg-white border-t border-gray-100 text-center px-6">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h2 className="text-4xl font-extrabold text-charcoal">Building the Future Ecosystem</h2>
                    <p className="text-xl text-charcoal/80 leading-relaxed">
                        Content Creator Labs have the potential to bring practical creative education directly into schools and colleges and make professional opportunities more accessible to young people across different regions of the country.
                    </p>
                    <div className="p-8 bg-slate-50 rounded-2xl inline-block mt-8 shadow-sm">
                        <p className="text-lg font-bold text-charcoal mb-4">The larger objective is to help students:</p>
                        <div className="flex flex-wrap justify-center gap-6 text-charcoal/80">
                            <span className="flex items-center gap-2"><Lightbulb className="w-5 h-5 text-saffron" /> Think creatively</span>
                            <span className="flex items-center gap-2"><MessageSquare className="w-5 h-5 text-saffron" /> Communicate effectively</span>
                            <span className="flex items-center gap-2"><Cpu className="w-5 h-5 text-saffron" /> Use technology confidently</span>
                        </div>
                    </div>
                    <p className="text-lg text-charcoal/60 mt-12 italic">
                        "India has the talent, the young population, the growing digital infrastructure, and an expanding creative economy. The next challenge is to create spaces where young people can transform their ideas into skills, skills into opportunities, and opportunities into sustainable careers."
                    </p>
                </div>
            </section>
        </main>
    );
}
