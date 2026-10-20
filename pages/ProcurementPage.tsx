import React from 'react';
import SectionHeader from '../components/SectionHeader';
import AnimatedSection from '../components/AnimatedSection';
import { CurrentView } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { TENDERS } from '../constants';

interface ProcurementPageProps {
  setCurrentView: (view: CurrentView) => void;
}

const PrincipleCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg h-full border border-gray-200 dark:border-gray-700">
        <div className="w-12 h-12 text-primaryDark dark:text-goldAccent mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-primaryDark dark:text-goldAccent mb-2">{title}</h3>
        <p className="text-textDark/80 dark:text-textLight/80">{description}</p>
    </div>
);

const ProcessStep: React.FC<{ step: string; title: string; description: string; icon: React.ReactNode }> = ({ step, title, description, icon }) => (
    <div className="relative pl-16">
        <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-primaryDark text-white flex items-center justify-center text-xl font-bold border-4 border-lightBg dark:border-gray-900">{step}</div>
        <div className="ml-4">
            {icon}
            <h3 className="text-xl font-bold text-textDark dark:text-textLight mt-4 mb-2">{title}</h3>
            <p className="text-textDark/80 dark:text-textLight/80">{description}</p>
        </div>
    </div>
);

const CategoryPill: React.FC<{ title: string; icon: React.ReactNode }> = ({ title, icon }) => (
    <div className="bg-primaryDark/5 dark:bg-gray-800/50 p-4 rounded-lg flex items-center space-x-4">
        <div className="w-8 h-8 text-primaryDark dark:text-goldAccent flex-shrink-0">{icon}</div>
        <h4 className="font-semibold text-textDark dark:text-textLight">{title}</h4>
    </div>
);

const DownloadItem: React.FC<{ title: string; fileType: string; }> = ({ title, fileType }) => (
    <a href="#" className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between hover:bg-primaryDark/5 dark:hover:bg-gray-700/50 transition-colors">
        <div className="flex items-center space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primaryDark dark:text-goldAccent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <div>
                <p className="font-semibold text-textDark dark:text-textLight">{title}</p>
                <p className="text-xs text-textDark/70 dark:text-textLight/70">{fileType}</p>
            </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primaryDark/70 dark:text-goldAccent/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
    </a>
);


const ProcurementPage: React.FC<ProcurementPageProps> = ({ setCurrentView }) => {
  const { language, t } = useLanguage();
  const openTenders = TENDERS.filter(tender => tender.status === 'Open').slice(0, 2);

  return (
    <div className="bg-lightBg dark:bg-gray-900">
      {/* 1. Hero Section */}
      <div className="relative py-28 px-6 bg-center bg-cover image-wrapper" style={{backgroundImage: "url('https://images.unsplash.com/photo-1578575437136-7242e3a5961f?q=80&w=1920&auto=format&fit=crop')"}}>
          <div className="absolute inset-0 bg-primaryDark/70"></div>
          <div className="relative container mx-auto">
              <AnimatedSection>
                  <SectionHeader title={t('procurement_hero_title')} subtitle={t('procurement_hero_subtitle')} />
              </AnimatedSection>
          </div>
      </div>
      
      <div className="container mx-auto px-6 py-24 space-y-24">
        {/* 2. Philosophy & Strategy */}
        <section>
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-textDark dark:text-textLight font-montserrat">{t('procurement_philosophy_strategy_title')}</h2>
            <p className="text-lg text-textDark/80 dark:text-textLight/80 max-w-3xl mx-auto mt-4">{t('procurement_philosophy_strategy_body')}</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedSection><PrincipleCard title={t('procurement_principle1_title')} description={t('procurement_principle1_desc')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.004 9.004 0 0112 21" /></svg>} /></AnimatedSection>
            <AnimatedSection delay="150ms"><PrincipleCard title={t('procurement_principle2_title')} description={t('procurement_principle2_desc')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691v4.992h4.992m0 0l-3.181-3.183a8.25 8.25 0 00-11.667 0l-3.181 3.183" /></svg>} /></AnimatedSection>
            <AnimatedSection delay="300ms"><PrincipleCard title={t('procurement_principle3_title')} description={t('procurement_principle3_desc')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 21a6 6 0 006-6v-1a4 4 0 00-4-4H9a4 4 0 00-4 4v1a6 6 0 006 6z" /></svg>} /></AnimatedSection>
            <AnimatedSection delay="450ms"><PrincipleCard title={t('procurement_principle4_title')} description={t('procurement_principle4_desc')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} /></AnimatedSection>
          </div>
        </section>

        {/* 3. How to Become a Supplier */}
        <section>
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-textDark dark:text-textLight font-montserrat">{t('procurement_how_to_title')}</h2>
          </AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              <AnimatedSection><ProcessStep step="01" title={t('procurement_step1_title')} description={t('procurement_step1_desc')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primaryDark dark:text-goldAccent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} /></AnimatedSection>
              <AnimatedSection delay="200ms"><ProcessStep step="02" title={t('procurement_step2_title')} description={t('procurement_step2_desc')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primaryDark dark:text-goldAccent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h2m-2 4h2m-2 4h2m-2 4h2" /></svg>} /></AnimatedSection>
              <AnimatedSection delay="400ms"><ProcessStep step="03" title={t('procurement_step3_title')} description={t('procurement_step3_desc')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primaryDark dark:text-goldAccent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>} /></AnimatedSection>
              <AnimatedSection delay="600ms"><ProcessStep step="04" title={t('procurement_step4_title')} description={t('procurement_step4_desc')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primaryDark dark:text-goldAccent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>} /></AnimatedSection>
            </div>
            <div className="text-center mt-12">
              <button onClick={() => setCurrentView({ page: 'SupplierRegistration' })} className="bg-accentStrong text-white font-bold py-3 px-8 rounded-lg hover:bg-accentHover transition-colors duration-300 btn-glow text-lg">{t('supplier_submit_button')}</button>
            </div>
          </div>
        </section>

        {/* 4. Open Tenders */}
        <section>
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-textDark dark:text-textLight font-montserrat">{t('procurement_open_tenders_title')}</h2>
          </AnimatedSection>
          <div className="space-y-6 max-w-4xl mx-auto">
            {openTenders.map(tender => (
              <AnimatedSection key={tender.id}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-primaryDark dark:border-goldAccent">
                  <h3 className="text-xl font-bold text-textDark dark:text-textLight">{tender.title[language]}</h3>
                  <p className="text-textDark/80 dark:text-textLight/80 mt-1 text-sm">Ref: {tender.reference}</p>
                  <p className="text-textDark/80 dark:text-textLight/80 mt-2 text-sm"><strong>{t('tenders_closing_date')}:</strong> {new Date(tender.closingDate).toLocaleDateString(language === 'am' ? 'am-ET' : 'en-US')}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => setCurrentView({ page: 'Tenders' })} className="bg-primaryDark text-white font-bold py-3 px-8 rounded-lg hover:bg-primaryDark/80 transition-colors duration-300 text-lg">{t('procurement_view_all_tenders')}</button>
          </div>
        </section>

        {/* 5. Categories of Procurement */}
        <section>
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-textDark dark:text-textLight font-montserrat">{t('procurement_categories_title')}</h2>
          </AnimatedSection>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatedSection><CategoryPill title={t('procurement_category_materials')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>} /></AnimatedSection>
              <AnimatedSection delay="100ms"><CategoryPill title={t('procurement_category_electronics')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l-1.5-1.5m1.5 1.5l1.5-1.5m-1.5 1.5v4.5m1.5-4.5l-1.5-1.5m1.5 1.5l1.5-1.5m0 0l-1.5-1.5m1.5 1.5l1.5 1.5m-1.5-1.5v4.5m1.5-4.5l1.5 1.5m0 0l1.5-1.5m1.5 1.5l-1.5 1.5m1.5-1.5v4.5m0-4.5l1.5 1.5m1.5-1.5l-1.5-1.5m1.5 1.5l1.5 1.5m1.5-1.5v4.5m1.5-4.5l1.5 1.5M12 9l-1.5-1.5m1.5 1.5l1.5-1.5m-1.5 1.5V3m1.5 6l-1.5-1.5m1.5 1.5l1.5 1.5m-1.5-1.5V3m1.5 6l1.5 1.5m0 0l1.5-1.5M12 3v3.75m0 0l1.5-1.5M12 6.75L10.5 5.25m-3 12l-1.5 1.5m1.5-1.5l1.5 1.5m-1.5-1.5v-4.5m1.5 4.5l-1.5 1.5m1.5-1.5l1.5 1.5m0 0l-1.5 1.5m1.5-1.5l1.5-1.5m-1.5 1.5v-4.5m1.5 4.5l1.5-1.5M12 15l-1.5 1.5m1.5-1.5l1.5 1.5m-1.5-1.5V21m1.5-6l-1.5 1.5m1.5-1.5l1.5-1.5m-1.5 1.5V21m1.5-6l1.5-1.5m0 0l1.5 1.5" /></svg>} /></AnimatedSection>
              <AnimatedSection delay="200ms"><CategoryPill title={t('procurement_category_machinery')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>} /></AnimatedSection>
              <AnimatedSection delay="300ms"><CategoryPill title={t('procurement_category_logistics')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2-2h8a1 1 0 001-1z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20.59 4.85l-3.33-3.33A1 1 0 0016.59 1H14v4h5.59a1 1 0 00.59-.41.41.41 0 00.01-.2zM17 10h4" /></svg>} /></AnimatedSection>
              <AnimatedSection delay="400ms"><CategoryPill title={t('procurement_category_it')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75c0 3.228-3.413 7.78-5.25 9.75-1.838-1.97-5.25-6.522-5.25-9.75 0-3.038 2.34-5.25 5.25-5.25s5.25 2.212 5.25 5.25z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>} /></AnimatedSection>
              <AnimatedSection delay="500ms"><CategoryPill title={t('procurement_category_professional')} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} /></AnimatedSection>
          </div>
        </section>

        {/* 6. Supplier Code of Conduct */}
        <section>
           <AnimatedSection>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-4xl mx-auto">
              <h2 className="text-3xl font-semibold text-textDark dark:text-textLight mb-4 font-montserrat">{t('procurement_coc_section_title')}</h2>
              <p className="text-textDark/80 dark:text-textLight/80 mb-6">{t('procurement_coc_section_body')}</p>
              <ul className="list-disc list-inside space-y-3 text-textDark/80 dark:text-textLight/80">
                <li dangerouslySetInnerHTML={{ __html: t('procurement_coc_item1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('procurement_coc_item2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('procurement_coc_item3') }} />
                <li dangerouslySetInnerHTML={{ __html: t('procurement_coc_item4') }} />
              </ul>
            </div>
           </AnimatedSection>
        </section>

        {/* 7. Downloads */}
        <section>
          <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-semibold text-textDark dark:text-textLight mb-12 text-center font-montserrat">{t('procurement_downloads_title')}</h2>
              <div className="max-w-2xl mx-auto space-y-4">
                  <DownloadItem title={t('procurement_download_policy')} fileType="PDF" />
                  <DownloadItem title={t('procurement_download_form')} fileType="PDF" />
                  <DownloadItem title={t('procurement_download_coc')} fileType="PDF" />
              </div>
          </AnimatedSection>
        </section>

        {/* 8. Contact */}
        <section className="py-24 bg-primaryDark text-textLight rounded-lg">
          <div className="container mx-auto px-6">
              <AnimatedSection>
                  <h2 className="text-3xl md:text-4xl font-semibold text-white mb-12 text-center font-montserrat">{t('procurement_contact_title')}</h2>
                  <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center items-start">
                      <div className="space-y-2"><h4 className="font-bold text-goldAccent text-lg">{t('procurement_contact_email')}</h4><p className="text-textLight/80">procurement@deig.gov</p></div>
                      <div className="space-y-2"><h4 className="font-bold text-goldAccent text-lg">{t('procurement_contact_phone')}</h4><p className="text-textLight/80">+123 456 7890 (Ext. 2)</p></div>
                      <div className="space-y-2"><h4 className="font-bold text-goldAccent text-lg">{t('procurement_contact_address')}</h4><p className="text-textLight/80">123 Defense Avenue, Capital City, Procurement Wing</p></div>
                  </div>
              </AnimatedSection>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProcurementPage;
