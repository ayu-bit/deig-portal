
import React from 'react';
import '../types';
import { getVacancies, createApplicant } from '../services/api';
import type { Vacancy } from '../types';
import { AnimatedSection } from '../components/AnimatedComponents';
import Loader from '../components/Loader';
import { useLanguage } from '../hooks/useLanguage';
import { useToast } from '../contexts/ToastContext';

// --- Helper Components ---
const Section: React.FC<{ titleKey: string; children: React.ReactNode; className?: string; id: string; subtitleKey?: string; darkText?: boolean }> = ({ titleKey, id, children, className = '', subtitleKey, darkText = false }) => {
    const { t } = useLanguage();
    return (
        <section aria-labelledby={id} className={`py-20 ${className}`}>
            <div className="container mx-auto px-6">
                <AnimatedSection>
                    <div className="text-center max-w-4xl mx-auto mb-12">
                        <h2 id={id} className={`text-3xl font-bold font-roboto-condensed ${darkText ? 'text-[#1075BB]' : 'text-white'}`}>{t(titleKey)}</h2>
                        {subtitleKey && <p className={`mt-2 font-lato ${darkText ? 'text-gray-600' : 'text-white/80'}`}>{t(subtitleKey)}</p>}
                    </div>
                </AnimatedSection>
                {children}
            </div>
        </section>
    );
};


// --- Section-Specific Components ---

const HeroSection: React.FC = () => {
    const { t } = useLanguage();
    return (
        <header className="bg-cover bg-center py-24 md:py-32 relative" style={{ backgroundImage: "url('https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
            <div className="absolute inset-0 bg-[#1075BB]/80 mix-blend-multiply"></div>
            <div className="container mx-auto px-6 text-center relative z-10">
                <div className="bg-white/10 py-12 rounded-md max-w-4xl mx-auto backdrop-blur-sm border border-white/20 shadow-2xl">
                    <h1 className="text-4xl font-black text-white font-montserrat">{t('vacancyPage.hero.title')}</h1>
                    <p className="mt-2 text-lg text-white/90 font-roboto-condensed">{t('vacancyPage.hero.subtitle')}</p>
                </div>
            </div>
        </header>
    );
};

const IntroductionSection: React.FC = () => {
    const { t } = useLanguage();
    const whyJoinItems = [ 'impact', 'projects', 'growth' ];
    
    return (
        <>
            <AnimatedSection>
                <p className="text-center text-lg text-gray-700 leading-relaxed font-lato max-w-4xl mx-auto">
                    {t('vacancyPage.introduction.p1')}
                </p>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
                {whyJoinItems.map((item, index) => (
                    <AnimatedSection key={item} delay={index * 150}>
                        <div className="flex flex-col items-center text-center p-8 bg-white rounded-lg h-full card-hover-effect border border-gray-200 shadow-lg group transition-all duration-300 hover:border-[#1075BB]">
                            <div className="w-12 h-12 bg-blue-50 text-[#1075BB] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#1075BB] group-hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-[#1075BB] font-roboto-condensed">{t(`vacancyPage.introduction.whyJoin.${item}`)}</h3>
                            <p className="mt-2 text-sm text-gray-600 font-lato">{t(`vacancyPage.introduction.whyJoin.${item}Desc`)}</p>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </>
    );
};

const JobDetailModal: React.FC<{ vacancy: Vacancy; onClose: () => void; }> = ({ vacancy, onClose }) => {
    const { t } = useLanguage();
    const { addToast } = useToast();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const modalRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);
    
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        formData.append('vacancyId', vacancy.id);

        try {
            await createApplicant(formData);
            addToast(`Application for ${vacancy.title} submitted successfully!`, 'success');
            onClose();
        } catch (error) {
            console.error('Application submission failed:', error);
            addToast('Failed to submit application. Please try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 animate-fade-in"
            onClick={handleBackdropClick}
        >
            <div ref={modalRef} className="relative bg-white text-[#1075BB] rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-2xl font-bold text-[#1075BB] font-montserrat">{vacancy.title}</h2>
                        <p className="text-gray-600 font-semibold font-roboto-condensed">{vacancy.location} • {vacancy.type}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-100" aria-label="Close">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                <div className="overflow-y-auto p-6 space-y-6">
                    <div>
                        <h3 className="text-lg font-bold font-roboto-condensed mb-2 text-[#1075BB]">{t('vacancyPage.modal.responsibilities')}</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-700 font-lato">
                            {vacancy.responsibilities.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-lg font-bold font-roboto-condensed mb-2 text-[#1075BB]">{t('vacancyPage.modal.requirements')}</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-700 font-lato">
                             {vacancy.requirements.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-lg font-bold font-roboto-condensed mb-2 text-[#1075BB]">{t('vacancyPage.modal.applyTitle')}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded-md border border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('vacancyPage.cv.name')}</label>
                                    <input type="text" id="name" name="name" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1075BB] focus:border-[#1075BB]" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('vacancyPage.cv.email')}</label>
                                    <input type="email" id="email" name="email" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1075BB] focus:border-[#1075BB]" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="cv-upload" className="block text-sm font-medium text-gray-700">{t('vacancyPage.cv.upload')}</label>
                                <input type="file" id="cv-upload" name="cv" required accept=".pdf,.doc,.docx" className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-[#1075BB] file:text-white hover:file:bg-[#0E62A1]"/>
                            </div>
                            <button type="submit" disabled={isSubmitting} className="w-full bg-[#1075BB] hover:bg-[#0E62A1] text-white font-bold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
                                {isSubmitting ? 'Submitting...' : t('vacancyPage.cv.submit')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};


const OpeningsSection: React.FC<{ onApply: (vacancy: Vacancy) => void }> = ({ onApply }) => {
    const [vacancies, setVacancies] = React.useState<Vacancy[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [filters, setFilters] = React.useState({ role: 'All', division: 'All', experienceLevel: 'All' });
    const { t } = useLanguage();

    React.useEffect(() => {
        const fetchVacancies = async () => {
            try { setLoading(true); const data = await getVacancies(); setVacancies(data); } 
            catch (err) { setError('Failed to load vacancies.'); } 
            finally { setLoading(false); }
        };
        fetchVacancies();
    }, []);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const filterOptions = React.useMemo(() => ({
        roles: ['All', ...Array.from(new Set(vacancies.map(v => v.role)))],
        divisions: ['All', ...Array.from(new Set(vacancies.map(v => v.division)))],
        experienceLevels: ['All', ...Array.from(new Set(vacancies.map(v => v.experienceLevel)))],
    }), [vacancies]);

    const filteredVacancies = React.useMemo(() => vacancies.filter(v => 
        (filters.role === 'All' || v.role === filters.role) &&
        (filters.division === 'All' || v.division === filters.division) &&
        (filters.experienceLevel === 'All' || v.experienceLevel === filters.experienceLevel)
    ), [vacancies, filters]);
    
    const VacancyCard: React.FC<{ vacancy: Vacancy }> = ({ vacancy }) => (
        <div className="bg-white p-6 rounded-md shadow-lg card-hover-effect flex flex-col h-full text-[#1075BB] border border-gray-200 hover:border-[#1075BB]">
          <div>
              <h3 className="text-xl font-bold text-[#1075BB] font-roboto-condensed card-title">{vacancy.title}</h3>
              <p className="text-gray-600 font-semibold font-roboto-condensed">{vacancy.location}</p>
              <div className="flex flex-wrap gap-2 mt-3 text-xs font-semibold">
                  <span className="bg-blue-50 text-[#1075BB] px-2 py-1 rounded-full">{vacancy.division}</span>
                  <span className="bg-blue-50 text-[#1075BB] px-2 py-1 rounded-full">{vacancy.role}</span>
                  <span className="bg-blue-50 text-[#1075BB] px-2 py-1 rounded-full">{vacancy.experienceLevel}</span>
              </div>
          </div>
          <p className="mt-4 text-gray-700 font-lato flex-grow line-clamp-3">{vacancy.description}</p>
          <button onClick={() => onApply(vacancy)} className="mt-6 bg-[#1075BB] hover:bg-[#0E62A1] text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 font-roboto-condensed self-start">
            {t('vacancyPage.applyNow')}
          </button>
        </div>
    );

    return (
        <>
            <AnimatedSection>
                <div className="bg-white border border-gray-200 p-4 rounded-md mb-12 grid grid-cols-1 md:grid-cols-4 gap-4 items-center shadow-sm">
                    <h3 className="text-lg font-bold text-[#1075BB] font-roboto-condensed md:text-right">{t('vacancyPage.filterBy')}</h3>
                    <select name="role" value={filters.role} onChange={handleFilterChange} className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-[#1075BB] focus:border-[#1075BB] w-full p-2">
                        {filterOptions.roles.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <select name="division" value={filters.division} onChange={handleFilterChange} className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-[#1075BB] focus:border-[#1075BB] w-full p-2">
                        {filterOptions.divisions.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <select name="experienceLevel" value={filters.experienceLevel} onChange={handleFilterChange} className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-[#1075BB] focus:border-[#1075BB] w-full p-2">
                        {filterOptions.experienceLevels.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                </div>
            </AnimatedSection>
            <div className="space-y-8">
                {loading ? <div className="flex justify-center"><Loader /></div> :
                 error ? <p className="text-center text-red-400">{error}</p> :
                 filteredVacancies.length > 0 ? (
                    filteredVacancies.map((vacancy, index) => (
                        <AnimatedSection key={vacancy.id} delay={index * 100}>
                            <VacancyCard vacancy={vacancy} />
                        </AnimatedSection>
                    ))
                 ) : (
                    <AnimatedSection>
                        <div className="text-center py-16 bg-white rounded-md border border-gray-200">
                            <h3 className="text-2xl font-bold text-[#1075BB] font-montserrat">{t('vacancyPage.noOpenings')}</h3>
                            <p className="mt-2 text-gray-600 font-lato">{t('vacancyPage.noOpeningsDesc')}</p>
                        </div>
                    </AnimatedSection>
                 )}
            </div>
        </>
    );
};

const LifeAtDeigSection: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
                 <h3 className="text-2xl font-bold text-white font-roboto-condensed border-l-4 border-white pl-4">{t('vacancyPage.life.title')}</h3>
                 <p className="text-white/90 font-lato leading-relaxed">{t('vacancyPage.life.p1')}</p>
                 <blockquote className="border-l-4 border-white/50 pl-6 text-white/80 italic text-lg bg-white/10 p-4 rounded-r-lg">
                    "{t('vacancyPage.life.quote')}"
                    <footer className="text-sm not-italic mt-2 text-white font-bold">— {t('vacancyPage.life.quoteAuthor')}</footer>
                 </blockquote>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <AnimatedSection>
                    <div className="image-container blueprint-overlay rounded-md aspect-square"><img src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Team collaborating" className="rounded-md" /></div>
                </AnimatedSection>
                 <AnimatedSection delay={150}>
                    <div className="image-container blueprint-overlay rounded-md aspect-square"><img src="https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Professional development" className="rounded-md" /></div>
                </AnimatedSection>
            </div>
        </div>
    );
};

const TrainingSection: React.FC = () => {
    const { t } = useLanguage();
    const items = ['internships', 'development', 'leadership'];
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {items.map((item, index) => (
                <AnimatedSection key={item} delay={index * 150}>
                    <div className="p-6 bg-white rounded-md h-full card-hover-effect border border-gray-200 hover:border-[#1075BB] shadow-sm">
                        <h3 className="text-xl font-bold text-[#1075BB] font-roboto-condensed">{t(`vacancyPage.training.${item}`)}</h3>
                        <p className="mt-2 text-sm text-gray-600 font-lato">{t(`vacancyPage.training.${item}Desc`)}</p>
                    </div>
                </AnimatedSection>
            ))}
        </div>
    );
};

const ApplicationProcessSection: React.FC = () => {
    const { t } = useLanguage();
    const steps = ['s1', 's2', 's3', 's4'];
    return (
        <div className="relative max-w-5xl mx-auto">
            <div className="absolute top-8 left-0 w-full h-0.5 bg-gray-200 hidden md:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {steps.map((key, index) => (
                    <AnimatedSection key={key} delay={index * 150}>
                        <div className="relative text-center md:text-left">
                            <div className="flex justify-center md:justify-start items-center mb-4">
                                <div className="z-10 flex items-center justify-center w-16 h-16 rounded-full bg-[#1075BB] border-4 border-white text-2xl font-bold text-white font-montserrat shadow-lg">{`0${index + 1}`}</div>
                            </div>
                            <h3 className="text-lg font-bold text-[#1075BB] font-roboto-condensed">{t(`vacancyPage.process.${key}`)}</h3>
                            <p className="mt-1 text-sm text-gray-600 font-lato">{t(`vacancyPage.process.${key}Desc`)}</p>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
    );
};

const FaqSection: React.FC = () => {
    const { t } = useLanguage();
    const [openFaq, setOpenFaq] = React.useState<number | null>(0);
    const faqs = ['faq1', 'faq2', 'faq3'];

    return (
        <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((key, index) => (
                <AnimatedSection key={key} delay={index * 100}>
                    <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
                        <h2>
                            <button
                                type="button"
                                className="flex items-center justify-between w-full p-5 font-medium text-left text-[#1075BB] hover:bg-gray-50 transition-colors"
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                aria-expanded={openFaq === index}
                            >
                                <span>{t(`vacancyPage.faq.${key}q`)}</span>
                                <svg className={`w-6 h-6 transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                        </h2>
                        {openFaq === index && (
                            <div className="p-5 border-t border-gray-100 bg-gray-50">
                                <p className="text-gray-700 font-lato">{t(`vacancyPage.faq.${key}a`)}</p>
                            </div>
                        )}
                    </div>
                </AnimatedSection>
            ))}
        </div>
    );
};

// --- Main Page Component ---
const VacancyPage: React.FC = () => {
    const { t } = useLanguage();
    const [selectedVacancy, setSelectedVacancy] = React.useState<Vacancy | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleApplyClick = (vacancy: Vacancy) => {
        setSelectedVacancy(vacancy);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedVacancy(null);
    };

    return (
        <div className="bg-gray-50">
            {isModalOpen && selectedVacancy && (
                <JobDetailModal vacancy={selectedVacancy} onClose={handleCloseModal} />
            )}
            <HeroSection />
            <Section id="introduction" titleKey="vacancyPage.introduction.title" className="bg-gray-50" darkText={true}>
                <IntroductionSection />
            </Section>
            <Section id="job-listings" titleKey="vacancyPage.openings" className="bg-white" darkText={true}>
                <OpeningsSection onApply={handleApplyClick} />
            </Section>
            <Section id="life-at-deig" titleKey="vacancyPage.life.sectionTitle" className="bg-[#1075BB]" darkText={false}>
                <LifeAtDeigSection />
            </Section>
             <Section id="training-dev" titleKey="vacancyPage.training.title" className="bg-gray-50" darkText={true}>
                <TrainingSection />
            </Section>
            <Section id="app-process" titleKey="vacancyPage.process.title" className="bg-white" darkText={true}>
                <ApplicationProcessSection />
            </Section>
            <Section id="faq" titleKey="vacancyPage.faq.title" className="bg-gray-50" darkText={true}>
                <FaqSection />
            </Section>
             <Section id="contact-hr" titleKey="vacancyPage.contact.title" className="bg-white" darkText={true}>
                <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-md shadow-sm text-center border border-gray-200">
                    <p className="text-gray-700 mb-4 font-lato">{t('vacancyPage.contact.p1')}</p>
                    <a href={`mailto:${t('vacancyPage.contact.email')}`} className="font-bold text-lg text-[#1075BB] hover:underline transition-colors">
                        {t('vacancyPage.contact.email')}
                    </a>
                </div>
            </Section>
            <Section id="job-alerts" titleKey="vacancyPage.alerts.title" subtitleKey="vacancyPage.alerts.subtitle" className="bg-[#1075BB]">
                 <AnimatedSection>
                    <form className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4" onSubmit={e => e.preventDefault()}>
                        <input type="email" placeholder={t('newsPage.newsletterPlaceholder')} className="flex-grow bg-white border border-white/20 rounded-md py-3 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-white" />
                        <button type="submit" className="bg-[#0E62A1] hover:bg-[#0A4D7F] text-white border border-white/20 font-bold py-3 px-6 rounded-md transition-colors font-roboto-condensed shadow-lg">
                            {t('newsPage.newsletterButton')}
                        </button>
                    </form>
                </AnimatedSection>
            </Section>
        </div>
    );
};

export default VacancyPage;
