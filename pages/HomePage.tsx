import React, { useState, useMemo } from 'react';
import { CurrentView, Industry, NewsArticle } from '../types';
import AnimatedSection from '../components/AnimatedSection';
import StatsCounter from '../components/StatsCounter';
import ContentCard from '../components/ContentCard';
import { useLanguage } from '../contexts/LanguageContext';
import Lightbox from '../components/Lightbox';

interface HomePageProps {
  setCurrentView: (view: CurrentView) => void;
  industries: Industry[];
  news: NewsArticle[];
}

const ServiceCard: React.FC<{ titleKey: string; descriptionKey: string; icon: React.ReactNode }> = ({ titleKey, descriptionKey, icon }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-surface dark:bg-surfaceDark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 hover:border-primary/30 dark:hover:border-primary/30 transform transition-all duration-500 hover:-translate-y-1.5 flex flex-col items-start group">
            <div className="w-14 h-14 bg-primary/5 dark:bg-primary/10 text-primary rounded-xl mb-6 flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white">
              <div className="w-8 h-8">{icon}</div>
            </div>
            <h3 className="text-xl font-bold text-textDark dark:text-textLight mb-3 font-display">{t(titleKey)}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{t(descriptionKey)}</p>
        </div>
    );
};

const ProjectCard: React.FC<{ title: string; description: string; image: string; }> = ({ title, description, image }) => (
    <div className="bg-surface dark:bg-surfaceDark rounded-2xl shadow-sm overflow-hidden h-full flex flex-col border border-gray-100 dark:border-white/5 group hover:shadow-xl transition-all duration-500">
        <div className="image-wrapper h-64 overflow-hidden relative">
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div className="p-8 flex flex-col flex-grow">
            <h4 className="text-xl font-bold text-textDark dark:text-textLight mb-3 font-display">{title}</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">{description}</p>
        </div>
    </div>
);


const FacilityCard: React.FC<{ titleKey: string; descriptionKey: string; badges: string[]; image: string; }> = ({ titleKey, descriptionKey, badges, image }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-surface dark:bg-surfaceDark rounded-3xl shadow-sm overflow-hidden border border-gray-100 dark:border-white/5 group hover:shadow-xl transition-all duration-500">
            <div className="image-wrapper h-72 overflow-hidden relative">
                <img src={image} alt={t(titleKey)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="p-8">
                <h3 className="text-2xl font-bold text-textDark dark:text-textLight font-display mb-4">{t(titleKey)}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">{t(descriptionKey)}</p>
                <div className="flex flex-wrap gap-2">
                    {badges.map(badgeKey => (
                        <span key={badgeKey} className="bg-primary/5 text-primary dark:bg-primary/10 text-xs font-bold px-4 py-1.5 rounded-full border border-primary/10">
                            {t(badgeKey)}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const PartnerLogo: React.FC<{ name: string; children: React.ReactNode }> = ({ name, children }) => (
    <div className="flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" title={name}>
        {children}
    </div>
);

const DownloadItem: React.FC<{ title: string; fileType: string; fileSize: string; }> = ({ title, fileType, fileSize }) => (
    <a href="#" className="bg-surface dark:bg-surfaceDark p-6 rounded-2xl shadow-sm flex items-center justify-between border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-all duration-300 group">
        <div className="flex items-center space-x-6">
            <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <div>
                <p className="font-bold text-textDark dark:text-textLight text-lg font-display">{title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-widest">{fileType} &bull; {fileSize}</p>
            </div>
        </div>
        <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:border-primary transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
        </div>
    </a>
);


const galleryItems = [
    { id: 'g1', titleKey: 'gallery_item_title_tactical_comm', categoryKey: 'gallery_item_category_electronics', image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=800&auto=format&fit=crop', filterCategory: 'Electronics' },
    { id: 'g2', titleKey: 'gallery_item_title_uav', categoryKey: 'gallery_item_category_aerospace', image: 'https://images.unsplash.com/photo-1620897588837-567812908f75?q=80&w=800&auto=format&fit=crop', filterCategory: 'Aerospace' },
    { id: 'g3', titleKey: 'gallery_item_title_apc', categoryKey: 'gallery_item_category_land', image: 'https://images.unsplash.com/photo-1618961734760-4c34b43d454a?q=80&w=800&auto=format&fit=crop', filterCategory: 'Land Systems' },
    { id: 'g4', titleKey: 'gallery_item_title_coastal_vessel', categoryKey: 'gallery_item_category_naval', image: 'https://images.unsplash.com/photo-1599427303023-f1271153ee61?q=80&w=800&auto=format&fit=crop', filterCategory: 'Naval' },
    { id: 'g5', titleKey: 'gallery_item_title_manufacturing', categoryKey: 'gallery_item_category_production', image: 'https://images.unsplash.com/photo-1617789516353-27a972643a6f?q=80&w=800&auto=format&fit=crop', filterCategory: 'Manufacturing' },
    { id: 'g6', titleKey: 'gallery_item_title_missile', categoryKey: 'gallery_item_category_aerospace', image: 'https://images.unsplash.com/photo-1582099343384-2826a0a4b3b1?q=80&w=800&auto=format&fit=crop', filterCategory: 'Aerospace' },
    { id: 'g7', titleKey: 'gallery_item_title_command_center', categoryKey: 'gallery_item_category_land', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop', filterCategory: 'Land Systems' },
    { id: 'g8', titleKey: 'gallery_item_title_submarine_detection', categoryKey: 'gallery_item_category_naval', image: 'https://images.unsplash.com/photo-1601643157091-ce5c665179ab?q=80&w=800&auto=format&fit=crop', filterCategory: 'Naval' },
    { id: 'g9', titleKey: 'gallery_item_title_radar', categoryKey: 'gallery_item_category_electronics', image: 'https://images.unsplash.com/photo-1611032231534-15f10b82f1f5?q=80&w=800&auto=format&fit=crop', filterCategory: 'Electronics' },
    { id: 'g10', titleKey: 'gallery_item_title_precision', categoryKey: 'gallery_item_category_production', image: 'https://images.unsplash.com/photo-1632765483046-7c152b1a6294?q=80&w=800&auto=format&fit=crop', filterCategory: 'Manufacturing' },
    { id: 'g11', titleKey: 'gallery_item_title_tactical_comm', categoryKey: 'gallery_item_category_electronics', image: 'https://images.unsplash.com/photo-1517976487612-1f3dd222f77c?q=80&w=800&auto=format&fit=crop', filterCategory: 'Electronics' },
    { id: 'g12', titleKey: 'gallery_item_title_manufacturing', categoryKey: 'gallery_item_category_production', image: 'https://images.unsplash.com/photo-1556132194-2f2de153a817?q=80&w=800&auto=format&fit=crop', filterCategory: 'Manufacturing' },
];

const galleryCategories = ['All Products', 'Aerospace', 'Land Systems', 'Naval', 'Electronics', 'Manufacturing'];


const HomePage: React.FC<HomePageProps> = ({ setCurrentView, industries, news }) => {
  const { language, t } = useLanguage();

  // Gallery State
  const [activeGalleryCategory, setActiveGalleryCategory] = useState('All Products');
  const [visibleGalleryItems, setVisibleGalleryItems] = useState(8);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxAnimation, setLightboxAnimation] = useState<'next' | 'prev' | 'fade'>('fade');

  const filteredGalleryItems = useMemo(() => {
    if (activeGalleryCategory === 'All Products') {
      return galleryItems;
    }
    return galleryItems.filter(item => item.filterCategory === activeGalleryCategory);
  }, [activeGalleryCategory]);

  const handleFilterClick = (category: string) => {
    setActiveGalleryCategory(category);
    setVisibleGalleryItems(8);
  };

  const loadMoreItems = () => {
    setVisibleGalleryItems(prev => prev + 4);
  };
  
  const openLightbox = (index: number) => {
    setLightboxAnimation('fade');
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);

  const goToNextImage = () => {
    setLightboxAnimation('next');
    setSelectedImageIndex(prev => (prev + 1) % filteredGalleryItems.length);
  };

  const goToPrevImage = () => {
    setLightboxAnimation('prev');
    setSelectedImageIndex(prev => (prev - 1 + filteredGalleryItems.length) % filteredGalleryItems.length);
  };


  return (
    <div>
      {/* 1. Hero Section */}
      <section id="hero-section" className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden bg-surfaceDark">
        <div className="absolute inset-0 z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-surfaceDark/80 via-surfaceDark/40 to-surfaceDark"></div>
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
            
            {/* Animated Grid Effect */}
            <div className="absolute inset-0 opacity-20" 
                 style={{
                     backgroundImage: `linear-gradient(to right, #1075BB 1px, transparent 1px), linear-gradient(to bottom, #1075BB 1px, transparent 1px)`,
                     backgroundSize: '60px 60px'
                 }}>
            </div>
        </div>

         <div className="image-wrapper absolute z-0 w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-40"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-computer-data-processing-screen-4720-large.mp4" type="video/mp4" />
            </video>
        </div>
        
        <div className="relative z-20 container mx-auto px-6 flex flex-col items-center">
          <AnimatedSection>
              <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-xs font-bold tracking-widest uppercase">
                {t('hero_badge') || 'Defense Engineering Excellence'}
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 font-display tracking-tight leading-tight">
                {t('hero_title')}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-12">
                {t('hero_subtitle')}
              </p>
               <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button onClick={() => setCurrentView({ page: 'Industry'})} className="bg-primary text-white font-bold py-5 px-12 rounded-2xl hover:bg-primaryDark transition-all duration-300 shadow-xl shadow-primary/20 text-lg">
                      {t('hero_cta_industries')}
                  </button>
                  <button onClick={() => setCurrentView({ page: 'About'})} className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-5 px-12 rounded-2xl hover:bg-white hover:text-primary transition-all duration-300 text-lg">
                      {t('hero_cta_about')}
                  </button>
              </div>
          </AnimatedSection>
        </div>
         <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
            <div className="w-8 h-12 border-2 border-white/20 rounded-full flex justify-center p-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
            </div>
        </div>
      </section>

      {/* 2. Who We Are */}
      <section className="py-32 bg-lightBg dark:bg-surfaceDark/50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
            <AnimatedSection className="text-center mb-24">
                <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight font-display mb-6 tracking-tight">{t('home_who_we_are_title')}</h2>
                <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-10"></div>
                <p className="text-gray-500 dark:text-gray-400 text-xl max-w-3xl mx-auto font-light leading-relaxed">{t('home_who_we_are_subtitle')}</p>
            </AnimatedSection>
            <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
                <div className="space-y-8 text-gray-600 dark:text-gray-300 text-lg leading-relaxed font-light">
                    <p>{t('home_detailed_about_p1')}</p>
                    <p>{t('home_detailed_about_p2')}</p>
                    <div className="p-8 bg-primary/5 dark:bg-primary/10 border-l-4 border-primary rounded-2xl shadow-sm">
                      <p className="font-bold text-primary italic text-xl leading-relaxed">{t('home_who_we_are_mandate')}</p>
                    </div>
                </div>
                <div className="relative group">
                    <div className="absolute -inset-6 bg-primary/10 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-white/5">
                        <img src="https://images.unsplash.com/photo-1600880292210-85938a023b16?q=80&w=800&auto=format&fit=crop" alt="Engineering collaboration" className="w-full h-auto transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                    </div>
                </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <AnimatedSection>
                <div className="bg-surface dark:bg-surfaceDark p-10 rounded-[2.5rem] shadow-xl shadow-primary/5 border border-gray-100 dark:border-white/5 h-full">
                  <h3 className="text-2xl font-bold text-textDark dark:text-textLight mb-6 font-display">{t('home_vision_title')}</h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-light text-lg">{t('home_vision_text')}</p>
                </div>
              </AnimatedSection>
              <AnimatedSection delay="150ms">
                <div className="bg-surface dark:bg-surfaceDark p-10 rounded-[2.5rem] shadow-xl shadow-primary/5 border border-gray-100 dark:border-white/5 h-full">
                  <h3 className="text-2xl font-bold text-textDark dark:text-textLight mb-6 font-display">{t('home_mission_title')}</h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-light text-lg">{t('home_mission_text')}</p>
                </div>
              </AnimatedSection>
            </div>
        </div>
      </section>

      {/* 3. Our Industry Divisions */}
      <section className="py-32 bg-surface dark:bg-surfaceDark/50">
        <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight font-display mb-6 tracking-tight">{t('home_industry_divisions_title')}</h2>
                <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
                <p className="text-gray-500 dark:text-gray-400 text-xl max-w-3xl mx-auto font-light leading-relaxed">{t('home_industry_divisions_subtitle')}</p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {industries.slice(0, 5).map((industry, index) => {
                    return (
                        <AnimatedSection key={industry.id} delay={`${(index % 3) * 100}ms`}>
                            <div 
                                className="bg-surface dark:bg-surfaceDark rounded-[2.5rem] shadow-sm overflow-hidden h-full flex flex-col border border-gray-100 dark:border-white/5 group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2 cursor-pointer" 
                                onClick={() => setCurrentView({ page: 'Industry', industryId: industry.id })}
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img src={industry.image} alt={industry.fullName[language]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                <div className="p-10 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-bold text-textDark dark:text-textLight mb-4 font-display group-hover:text-primary transition-colors leading-tight">{industry.fullName[language]}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-grow">{industry.description[language]}</p>
                                    <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5">
                                        <button className="font-bold text-primary group-hover:translate-x-2 transition-transform flex items-center space-x-2">
                                            <span>{t('learn_more')}</span>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    );
                })}
                 <AnimatedSection className="flex items-center justify-center" delay="200ms">
                     <button onClick={() => setCurrentView({ page: 'Industry' })} className="w-full h-full bg-primary/5 dark:bg-white/5 rounded-[2.5rem] border-2 border-dashed border-primary/20 flex flex-col items-center justify-center text-center p-10 group hover:border-primary hover:bg-primary/10 transition-all duration-500">
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-textDark dark:text-textLight mb-4 font-display">View All Divisions</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">Explore our full range of engineering and manufacturing capabilities.</p>
                        <span className="font-bold text-primary group-hover:translate-x-2 transition-transform flex items-center space-x-2">
                            <span>{t('learn_more')}</span>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                        </span>
                    </button>
                </AnimatedSection>
            </div>
        </div>
      </section>

      {/* 4. Key Capabilities */}
      <section className="py-32 bg-lightBg dark:bg-surfaceDark/30">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight font-display mb-6 tracking-tight">{t('home_key_capabilities_title')}</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
            <p className="text-gray-500 dark:text-gray-400 text-xl max-w-3xl mx-auto font-light leading-relaxed">{t('home_key_capabilities_subtitle')}</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatedSection><ServiceCard titleKey="home_capability_mil_prod_title" descriptionKey="home_capability_mil_prod_desc" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.47-2.47a1.282 1.282 0 00-1.814-1.814L9.606 13.356m1.814 1.814l-2.47 2.47a1.282 1.282 0 001.814 1.814L11.42 15.17zM3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.192 0 7.82 2.762 9.41 6.59" /></svg>} /></AnimatedSection>
            <AnimatedSection delay="150ms"><ServiceCard titleKey="home_capability_mfg_eng_title" descriptionKey="home_capability_mfg_eng_desc" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>} /></AnimatedSection>
            <AnimatedSection delay="300ms"><ServiceCard titleKey="home_capability_rnd_title" descriptionKey="home_capability_rnd_desc" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c.239.05.48.09.72.128a25.043 25.043 0 011.5 0c.24-.038.481-.078.72-.128m6.15 3.693c.24-.038.48-.077.72-.128a25.029 25.029 0 00-3.14 0c.24.05.48.09.72.128a25.043 25.043 0 011.5 0" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 14.25V19.5a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 19.5v-5.25m-18 0l2.25-2.25a2.25 2.25 0 011.591-.659h9.918a2.25 2.25 0 011.591.659L21 14.25" /></svg>} /></AnimatedSection>
            <AnimatedSection><ServiceCard titleKey="home_capability_tech_innov_title" descriptionKey="home_capability_tech_innov_desc" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l-1.5-1.5m1.5 1.5l1.5-1.5m-1.5 1.5v4.5m1.5-4.5l-1.5-1.5m1.5 1.5l1.5-1.5m0 0l-1.5-1.5m1.5 1.5l1.5 1.5m-1.5-1.5v4.5m1.5-4.5l1.5 1.5m0 0l1.5-1.5m1.5 1.5l-1.5 1.5m1.5-1.5v4.5m0-4.5l1.5 1.5m1.5-1.5l-1.5-1.5m1.5 1.5l1.5 1.5m1.5-1.5v4.5m1.5-4.5l1.5 1.5M12 9l-1.5-1.5m1.5 1.5l1.5-1.5m-1.5 1.5V3m1.5 6l-1.5-1.5m1.5 1.5l1.5 1.5m-1.5-1.5V3m1.5 6l1.5 1.5m0 0l1.5-1.5M12 3v3.75m0 0l1.5-1.5M12 6.75L10.5 5.25m-3 12l-1.5 1.5m1.5-1.5l1.5 1.5m-1.5-1.5v-4.5m1.5 4.5l-1.5 1.5m1.5-1.5l1.5 1.5m0 0l-1.5 1.5m1.5-1.5l1.5-1.5m-1.5 1.5v-4.5m1.5 4.5l1.5-1.5M12 15l-1.5 1.5m1.5-1.5l1.5 1.5m-1.5-1.5V21m1.5-6l-1.5 1.5m1.5-1.5l1.5-1.5m-1.5 1.5V21m1.5-6l1.5-1.5m0 0l1.5 1.5" /></svg>} /></AnimatedSection>
            <AnimatedSection delay="150ms"><ServiceCard titleKey="home_capability_logistics_title" descriptionKey="home_capability_logistics_desc" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2-2h8a1 1 0 001-1z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20.59 4.85l-3.33-3.33A1 1 0 0016.59 1H14v4h5.59a1 1 0 00.59-.41.41.41 0 00.01-.2zM17 10h4" /></svg>} /></AnimatedSection>
            <AnimatedSection delay="300ms"><ServiceCard titleKey="home_capability_modernization_title" descriptionKey="home_capability_modernization_desc" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691v4.992h4.992m0 0l-3.181-3.183a8.25 8.25 0 00-11.667 0l-3.181 3.183" /></svg>} /></AnimatedSection>
          </div>
        </div>
      </section>

      {/* 5. Major Achievements & Impact */}
      <section className="py-32 bg-surfaceDark text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-surfaceDark/80 via-surfaceDark to-surfaceDark"></div>
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
            
            {/* Animated Grid Effect */}
            <div className="absolute inset-0 opacity-10" 
                 style={{
                     backgroundImage: `linear-gradient(to right, #1075BB 1px, transparent 1px), linear-gradient(to bottom, #1075BB 1px, transparent 1px)`,
                     backgroundSize: '40px 40px'
                 }}>
            </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <AnimatedSection className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-white font-display mb-6 tracking-tight">{t('home_achievements_title')}</h2>
                <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
                <p className="text-gray-400 text-xl max-w-3xl mx-auto font-light leading-relaxed">{t('home_achievements_subtitle')}</p>
            </AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-32">
                <StatsCounter target={500} suffix="+" label={t('stat_projects_completed')} className="text-center" />
                <StatsCounter target={25} suffix="+" label={t('stat_years_of_service')} className="text-center" />
                <StatsCounter target={10000} suffix="+" label={t('stat_skilled_workforce')} className="text-center" />
                <StatsCounter target={8} label={t('stat_industry_divisions')} className="text-center" />
            </div>
            <AnimatedSection>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center font-display tracking-tight">{t('home_achievements_projects_title')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <ProjectCard title={t('project1_title')} description={t('project1_desc')} image="https://images.unsplash.com/photo-1603512338521-4b18218a5541?q=80&w=800&auto=format&fit=crop" />
                    <ProjectCard title={t('project2_title')} description={t('project2_desc')} image="https://images.unsplash.com/photo-1614926019318-7ac52ae818a7?q=80&w=800&auto=format&fit=crop" />
                    <ProjectCard title={t('project3_title')} description={t('project3_desc')} image="https://images.unsplash.com/photo-1517976487612-1f3dd222f77c?q=80&w=800&auto=format&fit=crop" />
                </div>
            </AnimatedSection>
        </div>
      </section>

      {/* 6. Leadership Message */}
      <section className="py-32 bg-lightBg dark:bg-surfaceDark/30">
          <div className="container mx-auto px-6">
              <AnimatedSection className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 bg-surface dark:bg-surfaceDark p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-primary/5 border border-gray-100 dark:border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full -mr-40 -mt-40 transition-transform duration-700 group-hover:scale-110"></div>
                  <div className="relative z-10 w-56 h-56 rounded-3xl overflow-hidden flex-shrink-0 shadow-2xl transform -rotate-3 group-hover:rotate-0 transition-all duration-700">
                      <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop" alt="Director General Gen. A. Abebe" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                  </div>
                  <div className="relative z-10">
                      <svg className="w-16 h-16 text-primary/10 mb-8" fill="currentColor" viewBox="0 0 32 32"><path d="M10 8v8H6v-8h4zm12 0v8h-4v-8h4zM10 4H6a4 4 0 00-4 4v8a4 4 0 004 4h4v4h4v-4h-4v-4h4V8a4 4 0 00-4-4zm12 0h-4a4 4 0 00-4 4v8a4 4 0 004 4h4v4h4v-4h-4v-4h4V8a4 4 0 00-4-4z"/></svg>
                      <h2 className="text-3xl md:text-4xl font-bold text-textDark dark:text-textLight mb-8 font-display tracking-tight leading-tight">{t('home_message_title')}</h2>
                      <blockquote className="text-gray-600 dark:text-gray-300 text-xl md:text-2xl italic font-light leading-relaxed mb-10">
                          "{t('home_message_quote')}"
                      </blockquote>
                      <div className="flex items-center space-x-6">
                        <div className="w-16 h-1.5 bg-primary rounded-full"></div>
                        <div>
                            <p className="text-textDark dark:text-textLight font-bold text-xl tracking-tight uppercase font-display">{t('home_message_director')}</p>
                            <p className="text-primary text-sm font-bold uppercase tracking-widest mt-1">Director General</p>
                        </div>
                      </div>
                  </div>
              </AnimatedSection>
          </div>
      </section>

      {/* 7. Latest News & Updates */}
      <section className="py-32 bg-surface dark:bg-surfaceDark/50">
        <div className="container mx-auto px-6">
            <AnimatedSection className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div className="text-left">
                    <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight font-display mb-6 tracking-tight">{t('home_news_title')}</h2>
                    <div className="w-24 h-1.5 bg-primary rounded-full mb-8"></div>
                    <p className="text-gray-500 dark:text-gray-400 text-xl font-light max-w-2xl">{t('home_news_subtitle')}</p>
                </div>
                <button onClick={() => setCurrentView({ page: 'News' })} className="px-10 py-4 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all duration-500 shadow-lg hover:shadow-primary/20">
                    {t('view_all_news') || 'View All News'}
                </button>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {news.slice(0, 3).map((article, index) => (
                    <AnimatedSection key={article.id} delay={`${index * 150}ms`}>
                        <div className="bg-surface dark:bg-surfaceDark rounded-[2.5rem] shadow-xl shadow-primary/5 border border-gray-100 dark:border-white/5 overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full">
                            <div className="h-64 overflow-hidden relative">
                                <img src={article.image} alt={article.title[language]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute top-6 left-6 px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-full shadow-lg">
                                    {article.category}
                                </div>
                            </div>
                            <div className="p-10 flex flex-col flex-grow">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-8 h-px bg-primary/30"></div>
                                    <span className="text-primary text-xs font-bold uppercase tracking-widest">
                                        {new Date(article.date).toLocaleDateString(language === 'am' ? 'am-ET' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-textDark dark:text-textLight mb-6 font-display group-hover:text-primary transition-colors leading-tight">{article.title[language]}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3 font-light">{article.content[language]}</p>
                                <button onClick={() => setCurrentView({ page: 'News' })} className="mt-auto flex items-center text-primary font-bold text-sm group-hover:translate-x-2 transition-transform">
                                    <span>{t('read_more')}</span>
                                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                                </button>
                            </div>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
      </section>

      {/* 8. Our Facilities */}
      <section className="py-32 bg-lightBg dark:bg-surfaceDark/50">
        <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-24">
                <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight font-display mb-6 tracking-tight">{t('home_facilities_title')}</h2>
                <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-10"></div>
                <p className="text-gray-500 dark:text-gray-400 text-xl max-w-3xl mx-auto font-light leading-relaxed">{t('home_facilities_subtitle')}</p>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <AnimatedSection>
                    <FacilityCard titleKey="home_facility1_title" descriptionKey="home_facility1_desc" badges={['home_facility1_badge1', 'home_facility1_badge2', 'home_facility1_badge3']} image="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop" />
                </AnimatedSection>
                <AnimatedSection delay="150ms">
                    <FacilityCard titleKey="home_facility2_title" descriptionKey="home_facility2_desc" badges={['home_facility2_badge1', 'home_facility2_badge2', 'home_facility2_badge3']} image="https://images.unsplash.com/photo-1560263823-79a0f144366e?q=80&w=800&auto=format&fit=crop" />
                </AnimatedSection>
            </div>
        </div>
      </section>

      {/* 9. Innovation & R&D */}
      <section className="py-32 bg-surface dark:bg-surfaceDark relative overflow-hidden">
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-primary/5 mix-blend-overlay"></div>
            <div className="absolute inset-0 opacity-5" 
                 style={{
                     backgroundImage: `linear-gradient(to right, #1075BB 1px, transparent 1px), linear-gradient(to bottom, #1075BB 1px, transparent 1px)`,
                     backgroundSize: '30px 30px'
                 }}>
            </div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
            <AnimatedSection className="flex flex-col lg:flex-row items-center gap-20">
                <div className="lg:w-1/2">
                    <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase">
                        {t('innovation_badge') || 'Future Ready'}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight mb-8 font-display tracking-tight leading-tight">{t('home_innovation_title')}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 text-xl font-light leading-relaxed">{t('home_innovation_p1')}</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-12 text-lg font-light leading-relaxed">{t('home_innovation_p2')}</p>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="flex items-center space-x-5 p-6 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/10 group hover:border-primary transition-colors">
                            <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.477 2.387a2 2 0 00.547 1.022l1.428 1.428a2 2 0 002.828 0l1.428-1.428a2 2 0 000-2.828l-1.428-1.428z" /></svg>
                            </div>
                            <span className="font-bold text-textDark dark:text-textLight text-lg font-display">{t('home_innovation_labs')}</span>
                        </div>
                        <div className="flex items-center space-x-5 p-6 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/10 group hover:border-primary transition-colors">
                            <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            </div>
                            <span className="font-bold text-textDark dark:text-textLight text-lg font-display">{t('home_innovation_teams')}</span>
                        </div>
                    </div>
                </div>
                <div className="lg:w-1/2 relative group">
                    <div className="absolute -inset-6 bg-primary/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-white/5">
                        <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop" alt="Research and Development Lab" className="w-full h-auto transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                    </div>
                </div>
            </AnimatedSection>
        </div>
      </section>

      {/* 10. Partners & Collaborations */}
      <section className="py-32 bg-lightBg dark:bg-surfaceDark/30">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight font-display mb-6 tracking-tight">{t('home_partners_title')}</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-10"></div>
            <p className="text-gray-500 dark:text-gray-400 text-xl max-w-3xl mx-auto font-light leading-relaxed">{t('home_partners_subtitle')}</p>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
              <PartnerLogo name="Ministry of Defense"><svg className="w-24 h-16 text-primary/20 hover:text-primary transition-all duration-500 hover:scale-110" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V13H5V8.18l7-3.11v8.92z"/></svg></PartnerLogo>
              <PartnerLogo name="National Technology Institute"><svg className="w-24 h-16 text-primary/20 hover:text-primary transition-all duration-500 hover:scale-110" viewBox="0 0 24 24" fill="currentColor"><path d="M22 10v10h-2v-3H4v3H2V10h1.97L12 3.66 20.03 10H22zM12 6.13L5.42 10H12v8h2v-5h2v5h2v-8h1.42L12 6.13z"/></svg></PartnerLogo>
              <PartnerLogo name="Aerospace Dynamics Corp"><svg className="w-24 h-16 text-primary/20 hover:text-primary transition-all duration-500 hover:scale-110" viewBox="0 0 24 24" fill="currentColor"><path d="M21 15.46l-5.27-.61-2.52 2.52c-2.83-1.44-5.15-3.75-6.59-6.59l2.53-2.53L8.54 3H3.03C2.45 13.18 10.82 21.55 21 20.97v-5.51z"/></svg></PartnerLogo>
              <PartnerLogo name="Global Engineering Partners"><svg className="w-24 h-16 text-primary/20 hover:text-primary transition-all duration-500 hover:scale-110" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1h-2v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg></PartnerLogo>
              <PartnerLogo name="Federal Procurement Agency"><svg className="w-24 h-16 text-primary/20 hover:text-primary transition-all duration-500 hover:scale-110" viewBox="0 0 24 24" fill="currentColor"><path d="M14.5 12c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-5 0c.83 0 1.5-.67 1.5-1.5S10.33 9 9.5 9 8 9.67 8 10.5s.67 1.5 1.5 1.5zm5.5 1H9c-2.12 0-4.07.86-5.5 2.44V17h17v-1.56c-1.43-1.58-3.38-2.44-5.5-2.44zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg></PartnerLogo>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 11. Media Gallery */}
      <section className="py-32 bg-lightBg dark:bg-surfaceDark/50">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight font-display mb-6 tracking-tight">{t('home_gallery_main_title')}</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
            <p className="text-gray-500 dark:text-gray-400 text-xl font-light max-w-3xl mx-auto leading-relaxed">{t('home_gallery_main_subtitle')}</p>
          </AnimatedSection>
          <AnimatedSection className="mb-16">
            <div className="flex flex-wrap justify-center items-center gap-4">
              {galleryCategories.map(category => (
                <button
                  key={category}
                  onClick={() => handleFilterClick(category)}
                  className={`px-8 py-3 text-sm font-bold rounded-full transition-all duration-500 ${
                    activeGalleryCategory === category
                    ? 'bg-primary text-white shadow-xl shadow-primary/30 scale-105'
                    : 'bg-surface dark:bg-surfaceDark text-gray-500 dark:text-gray-400 hover:bg-primary/10 hover:text-primary border border-gray-100 dark:border-white/5'
                  }`}
                >
                  {t(`gallery_filter_${category.toLowerCase().replace(' ', '_')}`)}
                </button>
              ))}
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredGalleryItems.slice(0, visibleGalleryItems).map((item, index) => (
                <AnimatedSection key={item.id} delay={`${(index % 4) * 100}ms`}>
                  <div
                    onClick={() => openLightbox(index)}
                    className="group relative block w-full aspect-square bg-gray-200 dark:bg-gray-800 rounded-[2.5rem] overflow-hidden shadow-xl shadow-primary/5 cursor-pointer border border-gray-100 dark:border-white/5"
                  >
                    <img src={item.image} alt={t(item.titleKey)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-full p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-3">{t(item.categoryKey)}</p>
                        <h4 className="font-bold text-xl font-display leading-tight">{t(item.titleKey)}</h4>
                    </div>
                     <div className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100 border border-white/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
          </div>

          {visibleGalleryItems < filteredGalleryItems.length && (
            <AnimatedSection className="text-center mt-24">
                <button
                onClick={loadMoreItems}
                className="bg-primary text-white font-bold py-5 px-14 rounded-full hover:bg-primaryDark transition-all duration-500 shadow-xl shadow-primary/20 text-lg group"
                >
                <span className="flex items-center space-x-2">
                    <span>{t('gallery_load_more')}</span>
                    <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                </span>
                </button>
            </AnimatedSection>
           )}
        </div>
      </section>

      {/* 12. Downloads */}
      <section className="py-32 bg-surface dark:bg-surfaceDark">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight font-display mb-6 tracking-tight">{t('home_downloads_title')}</h2>
              <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-10"></div>
              <p className="text-gray-500 dark:text-gray-400 text-xl font-light max-w-3xl mx-auto leading-relaxed">{t('home_downloads_subtitle')}</p>
            </AnimatedSection>
            <AnimatedSection>
              <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8">
                  <DownloadItem title={t('download_company_profile')} fileType="PDF" fileSize="5.2 MB" />
                  <DownloadItem title={t('download_annual_report')} fileType="PDF" fileSize="12.8 MB" />
                  <DownloadItem title={t('download_brochure')} fileType="PDF" fileSize="8.1 MB" />
                  <DownloadItem title={t('download_strategic_plan')} fileType="PDF" fileSize="2.1 MB" />
              </div>
            </AnimatedSection>
          </div>
      </section>

      {isLightboxOpen && (
        <Lightbox
            images={filteredGalleryItems.map(item => item.image)}
            selectedIndex={selectedImageIndex}
            onClose={closeLightbox}
            onNext={goToNextImage}
            onPrev={goToPrevImage}
            animationDirection={lightboxAnimation}
        />
      )}
    </div>
  );
};

export default HomePage;