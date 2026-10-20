
import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import AnimatedSection from '../components/AnimatedSection';
import { useLanguage } from '../contexts/LanguageContext';
import { submitSupplierRegistration } from '../services/apiService';

const SupplierRegistrationPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const formData = new FormData(e.target as HTMLFormElement);
    
    // Note: The input names in the form must match what the backend expects
    // Backend expects: companyName, registrationNumber, address, contactPerson, contactEmail, profile (file)

    try {
        await submitSupplierRegistration(formData);
        setIsSubmitted(true);
        (e.target as HTMLFormElement).reset();
    } catch (err) {
        setError((err as Error).message);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-lightBg dark:bg-gray-900">
      <div className="bg-primaryDark/5 dark:bg-primaryDark/10 py-20 px-6">
        <AnimatedSection>
          <SectionHeader
            title={t('supplier_header_title')}
            subtitle={t('supplier_header_subtitle')}
          />
        </AnimatedSection>
      </div>
      <div className="container mx-auto px-6 py-24">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl">
            {isSubmitted ? (
                <div className="bg-primaryDark/10 dark:bg-primaryDark/20 border border-primaryDark text-textDark dark:text-textLight px-4 py-8 rounded-lg text-center">
                    <h3 className="font-bold text-xl text-textDark dark:text-textLight">{t('supplier_form_success_title')}</h3>
                    <p className="mt-2">{t('supplier_form_success_body')}</p>
                    <button onClick={() => setIsSubmitted(false)} className="mt-4 text-primaryDark underline">Submit another</button>
                </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && <div className="text-danger p-4 bg-danger/10 rounded">{error}</div>}
                <h2 className="text-2xl font-semibold text-textDark dark:text-textLight border-b border-gray-300 dark:border-gray-600 pb-4">{t('supplier_section_company_info')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-textDark/80 dark:text-textLight/80">{t('supplier_field_company_name')}</label>
                        <input type="text" name="companyName" id="companyName" className="mt-1 block w-full bg-lightBg dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:border-primaryDark focus:ring-0 text-textDark dark:text-textLight" required />
                    </div>
                    <div>
                        <label htmlFor="registrationNumber" className="block text-sm font-medium text-textDark/80 dark:text-textLight/80">{t('supplier_field_reg_number')}</label>
                        <input type="text" name="registrationNumber" id="registrationNumber" className="mt-1 block w-full bg-lightBg dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:border-primaryDark focus:ring-0 text-textDark dark:text-textLight" required />
                    </div>
                </div>
                 <div>
                    <label htmlFor="address" className="block text-sm font-medium text-textDark/80 dark:text-textLight/80">{t('supplier_field_address')}</label>
                    <input type="text" name="address" id="address" className="mt-1 block w-full bg-lightBg dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:border-primaryDark focus:ring-0 text-textDark dark:text-textLight" required />
                </div>

                <h2 className="text-2xl font-semibold text-textDark dark:text-textLight border-b border-gray-300 dark:border-gray-600 pb-4 pt-6">{t('supplier_section_contact')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="contactPerson" className="block text-sm font-medium text-textDark/80 dark:text-textLight/80">{t('supplier_field_contact_person')}</label>
                        <input type="text" name="contactPerson" id="contactPerson" className="mt-1 block w-full bg-lightBg dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:border-primaryDark focus:ring-0 text-textDark dark:text-textLight" required />
                    </div>
                    <div>
                        <label htmlFor="contactEmail" className="block text-sm font-medium text-textDark/80 dark:text-textLight/80">{t('supplier_field_contact_email')}</label>
                        <input type="email" name="contactEmail" id="contactEmail" className="mt-1 block w-full bg-lightBg dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:border-primaryDark focus:ring-0 text-textDark dark:text-textLight" required />
                    </div>
                </div>
                
                <h2 className="text-2xl font-semibold text-textDark dark:text-textLight border-b border-gray-300 dark:border-gray-600 pb-4 pt-6">{t('supplier_section_docs')}</h2>
                 <div>
                    <label htmlFor="profile" className="block text-sm font-medium text-textDark/80 dark:text-textLight/80">{t('supplier_field_profile')}</label>
                    <input type="file" name="profile" id="profile" accept=".pdf" className="mt-1 block w-full text-sm text-textDark/80 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primaryDark file:text-white hover:file:opacity-90 cursor-pointer"/>
                </div>

                <div className="text-center pt-8">
                     <button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-accentStrong text-white font-bold py-3 px-8 rounded-lg hover:bg-accentHover transition-colors duration-300 text-lg btn-glow disabled:opacity-50">
                        {isSubmitting ? 'Submitting...' : t('supplier_submit_button')}
                    </button>
                </div>
            </form>
            )}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default SupplierRegistrationPage;
