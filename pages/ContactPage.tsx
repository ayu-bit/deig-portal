
import React from 'react';
import '../types';
import { AnimatedSection } from '../components/AnimatedComponents';
import { InteractiveMap } from '../components/InteractiveMap';
import { useLanguage } from '../hooks/useLanguage';
import { getIndustries, createInquiry, getSettings } from '../services/api';
import type { Industry, ContactInquiry } from '../types';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import { ThreeDContainer, TechShape, CyberNetwork } from '../components/ThreeDComponents';

// --- Helper Components ---
const Section: React.FC<{ titleKey: string; children: React.ReactNode; className?: string; id: string; }> = ({ titleKey, id, children, className = '' }) => {
    const { t } = useLanguage();
    return (
        <section aria-labelledby={id} className={`py-20 ${className}`}>
            <div className="container mx-auto px-6">
                <AnimatedSection>
                    <div className="flex items-center gap-4 mb-12 justify-center">
                        <div className="h-1 w-12 bg-[#1075BB] dark:bg-white hidden md:block"></div>
                        <h2 id={id} className={`text-3xl md:text-4xl font-black text-[#1075BB] dark:text-white text-center font-montserrat uppercase tracking-tight`}>{t(titleKey)}</h2>
                        <div className="h-1 w-12 bg-[#1075BB] dark:bg-white hidden md:block"></div>
                    </div>
                </AnimatedSection>
                {children}
            </div>
        </section>
    );
};

// --- Section-Specific Components ---

const HeroSection: React.FC<{ imageUrl?: string }> = ({ imageUrl }) => {
    const { t } = useLanguage();
    const defaultHero = "https://images.pexels.com/photos/8867432/pexels-photo-8867432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    const bgUrl = imageUrl || defaultHero;
    const isVideo = bgUrl.toLowerCase().endsWith('.mp4') || bgUrl.toLowerCase().endsWith('.webm');

    return (
        <header className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
                {isVideo ? (
                    <video 
                        src={bgUrl} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className="w-full h-full object-cover" 
                    />
                ) : (
                    <img 
                        src={bgUrl} 
                        alt="Communications Center" 
                        className="w-full h-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-[#1075BB]/80 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-black/30"></div>
                
                {/* 3D Background Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <ThreeDContainer cameraPos={[0, 0, 8]}>
                        <group position={[-6, 3, 0]}>
                            <TechShape type="octahedron" color="#ffffff" />
                        </group>
                        <group position={[6, -3, -2]}>
                            <CyberNetwork color="#ffffff" />
                        </group>
                    </ThreeDContainer>
                </div>
            </div>
            
            <div className="container mx-auto px-6 relative z-10 text-center text-white mt-10">
                <AnimatedSection>
                    <span className="inline-block py-1 px-3 border border-white rounded-full text-white text-xs font-bold tracking-widest uppercase mb-4 bg-white/10 backdrop-blur-md">
                        24/7 Operational Support
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black font-montserrat mb-6 tracking-tight">
                        {t('contactPage.title')}
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-white/90 max-w-3xl mx-auto font-lato leading-relaxed">
                        {t('contactPage.subtitle')}
                    </p>
                </AnimatedSection>
            </div>
        </header>
    );
}

const ContactInfoCard: React.FC<{ icon: React.ReactNode; label: string; value: string; delay?: number }> = ({ icon, label, value, delay = 0 }) => (
    <AnimatedSection delay={delay}>
        <div className="flex items-start p-6 bg-white dark:bg-[#1075BB] rounded-lg shadow-md border-l-4 border-[#1075BB] dark:border-white hover:shadow-xl transition-all duration-300 group h-full">
            <div className="flex-shrink-0 p-3 bg-blue-50 dark:bg-white/10 rounded-full text-[#1075BB] dark:text-white group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div className="ml-4">
                <h4 className="text-sm font-bold text-gray-500 dark:text-white/70 uppercase tracking-wider mb-1">{label}</h4>
                <p className="text-lg font-semibold text-gray-900 dark:text-white font-lato">{value}</p>
            </div>
        </div>
    </AnimatedSection>
);

const ContactForm: React.FC = () => {
    const { t } = useLanguage();
    const { addToast } = useToast();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const departments = ['general', 'hr', 'procurement', 'media'];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const data: Partial<ContactInquiry> = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            subject: formData.get('subject') as string,
            message: formData.get('message') as string
        };

        try {
            await createInquiry(data);
            addToast(t('contactPage.form.success', 'Your message has been sent successfully!'), 'success');
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error('Inquiry submission failed:', error);
            addToast('Failed to send message. Please try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-[#1075BB] p-8 md:p-10 rounded-xl shadow-2xl border border-gray-100 dark:border-white/10 relative overflow-hidden">
            {/* Decor */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 dark:bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            
            <h2 className="text-3xl font-bold text-[#1075BB] dark:text-white mb-2 font-montserrat relative z-10">{t('contactPage.form.title')}</h2>
            <p className="text-gray-500 dark:text-white/80 mb-8 font-lato relative z-10">Fill out the form below and our team will route your inquiry to the appropriate department.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6 font-lato relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-1 transition-colors group-focus-within:text-[#1075BB] dark:group-focus-within:text-white">{t('contactPage.form.name')}</label>
                        <input type="text" id="name" name="name" className="w-full bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg py-3 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1075BB] dark:focus:ring-white focus:border-transparent transition-shadow" required placeholder="John Doe" />
                    </div>
                    <div className="group">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-1 transition-colors group-focus-within:text-[#1075BB] dark:group-focus-within:text-white">{t('contactPage.form.email')}</label>
                        <input type="email" id="email" name="email" className="w-full bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg py-3 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1075BB] dark:focus:ring-white focus:border-transparent transition-shadow" required placeholder="john@example.com" />
                    </div>
                </div>
                 <div className="group">
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-1 transition-colors group-focus-within:text-[#1075BB] dark:group-focus-within:text-white">{t('contactPage.form.department')}</label>
                    <div className="relative">
                        <select id="department" name="department" className="w-full bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg py-3 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1075BB] dark:focus:ring-white focus:border-transparent appearance-none transition-shadow">
                            {departments.map(dept => <option key={dept} value={dept} className="text-gray-900">{t(`contactPage.form.depts.${dept}`)}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 dark:text-white/70">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>
                <div className="group">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-1 transition-colors group-focus-within:text-[#1075BB] dark:group-focus-within:text-white">{t('contactPage.form.subject')}</label>
                    <input type="text" id="subject" name="subject" className="w-full bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg py-3 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1075BB] dark:focus:ring-white focus:border-transparent transition-shadow" required placeholder="Brief summary of your inquiry" />
                </div>
                <div className="group">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-1 transition-colors group-focus-within:text-[#1075BB] dark:group-focus-within:text-white">{t('contactPage.form.message')}</label>
                    <textarea id="message" name="message" rows={5} className="w-full bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg py-3 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1075BB] dark:focus:ring-white focus:border-transparent transition-shadow resize-none" required placeholder="How can we help you?"></textarea>
                </div>
                <div>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-[#1075BB] dark:bg-white hover:bg-[#0E62A1] dark:hover:bg-gray-100 text-white dark:text-[#1075BB] font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-roboto-condensed tracking-wide uppercase disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2">
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white dark:text-[#1075BB]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Sending...
                            </>
                        ) : (
                            <>
                                {t('contactPage.form.submit')} 
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

const IndustryContactCard: React.FC<{ industry: Industry }> = ({ industry }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-white dark:bg-[#1075BB] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-white/20 group hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-white/10 flex items-center justify-center text-[#1075BB] dark:text-white font-black text-sm border border-blue-100 dark:border-white/20">
                    {industry.acronym}
                </div>
                <span className="px-2 py-1 bg-blue-100 dark:bg-white/20 text-[#1075BB] dark:text-white text-[10px] font-bold uppercase rounded-full">Active</span>
            </div>
            <h4 className="font-bold text-lg text-gray-900 dark:text-white font-montserrat mb-1 group-hover:text-[#1075BB] dark:group-hover:text-white transition-colors line-clamp-1">{t(`industries.${industry.id}.name`, industry.name)}</h4>
            <p className="text-xs text-gray-500 dark:text-white/70 mb-6 uppercase tracking-wider">{industry.facilityInfo?.location || 'Regional HQ'}</p>
            
            <div className="space-y-3">
                <a href={`mailto:${industry.contact.email}`} className="flex items-center text-sm text-gray-600 dark:text-white/90 hover:text-[#1075BB] dark:hover:text-white transition-colors">
                    <svg className="w-4 h-4 mr-3 text-[#1075BB] dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    <span className="truncate">{industry.contact.email}</span>
                </a>
                <a href={`tel:${industry.contact.phone}`} className="flex items-center text-sm text-gray-600 dark:text-white/90 hover:text-[#1075BB] dark:hover:text-white transition-colors">
                    <svg className="w-4 h-4 mr-3 text-[#1075BB] dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    <span>{industry.contact.phone}</span>
                </a>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/20 text-center">
                <Link to={`/industry/${industry.id}`} className="text-xs font-bold text-[#1075BB] dark:text-white uppercase tracking-widest hover:underline">
                    View Profile
                </Link>
            </div>
        </div>
    );
};

const ContactPage: React.FC = () => {
    const { t } = useLanguage();
    const [industries, setIndustries] = React.useState<Industry[]>([]);
    const [settings, setSettings] = React.useState<any>(null);
    const [loadingIndustries, setLoadingIndustries] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [indData, settingsData] = await Promise.all([
                    getIndustries(),
                    getSettings()
                ]);
                setIndustries(indData);
                setSettings(settingsData);
            } catch (error) {
                console.error("Failed to load contact page data:", error);
            } finally {
                setLoadingIndustries(false);
            }
        };
        fetchData();
    }, []);
    
    const contactInfo = settings?.contactInfo || {
        addressLabel: t('contactPage.hq.addressLabel'),
        addressValue: t('contactPage.hq.addressValue'),
        phoneLabel: t('contactPage.hq.phoneLabel'),
        phoneValue: t('contactPage.hq.phoneValue'),
        emailLabel: t('contactPage.hq.emailLabel'),
        emailValue: t('contactPage.hq.emailValue'),
        hqLocationTitle: t('contactPage.locationsTitle')
    };

    return (
        <div className="bg-gray-50 dark:bg-brand-blue-900 min-h-screen transition-colors duration-500">
            <HeroSection imageUrl={settings?.contactInfo?.heroImageUrl} />

            {/* Floating Content Container */}
            <div className="container mx-auto px-6 relative z-20 -mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: Contact Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <ContactInfoCard 
                            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>}
                            label={contactInfo.addressLabel}
                            value={contactInfo.addressValue}
                            delay={100}
                        />
                        <ContactInfoCard 
                            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>}
                            label={contactInfo.phoneLabel}
                            value={contactInfo.phoneValue}
                            delay={200}
                        />
                        <ContactInfoCard 
                            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>}
                            label={contactInfo.emailLabel}
                            value={contactInfo.emailValue}
                            delay={300}
                        />
                        
                        {/* Media Inquiries Card */}
                        <AnimatedSection delay={400}>
                            <div className="p-6 bg-[#1075BB] rounded-lg shadow-lg border border-white/10 mt-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-white rounded-full blur-2xl opacity-20"></div>
                                <h4 className="text-lg font-bold font-montserrat mb-2">Media & Press</h4>
                                <p className="text-sm text-white/80 mb-4 font-lato">For official statements and press kits.</p>
                                <a href={`mailto:${settings?.contactEmail || 'media@deig.gov.et'}`} className="inline-flex items-center text-white font-bold hover:underline transition-colors">
                                    {settings?.contactEmail || 'media@deig.gov.et'} <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                </a>
                            </div>
                        </AnimatedSection>
                    </div>

                    {/* Right Column: Large Form */}
                    <div className="lg:col-span-2">
                        <AnimatedSection delay={200}>
                            <ContactForm />
                        </AnimatedSection>
                    </div>
                </div>
            </div>

            {/* Division Contacts */}
             <Section id="industry-contacts" titleKey="contactPage.industryContacts.title" className="bg-gray-100 dark:bg-[#0E62A1] mt-20">
                <div className="max-w-7xl mx-auto">
                    {loadingIndustries ? <Loader /> : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {industries.slice(0, 8).map((industry, index) => (
                                <AnimatedSection key={industry.id} delay={index * 50}>
                                    <IndustryContactCard industry={industry} />
                                </AnimatedSection>
                            ))}
                        </div>
                    )}
                </div>
            </Section>

            {/* Interactive Map Section - Adjusted for white bg in light mode */}
            <section className="relative w-full bg-white dark:bg-[#1075BB] py-24">
                <div className="absolute inset-0 opacity-5 dark:opacity-20 pointer-events-none">
                    {settings?.contactInfo?.hqImageUrl ? (
                        settings.contactInfo.hqImageUrl.toLowerCase().endsWith('.mp4') ? (
                            <video src={settings.contactInfo.hqImageUrl} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale" />
                        ) : (
                            <img src={settings.contactInfo.hqImageUrl} alt="Map Background" className="w-full h-full object-cover grayscale" />
                        )
                    ) : (
                         <img src="https://images.pexels.com/photos/1078850/pexels-photo-1078850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Map Background" className="w-full h-full object-cover grayscale" />
                    )}
                </div>
                <div className="absolute inset-0 bg-white/50 dark:bg-[#1075BB]/80"></div>
                <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
                    <AnimatedSection>
                        <div className="bg-gray-50/50 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 p-8 rounded-xl max-w-6xl mx-auto w-full shadow-lg">
                            <h3 className="text-2xl font-bold text-[#1075BB] dark:text-white mb-6 text-center font-montserrat">{contactInfo.hqLocationTitle}</h3>
                            <InteractiveMap />
                        </div>
                    </AnimatedSection>
                </div>
            </section>

        </div>
    );
};

export default ContactPage;
