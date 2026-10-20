import React from 'react';
import { CurrentView } from '../types';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeader from '../components/SectionHeader';
import { INDUSTRIES, MEDIA_FILES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

interface ProductionPageProps {
  setCurrentView: (view: CurrentView) => void;
}

const TechCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg h-full border border-gray-200 dark:border-gray-700 hover:border-primaryDark dark:hover:border-goldAccent transform transition-all duration-300 hover:-translate-y-1">
        <div className="w-12 h-12 text-primaryDark dark:text-goldAccent mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-primaryDark dark:text-goldAccent mb-2">{title}</h3>
        <p className="text-textDark/80 dark:text-textLight/80">{description}</p>
    </div>
);

const ProcessStep: React.FC<{ step: string; title: string; description: string; icon: React.ReactNode }> = ({ step, title, description, icon }) => (
    <div className="flex items-start space-x-6">
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-primaryDark text-white flex items-center justify-center text-2xl font-bold">{step}</div>
            <div className="w-1 h-24 bg-primaryDark/30 mt-2"></div>
        </div>
        <div>
            <div className="w-12 h-12 text-primaryDark dark:text-goldAccent mb-2">{icon}</div>
            <h3 className="text-xl font-bold text-textDark dark:text-textLight mb-2">{title}</h3>
            <p className="text-textDark/80 dark:text-textLight/80">{description}</p>
        </div>
    </div>
);

const DownloadItem: React.FC<{ title: string; fileType: string; fileSize: string; }> = ({ title, fileType, fileSize }) => (
    <a href="#" className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between hover:bg-primaryDark/5 dark:hover:bg-gray-700/50 transition-colors">
        <div className="flex items-center space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primaryDark dark:text-goldAccent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <div>
                <p className="font-semibold text-textDark dark:text-textLight">{title}</p>
                <p className="text-xs text-textDark/70 dark:text-textLight/70">{fileType} &bull; {fileSize}</p>
            </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primaryDark/70 dark:text-goldAccent/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
    </a>
);


const ProductionPage: React.FC<ProductionPageProps> = ({ setCurrentView }) => {
  const { language, t } = useLanguage();

  return (
    <div className="bg-lightBg dark:bg-gray-900">
      {/* 1. Hero Section */}
      <div className="relative py-28 px-6 bg-center bg-cover image-wrapper" style={{backgroundImage: "url('https://images.unsplash.com/photo-1556132194-2f2de153a817?q=80&w=1920&auto=format&fit=crop')"}}>
          <div className="absolute inset-0 bg-primaryDark/70"></div>
          <div className="relative container mx-auto">
              <AnimatedSection>
                  <SectionHeader title={t('production_header_title')} subtitle={t('production_header_subtitle')} />
              </AnimatedSection>
          </div>
      </div>
      
      {/* 2. Overview of Production Operations */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
            <AnimatedSection className="text-center">
                <h2 className="text-3xl md:text-4xl font-semibold text-textDark dark:text-textLight mb-4 font-montserrat">{t('production_overview_title')}</h2>
                <p className="text-lg text-textDark/80 dark:text-textLight/80">{t('production_overview_body')}</p>
            </AnimatedSection>
        </div>
      </section>

      {/* 3. Production Divisions */}
      <section className="py-24 bg-primaryDark/5 dark:bg-gray-800">
        <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-semibold text-textDark dark:text-textLight font-montserrat">{t('production_divisions_title')}</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                {INDUSTRIES.slice(0, 5).map((industry, index) => (
                    <AnimatedSection key={industry.id} delay={`${index * 100}ms`}>
                        <div 
                            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg h-full flex flex-col items-center text-center p-6 group hover:shadow-xl transition-shadow duration-300 cursor-pointer" 
                            onClick={() => setCurrentView({ page: 'Industry', industryId: industry.id })}
                        >
                            <div className="w-16 h-16 text-primaryDark dark:text-goldAccent mb-4" dangerouslySetInnerHTML={{ __html: industry.icon || '' }}></div>
                            <h3 className="text-lg font-bold text-primaryDark dark:text-goldAccent mb-2">{industry.fullName[language]}</h3>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
      </section>

      {/* 4. Production Process Flow */}
      <section className="py-24">
        <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-semibold text-textDark dark:text-textLight font-montserrat">{t('production_process_title')}</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <AnimatedSection><ProcessStep step="01" title={t('production_process1_title')} description={t('production_process1_desc')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>} /></AnimatedSection>
                <AnimatedSection delay="200ms"><ProcessStep step="02" title={t('production_process2_title')} description={t('production_process2_desc')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>} /></AnimatedSection>
                <AnimatedSection delay="400ms"><ProcessStep step="03" title={t('production_process3_title')} description={t('production_process3_desc')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} /></AnimatedSection>
            </div>
        </div>
      </section>

      {/* 5. Technologies & Manufacturing Systems */}
      <section id="technologies" className="py-24 bg-lightBg dark:bg-gray-800 scroll-mt-20">
        <div className="container mx-auto px-6">
            <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-semibold text-textDark dark:text-textLight mb-12 text-center font-montserrat">{t('production_tech_title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <TechCard title={t('production_tech_cnc_title')} description={t('production_tech_cnc_desc')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 12l4.179 2.25m0 0l5.571 3 5.571-3m0 0l4.179-2.25L12 9.75l-4.179-2.25m11.142 0l-5.571 3-5.571-3" /></svg>} />
                    <TechCard title={t('production_tech_robotics_title')} description={t('production_tech_robotics_desc')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l-1.5-1.5m1.5 1.5l1.5-1.5m-1.5 1.5v4.5m1.5-4.5l-1.5-1.5m1.5 1.5l1.5-1.5m0 0l-1.5-1.5m1.5 1.5l1.5 1.5m-1.5-1.5v4.5m1.5-4.5l1.5 1.5m0 0l1.5-1.5m1.5 1.5l-1.5 1.5m1.5-1.5v4.5m0-4.5l1.5 1.5m1.5-1.5l-1.5-1.5m1.5 1.5l1.5 1.5m1.5-1.5v4.5m1.5-4.5l1.5 1.5M12 9l-1.5-1.5m1.5 1.5l1.5-1.5m-1.5 1.5V3m1.5 6l-1.5-1.5m1.5 1.5l1.5 1.5m-1.5-1.5V3m1.5 6l1.5 1.5m0 0l1.5-1.5M12 3v3.75m0 0l1.5-1.5M12 6.75L10.5 5.25m-3 12l-1.5 1.5m1.5-1.5l1.5 1.5m-1.5-1.5v-4.5m1.5 4.5l-1.5 1.5m1.5-1.5l1.5 1.5m0 0l-1.5 1.5m1.5-1.5l1.5-1.5m-1.5 1.5v-4.5m1.5 4.5l1.5-1.5M12 15l-1.5 1.5m1.5-1.5l1.5 1.5m-1.5-1.5V21m1.5-6l-1.5 1.5m1.5-1.5l1.5-1.5m-1.5 1.5V21m1.5-6l1.5-1.5m0 0l1.5 1.5" /></svg>} />
                    <TechCard title={t('production_tech_cadcam_title')} description={t('production_tech_cadcam_desc')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-1.621-.871a3 3 0 01-.879-2.122v-1.007m-5.14.004a3 3 0 015.14 0" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4" /></svg>} />
                </div>
            </AnimatedSection>
        </div>
      </section>

      {/* 6 & 7. Capacity & Quality Assurance */}
      <section className="py-24">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatedSection>
                <h2 className="text-3xl font-semibold text-textDark dark:text-textLight mb-4 font-montserrat">{t('production_capacity_title')}</h2>
                <ul className="list-disc list-inside space-y-3 text-textDark/80 dark:text-textLight/80">
                    <li>{t('production_capacity_item1')}</li>
                    <li>{t('production_capacity_item2')}</li>
                    <li>{t('production_capacity_item3')}</li>
                    <li>{t('production_capacity_item4')}</li>
                </ul>
            </AnimatedSection>
            <AnimatedSection delay="200ms">
                <h2 className="text-3xl font-semibold text-textDark dark:text-textLight mb-4 font-montserrat">{t('production_quality_title')}</h2>
                <ul className="list-disc list-inside space-y-3 text-textDark/80 dark:text-textLight/80">
                    <li>{t('production_quality_item1')}</li>
                    <li>{t('production_quality_item2')}</li>
                    <li>{t('production_quality_item3')}</li>
                    <li>{t('production_quality_item4')}</li>
                </ul>
            </AnimatedSection>
        </div>
      </section>

      {/* 8 & 9. R&D and Safety */}
      <section className="py-24 bg-primaryDark/5 dark:bg-gray-800">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatedSection>
                <h2 className="text-3xl font-semibold text-textDark dark:text-textLight mb-4 font-montserrat">{t('production_rd_title')}</h2>
                <p className="text-textDark/80 dark:text-textLight/80">{t('production_rd_body')}</p>
            </AnimatedSection>
            <AnimatedSection delay="200ms">
                <h2 className="text-3xl font-semibold text-textDark dark:text-textLight mb-4 font-montserrat">{t('production_safety_title')}</h2>
                <p className="text-textDark/80 dark:text-textLight/80">{t('production_safety_body')}</p>
            </AnimatedSection>
        </div>
      </section>
      
      {/* 10. Major Projects & Achievements */}
      <section className="py-24">
        <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-semibold text-textDark dark:text-textLight font-montserrat">{t('production_achievements_title')}</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <AnimatedSection><div className="text-center p-6"><p className="text-5xl font-bold text-primaryDark dark:text-goldAccent">50%</p><p className="text-textDark/80 dark:text-textLight/80 mt-2">{t('production_achievements_item1')}</p></div></AnimatedSection>
                <AnimatedSection delay="200ms"><div className="text-center p-6"><p className="text-5xl font-bold text-primaryDark dark:text-goldAccent">99.8%</p><p className="text-textDark/80 dark:text-textLight/80 mt-2">{t('production_achievements_item2')}</p></div></AnimatedSection>
                <AnimatedSection delay="400ms"><div className="text-center p-6"><p className="text-5xl font-bold text-primaryDark dark:text-goldAccent">20+</p><p className="text-textDark/80 dark:text-textLight/80 mt-2">{t('production_achievements_item3')}</p></div></AnimatedSection>
            </div>
        </div>
      </section>

      {/* 11. Gallery */}
      <section className="py-24 bg-primaryDark/5 dark:bg-gray-800">
        <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-semibold text-textDark dark:text-textLight font-montserrat">{t('production_gallery_title')}</h2>
            </AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {MEDIA_FILES.filter(f => ['m9', 'm12', 'm17', 'm18'].includes(f.id)).map(img => (
                     <div key={img.id} className="image-wrapper rounded-md overflow-hidden aspect-video shadow-lg">
                        <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
             <div className="text-center mt-8">
                <button onClick={() => setCurrentView({ page: 'Gallery' })} className="font-bold text-accentStrong hover:text-accentHover transition-colors group">
                    {t('news_gallery_cta')} <span className="transition-transform group-hover:translate-x-1 inline-block">&rarr;</span>
                </button>
            </div>
        </div>
      </section>

      {/* 12. Downloads */}
      <section id="downloads" className="py-24">
         <div className="container mx-auto px-6">
            <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-semibold text-textDark dark:text-textLight mb-12 text-center font-montserrat">{t('production_downloads_title')}</h2>
                <div className="max-w-2xl mx-auto space-y-4">
                    <DownloadItem title={t('production_downloads_item1')} fileType="PDF" fileSize="7.8 MB" />
                    <DownloadItem title={t('production_downloads_item2')} fileType="PDF" fileSize="3.1 MB" />
                </div>
            </AnimatedSection>
         </div>
      </section>
      
      {/* 13. Contact for Production Inquiries */}
      <section id="contact" className="py-24 bg-primaryDark text-textLight scroll-mt-20">
        <div className="container mx-auto px-6">
            <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-semibold text-white mb-12 text-center font-montserrat">{t('production_contact_title')}</h2>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-center items-start">
                     <div className="space-y-2">
                        <h4 className="font-bold text-goldAccent text-lg">{t('production_contact_dept1')}</h4>
                        <p className="text-textLight/80">Email: production.dept@deig.gov</p>
                    </div>
                     <div className="space-y-2">
                        <h4 className="font-bold text-goldAccent text-lg">{t('production_contact_dept2')}</h4>
                        <p className="text-textLight/80">Email: procurement.prod@deig.gov</p>
                    </div>
                </div>
            </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default ProductionPage;