import React from 'react';
import { Industry, CurrentView } from '../types';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeader from '../components/SectionHeader';
import InteractiveMap from '../components/InteractiveMap';
import { useLanguage } from '../contexts/LanguageContext';

interface IndustryPageProps {
  setCurrentView: (view: CurrentView) => void;
  industries: Industry[];
}

const IndustryCard: React.FC<{ industry: Industry; setCurrentView: (view: CurrentView) => void; }> = ({ industry, setCurrentView }) => {
    const { language, t } = useLanguage();
    const handleClick = () => {
        setCurrentView({ page: 'Industry', industryId: industry.id });
    }
    
    return (
        <div 
            className="group relative overflow-hidden rounded-3xl shadow-sm transform hover:-translate-y-2 transition-all duration-500 cursor-pointer bg-surface dark:bg-surfaceDark h-full flex flex-col border border-gray-100 dark:border-white/5 hover:border-primary/30"
            onClick={handleClick}
        >
            <div className="image-wrapper h-56 overflow-hidden relative">
              <img src={industry.heroImage} alt={industry.fullName[language]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="p-8 flex flex-col flex-grow text-textDark dark:text-textLight">
                <h3 className="text-2xl font-bold tracking-tight font-display group-hover:text-primary transition-colors">{industry.shortName}</h3>
                <p className="text-primary text-xs font-bold uppercase tracking-widest mt-2 mb-4">{industry.fullName[language]}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed flex-grow">{industry.description[language]}</p>
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5">
                    <span className="font-bold text-primary group-hover:translate-x-2 transition-transform inline-block">
                        {t('learn_more')} <span className="ml-2">&rarr;</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

const CapabilityCard: React.FC<{ titleKey: string; children: React.ReactNode }> = ({ titleKey, children }) => {
    const { t } = useLanguage();
    return (
        <div className="flex flex-col items-center text-center group bg-surface dark:bg-surfaceDark p-8 rounded-3xl border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-all duration-500 h-full shadow-sm hover:shadow-xl">
            <div className="w-16 h-16 mb-6 bg-primary/5 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                <div className="w-8 h-8">{children}</div>
            </div>
            <h4 className="font-bold text-textDark dark:text-textLight font-display tracking-tight leading-tight flex-grow">{t(titleKey)}</h4>
        </div>
    );
};

const ManufacturingCapabilityCard: React.FC<{ titleKey: string; descriptionKey: string; icon: React.ReactNode }> = ({ titleKey, descriptionKey, icon }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 h-full transform transition-all duration-500 hover:bg-white/10 hover:-translate-y-2 group">
            <div className="w-14 h-14 bg-primary/20 text-white rounded-2xl mb-6 flex items-center justify-center group-hover:bg-primary transition-colors">
                <div className="w-8 h-8">{icon}</div>
            </div>
            <h4 className="font-bold text-xl text-white mb-3 font-display">{t(titleKey)}</h4>
            <p className="text-sm text-gray-300 leading-relaxed font-light">{t(descriptionKey)}</p>
        </div>
    );
};

const NewsCategoryBadge: React.FC<{ category: string }> = ({ category }) => {
  return (
    <span className="inline-block px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4 bg-primary/10 text-primary border border-primary/20">
      {category}
    </span>
  );
};


const IndustryPage: React.FC<IndustryPageProps> = ({ setCurrentView, industries }) => {
  const { t } = useLanguage();
  
  const latestNews = [
    {
        id: 'ind-news-1',
        image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop',
        dateKey: 'industry_news_1_date',
        categoryKey: 'industry_news_1_category',
        titleKey: 'industry_news_1_title',
        descKey: 'industry_news_1_desc',
    },
    {
        id: 'ind-news-2',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop',
        dateKey: 'industry_news_2_date',
        categoryKey: 'industry_news_2_category',
        titleKey: 'industry_news_2_title',
        descKey: 'industry_news_2_desc',
    },
    {
        id: 'ind-news-3',
        image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop',
        dateKey: 'industry_news_3_date',
        categoryKey: 'industry_news_3_category',
        titleKey: 'industry_news_3_title',
        descKey: 'industry_news_3_desc',
    }
  ];

  return (
    <div className="bg-lightBg dark:bg-surfaceDark/50">
       <div className="relative py-32 bg-surfaceDark text-white overflow-hidden">
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute inset-0 animated-grid"></div>
            </div>
            <div className="container mx-auto px-6 relative z-10">
                <AnimatedSection>
                  <SectionHeader
                    title={t('industry_header_title')}
                    subtitle={t('industry_header_subtitle')}
                  />
                </AnimatedSection>
            </div>
        </div>
        <div className="container mx-auto px-6 py-32">
             <section className="mb-32">
                <AnimatedSection className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight font-display mb-6">{t('industry_map_title')}</h2>
                    <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">{t('industry_map_subtitle')}</p>
                </AnimatedSection>
                <AnimatedSection>
                    <div className="bg-surface dark:bg-surfaceDark p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-white/5">
                        <InteractiveMap industries={industries} setCurrentView={setCurrentView} />
                    </div>
                </AnimatedSection>
             </section>

             <section className="mb-32">
                <AnimatedSection className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight font-display mb-6">{t('industry_collective_title')}</h2>
                    <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">{t('industry_collective_subtitle')}</p>
                </AnimatedSection>
                <AnimatedSection>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <CapabilityCard titleKey="collective_design">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
                        </CapabilityCard>
                        <CapabilityCard titleKey="collective_manufacturing">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>
                        </CapabilityCard>
                        <CapabilityCard titleKey="collective_integration">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25v2.25A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" /></svg>
                        </CapabilityCard>
                        <CapabilityCard titleKey="collective_testing">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </CapabilityCard>
                        <CapabilityCard titleKey="collective_support">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691v4.992h4.992m0 0l-3.181-3.183a8.25 8.25 0 00-11.667 0l-3.181 3.183" /></svg>
                        </CapabilityCard>
                        <CapabilityCard titleKey="collective_logistics">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2-2h8a1 1 0 001-1z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20.59 4.85l-3.33-3.33A1 1 0 0016.59 1H14v4h5.59a1 1 0 00.59-.41.41.41 0 00.01-.2zM17 10h4" /></svg>
                        </CapabilityCard>
                         <CapabilityCard titleKey="collective_rd">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c.239.05.48.09.72.128a25.043 25.043 0 011.5 0c.24-.038.481-.078.72-.128M15 14.5l-2.25-2.25a2.25 2.25 0 00-.659-1.591V3.104m6.15 3.693c.24-.038.48-.077.72-.128a25.029 25.029 0 00-3.14 0c.24.05.48.09.72.128a25.043 25.043 0 011.5 0" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 14.25V19.5a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 19.5v-5.25m-18 0l2.25-2.25a2.25 2.25 0 011.591-.659h9.918a2.25 2.25 0 011.591.659L21 14.25" /></svg>
                        </CapabilityCard>
                         <CapabilityCard titleKey="collective_cyber">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.602-.36-3.112-.995-4.428" /></svg>
                        </CapabilityCard>
                    </div>
                </AnimatedSection>
             </section>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {industries.map((industry, i) => (
                  <AnimatedSection key={industry.id} delay={`${i * 100}ms`}>
                    <IndustryCard industry={industry} setCurrentView={setCurrentView} />
                  </AnimatedSection>
                ))}
            </div>
        </div>

        <section className="py-32 bg-surfaceDark text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
            <div className="container mx-auto px-6 relative z-10">
                <AnimatedSection className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">{t('manufacturing_capabilities_title')}</h2>
                    <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                </AnimatedSection>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <AnimatedSection>
                        <ManufacturingCapabilityCard titleKey="manufacturing_capability_cnc_title" descriptionKey="manufacturing_capability_cnc_desc" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>} />
                    </AnimatedSection>
                    <AnimatedSection delay="150ms">
                        <ManufacturingCapabilityCard titleKey="manufacturing_capability_composites_title" descriptionKey="manufacturing_capability_composites_desc" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 12l4.179 2.25m0 0l5.571 3 5.571-3m0 0l4.179-2.25L12 9.75l-4.179-2.25m11.142 0l-5.571 3-5.571-3" /></svg>} />
                    </AnimatedSection>
                    <AnimatedSection delay="300ms">
                        <ManufacturingCapabilityCard titleKey="manufacturing_capability_additive_title" descriptionKey="manufacturing_capability_additive_desc" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9.75l-9-5.25M12 7.5v9.75" /></svg>} />
                    </AnimatedSection>
                    <AnimatedSection>
                        <ManufacturingCapabilityCard titleKey="manufacturing_capability_electronics_title" descriptionKey="manufacturing_capability_electronics_desc" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l-1.5-1.5m1.5 1.5l1.5-1.5m-1.5 1.5v4.5m1.5-4.5l-1.5-1.5m1.5 1.5l1.5-1.5m0 0l-1.5-1.5m1.5 1.5l1.5 1.5m-1.5-1.5v4.5m1.5-4.5l1.5 1.5m0 0l1.5-1.5m1.5 1.5l-1.5 1.5m1.5-1.5v4.5m0-4.5l1.5 1.5m1.5-1.5l-1.5-1.5m1.5 1.5l1.5 1.5m1.5-1.5v4.5m1.5-4.5l1.5 1.5M12 9l-1.5-1.5m1.5 1.5l1.5-1.5m-1.5 1.5V3m1.5 6l-1.5-1.5m1.5 1.5l1.5 1.5m-1.5-1.5V3m1.5 6l1.5 1.5m0 0l1.5-1.5M12 3v3.75m0 0l1.5-1.5M12 6.75L10.5 5.25m-3 12l-1.5 1.5m1.5-1.5l1.5 1.5m-1.5-1.5v-4.5m1.5 4.5l-1.5 1.5m1.5-1.5l1.5 1.5m0 0l-1.5 1.5m1.5-1.5l1.5-1.5m-1.5 1.5v-4.5m1.5 4.5l1.5-1.5M12 15l-1.5 1.5m1.5-1.5l1.5 1.5m-1.5-1.5V21m1.5-6l-1.5 1.5m1.5-1.5l1.5-1.5m-1.5 1.5V21m1.5-6l1.5-1.5m0 0l1.5 1.5" /></svg>} />
                    </AnimatedSection>
                    <AnimatedSection delay="150ms">
                        <ManufacturingCapabilityCard titleKey="manufacturing_capability_integration_title" descriptionKey="manufacturing_capability_integration_desc" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25v2.25A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" /></svg>} />
                    </AnimatedSection>
                    <AnimatedSection delay="300ms">
                        <ManufacturingCapabilityCard titleKey="manufacturing_capability_qa_title" descriptionKey="manufacturing_capability_qa_desc" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
                    </AnimatedSection>
                </div>
            </div>
        </section>

        {/* Latest News Section */}
        <section className="py-32 bg-lightBg dark:bg-surfaceDark/50">
            <div className="container mx-auto px-6">
                <AnimatedSection className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight font-display mb-6">{t('industry_news_title')}</h2>
                    <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">{t('industry_news_subtitle')}</p>
                </AnimatedSection>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {latestNews.map((article, index) => (
                        <AnimatedSection key={article.id} delay={`${index * 150}ms`}>
                            <div className="group bg-surface dark:bg-surfaceDark rounded-3xl shadow-sm overflow-hidden h-full flex flex-col border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                                <div className="relative h-56 overflow-hidden">
                                    <img src={article.image} alt={t(article.titleKey)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <p className="text-xs text-primary font-bold uppercase tracking-widest mb-3">{t(article.dateKey)}</p>
                                    <NewsCategoryBadge category={t(article.categoryKey)} />
                                    <h3 className="text-xl font-bold text-textDark dark:text-textLight mb-4 font-display leading-tight group-hover:text-primary transition-colors">{t(article.titleKey)}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{t(article.descKey)}</p>
                                    <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5">
                                        <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView({ page: 'News' }); }} className="font-bold text-primary group-hover:translate-x-2 transition-transform inline-block">
                                            {t('read_more')} <span className="ml-2">&rarr;</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    </div>
  );
};

export default IndustryPage;