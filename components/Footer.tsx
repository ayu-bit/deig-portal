
import React from 'react';
// FIX: Reordered imports to ensure global JSX namespace augmentation from `types.ts` is applied correctly.
import '../types';
// Fix: Use named imports for react-router-dom to resolve module export errors and for consistency.
import { Link } from 'react-router-dom';
import { getIndustries } from '../services/api';
import type { Industry } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import Logo from './Logo';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors duration-300">
    {children}
  </a>
);

const Footer: React.FC = () => {
  const [industries, setIndustries] = React.useState<Industry[]>([]);
  const { t } = useLanguage();

  React.useEffect(() => {
    const fetchIndustries = async () => {
        try {
            const data = await getIndustries();
            setIndustries(data);
        } catch (error) {
            console.error("Failed to fetch industries for footer:", error);
        }
    };
    fetchIndustries();
  }, []);

  return (
    <footer className="relative footer-enhanced dark:footer-divider bg-[#1075BB] text-white border-t border-white/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: DEIG Info */}
          <div className="lg:col-span-1">
            <div className="mb-4">
                <Logo className="w-12 h-12" textClassName="text-2xl font-black text-white" />
            </div>
            <p className="mt-2 text-sm text-white/80">{t('footer.tagline', "Engineering Ethiopia's technological sovereignty and national security.")}</p>
            <div className="flex space-x-4 mt-4">
              <SocialIcon href="#">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </SocialIcon>
              <SocialIcon href="#">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </SocialIcon>
              <SocialIcon href="#">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-3.096 0 1.548 1.548 0 013.096 0zM6.55 16.338H3.45V7.748h3.1v8.59zM17.633 2h-11.26a4.37 4.37 0 00-4.37 4.37v11.26a4.37 4.37 0 004.37 4.37h11.26a4.37 4.37 0 004.37-4.37V6.37A4.37 4.37 0 0017.633 2z" clipRule="evenodd" /></svg>
              </SocialIcon>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white font-roboto-condensed tracking-wider">{t('footer.quickLinks', 'Quick Links')}</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/about" className="text-white/70 hover:text-white transition-colors">{t('footer.aboutUs', 'About Us')}</Link></li>
              <li><Link to="/industry" className="text-white/70 hover:text-white transition-colors">{t('footer.ourIndustries', 'Our Industries')}</Link></li>
              <li><Link to="/production" className="text-white/70 hover:text-white transition-colors">{t('header.production', 'Production')}</Link></li>
              <li><Link to="/news" className="text-white/70 hover:text-white transition-colors">{t('header.news', 'News')}</Link></li>
              <li><Link to="/vacancy" className="text-white/70 hover:text-white transition-colors">{t('footer.careers', 'Careers')}</Link></li>
              <li><Link to="/procurement" className="text-white/70 hover:text-white transition-colors">{t('footer.procurement', 'Procurement')}</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-white transition-colors">{t('header.contact', 'Contact')}</Link></li>
            </ul>
          </div>

          {/* Column 3: Industries */}
          <div>
            <h4 className="text-lg font-semibold text-white font-roboto-condensed tracking-wider">{t('footer.industries', 'Industries')}</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {industries.map(industry => (
                <li key={industry.id}><Link to={`/industry/${industry.id}`} className="text-white/70 hover:text-white transition-colors">{t(`industries.${industry.id}.acronym`, industry.acronym)}</Link></li>
              ))}
            </ul>
          </div>
          
          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white font-roboto-condensed tracking-wider">{t('footer.contactInfo', 'Contact Info')}</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/90">
              <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <span>{t('footer.address', '123 Defense Road, Addis Ababa, Ethiopia')}</span>
              </li>
              <li className="flex items-start">
                   <svg className="w-4 h-4 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <span>{t('footer.email', 'contact@deig.gov.et')}</span>
              </li>
              <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  <span>{t('footer.phone', '+251 11 123 4567')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-white/20 pt-6 flex flex-col sm:flex-row justify-between items-center text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} {t('footer.copyright', 'DEIG - Defense Industry Engineering Group. All Rights Reserved.')}</p>
          <div className="mt-4 sm:mt-0 space-x-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">{t('footer.privacyPolicy', 'Privacy Policy')}</Link>
            <span className="opacity-50">|</span>
            <Link to="/terms" className="hover:text-white transition-colors">{t('footer.termsOfService', 'Terms of Service')}</Link>
            <span className="opacity-50">|</span>
            <Link to="/admin" className="hover:text-white transition-colors">{t('footer.adminLogin', 'Admin Login')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
