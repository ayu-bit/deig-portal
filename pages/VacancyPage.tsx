import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Vacancy, VacancyStatus } from '../types';
import SectionHeader from '../components/SectionHeader';
import AnimatedSection from '../components/AnimatedSection';
import { useLanguage } from '../contexts/LanguageContext';
import { fetchVacancies, submitApplication } from '../services/apiService';

const VacancyPage: React.FC = () => {
    const { language, t } = useLanguage();
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        title: '',
        location: 'All',
        division: 'All',
        type: 'All',
    });
    const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [applicationFormData, setApplicationFormData] = useState({ name: '', email: '' });
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [isSubmittingApplication, setIsSubmittingApplication] = useState(false);
    const [applicationSubmitted, setApplicationSubmitted] = useState(false);
    const [applicationError, setApplicationError] = useState<string | null>(null);

    const applicationFormRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const loadVacancies = async () => {
        setLoading(true);
        try {
          const data = await fetchVacancies();
          setVacancies(data);
        } catch (err) {
          setError('Failed to load job openings. Please try again later.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      loadVacancies();
    }, []);
    
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFilters(prev => ({ ...prev, [id]: value }));
    };

    const filteredVacancies = useMemo(() => {
        return vacancies.filter(vacancy => {
            const titleMatch = vacancy.title[language].toLowerCase().includes(filters.title.toLowerCase());
            const locationMatch = filters.location === 'All' || vacancy.location === filters.location;
            const divisionMatch = filters.division === 'All' || vacancy.division === filters.division;
            const typeMatch = filters.type === 'All' || vacancy.type === filters.type;
            return titleMatch && locationMatch && divisionMatch && typeMatch && vacancy.status === 'Open';
        });
    }, [vacancies, filters, language]);

    const handleViewDetails = (vacancy: Vacancy) => {
        setSelectedVacancy(vacancy);
        setIsModalOpen(true);
    };

    const handleApplyClick = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            applicationFormRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    };
    
    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubscribed(true);
        setTimeout(() => {
            setIsSubscribed(false);
            setNewsletterEmail('');
        }, 5000);
    };

    const handleApplicationFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setApplicationFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setCvFile(e.target.files[0]);
      }
    };

    const handleApplicationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!cvFile) {
            setApplicationError(t('vacancy_form_error_cv'));
            return;
        }
        setIsSubmittingApplication(true);
        setApplicationError(null);

        const formData = new FormData();
        formData.append('name', applicationFormData.name);
        formData.append('email', applicationFormData.email);
        formData.append('cv', cvFile);

        try {
            await submitApplication(formData);
            setApplicationSubmitted(true);
        } catch (err) {
            setApplicationError((err as Error).message);
        } finally {
            setIsSubmittingApplication(false);
        }
    };
    
    const faqs = [
        { q: 'faq1_q', a: 'faq1_a' },
        { q: 'faq2_q', a: 'faq2_a' },
        { q: 'faq3_q', a: 'faq3_a' },
    ];

    return (
        <div className="bg-lightBg dark:bg-gray-900">
            {/* 1. Hero Section */}
            <div className="relative py-28 px-6 bg-center bg-cover image-wrapper" style={{backgroundImage: "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1920&auto=format&fit=crop')"}}>
                <div className="absolute inset-0 bg-primaryDark/70"></div>
                <div className="relative container mx-auto">
                    <AnimatedSection>
                        <SectionHeader title={t('vacancy_hero_title')} subtitle={t('vacancy_hero_subtitle')} />
                    </AnimatedSection>
                </div>
            </div>
      
            <div className="container mx-auto px-6 py-24 space-y-24">
                {/* 2. Introduction / Overview */}
                <AnimatedSection>
                    <div className="text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-semibold text-textDark dark:text-textLight font-montserrat">{t('vacancy_intro_title')}</h2>
                        <p className="text-textDark/80 dark:text-textLight/80 mt-4 text-lg">{t('vacancy_intro_body1')}</p>
                        <p className="text-textDark/80 dark:text-textLight/80 mt-2 text-lg">{t('vacancy_intro_body2')}</p>
                    </div>
                </AnimatedSection>

                {/* 3. Current Openings */}
                <AnimatedSection>
                    <h2 className="text-3xl md:text-4xl font-semibold text-textDark dark:text-textLight font-montserrat mb-8 text-center">{t('vacancy_openings_title')}</h2>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-textDark/80 dark:text-textLight/80">{t('vacancy_filter_title')}</label>
                                <input type="text" id="title" placeholder={t('vacancy_filter_title_placeholder')} className="mt-1 block w-full bg-lightBg dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:border-primaryDark focus:ring-0 text-textDark dark:text-textLight" value={filters.title} onChange={handleFilterChange} />
                            </div>
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-textDark/80 dark:text-textLight/80">{t('vacancy_filter_location')}</label>
                                <select id="location" className="mt-1 block w-full bg-lightBg dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:border-primaryDark focus:ring-0 text-textDark dark:text-textLight" value={filters.location} onChange={handleFilterChange}>
                                    <option value="All">{t('vacancy_filter_location_all')}</option>
                                    {[...new Set(vacancies.map(v => v.location))].map(l => <option key={l} value={l}>{l}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="division" className="block text-sm font-medium text-textDark/80 dark:text-textLight/80">{t('vacancy_filter_division')}</label>
                                <select id="division" className="mt-1 block w-full bg-lightBg dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:border-primaryDark focus:ring-0 text-textDark dark:text-textLight" value={filters.division} onChange={handleFilterChange}>
                                    <option value="All">{t('vacancy_filter_division_all')}</option>
                                    {[...new Set(vacancies.map(v => v.division))].map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                             <div>
                                <label htmlFor="type" className="block text-sm font-medium text-textDark/80 dark:text-textLight/80">Job Type</label>
                                <select id="type" className="mt-1 block w-full bg-lightBg dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:border-primaryDark focus:ring-0 text-textDark dark:text-textLight" value={filters.type} onChange={handleFilterChange}>
                                    <option value="All">All Types</option>
                                    {[...new Set(vacancies.map(v => v.type))].map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {loading && <p className="text-center">Loading vacancies...</p>}
                        {error && <p className="text-center text-danger">{error}</p>}
                        {!loading && !error && (filteredVacancies.length > 0 ? filteredVacancies.map(vacancy => (
                            <div key={vacancy.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row justify-between items-start md:items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-textDark dark:text-textLight">{vacancy.title[language]}</h3>
                                    <p className="text-textDark/80 dark:text-textLight/80 mt-1 text-sm">{vacancy.division} &bull; {vacancy.location} &bull; {vacancy.type}</p>
                                </div>
                                <button onClick={() => handleViewDetails(vacancy)} className="mt-4 md:mt-0 bg-primaryDark text-white font-bold py-2 px-5 rounded-md hover:bg-primaryDark/80 transition-colors duration-300 flex-shrink-0">
                                    {t('vacancy_details_button')}
                                </button>
                            </div>
                        )) : (
                            <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow"><h3 className="text-xl text-textDark dark:text-textLight">{t('vacancy_no_results_title')}</h3></div>
                        ))}
                    </div>
                </AnimatedSection>
                
                {/* 5. Life at DEIG */}
                <AnimatedSection>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-semibold text-textDark dark:text-textLight font-montserrat">{t('vacancy_life_title')}</h2>
                        <p className="text-textDark/80 dark:text-textLight/80 mt-4 text-lg max-w-3xl mx-auto">{t('vacancy_life_subtitle')}</p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800" alt="Team meeting" className="rounded-lg shadow-md aspect-square object-cover"/>
                        <img src="https://images.unsplash.com/photo-1556132194-2f2de153a817?q=80&w=800" alt="Engineer at work" className="rounded-lg shadow-md aspect-square object-cover"/>
                        <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800" alt="Electronics lab" className="rounded-lg shadow-md aspect-square object-cover"/>
                        <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800" alt="Collaborative workspace" className="rounded-lg shadow-md aspect-square object-cover"/>
                    </div>
                </AnimatedSection>

                {/* 6. Training & Career Development */}
                <AnimatedSection>
                     <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-semibold text-textDark dark:text-textLight font-montserrat">{t('vacancy_dev_title')}</h2>
                        <p className="text-textDark/80 dark:text-textLight/80 mt-4 text-lg max-w-3xl mx-auto">{t('vacancy_dev_subtitle')}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"><h3 className="font-bold text-primaryDark dark:text-goldAccent">{t('vacancy_dev_internships_title')}</h3><p className="text-sm mt-2">{t('vacancy_dev_internships_desc')}</p></div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"><h3 className="font-bold text-primaryDark dark:text-goldAccent">{t('vacancy_dev_professional_title')}</h3><p className="text-sm mt-2">{t('vacancy_dev_professional_desc')}</p></div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"><h3 className="font-bold text-primaryDark dark:text-goldAccent">{t('vacancy_dev_leadership_title')}</h3><p className="text-sm mt-2">{t('vacancy_dev_leadership_desc')}</p></div>
                    </div>
                </AnimatedSection>

                {/* 7. Application Process */}
                <div ref={applicationFormRef} className="scroll-mt-24">
                    <AnimatedSection>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-semibold text-textDark dark:text-textLight font-montserrat">{t('vacancy_process_title')}</h2>
                            <p className="text-textDark/80 dark:text-textLight/80 mt-4 text-lg max-w-3xl mx-auto">{t('vacancy_process_subtitle')}</p>
                        </div>
                        {applicationSubmitted ? (
                             <div className="bg-primaryDark/10 dark:bg-primaryDark/20 border border-primaryDark text-textDark dark:text-textLight px-4 py-8 rounded-lg text-center max-w-3xl mx-auto">
                                <h3 className="font-bold text-xl text-textDark dark:text-textLight">{t('vacancy_form_success_title')}</h3>
                                <p className="mt-2">{t('vacancy_form_success_body')}</p>
                            </div>
                        ) : (
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
                            <h3 className="text-xl font-bold text-center mb-2">{t('vacancy_form_title')}</h3>
                            <p className="text-center text-textDark/80 dark:text-textLight/80 mb-6">{t('vacancy_form_subtitle')}</p>
                            {applicationError && <p className="text-danger text-center mb-4">{applicationError}</p>}
                            <form onSubmit={handleApplicationSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium">{t('vacancy_form_name')}</label>
                                    <input type="text" name="name" id="name" required onChange={handleApplicationFormChange} className="mt-1 block w-full bg-lightBg dark:bg-gray-700 border-gray-300 rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium">{t('vacancy_form_email')}</label>
                                    <input type="email" name="email" id="email" required onChange={handleApplicationFormChange} className="mt-1 block w-full bg-lightBg dark:bg-gray-700 border-gray-300 rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label htmlFor="cv" className="block text-sm font-medium">{t('vacancy_form_cv')}</label>
                                    <input type="file" name="cv" id="cv" required onChange={handleCvFileChange} accept=".pdf,.doc,.docx" className="mt-1 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-primaryDark file:text-white"/>
                                </div>
                                <div className="text-center pt-4">
                                     <button type="submit" disabled={isSubmittingApplication} className="bg-accentStrong text-white font-bold py-3 px-8 rounded-lg hover:bg-accentHover disabled:opacity-50">
                                        {isSubmittingApplication ? t('vacancy_form_submitting') : t('vacancy_form_submit')}
                                    </button>
                                </div>
                            </form>
                        </div>
                        )}
                    </AnimatedSection>
                </div>
                
                {/* 8. FAQs */}
                <AnimatedSection>
                    <h2 className="text-3xl md:text-4xl font-semibold text-textDark dark:text-textLight font-montserrat mb-8 text-center">{t('vacancy_faq_title')}</h2>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-gray-200 dark:border-gray-700">
                                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full text-left flex justify-between items-center py-4">
                                    <span className="font-semibold text-textDark dark:text-textLight">{t(faq.q)}</span>
                                    <svg className={`w-5 h-5 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-96' : 'max-h-0'}`}>
                                    <p className="py-4 text-textDark/80 dark:text-textLight/80">{t(faq.a)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
                
                {/* 9. Contact HR */}
                <AnimatedSection>
                    <div className="bg-primaryDark/5 dark:bg-gray-800 p-8 rounded-lg text-center">
                        <h2 className="text-2xl font-bold text-textDark dark:text-textLight">{t('vacancy_contact_title')}</h2>
                        <p className="text-textDark/80 dark:text-textLight/80 mt-2">{t('vacancy_contact_subtitle')}</p>
                        <p className="mt-4 font-semibold">{t('vacancy_contact_email')}: careers@deig.gov</p>
                    </div>
                </AnimatedSection>

                {/* 10. Newsletter */}
                <AnimatedSection>
                    <div className="bg-primaryDark text-white p-10 rounded-lg shadow-2xl text-center">
                         <h2 className="text-3xl font-bold mb-2 font-montserrat">{t('vacancy_newsletter_title')}</h2>
                         <p className="text-textLight/80 mb-6 max-w-xl mx-auto">{t('vacancy_newsletter_subtitle')}</p>
                         {isSubscribed ? (
                            <p className="text-lg font-semibold text-goldAccent">{t('vacancy_newsletter_success')}</p>
                         ) : (
                            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex">
                                <input type="email" placeholder={t('vacancy_newsletter_placeholder')} value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} required 
                                    className="w-full rounded-l-md border-0 focus:ring-2 focus:ring-accentStrong text-textDark px-4 py-3" />
                                <button type="submit" className="bg-accentStrong hover:bg-accentHover rounded-r-md px-6 py-3 font-bold">{t('vacancy_newsletter_button')}</button>
                            </form>
                         )}
                    </div>
                </AnimatedSection>
            </div>

            {/* 4. Job Details Modal */}
            {isModalOpen && selectedVacancy && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={() => setIsModalOpen(false)}>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-bold text-textDark dark:text-textLight">{selectedVacancy.title[language]}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl">&times;</button>
                        </div>
                        <div className="p-6 overflow-y-auto space-y-6">
                            <div>
                                <h4 className="font-bold text-primaryDark dark:text-goldAccent mb-2">{t('vacancy_modal_responsibilities')}</h4>
                                <ul className="list-disc list-inside space-y-1 text-textDark/80 dark:text-textLight/80">
                                    {selectedVacancy.responsibilities[language].map((r, i) => <li key={i}>{r}</li>)}
                                </ul>
                            </div>
                             <div>
                                <h4 className="font-bold text-primaryDark dark:text-goldAccent mb-2">{t('vacancy_modal_qualifications')}</h4>
                                <ul className="list-disc list-inside space-y-1 text-textDark/80 dark:text-textLight/80">
                                    {selectedVacancy.qualifications[language].map((q, i) => <li key={i}>{q}</li>)}
                                </ul>
                            </div>
                             <div>
                                <h4 className="font-bold text-primaryDark dark:text-goldAccent mb-2">{t('vacancy_modal_benefits')}</h4>
                                <ul className="list-disc list-inside space-y-1 text-textDark/80 dark:text-textLight/80">
                                    {selectedVacancy.benefits[language].map((b, i) => <li key={i}>{b}</li>)}
                                </ul>
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-right">
                             <button onClick={handleApplyClick} className="bg-accentStrong text-white font-bold py-2 px-5 rounded-md hover:bg-accentHover transition-colors">
                                {t('vacancy_modal_apply_button')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VacancyPage;