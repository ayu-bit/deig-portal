import React, { useState, useEffect } from 'react';
import { CurrentView, Industry, NewsArticle } from '../types';
import AnimatedSection from '../components/AnimatedSection';
import Lightbox from '../components/Lightbox';
import { useLanguage } from '../contexts/LanguageContext';
import { fetchIndustryById, fetchNews } from '../services/apiService';

// Props
interface IndustryDetailPageProps {
  industryId: string;
  setCurrentView: (view: CurrentView) => void;
}

// Reusable components for this page
const InfoCard: React.FC<{ title: string; icon: React.ReactNode }> = ({ title, icon }) => (
    <div className="bg-surface dark:bg-surfaceDark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex items-center space-x-4 hover:border-primary/30 transition-all duration-300 group">
        <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 flex-shrink-0">
            <div className="w-5 h-5">{icon}</div>
        </div>
        <p className="text-textDark dark:text-textLight font-semibold tracking-tight">{title}</p>
    </div>
);

const ProjectCard: React.FC<{ title: string; description: string; image: string; status: string; }> = ({ title, description, image, status }) => (
    <div className="group bg-surface dark:bg-surfaceDark rounded-3xl shadow-sm overflow-hidden h-full flex flex-col border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
        <div className="image-wrapper h-56 overflow-hidden relative">
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                {status}
            </div>
        </div>
        <div className="p-8 flex flex-col flex-grow">
            <h4 className="text-xl font-bold text-textDark dark:text-textLight mb-3 font-display leading-tight group-hover:text-primary transition-colors">{title}</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{description}</p>
            <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5">
                <span className="font-bold text-primary group-hover:translate-x-2 transition-transform inline-block cursor-pointer">
                    View Details <span className="ml-2">&rarr;</span>
                </span>
            </div>
        </div>
    </div>
);

const DownloadItem: React.FC<{ title: string; fileType: string; fileSize: string; }> = ({ title, fileType, fileSize }) => (
    <a href="#" className="group bg-surface dark:bg-surfaceDark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex items-center justify-between hover:border-primary/30 hover:shadow-md transition-all duration-300">
        <div className="flex items-center space-x-5">
            <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <div>
                <p className="font-bold text-textDark dark:text-textLight group-hover:text-primary transition-colors">{title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mt-1">{fileType} &bull; {fileSize}</p>
            </div>
        </div>
        <div className="w-10 h-10 rounded-full border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:border-primary/30 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
        </div>
    </a>
);


const IndustryDetailPage: React.FC<IndustryDetailPageProps> = ({ industryId, setCurrentView }) => {
    const [industry, setIndustry] = useState<Industry | null>(null);
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [animationDirection, setAnimationDirection] = useState<'next' | 'prev' | 'fade'>('fade');
    const { language, t } = useLanguage();

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [industryData, newsData] = await Promise.all([
                    fetchIndustryById(industryId),
                    fetchNews()
                ]);
                setIndustry(industryData);
                setNews(newsData.filter(n => n.status === 'Published').slice(0, 3));
            } catch (error) {
                console.error("Failed to load industry details:", error);
                setIndustry(null);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [industryId]);
    
    // Helper handlers
    const handleBackClick = () => setCurrentView({ page: 'Industry' });
    const openLightbox = (index: number) => {
        setAnimationDirection('fade');
        setSelectedImageIndex(index);
        setIsLightboxOpen(true);
    };
    const closeLightbox = () => setIsLightboxOpen(false);
    const goToNext = () => {
        if (!industry?.facilityPhotos) return;
        setAnimationDirection('next');
        setSelectedImageIndex((prevIndex) => (prevIndex + 1) % industry.facilityPhotos.length);
    };
    const goToPrev = () => {
        if (!industry?.facilityPhotos) return;
        setAnimationDirection('prev');
        setSelectedImageIndex((prevIndex) => (prevIndex - 1 + industry.facilityPhotos.length) % industry.facilityPhotos.length);
    };

    if (loading) {
        return <div className="text-center py-40 text-textDark dark:text-textLight">Loading Industry Details...</div>;
    }

    if (!industry) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl text-textDark dark:text-textLight">Industry not found.</h2>
                <button onClick={handleBackClick} className="mt-4 bg-primaryDark text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-colors duration-300 btn-glow">
                    {t('detail_back_to_industries')}
                </button>
            </div>
        );
    }
    
    const hasPhotos = industry.facilityPhotos && industry.facilityPhotos.length > 0;

    return (
        <div className="bg-lightBg dark:bg-surfaceDark/50">
            {/* 1. Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center text-center text-white overflow-hidden">
                <div className="absolute inset-0">
                    <img src={industry.heroImage} alt={industry.fullName[language]} className="w-full h-full object-cover scale-105 animate-slow-zoom" />
                    <div className="absolute inset-0 bg-surfaceDark/80"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-surfaceDark via-surfaceDark/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                </div>
                
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute inset-0 animated-grid"></div>
                </div>

                <div className="relative z-20 container mx-auto px-6 max-w-5xl">
                    <AnimatedSection>
                        <div className="inline-block px-4 py-1.5 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full text-primary text-xs font-bold uppercase tracking-[0.2em] mb-8">
                            {industry.shortName} Division
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-8 leading-[1.1]">
                            {industry.fullName[language]}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                            Pioneering advancements in {industry.shortName} to strengthen national defense through innovation and engineering excellence.
                        </p>
                        <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
                            <a href="#about" className="group bg-primary text-white font-bold py-4 px-10 rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 flex items-center justify-center">
                                Explore Division
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                            </a>
                            <a href="#contact" className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-4 px-10 rounded-full hover:bg-white hover:text-surfaceDark transition-all duration-300 flex items-center justify-center">
                                Get in Touch
                            </a>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Sticky Nav Bar */}
            <div className="sticky top-20 z-30 bg-surfaceDark/95 backdrop-blur-md border-b border-white/5 shadow-2xl">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-center">
                        <button onClick={handleBackClick} className="text-primary hover:text-white transition-colors duration-300 flex items-center space-x-2 text-sm font-bold py-4 group">
                            <svg className="h-5 w-5 group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            <span className="hidden sm:inline">Back to Industries</span>
                        </button>
                        <div className="flex space-x-1 overflow-x-auto no-scrollbar py-2">
                            {['About', 'Capabilities', 'Products', 'Technology', 'Facilities', 'News', 'Contact'].map(item => (
                                <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 py-2 px-4 rounded-full text-xs font-bold uppercase tracking-widest flex-shrink-0">{item}</a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. About the Industry */}
            <section id="about" className="py-32 bg-surface dark:bg-surfaceDark scroll-mt-20 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <div className="max-w-4xl mx-auto text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight mb-6 font-display">About {industry.shortName}</h2>
                            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <p className="text-xl text-textDark/80 dark:text-textLight/80 leading-relaxed font-light">
                                    {industry.description[language]}
                                </p>
                                <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                                    As a core division of DEIG, our mandate is to develop and maintain sovereign capabilities in this critical sector, ensuring our nation's forces are equipped with reliable, state-of-the-art technology.
                                </p>
                                <div className="pt-8 flex items-center space-x-6">
                                    <div className="flex -space-x-4">
                                        {[1,2,3,4].map(i => (
                                            <div key={i} className="w-12 h-12 rounded-full border-4 border-surface dark:border-surfaceDark bg-gray-200 overflow-hidden">
                                                <img src={`https://picsum.photos/seed/expert${i}/100/100`} alt="Expert" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-bold text-textDark dark:text-textLight">500+ Experts</p>
                                        <p className="text-gray-500">Dedicated to this division</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 hover:bg-primary/10 transition-colors">
                                    <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                                    </div>
                                    <h4 className="font-bold text-textDark dark:text-textLight text-xl mb-3 font-display">Our Mission</h4>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">To deliver superior engineering solutions that enhance national security and foster technological self-reliance.</p>
                                </div>
                                <div className="bg-surfaceDark p-8 rounded-3xl border border-white/5 hover:bg-surfaceDark/80 transition-colors text-white">
                                    <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                                    </div>
                                    <h4 className="font-bold text-xl mb-3 font-display">Our Vision</h4>
                                    <p className="text-gray-300 text-sm leading-relaxed">To be a globally recognized center of excellence in defense engineering and innovation.</p>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
            
            {/* 3. Core Capabilities */}
            <section id="capabilities" className="py-32 bg-lightBg dark:bg-surfaceDark/50 scroll-mt-20">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <div className="max-w-4xl mx-auto text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight mb-6 font-display">Core Capabilities</h2>
                            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {industry.capabilities[language].map((cap, i) => <InfoCard key={i} title={cap} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />)}
                        </div>
                    </AnimatedSection>
                </div>
            </section>
            
            {/* 4. Products & Solutions */}
            <section id="products" className="py-32 bg-surface dark:bg-surfaceDark scroll-mt-20">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <div className="max-w-4xl mx-auto text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight mb-6 font-display">Products & Solutions</h2>
                            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {industry.productsOrServices[language].map((prod, i) => <InfoCard key={i} title={prod} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" /></svg>} />)}
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* 5. Technology & Innovation */}
            {industry.technicalHighlights[language].length > 0 && (
            <section id="technology" className="py-32 bg-lightBg dark:bg-surfaceDark/50 scroll-mt-20">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <div className="max-w-4xl mx-auto text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight mb-6 font-display">Technology & Innovation</h2>
                            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                        </div>
                        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                            {industry.technicalHighlights[language].map((highlight, i) => (
                                <div key={i} className="flex items-start space-x-6 group">
                                    <div className="w-14 h-14 bg-primary/5 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 flex-shrink-0">
                                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c.239.05.48.09.72.128a25.043 25.043 0 011.5 0c.24-.038.481-.078.72-.128M15 14.5l-2.25-2.25a2.25 2.25 0 00-.659-1.591V3.104m6.15 3.693c.24-.038.48-.077.72-.128a25.029 25.029 0 00-3.14 0c.24.05.48.09.72.128a25.043 25.043 0 011.5 0" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 14.25V19.5a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 19.5v-5.25m-18 0l2.25-2.25a2.25 2.25 0 011.591-.659h9.918a2.25 2.25 0 011.591.659L21 14.25" /></svg>
                                    </div>
                                    <span className="text-textDark/90 dark:text-textLight/90 text-lg leading-relaxed pt-2">{highlight}</span>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </section>
            )}

            {/* 6. Quality & Compliance */}
            <section id="quality" className="py-32 bg-surface dark:bg-surfaceDark scroll-mt-20">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <div className="max-w-4xl mx-auto text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight mb-6 font-display">Quality & Compliance</h2>
                            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                        </div>
                        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="bg-primary/5 p-10 rounded-3xl border border-primary/10 flex items-center space-x-8 group hover:bg-primary/10 transition-all duration-300">
                                <div className="w-20 h-20 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M21 2H3v20h18V2zM11 18H7v-2h4v2zm4 0h-2v-2h2v2zm0-4h-6v-2h6v2zm0-4H7V8h8v2z"/></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-textDark dark:text-textLight text-2xl mb-2 font-display">ISO 9001:2015</h4>
                                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{t('cert_iso_text')}</p>
                                </div>
                            </div>
                            <div className="bg-surfaceDark p-10 rounded-3xl border border-white/5 flex items-center space-x-8 group hover:bg-surfaceDark/80 transition-all duration-300 text-white">
                                <div className="w-20 h-20 bg-white/10 text-white rounded-2xl flex items-center justify-center border border-white/20 flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 9l4 2.18v6.32L12 22l7-4.5V11.18L23 9l-11-7zm0 2.37L19.5 9 12 12.5 4.5 9 12 4.37zM6 12.05l6 3.45 6-3.45v3.45l-6 3.45-6-3.45v-3.45z"/></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-2xl mb-2 font-display">AS9100</h4>
                                    <p className="text-gray-300 leading-relaxed">{t('cert_as9100_text')}</p>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
            
            {/* 7. Production Facilities */}
            {hasPhotos && (
            <section id="facilities" className="py-32 bg-lightBg dark:bg-surfaceDark/50 scroll-mt-20">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <div className="max-w-4xl mx-auto text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight mb-6 font-display">Production Facilities</h2>
                            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {industry.facilityPhotos.slice(0,3).map((imgSrc, i) => (
                                <div key={i} onClick={() => openLightbox(i)} className="group relative overflow-hidden rounded-3xl shadow-lg cursor-pointer aspect-video">
                                    <img src={imgSrc} alt={`${industry.shortName} gallery image ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </section>
            )}

            {/* 8. Projects & Achievements */}
            <section id="projects" className="py-32 bg-surface dark:bg-surfaceDark scroll-mt-20">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <div className="max-w-4xl mx-auto text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight mb-6 font-display">Projects & Achievements</h2>
                            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            <ProjectCard title="Project Sentinel Integration" description="Led the successful integration of advanced sensor arrays for the national surveillance network." image="https://images.unsplash.com/photo-1517976487612-1f3dd222f77c?q=80&w=800&auto=format&fit=crop" status="Completed: Q4 2023" />
                            <ProjectCard title="NextGen Comms Module" description="Development of a proprietary encrypted communication module for tactical radios." image="https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=800&auto=format&fit=crop" status="In Progress" />
                            <ProjectCard title="National Tech Excellence Award" description="Awarded for outstanding contribution to national technological sovereignty." image="https://images.unsplash.com/photo-1573495627361-ab2d45330a63?q=80&w=800&auto=format&fit=crop" status="Achieved: 2023" />
                        </div>
                    </AnimatedSection>
                </div>
            </section>
            
            {/* 9. Leadership & Management Team */}
            <section id="leadership" className="py-32 bg-lightBg dark:bg-surfaceDark/50 scroll-mt-20">
                <div className="container mx-auto px-6">
                     <AnimatedSection>
                        <div className="max-w-4xl mx-auto text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight mb-6 font-display">Leadership Team</h2>
                            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
                            {[
                                { name: industry.contactPerson, role: `Director, ${industry.shortName}`, image: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=400&auto=format&fit=crop" },
                                { name: "Jane Doe", role: "Head of Engineering", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop" },
                                { name: "John Smith", role: "Chief of Operations", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400&auto=format&fit=crop" }
                            ].map((leader, i) => (
                                <div key={i} className="group relative">
                                    <div className="relative overflow-hidden rounded-3xl aspect-[4/5] mb-6">
                                        <img src={leader.image} alt={leader.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-surfaceDark via-transparent to-transparent opacity-60"></div>
                                        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>
                                    <div className="text-center">
                                        <h4 className="text-2xl font-bold text-textDark dark:text-textLight font-display group-hover:text-primary transition-colors">{leader.name}</h4>
                                        <p className="text-primary text-sm font-bold uppercase tracking-widest mt-2">{leader.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </section>
            
            {/* 10. News & Updates */}
            <section id="news" className="py-32 bg-surface dark:bg-surfaceDark scroll-mt-20">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <div className="max-w-4xl mx-auto text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight mb-6 font-display">News & Updates</h2>
                            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {news.map((article) => (
                                <div key={article.id} className="group bg-surface dark:bg-surfaceDark rounded-3xl shadow-sm overflow-hidden h-full flex flex-col border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                                    <div className="p-8 flex flex-col flex-grow">
                                        <p className="text-xs text-primary font-bold uppercase tracking-widest mb-4">{new Date(article.date).toLocaleDateString(language === 'am' ? 'am-ET' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                        <h3 className="text-xl font-bold text-textDark dark:text-textLight mb-4 font-display leading-tight group-hover:text-primary transition-colors">{article.title[language]}</h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">{article.content[language]}</p>
                                        <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5">
                                            <button onClick={() => setCurrentView({ page: 'News' })} className="font-bold text-primary group-hover:translate-x-2 transition-transform inline-block">
                                                {t('read_more')} <span className="ml-2">&rarr;</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </section>
            
            {/* 11. Gallery */}
             {hasPhotos && (
            <section id="gallery" className="py-32 bg-lightBg dark:bg-surfaceDark/50 scroll-mt-20">
                <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <div className="max-w-4xl mx-auto text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight mb-6 font-display">Gallery / Media Center</h2>
                            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {industry.facilityPhotos.map((imgSrc, i) => (
                                <div key={i} onClick={() => openLightbox(i)} className="group relative overflow-hidden rounded-3xl shadow-lg cursor-pointer aspect-video">
                                    <img src={imgSrc} alt={`${industry.shortName} gallery image ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </section>
            )}

            {/* 12. Downloads */}
            <section id="downloads" className="py-32 bg-surface dark:bg-surfaceDark scroll-mt-20">
                 <div className="container mx-auto px-6">
                    <AnimatedSection>
                        <div className="max-w-4xl mx-auto text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight mb-6 font-display">Downloads</h2>
                            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                        </div>
                        <div className="max-w-3xl mx-auto space-y-6">
                            <DownloadItem title={`${industry.shortName} Corporate Brochure`} fileType="PDF" fileSize="5.2 MB" />
                            <DownloadItem title={`${industry.shortName} Product Catalog`} fileType="PDF" fileSize="12.8 MB" />
                            <DownloadItem title="Technical Specifications Sheet" fileType="PDF" fileSize="2.1 MB" />
                        </div>
                    </AnimatedSection>
                 </div>
            </section>

            {/* 13. Contact Information */}
            <section id="contact" className="py-32 bg-surfaceDark text-white relative overflow-hidden scroll-mt-20">
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <AnimatedSection>
                        <div className="max-w-4xl mx-auto text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">Contact Information</h2>
                            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                        </div>
                        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                             <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 text-center group hover:bg-white/10 transition-all duration-300">
                                <div className="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                </div>
                                <h4 className="font-bold text-xl mb-4 font-display">Address</h4>
                                <p className="text-gray-300 leading-relaxed">{industry.divisionalContact.address}</p>
                            </div>
                             <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 text-center group hover:bg-white/10 transition-all duration-300">
                                <div className="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                </div>
                                <h4 className="font-bold text-xl mb-4 font-display">Inquiries</h4>
                                <p className="text-gray-300 leading-relaxed">Phone: {industry.divisionalContact.phone}</p>
                                <p className="text-gray-300 leading-relaxed">Email: {industry.divisionalContact.email}</p>
                            </div>
                             <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 text-center group hover:bg-white/10 transition-all duration-300">
                                <div className="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                </div>
                                <h4 className="font-bold text-xl mb-4 font-display">Work Hours</h4>
                                <p className="text-gray-300 leading-relaxed">Monday - Friday: 8:00 AM - 5:00 PM</p>
                                <p className="text-gray-300 leading-relaxed">Saturday & Sunday: Closed</p>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
            
            {isLightboxOpen && hasPhotos && (
                <Lightbox 
                    images={industry.facilityPhotos}
                    selectedIndex={selectedImageIndex}
                    onClose={closeLightbox}
                    onNext={goToNext}
                    onPrev={goToPrev}
                    animationDirection={animationDirection}
                />
            )}
        </div>
    );
};

export default IndustryDetailPage;