
import React from 'react';
import '../types';
import { Link } from 'react-router-dom';
import { AnimatedSection, AnimatedCounter } from '../components/AnimatedComponents';
import { InteractiveMap } from '../components/InteractiveMap';
import type { Industry, Tender } from '../types';
import { getIndustries, getTenders, getSettings } from '../services/api';
import { useLanguage } from '../hooks/useLanguage';
import { MILESTONES, NEWS_ARTICLES, PARTNERS, CERTIFICATIONS } from '../constants';
import { ThreeDContainer, Industry3D, UAVModel, TechShape } from '../components/ThreeDComponents';

// --- Section Wrapper ---
const Section: React.FC<{ id: string; titleKey?: string; subtitleKey?: string; children: React.ReactNode; className?: string; lightText?: boolean }> = ({ id, titleKey, subtitleKey, children, className = '', lightText = false }) => {
    const { t } = useLanguage();
    const titleClass = lightText ? 'text-white' : 'text-gray-900 dark:text-white';
    const subtitleClass = lightText ? 'text-white/80' : 'text-gray-600 dark:text-white/80';

    return (
        <section id={id} aria-labelledby={`${id}-heading`} className={`py-20 ${className}`}>
            <div className="container mx-auto px-6">
                {(titleKey || subtitleKey) && (
                    <AnimatedSection>
                        <div className="text-center max-w-4xl mx-auto mb-12">
                            {titleKey && <h2 id={`${id}-heading`} className={`text-3xl font-bold font-roboto-condensed ${titleClass}`}>{t(titleKey)}</h2>}
                            {subtitleKey && <p className={`mt-2 font-lato ${subtitleClass}`}>{t(subtitleKey)}</p>}
                        </div>
                    </AnimatedSection>
                )}
                {children}
            </div>
        </section>
    );
};

// 1. Hero Section
const HeroSection: React.FC<{ hero?: any }> = ({ hero }) => {
    const { t } = useLanguage();
    
    // Default values if settings not loaded yet
    const title = hero?.title || t('home.hero.title', 'Engineering Excellence for National Defense');
    const subtitle = hero?.subtitle || t('home.hero.subtitle', "DEIG is Ethiopia's leading force in defense technology, innovation, and engineering excellence, driving national self-reliance and industrial modernization.");
    const videoUrl = hero?.videoUrl || "https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4";
    const exploreText = hero?.exploreButtonText || t('home.hero.buttonExplore', 'Explore Our Industries');
    const aboutText = hero?.aboutButtonText || t('home.hero.buttonAbout', 'About DEIG');

    return (
        <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0">
                <video key={videoUrl} autoPlay loop muted playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover opacity-60">
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-brand-blue-500/50 blueprint-overlay"></div>
                
                {/* Floating 3D Background Elements for Hero */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
                    <ThreeDContainer cameraPos={[0, 0, 8]}>
                        <group position={[-6, 3, 0]}>
                            <TechShape type="octahedron" color="#ffffff" />
                        </group>
                        <group position={[6, -3, -2]}>
                            <TechShape type="torus" color="#ffffff" />
                        </group>
                    </ThreeDContainer>
                </div>
            </div>
            <div className="relative z-10 text-center px-4">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-widest font-montserrat animate-track-in">
                    {title}
                </h1>
                <p className="mt-6 text-base md:text-lg font-light max-w-3xl mx-auto font-lato animate-on-scroll is-visible" style={{ animationDelay: '500ms' }}>
                    {subtitle}
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-on-scroll is-visible" style={{ animationDelay: '700ms' }}>
                    <Link to="/industry" className="bg-brand-blue-500 hover:bg-brand-blue-600 text-white font-bold py-3 px-8 rounded-md transition-colors font-roboto-condensed w-full sm:w-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        {exploreText}
                    </Link>
                    <Link to="/about" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-md hover:bg-white hover:text-brand-blue-900 transition-colors duration-300 font-roboto-condensed w-full sm:w-auto">
                        {aboutText}
                    </Link>
                </div>
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
                    <div className="w-1 h-3 bg-white rounded-full animate-bounce"></div>
                </div>
            </div>
        </section>
    );
};

// 2. Who We Are Section
const WhoWeAreSection: React.FC<{ whoWeAre?: any }> = ({ whoWeAre }) => {
    const { t } = useLanguage();
    const miniTimeline = MILESTONES.slice(0, 3);
    
    // Dynamic values from settings
    const title = whoWeAre?.title || t('home.who_we_are.title', 'Who We Are');
    const content = whoWeAre?.content || whoWeAre?.description; // Check both keys from mock
    const imageUrl = whoWeAre?.imageUrl || "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

    return (
         <section id="who-we-are" aria-labelledby="who-we-are-heading" className="py-20 bg-white dark:bg-brand-blue-500/20">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <AnimatedSection>
                        <div className="text-center max-w-4xl mx-auto mb-12">
                            <h2 id="who-we-are-heading" className="text-3xl font-bold text-gray-900 dark:text-white font-roboto-condensed">{title}</h2>
                        </div>
                    </AnimatedSection>
                    <AnimatedSection>
                        {content ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                                <div className="space-y-4 text-gray-700 dark:text-white/90 leading-relaxed font-lato text-lg">
                                    <p>{content}</p>
                                </div>
                                <div className="image-container blueprint-overlay rounded-md">
                                    <img src={imageUrl} alt="DEIG team" className="rounded-md w-full object-cover aspect-video shadow-xl" />
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-roboto-condensed border-l-4 border-brand-blue-500 pl-4">{t('home.who_we_are.mission_vision_title', 'Mission & Vision')}</h3>
                                    <div className="space-y-4 text-gray-700 dark:text-white/90 leading-relaxed font-lato">
                                        <p><strong>{t('home.who_we_are.mission_label', 'Mission')}:</strong> {t('home.who_we_are.mission_text', 'To design, develop, and manufacture high-quality defense equipment and civilian products, ensuring national security and contributing to industrial development.')}</p>
                                        <p><strong>{t('home.who_we_are.vision_label', 'Vision')}:</strong> {t('home.who_we_are.vision_text', 'To be a premier defense industry in Africa, known for technological innovation, quality, and reliability by 2030.')}</p>
                                    </div>
                                </div>
                                <div className="image-container blueprint-overlay rounded-md">
                                    <img src={imageUrl} alt="DEIG team in a strategic meeting" className="rounded-md" />
                                </div>
                            </div>
                        )}
                    </AnimatedSection>
                     <AnimatedSection>
                        <div className="mt-16">
                             <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8 font-roboto-condensed">{t('home.who_we_are.history_title', 'Our Journey')}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                {miniTimeline.map(item => (
                                    <div key={item.year} className="bg-gray-50 dark:bg-brand-blue-500 p-6 rounded-md shadow-lg border-b-4 border-brand-blue-500 dark:border-white/50">
                                        <p className="text-3xl font-bold text-brand-blue-500 dark:text-white font-montserrat">{item.year}</p>
                                        <h4 className="mt-2 font-bold text-gray-900 dark:text-white font-roboto-condensed">{item.event}</h4>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-white/80 font-lato">{item.details}</p>
                                    </div>
                                ))}
                            </div>
                             <div className="text-center mt-8">
                                <Link to="/about" className="group text-brand-blue-500 dark:text-white font-semibold hover:text-opacity-80 transition-colors duration-300 font-roboto-condensed">
                                    {t('home.who_we_are.timeline_link', 'View Full History')} <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">&rarr;</span>
                                </Link>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
};

// 3. Core Capabilities Section
const CoreCapabilitiesSection: React.FC = () => {
    const { t } = useLanguage();
    const capabilities = [
        {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
            title: t('home.capabilities.production_title', 'Military Production'),
            desc: t('home.capabilities.production_desc', 'State-of-the-art manufacturing of armaments, vehicles, and electronics.')
        },
        {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
            title: t('home.capabilities.engineering_title', 'Advanced Engineering'),
            desc: t('home.capabilities.engineering_desc', 'Precision engineering and advanced process optimization.')
        },
        {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>, // Fallback icon for R&D if specific one isn't desired
            title: t('home.capabilities.rd_title', 'Research & Development'),
            desc: t('home.capabilities.rd_desc', 'Driving the future of defense technology through dedicated R&D.')
        },
        {
            icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>,
            title: t('home.capabilities.logistics_title', 'Logistics & MRO'),
            desc: t('home.capabilities.logistics_desc', 'Ensuring operational readiness through robust supply chain management.')
        }
    ];

    return (
        <Section id="core-capabilities" titleKey="home.capabilities.title" subtitleKey="home.capabilities.subtitle" className="bg-brand-blue-500" lightText={true}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {capabilities.map((cap, index) => (
                    <AnimatedSection key={index} delay={index * 100}>
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border-t-4 border-blue-300 h-full group">
                            <div className="bg-blue-50 dark:bg-white/10 w-16 h-16 rounded-full flex items-center justify-center text-brand-blue-500 dark:text-white mb-6 group-hover:scale-110 transition-transform">
                                {cap.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-roboto-condensed">{cap.title}</h3>
                            <p className="text-gray-600 dark:text-white/80 font-lato text-sm leading-relaxed">{cap.desc}</p>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </Section>
    );
};

// 4. Industry Divisions Section
const IndustryCard: React.FC<{ industry: Industry }> = ({ industry }) => {
    const { t } = useLanguage();
    return (
        <div className="group bg-white dark:bg-brand-blue-500 rounded-lg shadow-lg overflow-hidden flex flex-col h-full card-hover-effect border border-gray-100 dark:border-white/20 hover:border-brand-blue-500 dark:hover:border-white transition-all duration-500">
            <div className="image-container blueprint-overlay h-48 relative overflow-hidden">
                <img src={industry.gallery[0]} alt={t(`industries.${industry.id}.name`, industry.name)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                
                {/* 3D Visual on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-brand-blue-900/40 backdrop-blur-sm pointer-events-none">
                    <ThreeDContainer cameraPos={[0, 0, 3]}>
                        <Industry3D industryId={industry.id} color="#ffffff" />
                    </ThreeDContainer>
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-montserrat card-title">{t(`industries.${industry.id}.acronym`, industry.acronym)}</h3>
                <p className="text-gray-600 dark:text-white/80 text-sm font-lato flex-grow line-clamp-3">{t(`industries.${industry.id}.description`, industry.description)}</p>
                <Link to={`/industry/${industry.id}`} className="group inline-block mt-4 text-brand-blue-500 dark:text-white font-semibold hover:text-brand-blue-600 transition-colors duration-300 font-roboto-condensed self-start">
                    {t('common.learnMore', 'Learn More')} <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">&rarr;</span>
                </Link>
            </div>
        </div>
    );
};

const IndustryDivisionsSection: React.FC<{ industries: Industry[] }> = ({ industries }) => {
    const featuredIds = ['haei', 'gaei', 'bveig', 'bpig', 'leeig'];
    const featuredIndustries = industries.filter(ind => featuredIds.includes(ind.id));
    return (
        <Section id="industries" titleKey="home.industries.title" subtitleKey="home.industries.subtitle" className="bg-white dark:bg-brand-blue-500/20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredIndustries.map((industry, index) => (
                    <AnimatedSection key={industry.id} delay={index * 100}>
                        <IndustryCard industry={industry} />
                    </AnimatedSection>
                ))}
            </div>
            <div className="text-center mt-12">
                <Link to="/industry" className="bg-brand-blue-500 hover:bg-brand-blue-600 text-white font-bold py-3 px-8 rounded-md transition-colors font-roboto-condensed shadow-md">
                    View All Industries
                </Link>
            </div>
        </Section>
    );
};

// 5. Procurement Teaser Section (NEW)
const ProcurementTeaserSection: React.FC = () => {
    const [tenders, setTenders] = React.useState<Tender[]>([]);

    React.useEffect(() => {
        getTenders().then((data: Tender[]) => setTenders(data.slice(0, 3)));
    }, []);

    return (
        <section className="py-20 bg-[#F0F7FC] dark:bg-brand-blue-900 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-20 opacity-5">
                <svg className="w-96 h-96" fill="currentColor" viewBox="0 0 24 24"><path d="M19 5h-2V3c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-10-2h6v2H9V3zM5 7h14v14H5V7zm5 3h4v2h-4v-2zm0 4h4v2h-4v-2z" /></svg>
            </div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-1/3">
                        <AnimatedSection>
                            <h2 className="text-3xl font-black text-brand-blue-500 dark:text-white font-montserrat uppercase mb-6">Strategic Supply Chain</h2>
                            <p className="text-lg text-gray-700 dark:text-white/80 font-lato leading-relaxed mb-8">
                                DEIG operates a robust and transparent procurement system. We invite local and international suppliers to join our mission-critical network.
                            </p>
                            <Link to="/procurement" className="inline-block py-4 px-10 bg-brand-blue-500 hover:bg-brand-blue-600 text-white font-bold rounded shadow-xl transition-all font-roboto-condensed uppercase tracking-widest">
                                Supplier Portal
                            </Link>
                        </AnimatedSection>
                    </div>
                    <div className="lg:w-2/3">
                        <AnimatedSection delay={200}>
                            <div className="bg-white dark:bg-brand-blue-500 rounded-xl shadow-2xl p-8 border border-blue-100 dark:border-white/10">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold text-[#1E2B2B] dark:text-white font-montserrat">Latest Open Tenders</h3>
                                    <Link to="/tenders" className="text-xs font-bold text-brand-blue-500 dark:text-white/70 uppercase hover:underline">View All &rarr;</Link>
                                </div>
                                <div className="space-y-4">
                                    {tenders.map((tender, i) => (
                                        <div key={i} className="group p-4 border-l-4 border-brand-blue-500 bg-gray-50 dark:bg-black/20 hover:bg-white dark:hover:bg-white/10 transition-all cursor-pointer">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-bold text-brand-blue-900 dark:text-white group-hover:text-brand-blue-500 transition-colors">{tender.title}</h4>
                                                    <p className="text-xs text-gray-500 dark:text-white/60 mt-1 font-mono uppercase">{tender.category} | Ref: {tender.id}</p>
                                                </div>
                                                <span className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded">Due: {new Date(tender.closingDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    ))}
                                    {tenders.length === 0 && <p className="text-gray-400 text-center py-4 italic">No active tenders currently posted.</p>}
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </section>
    );
}

// 6. Innovation Section
const InnovationSection: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section className="py-20 bg-gray-50 dark:bg-transparent overflow-hidden border-t border-gray-200 dark:border-white/10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <AnimatedSection>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-roboto-condensed mb-6 border-l-4 border-brand-blue-500 pl-6">
                                {t('home.capabilities.innovation_title', 'Technology Innovation')}
                            </h2>
                            <p className="text-lg text-gray-700 dark:text-white/90 font-lato leading-relaxed mb-6">
                                DEIG is not just about manufacturing; we are about pioneering the future. Our Research & Innovation Group (RIG) operates at the bleeding edge of defense technology, developing indigenous solutions in:
                            </p>
                            <ul className="space-y-4 mb-8">
                                {[
                                    'Artificial Intelligence & Autonomous Systems',
                                    'Advanced Cyber-Security Protocols',
                                    'Composite Material Science',
                                    'Unmanned Aerial Systems (UAVs)'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center text-gray-700 dark:text-white font-semibold">
                                        <svg className="w-5 h-5 text-brand-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/industry/rig" className="text-brand-blue-500 font-bold uppercase tracking-wider hover:underline font-roboto-condensed">
                                Explore R&D Division &rarr;
                            </Link>
                        </AnimatedSection>
                    </div>
                    <div className="lg:w-1/2">
                        <AnimatedSection delay={200}>
                            <div className="relative rounded-lg overflow-hidden shadow-2xl">
                                <img src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Innovation Lab" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-brand-blue-500/20 mix-blend-overlay"></div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </section>
    );
};

// 7. Featured Product 3D Section
const FeaturedProductSection: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section className="py-0 bg-brand-blue-900 text-white overflow-hidden relative border-t border-white/10">
             {/* Background Grid */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center min-h-[600px]">
                    <div className="lg:w-1/2 py-20 z-10">
                        <AnimatedSection>
                            <span className="inline-block py-1 px-3 border border-brand-blue-500 bg-brand-blue-500/20 rounded-full text-brand-blue-500 text-xs font-bold tracking-widest uppercase mb-6">
                                {t('home.featured.badge', 'Flagship Technology')}
                            </span>
                            <h2 className="text-4xl md:text-6xl font-black font-montserrat leading-tight mb-6">
                                {t('home.featured.title', 'Simien II UAV Platform')}
                            </h2>
                            <p className="text-lg text-white/80 font-lato leading-relaxed max-w-xl mb-8">
                                {t('home.featured.desc', 'Experience the pinnacle of autonomous surveillance technology. The Simien II features advanced avionics, long-endurance flight capability, and real-time encrypted data transmission.')}
                            </p>
                            <div className="flex gap-4">
                                <Link to="/industry/aei" className="bg-brand-blue-500 hover:bg-brand-blue-600 text-white font-bold py-3 px-8 rounded-md transition-colors font-roboto-condensed shadow-lg">
                                    {t('home.featured.cta', 'View Specifications')}
                                </Link>
                            </div>
                        </AnimatedSection>
                    </div>
                    <div className="lg:w-1/2 h-[500px] w-full relative z-10">
                        <AnimatedSection delay={200} className="h-full">
                            <ThreeDContainer cameraPos={[0, 0, 5]} interactive={true}>
                                <UAVModel color="#ffffff" />
                            </ThreeDContainer>
                             {/* Overlay for interaction hint */}
                            <div className="absolute bottom-4 right-4 pointer-events-none">
                                <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest">
                                    <svg className="w-5 h-5 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                    Interactive 3D
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </section>
    );
};

// 8. Stats Section
const StatsSection: React.FC<{ stats?: any[] }> = ({ stats }) => {
    const defaultStats = [
        { label: 'Employees', value: 5000, suffix: '+' },
        { label: 'Production Units', value: 12, suffix: '' },
        { label: 'Years of Experience', value: 13, suffix: '' },
        { label: 'Patents', value: 25, suffix: '+' }
    ];

    const displayStats = stats || defaultStats;

    return (
        <section className="py-20 bg-brand-blue-500 text-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {displayStats.map((stat, index) => (
                        <AnimatedSection key={index} delay={index * 100}>
                            <div className="p-4">
                                <div className="text-4xl md:text-5xl font-black font-montserrat text-white/90">
                                    <AnimatedCounter end={stat.value} />{stat.suffix}
                                </div>
                                <p className="mt-2 text-sm md:text-base font-roboto-condensed text-brand-blue-50 uppercase tracking-wide">{stat.label}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

// 9. Map Section
const MapSection: React.FC = () => {
    return (
        <Section id="locations" titleKey="home.map.title" subtitleKey="home.map.subtitle" className="bg-white dark:bg-brand-blue-500/20">
            <InteractiveMap />
        </Section>
    );
};

// 10. Partners Section
const PartnersSection: React.FC = () => {
    const { t } = useLanguage();
    
    const getLogoUrl = (url: string) => {
        if (url && url.startsWith('http')) return url;
        // Fallback for any broken or relative URLs
        return `https://images.pexels.com/photos/4014919/pexels-photo-4014919.jpeg?auto=compress&cs=tinysrgb&w=150`;
    };

    return (
        <section className="py-16 bg-white dark:bg-brand-blue-900 border-y border-gray-100 dark:border-brand-blue-800">
            <div className="container mx-auto px-6">
                <div className="text-center mb-10">
                    <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-brand-blue-400">
                        {t('home.partners.title', 'Trusted Partners & Certifications')}
                    </h3>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 grayscale opacity-50 hover:opacity-100 transition-all duration-700">
                    {[...PARTNERS, ...CERTIFICATIONS].slice(0, 6).map((item, index) => (
                        <div key={index} className="flex items-center justify-center transform hover:scale-110 transition-transform duration-300" title={item.name}>
                            <img 
                                src={getLogoUrl(item.logoUrl)} 
                                alt={item.name} 
                                className="h-8 md:h-10 w-auto object-contain" 
                                loading="lazy"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://images.pexels.com/photos/4014919/pexels-photo-4014919.jpeg?auto=compress&cs=tinysrgb&w=150`;
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// 11. News Preview Section
const NewsPreviewSection: React.FC = () => {
    const { t, language } = useLanguage();
    const latestNews = NEWS_ARTICLES.slice(0, 3);

    return (
        <Section id="latest-news" titleKey="header.news" className="bg-white dark:bg-brand-blue-500/20">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {latestNews.map((article, index) => {
                    const title = (language === 'am' && article.titleAm) ? article.titleAm : article.title;
                    const excerpt = (language === 'am' && article.excerptAm) ? article.excerptAm : article.excerpt;
                    return (
                        <AnimatedSection key={article.id} delay={index * 100}>
                            <div className="bg-gray-50 dark:bg-brand-blue-500 rounded-lg shadow-lg overflow-hidden h-full flex flex-col border border-gray-100 dark:border-white/20 hover:shadow-xl transition-shadow">
                                <div className="h-48 overflow-hidden relative">
                                    <img src={article.imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                                    <div className="absolute top-0 right-0 bg-brand-blue-500 text-white text-xs font-bold px-3 py-1 m-2 rounded-full uppercase">{article.category}</div>
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <p className="text-xs text-gray-500 dark:text-gray-200 font-mono mb-2">{article.date}</p>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-roboto-condensed line-clamp-2">{title}</h3>
                                    {/* Safe fallback for HTML content stripping */}
                                    <p className="text-gray-600 dark:text-white/80 text-sm mb-4 line-clamp-3 font-lato flex-grow">{excerpt.replace(/<[^>]+>/g, '')}</p>
                                    <Link to={`/news/${article.id}`} className="text-brand-blue-600 dark:text-white font-bold text-sm hover:underline mt-auto inline-flex items-center">
                                        {t('common.readMore', 'Read More')} <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                    </Link>
                                </div>
                            </div>
                        </AnimatedSection>
                    );
                })}
            </div>
             <div className="text-center mt-10">
                <Link to="/news" className="inline-block border-2 border-brand-blue-500 dark:border-white text-brand-blue-500 dark:text-white hover:bg-brand-blue-500 hover:text-white dark:hover:bg-white dark:hover:text-brand-blue-500 font-bold py-3 px-8 rounded-md transition-colors font-roboto-condensed">
                    {t('home.news.viewAll', 'View All News')}
                </Link>
            </div>
        </Section>
    );
};

// 12. Call to Action
const CTASection: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section className="py-24 bg-brand-blue-500 text-white text-center relative overflow-hidden">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <AnimatedSection>
                    <h2 className="text-4xl md:text-5xl font-black font-montserrat mb-6 underline decoration-white/20 underline-offset-8">
                        {t('home.cta.title', 'Ready to Collaborate?')}
                    </h2>
                    <p className="text-xl max-w-2xl mx-auto font-lato mb-10 text-white/90">
                        {t('home.cta.subtitle', 'Whether you are looking to supply, partner, or build a career in defense engineering, DEIG is your platform for growth.')}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link to="/procurement" className="bg-white text-[#1075BB] hover:bg-gray-100 font-bold py-4 px-10 rounded-md shadow-xl transition-all transform hover:-translate-y-1 font-roboto-condensed uppercase tracking-wider">
                            {t('home.cta.supplier', 'Supplier Registration')}
                        </Link>
                        <Link to="/vacancy" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1075BB] font-bold py-4 px-10 rounded-md transition-all font-roboto-condensed uppercase tracking-wider">
                            {t('home.cta.careers', 'Join Our Team')}
                        </Link>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}

// --- Main Page Component ---
const HomePage: React.FC = () => {
    const [industries, setIndustries] = React.useState<Industry[]>([]);
    const [settings, setSettings] = React.useState<any>(null);
    
    React.useEffect(() => {
        const fetchContent = async () => {
            try {
                const [industriesData, settingsData] = await Promise.all([
                    getIndustries(),
                    getSettings()
                ]);
                setIndustries(industriesData);
                setSettings(settingsData);
            } catch (error) {
                console.error("Failed to fetch home page content", error);
            }
        };
        fetchContent();
    }, []);

    return (
        <div className="bg-white dark:bg-brand-blue-900 transition-colors duration-500">
            <HeroSection hero={settings?.homeHero} />
            <WhoWeAreSection whoWeAre={settings?.whoWeAre} />
            <CoreCapabilitiesSection />
            <IndustryDivisionsSection industries={industries} />
            <ProcurementTeaserSection />
            <InnovationSection />
            <FeaturedProductSection />
            <StatsSection stats={settings?.homeStats} />
            <MapSection />
            <PartnersSection />
            <NewsPreviewSection />
            <CTASection />
        </div>
    );
};

export default HomePage;
