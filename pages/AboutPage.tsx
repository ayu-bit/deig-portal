import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import ContentCard from '../components/ContentCard';
import AnimatedSection from '../components/AnimatedSection';
import Timeline from '../components/Timeline';
import { CurrentView, Industry, Milestone } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { fetchMilestones } from '../services/apiService';

interface AboutPageProps {
  setCurrentView: (view: CurrentView) => void;
  industries: Industry[];
}

const ObjectiveCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
    <div className="bg-surface dark:bg-surfaceDark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 hover:border-primary/30 dark:hover:border-primary/30 transform transition-all duration-500 hover:-translate-y-1.5 flex flex-col items-start group">
        <div className="w-14 h-14 bg-primary/5 dark:bg-primary/10 text-primary rounded-xl mb-6 flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white">
          <div className="w-8 h-8">{icon}</div>
        </div>
        <h3 className="text-xl font-bold text-textDark dark:text-textLight mb-3 font-display">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
);

const CapabilityPill: React.FC<{ title: string; icon: React.ReactNode }> = ({ title, icon }) => (
    <div className="bg-surface dark:bg-surfaceDark p-5 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center space-x-5 group hover:border-primary/30 transition-all duration-300">
        <div className="w-10 h-10 bg-primary/5 text-primary rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
          <div className="w-6 h-6">{icon}</div>
        </div>
        <h4 className="font-bold text-textDark dark:text-textLight font-display">{title}</h4>
    </div>
);

const LeadershipCard: React.FC<{ name: string; titleKey: string; image: string }> = ({ name, titleKey, image }) => {
    const { t } = useLanguage();
    return (
        <div className="text-center group">
            <div className="relative w-40 h-40 mx-auto mb-6">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-gray-100 dark:border-white/10 shadow-lg group-hover:border-primary transition-colors duration-500">
                <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              </div>
            </div>
            <h4 className="text-xl font-bold text-textDark dark:text-textLight font-display mb-1">{name}</h4>
            <p className="text-primary text-sm font-bold uppercase tracking-widest">{t(titleKey)}</p>
        </div>
    );
};

const AchievementCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
    <div className="bg-surface dark:bg-surfaceDark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 hover:border-primary/30 dark:hover:border-primary/30 transform transition-all duration-500 hover:-translate-y-1.5 flex flex-col items-start group">
        <div className="w-14 h-14 bg-primary/5 dark:bg-primary/10 text-primary rounded-xl mb-6 flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white">
          <div className="w-8 h-8">{icon}</div>
        </div>
        <h3 className="text-xl font-bold text-textDark dark:text-textLight mb-3 font-display">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
);

const AboutPage: React.FC<AboutPageProps> = ({ setCurrentView, industries }) => {
  const { language, t } = useLanguage();
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const milestonesData = await fetchMilestones();
        setMilestones(milestonesData);
      } catch (error) {
        console.error("Failed to fetch milestones:", error);
      }
    };
    loadData();
  }, []);
  
  const handleIndustryClick = (industryId: string) => {
    setCurrentView({ page: 'Industry', industryId });
  };

  return (
    <div className="bg-lightBg dark:bg-surfaceDark/50">
      {/* 1. Introduction / Overview */}
      <section className="relative py-32 overflow-hidden bg-surfaceDark">
          <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-surfaceDark/80 via-surfaceDark to-surfaceDark"></div>
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
              
              {/* Animated Grid Effect */}
              <div className="absolute inset-0 opacity-20" 
                   style={{
                       backgroundImage: `linear-gradient(to right, #1075BB 1px, transparent 1px), linear-gradient(to bottom, #1075BB 1px, transparent 1px)`,
                       backgroundSize: '60px 60px'
                   }}>
              </div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
              <AnimatedSection>
                  <div className="max-w-4xl mx-auto text-center">
                      <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-xs font-bold tracking-widest uppercase">
                        {t('about_badge') || 'Our Legacy'}
                      </div>
                      <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 font-display tracking-tight leading-tight">
                          {t('about_intro_title')}
                      </h1>
                      <div className="space-y-6 text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
                          <p>{t('about_intro_p1')}</p>
                          <p>{t('about_intro_p2')}</p>
                      </div>
                      <div className="mt-12 w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                  </div>
              </AnimatedSection>
          </div>
      </section>

      {/* 2. History & Background */}
      <section id="history" className="py-32 bg-lightBg dark:bg-surfaceDark/30 scroll-mt-20">
        <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight font-display mb-6">{t('about_history_title')}</h2>
                <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
                <p className="text-gray-500 dark:text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">{t('about_history_subtitle')}</p>
            </AnimatedSection>
            <AnimatedSection>
                <Timeline milestones={milestones} />
            </AnimatedSection>
        </div>
      </section>

      {/* 3. Mission, Vision & Core Values */}
      <section id="mission" className="py-32 bg-surface dark:bg-surfaceDark scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <AnimatedSection><ContentCard title={t('about_mission_title')}><p>{t('about_mission_text')}</p></ContentCard></AnimatedSection>
            <AnimatedSection delay="200ms"><ContentCard title={t('about_vision_title')}><p>{t('about_vision_text')}</p></ContentCard></AnimatedSection>
            <AnimatedSection delay="400ms"><ContentCard title={t('about_values_title')}><p>{t('about_values_text')}</p></ContentCard></AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* 4. Organizational Structure */}
       <section className="py-32 bg-lightBg dark:bg-surfaceDark/30">
        <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight font-display mb-6">{t('about_org_title')}</h2>
                <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
                <p className="text-gray-500 dark:text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">{t('about_org_subtitle_new')}</p>
            </AnimatedSection>
            <AnimatedSection>
                 <div className="max-w-5xl mx-auto bg-surface dark:bg-surfaceDark p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-primary/5 border border-gray-100 dark:border-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="relative z-10 rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-inner">
                        <img src="https://i.imgur.com/example-org-chart.png" alt="Organizational Chart" className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]" />
                    </div>
                 </div>
            </AnimatedSection>
        </div>
      </section>

      {/* 5. Our Industry Divisions */}
      <section className="py-32 bg-surface dark:bg-surfaceDark/50">
        <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight font-display mb-6">{t('home_industry_divisions_title')}</h2>
                <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {industries.slice(0, 5).map((industry, index) => (
                    <AnimatedSection key={industry.id} delay={`${index * 100}ms`}>
                        <div 
                            className="bg-surface dark:bg-surfaceDark rounded-3xl shadow-sm overflow-hidden h-full flex flex-col border border-gray-100 dark:border-white/5 group hover:shadow-xl transition-all duration-500 cursor-pointer" 
                            onClick={() => handleIndustryClick(industry.id)}
                        >
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-2xl font-bold text-primary mb-4 font-display group-hover:text-primaryDark transition-colors">{industry.fullName[language]}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{industry.description[language]}</p>
                                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5">
                                    <span className="font-bold text-primary group-hover:translate-x-2 transition-transform inline-block">
                                        {t('learn_more')} <span className="ml-2">&rarr;</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
      </section>

      {/* 6. Strategic Objectives */}
      <section className="py-32 bg-lightBg dark:bg-surfaceDark/30">
        <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight font-display mb-6">{t('about_strategic_obj_title')}</h2>
                <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
                <p className="text-gray-500 dark:text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">{t('about_strategic_obj_subtitle')}</p>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                <AnimatedSection><ObjectiveCard title={t('about_obj1_title')} description={t('about_obj1_desc')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691v4.992h4.992m0 0l-3.181-3.183a8.25 8.25 0 00-11.667 0l-3.181 3.183" /></svg>} /></AnimatedSection>
                <AnimatedSection delay="150ms"><ObjectiveCard title={t('about_obj2_title')} description={t('about_obj2_desc')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c.239.05.48.09.72.128a25.043 25.043 0 011.5 0c.24-.038.481-.078.72-.128m6.15 3.693c.24-.038.48-.077.72-.128a25.029 25.029 0 00-3.14 0c.24.05.48.09.72.128a25.043 25.043 0 011.5 0" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 14.25V19.5a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 19.5v-5.25m-18 0l2.25-2.25a2.25 2.25 0 011.591-.659h9.918a2.25 2.25 0 011.591.659L21 14.25" /></svg>} /></AnimatedSection>
                <AnimatedSection delay="300ms"><ObjectiveCard title={t('about_obj3_title')} description={t('about_obj3_desc')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" /></svg>} /></AnimatedSection>
                <AnimatedSection delay="450ms"><ObjectiveCard title={t('about_obj4_title')} description={t('about_obj4_desc')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.47-2.47a1.282 1.282 0 00-1.814-1.814L9.606 13.356m1.814 1.814l-2.47 2.47a1.282 1.282 0 001.814 1.814L11.42 15.17zM3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.192 0 7.82 2.762 9.41 6.59" /></svg>} /></AnimatedSection>
            </div>
        </div>
      </section>
      
      {/* 7. Key Capabilities & Expertise */}
      <section className="py-32 bg-surface dark:bg-surfaceDark/50">
        <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight font-display mb-6">{t('about_key_capabilities_title')}</h2>
                <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
                <p className="text-gray-500 dark:text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">{t('about_key_capabilities_subtitle')}</p>
            </AnimatedSection>
            <AnimatedSection>
                <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <CapabilityPill title={t('capability_engineering')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>} />
                    <CapabilityPill title={t('capability_manufacturing')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>} />
                    <CapabilityPill title={t('capability_project_management')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} />
                    <CapabilityPill title={t('capability_quality')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
                    <CapabilityPill title={t('capability_automation')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l-1.5-1.5m1.5 1.5l1.5-1.5m-1.5 1.5v4.5m1.5-4.5l-1.5-1.5m1.5 1.5l1.5-1.5m0 0l-1.5-1.5m1.5 1.5l1.5 1.5m-1.5-1.5v4.5m1.5-4.5l1.5 1.5m0 0l1.5-1.5m1.5 1.5l-1.5 1.5m1.5-1.5v4.5m0-4.5l1.5 1.5m1.5-1.5l-1.5-1.5m1.5 1.5l1.5 1.5m1.5-1.5v4.5m1.5-4.5l1.5 1.5M12 9l-1.5-1.5m1.5 1.5l1.5-1.5m-1.5 1.5V3m1.5 6l-1.5-1.5m1.5 1.5l1.5 1.5m-1.5-1.5V3m1.5 6l1.5 1.5m0 0l1.5-1.5M12 3v3.75m0 0l1.5-1.5M12 6.75L10.5 5.25m-3 12l-1.5 1.5m1.5-1.5l1.5 1.5m-1.5-1.5v-4.5m1.5 4.5l-1.5 1.5m1.5-1.5l1.5 1.5m0 0l-1.5 1.5m1.5-1.5l1.5-1.5m-1.5 1.5v-4.5m1.5 4.5l1.5-1.5M12 15l-1.5 1.5m1.5-1.5l1.5 1.5m-1.5-1.5V21m1.5-6l-1.5 1.5m1.5-1.5l1.5-1.5m-1.5 1.5V21m1.5-6l1.5-1.5m0 0l1.5 1.5" /></svg>} />
                     <CapabilityPill title={t('collective_logistics')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2-2h8a1 1 0 001-1z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20.59 4.85l-3.33-3.33A1 1 0 0016.59 1H14v4h5.59a1 1 0 00.59-.41.41.41 0 00.01-.2zM17 10h4" /></svg>} />
                </div>
            </AnimatedSection>
        </div>
      </section>

      {/* 8. Leadership Team */}
      <section className="bg-lightBg dark:bg-surfaceDark/30 py-32">
        <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight font-display mb-6">{t('about_leadership_title')}</h2>
                <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
                <p className="text-gray-500 dark:text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">{t('about_leadership_subtitle')}</p>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
                <AnimatedSection><LeadershipCard name="Gen. A. Abebe" titleKey="leadership_dg" image="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop" /></AnimatedSection>
                <AnimatedSection delay="150ms"><LeadershipCard name="Dr. B. Solomon" titleKey="leadership_head_eng" image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto-format&fit=crop" /></AnimatedSection>
                <AnimatedSection delay="300ms"><LeadershipCard name="C. Kebede" titleKey="leadership_coo" image="https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=400&auto-format&fit=crop" /></AnimatedSection>
                <AnimatedSection delay="450ms"><LeadershipCard name="D. Tadesse" titleKey="leadership_rd" image="https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=400&auto-format&fit=crop" /></AnimatedSection>
            </div>
        </div>
      </section>

      {/* 9. Facilities & Infrastructure */}
      <section className="py-32 bg-surface dark:bg-surfaceDark/50">
        <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight font-display mb-6">{t('about_facilities_title')}</h2>
                <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
                <p className="text-gray-500 dark:text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">{t('about_facilities_subtitle')}</p>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <AnimatedSection><ContentCard title={t('facility_hq_title')}><p>{t('facility_hq_desc')}</p></ContentCard></AnimatedSection>
                <AnimatedSection delay="150ms"><ContentCard title={t('facility_zones_title')}><p>{t('facility_zones_desc')}</p></ContentCard></AnimatedSection>
                <AnimatedSection delay="300ms"><ContentCard title={t('facility_labs_title')}><p>{t('facility_labs_desc')}</p></ContentCard></AnimatedSection>
            </div>
        </div>
      </section>

      {/* 10. Quality, Safety & Compliance */}
      <section className="py-32 bg-lightBg dark:bg-surfaceDark/30">
          <div className="container mx-auto px-6">
              <AnimatedSection className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight font-display mb-6">{t('about_quality_title')}</h2>
                <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
                <p className="text-gray-500 dark:text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">{t('about_quality_subtitle')}</p>
              </AnimatedSection>
              <div className="max-w-5xl mx-auto space-y-8">
                <AnimatedSection>
                    <div className="bg-surface dark:bg-surfaceDark p-8 rounded-3xl border border-gray-100 dark:border-white/5 flex items-center space-x-8 group hover:border-primary/30 transition-all duration-500">
                        <div className="w-20 h-20 bg-primary/5 text-primary rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                            <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24"><path d="M21 2H3v20h18V2zM11 18H7v-2h4v2zm4 0h-2v-2h2v2zm0-4h-6v-2h6v2zm0-4H7V8h8v2z"/></svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-textDark dark:text-textLight text-2xl font-display mb-2">ISO 9001:2015</h4>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{t('cert_iso_text')}</p>
                        </div>
                    </div>
                </AnimatedSection>
                <AnimatedSection delay="150ms">
                    <div className="bg-surface dark:bg-surfaceDark p-8 rounded-3xl border border-gray-100 dark:border-white/5 flex items-center space-x-8 group hover:border-primary/30 transition-all duration-500">
                        <div className="w-20 h-20 bg-primary/5 text-primary rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                            <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 9l4 2.18v6.32L12 22l7-4.5V11.18L23 9l-11-7zm0 2.37L19.5 9 12 12.5 4.5 9 12 4.37zM6 12.05l6 3.45 6-3.45v3.45l-6 3.45-6-3.45v-3.45z"/></svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-textDark dark:text-textLight text-2xl font-display mb-2">AS9100</h4>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{t('cert_as9100_text')}</p>
                        </div>
                    </div>
                </AnimatedSection>
                <AnimatedSection delay="300ms">
                    <div className="bg-surface dark:bg-surfaceDark p-8 rounded-3xl border border-gray-100 dark:border-white/5 flex items-center space-x-8 group hover:border-primary/30 transition-all duration-500">
                        <div className="w-20 h-20 bg-primary/5 text-primary rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-textDark dark:text-textLight text-2xl font-display mb-2">{t('quality_safety_policy')}</h4>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{t('quality_safety_policy_desc')}</p>
                        </div>
                    </div>
                </AnimatedSection>
              </div>
          </div>
      </section>

      {/* 11. Partnerships & Collaboration */}
      <section className="py-32 bg-surface dark:bg-surfaceDark/50">
        <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight font-display mb-6">{t('about_partnerships_title')}</h2>
                <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
                <p className="text-gray-500 dark:text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">{t('about_partnerships_subtitle')}</p>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <AnimatedSection><ContentCard title={t('partnerships_govt')}><p>{t('partnerships_govt_desc')}</p></ContentCard></AnimatedSection>
                <AnimatedSection delay="150ms"><ContentCard title={t('partnerships_local')}><p>{t('partnerships_local_desc')}</p></ContentCard></AnimatedSection>
                <AnimatedSection delay="300ms"><ContentCard title={t('partnerships_tech')}><p>{t('partnerships_tech_desc')}</p></ContentCard></AnimatedSection>
            </div>
        </div>
      </section>

      {/* 12. Achievements & Milestones */}
      <section className="py-32 bg-lightBg dark:bg-surfaceDark/30">
        <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight font-display mb-6">{t('about_achievements_title')}</h2>
                <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
                <p className="text-gray-500 dark:text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">{t('about_achievements_subtitle')}</p>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <AnimatedSection><AchievementCard title={t('achievement1_title')} description={t('achievement1_desc')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 013.375-3.375h9.75a3.375 3.375 0 013.375 3.375v1.875m-17.25 4.5h16.5" /></svg>} /></AnimatedSection>
                <AnimatedSection delay="150ms"><AchievementCard title={t('achievement2_title')} description={t('achievement2_desc')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M15.75 3v1.5M12 4.5v-1.5m0 18v-1.5M15.75 21v-1.5M19.5 8.25H21M19.5 15.75H21M12 19.5v-1.5m-2.25-6.75a3 3 0 106 0 3 3 0 00-6 0z" /></svg>} /></AnimatedSection>
                <AnimatedSection delay="300ms"><AchievementCard title={t('achievement3_title')} description={t('achievement3_desc')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>} /></AnimatedSection>
            </div>
        </div>
      </section>

      {/* 13. Corporate Social Responsibility (CSR) */}
      <section className="py-32 bg-surface dark:bg-surfaceDark/50">
        <div className="container mx-auto px-6 text-center max-w-4xl">
            <AnimatedSection>
                <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight font-display mb-8">{t('about_csr_title')}</h2>
                <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-12"></div>
                <p className="text-primary text-xl font-bold uppercase tracking-widest mb-6">{t('about_csr_subtitle')}</p>
                <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">{t('about_csr_body')}</p>
            </AnimatedSection>
        </div>
      </section>

      {/* 14. Contact Information */}
      <section id="contact" className="py-32 bg-surfaceDark text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-surfaceDark/80 via-surfaceDark to-surfaceDark"></div>
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
            <div className="absolute inset-0 opacity-10" 
                 style={{
                     backgroundImage: `linear-gradient(to right, #1075BB 1px, transparent 1px), linear-gradient(to bottom, #1075BB 1px, transparent 1px)`,
                     backgroundSize: '40px 40px'
                 }}>
            </div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
            <AnimatedSection>
                <h2 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">{t('about_contact_title')}</h2>
                <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-16"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    <div className="p-10 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 hover:border-primary/50 transition-all duration-500 group">
                        <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                        <h4 className="font-bold text-white text-xl mb-4 font-display">{t('about_contact_address')}</h4>
                        <p className="text-gray-400 leading-relaxed">123 Defense Avenue, Addis Ababa, Ethiopia</p>
                    </div>
                    <div className="p-10 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 hover:border-primary/50 transition-all duration-500 group">
                        <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </div>
                        <h4 className="font-bold text-white text-xl mb-4 font-display">{t('about_contact_email')}</h4>
                        <p className="text-gray-400 leading-relaxed">contact@deig.gov.et</p>
                    </div>
                    <div className="p-10 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 hover:border-primary/50 transition-all duration-500 group">
                        <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        </div>
                        <h4 className="font-bold text-white text-xl mb-4 font-display">{t('about_contact_phone')}</h4>
                        <p className="text-gray-400 leading-relaxed">+251 11 123 4567</p>
                    </div>
                </div>
            </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;