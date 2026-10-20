import React from 'react';
import SectionHeader from '../components/SectionHeader';
import AnimatedSection from '../components/AnimatedSection';
import { useLanguage } from '../contexts/LanguageContext';

const TermsPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-lightBg dark:bg-gray-900">
      <div className="bg-primaryDark/5 dark:bg-primaryDark/10 py-20 px-6">
        <AnimatedSection>
          <SectionHeader
            title={t('terms_header_title')}
            subtitle={t('terms_header_subtitle')}
          />
        </AnimatedSection>
      </div>
      <div className="container mx-auto px-6 py-24 text-textDark dark:text-textLight max-w-4xl">
        <AnimatedSection className="space-y-8 prose prose-lg dark:prose-invert max-w-none">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-textDark dark:text-textLight">{t('terms_section1_title')}</h2>
            <p>{t('terms_section1_body')}</p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-textDark dark:text-textLight">{t('terms_section2_title')}</h2>
            <p>{t('terms_section2_body')}</p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-textDark dark:text-textLight">{t('terms_section3_title')}</h2>
            <p>{t('terms_section3_body')}</p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-textDark dark:text-textLight">{t('terms_section4_title')}</h2>
            <p>{t('terms_section4_body')}</p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-textDark dark:text-textLight">{t('terms_section5_title')}</h2>
            <p>{t('terms_section5_body')}</p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default TermsPage;