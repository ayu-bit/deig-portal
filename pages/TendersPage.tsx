
import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import AnimatedSection from '../components/AnimatedSection';
import { Tender } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { fetchTenders } from '../services/apiService';

const TendersPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTenders = async () => {
        try {
            const data = await fetchTenders();
            setTenders(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };
    loadTenders();
  }, []);

  const openTenders = tenders.filter(t => t.status === 'Open');
  const closedTenders = tenders.filter(t => t.status === 'Closed');

  return (
    <div className="bg-lightBg dark:bg-gray-900">
      <div className="bg-primaryDark/5 dark:bg-primaryDark/10 py-20 px-6">
        <AnimatedSection>
          <SectionHeader
            title={t('tenders_header_title')}
            subtitle={t('tenders_header_subtitle')}
          />
        </AnimatedSection>
      </div>
      <div className="container mx-auto px-6 py-24">
        {loading ? <p className="text-center">Loading tenders...</p> : (
        <>
        {/* Open Tenders */}
        <AnimatedSection className="mb-20">
          <h2 className="text-3xl font-semibold text-textDark dark:text-textLight mb-8 font-montserrat border-l-4 border-primaryDark dark:border-goldAccent pl-4">{t('tenders_open_title')}</h2>
          <div className="space-y-6">
            {openTenders.length > 0 ? openTenders.map(tender => (
              <div key={tender.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-primaryDark dark:border-goldAccent">
                <div className="flex justify-between items-start flex-col sm:flex-row gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-textDark dark:text-textLight">{tender.title[language]}</h3>
                    <p className="text-textDark/80 dark:text-textLight/80 mt-1 text-sm">Ref: {tender.reference}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                     <span className="inline-block bg-primaryDark/10 text-primaryDark dark:bg-goldAccent/10 dark:text-goldAccent text-xs font-bold px-3 py-1 rounded-full">{tender.status}</span>
                     <p className="text-textDark/80 dark:text-textLight/80 mt-2 text-sm">{t('tenders_closing_date')}: {new Date(tender.closingDate).toLocaleDateString(language === 'am' ? 'am-ET' : 'en-US')}</p>
                  </div>
                </div>
                <p className="mt-4 text-textDark/80 dark:text-textLight/80 border-t border-gray-200 dark:border-gray-700 pt-4">{tender.description[language]}</p>
              </div>
            )) : (
              <p className="text-textDark/80 dark:text-textLight/80">{t('tenders_no_open')}</p>
            )}
          </div>
        </AnimatedSection>

        {/* Closed Tenders */}
        <AnimatedSection>
          <h2 className="text-3xl font-semibold text-textDark dark:text-textLight mb-8 font-montserrat border-l-4 border-gray-400 dark:border-gray-600 pl-4">{t('tenders_closed_title')}</h2>
          <div className="space-y-6">
             {closedTenders.map(tender => (
              <div key={tender.id} className="bg-white/70 dark:bg-gray-800/70 p-6 rounded-lg shadow-md opacity-80">
                <div className="flex justify-between items-start flex-col sm:flex-row gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-textDark/80 dark:text-textLight/80">{tender.title[language]}</h3>
                    <p className="text-textDark/70 dark:text-textLight/70 mt-1 text-sm">Ref: {tender.reference}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                     <span className="inline-block bg-accentStrong/10 text-accentStrong text-xs font-bold px-3 py-1 rounded-full">{tender.status}</span>
                     <p className="text-textDark/70 dark:text-textLight/70 mt-2 text-sm">{t('tenders_closed_date')}: {new Date(tender.closingDate).toLocaleDateString(language === 'am' ? 'am-ET' : 'en-US')}</p>
                  </div>
                </div>
                <p className="mt-4 text-textDark/70 dark:text-textLight/70 border-t border-gray-300 dark:border-gray-700 pt-4">{tender.description[language]}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
        </>
        )}
      </div>
    </div>
  );
};

export default TendersPage;
