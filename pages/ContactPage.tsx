import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import AnimatedSection from '../components/AnimatedSection';
import { CurrentView, Industry } from '../types';
import InteractiveMap from '../components/InteractiveMap';
import { useLanguage } from '../contexts/LanguageContext';
import { submitContactForm } from '../services/apiService';

interface ContactPageProps {
  setCurrentView: (view: CurrentView) => void;
  industries: Industry[];
}

const ContactPage: React.FC<ContactPageProps> = ({ setCurrentView, industries }) => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    message: '',
  });
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { t } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id.replace('contact-', '')]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setAttachment(e.target.files[0]);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formPayload = new FormData();
    formPayload.append('name', formData.name);
    formPayload.append('email', formData.email);
    formPayload.append('subject', formData.subject);
    formPayload.append('message', formData.message);
    if (attachment) {
      formPayload.append('attachment', attachment);
    }
    
    try {
      await submitContactForm(formPayload);
      setIsSubmitted(true);
      setFormData({ name: '', subject: '', email: '', message: '' });
      setAttachment(null);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-lightBg dark:bg-surfaceDark/50">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden bg-surfaceDark">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=1920&auto=format&fit=crop" 
                    alt="Contact Background" 
                    className="w-full h-full object-cover opacity-30"
                />
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
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 font-display tracking-tight">
                            {t('contact_header_title')}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
                            {t('contact_header_subtitle')}
                        </p>
                        <div className="mt-12 w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
        
        <div className="container mx-auto px-6 py-24">
            <AnimatedSection>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-surface dark:bg-surfaceDark p-10 md:p-16 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-gray-100 dark:border-white/5">
                        <h2 className="text-3xl md:text-4xl font-bold text-textDark dark:text-textLight mb-10 font-display">{t('contact_form_title')}</h2>
                        
                        {isSubmitted ? (
                            <div className="bg-primary/5 border border-primary/20 p-12 rounded-3xl text-center flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
                                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mb-8 shadow-xl shadow-primary/20">
                                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                                </div>
                                <h3 className="text-2xl font-bold text-textDark dark:text-textLight mb-4 font-display">{t('contact_form_success_title')}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md">{t('contact_form_success_body')}</p>
                                <button onClick={() => setIsSubmitted(false)} className="mt-10 text-primary font-bold hover:underline">Send another message</button>
                            </div>
                        ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-2xl flex items-center space-x-3">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                    <span>{error}</span>
                                </div>
                            )}
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label htmlFor="contact-name" className="text-sm font-bold text-textDark/60 dark:text-textLight/60 uppercase tracking-widest ml-1">{t('contact_form_name')}</label>
                                    <input 
                                        type="text" 
                                        id="contact-name" 
                                        value={formData.name} 
                                        onChange={handleChange} 
                                        className="w-full bg-lightBg dark:bg-surfaceDark/50 border-2 border-transparent focus:border-primary/30 focus:bg-white dark:focus:bg-surfaceDark rounded-2xl px-6 py-4 outline-none transition-all duration-300 text-textDark dark:text-textLight" 
                                        placeholder="Your full name"
                                        required 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="contact-email" className="text-sm font-bold text-textDark/60 dark:text-textLight/60 uppercase tracking-widest ml-1">{t('contact_form_email')}</label>
                                    <input 
                                        type="email" 
                                        id="contact-email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        className="w-full bg-lightBg dark:bg-surfaceDark/50 border-2 border-transparent focus:border-primary/30 focus:bg-white dark:focus:bg-surfaceDark rounded-2xl px-6 py-4 outline-none transition-all duration-300 text-textDark dark:text-textLight" 
                                        placeholder="your@email.com"
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="contact-subject" className="text-sm font-bold text-textDark/60 dark:text-textLight/60 uppercase tracking-widest ml-1">{t('contact_form_subject')}</label>
                                <input 
                                    type="text" 
                                    id="contact-subject" 
                                    value={formData.subject} 
                                    onChange={handleChange} 
                                    className="w-full bg-lightBg dark:bg-surfaceDark/50 border-2 border-transparent focus:border-primary/30 focus:bg-white dark:focus:bg-surfaceDark rounded-2xl px-6 py-4 outline-none transition-all duration-300 text-textDark dark:text-textLight" 
                                    placeholder="What is this regarding?"
                                    required 
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="contact-message" className="text-sm font-bold text-textDark/60 dark:text-textLight/60 uppercase tracking-widest ml-1">{t('contact_form_message')}</label>
                                <textarea 
                                    id="contact-message" 
                                    rows={6} 
                                    value={formData.message} 
                                    onChange={handleChange} 
                                    className="w-full bg-lightBg dark:bg-surfaceDark/50 border-2 border-transparent focus:border-primary/30 focus:bg-white dark:focus:bg-surfaceDark rounded-2xl px-6 py-4 outline-none transition-all duration-300 text-textDark dark:text-textLight resize-none" 
                                    placeholder="Tell us more about your inquiry..."
                                    required
                                ></textarea>
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="contact-attachment" className="text-sm font-bold text-textDark/60 dark:text-textLight/60 uppercase tracking-widest ml-1">{t('contact_form_attachment')}</label>
                                <div className="relative group">
                                    <input 
                                        type="file" 
                                        id="contact-attachment" 
                                        onChange={handleFileChange} 
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div className="w-full bg-lightBg dark:bg-surfaceDark/50 border-2 border-dashed border-gray-200 dark:border-white/10 group-hover:border-primary/30 rounded-2xl px-6 py-8 flex flex-col items-center justify-center transition-all duration-300">
                                        <svg className="w-8 h-8 text-gray-400 group-hover:text-primary mb-2 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                                        <span className="text-gray-500 dark:text-gray-400 font-medium">{attachment ? attachment.name : 'Click or drag to upload a file'}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="pt-4">
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting} 
                                    className="w-full md:w-auto bg-primary text-white font-bold py-5 px-12 rounded-2xl hover:bg-primaryDark transition-all duration-300 disabled:opacity-50 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 flex items-center justify-center space-x-3 group"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            <span>{t('contact_form_submitting')}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{t('contact_form_submit')}</span>
                                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                        )}
                    </div>

                    {/* Contact Info Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-surfaceDark p-10 rounded-[2.5rem] text-white overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/30 transition-all duration-500"></div>
                            <h3 className="text-2xl font-bold mb-8 font-display relative z-10">{t('contact_info_title')}</h3>
                            
                            <div className="space-y-8 relative z-10">
                                <div className="flex items-start space-x-5">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/20">
                                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-400 uppercase tracking-widest text-xs mb-1">{t('contact_info_hq')}</h4>
                                        <p className="text-lg leading-relaxed">123 Defense Avenue, Capital City, 1000</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-5">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/20">
                                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-400 uppercase tracking-widest text-xs mb-1">{t('contact_info_email')}</h4>
                                        <p className="text-lg">contact@deig.gov</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-5">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/20">
                                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-400 uppercase tracking-widest text-xs mb-1">{t('contact_info_phone')}</h4>
                                        <p className="text-lg">+123 456 7890</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary p-10 rounded-[2.5rem] text-white shadow-xl shadow-primary/20">
                            <h3 className="text-2xl font-bold mb-6 font-display">Departmental Contacts</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-primaryDark/60 uppercase tracking-widest text-xs mb-1">{t('contact_info_media')}</h4>
                                    <p className="font-medium">media@deig.gov</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primaryDark/60 uppercase tracking-widest text-xs mb-1">{t('contact_info_procurement')}</h4>
                                    <p className="font-medium">procurement@deig.gov</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedSection>
            
            <AnimatedSection className="py-24">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-textDark dark:text-textLight mb-6 font-display">{t('contact_map_title')}</h2>
                    <p className="text-xl text-gray-500 dark:text-gray-400 font-light leading-relaxed">{t('contact_map_subtitle')}</p>
                    <div className="mt-8 w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                </div>
                <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-white/5 bg-surface dark:bg-surfaceDark p-4">
                    <InteractiveMap industries={industries} setCurrentView={setCurrentView} />
                </div>
            </AnimatedSection>
        </div>
    </div>
  );
};

export default ContactPage;