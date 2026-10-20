import React from 'react';
import { Page, CurrentView, Industry } from '../types';
import { NAV_LINKS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  setCurrentView: (view: CurrentView) => void;
  industries: Industry[];
}

const SocialIcon: React.FC<{ children: React.ReactNode; href: string }> = ({ children, href }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-textLight/80 hover:text-white transition-colors duration-300">
        {children}
    </a>
);

const Footer: React.FC<FooterProps> = ({ setCurrentView, industries }) => {
  const { t } = useLanguage();
  const handleLinkClick = (page: Page) => {
    setCurrentView({ page });
  }
  
  const handleIndustryLinkClick = (industryId: string) => {
    setCurrentView({ page: 'Industry', industryId });
  };

  return (
    <footer className="bg-surfaceDark footer-bg relative text-white overflow-hidden">
      <div className="footer-divider"></div>
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Column 1: Brand & Social */}
          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6 group">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-full h-full transform transition-transform duration-500 group-hover:rotate-12" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M50 5 L95 27.5 V72.5 L50 95 L5 72.5 V27.5 L50 5 Z" />
                      <path d="M50 25 L75 37.5 V62.5 L50 75 L25 62.5 V37.5 L50 25 Z" />
                  </g>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white font-display tracking-tight">DEIG</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">{t('footer_tagline')}</p>
            <address className="not-italic space-y-3 text-gray-300 text-sm">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span><strong>{t('footer_hq')}</strong><br />123 Defense Avenue, Addis Ababa, Ethiopia</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <span><strong>{t('contact_email')}:</strong> contact@deig.gov.et</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <span><strong>{t('contact_phone')}:</strong> +251 11 123 4567</span>
                </div>
            </address>
            <div className="flex space-x-4 pt-2">
              <SocialIcon href="https://www.linkedin.com">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"/></svg>
              </SocialIcon>
              <SocialIcon href="https://www.x.com">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </SocialIcon>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold tracking-wider uppercase text-xs mb-6">{t('footer_quick_links')}</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map(page => (
                 <li key={page}>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick(page as Page)}} className="text-gray-400 hover:text-primary transition-colors duration-300 text-sm">{t(`nav_${page}` as any)}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Industry List */}
          <div>
            <h3 className="text-white font-bold tracking-wider uppercase text-xs mb-6">{t('footer_our_industries')}</h3>
            <ul className="space-y-3">
              {industries.map(industry => (
                 <li key={industry.id}>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleIndustryLinkClick(industry.id)}} className="text-gray-400 hover:text-primary transition-colors duration-300 text-sm">
                        {industry.shortName}
                    </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support & Legal */}
          <div>
            <h3 className="text-white font-bold tracking-wider uppercase text-xs mb-6">{t('footer_support_legal')}</h3>
            <ul className="space-y-3">
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick('PrivacyPolicy')}} className="text-gray-400 hover:text-primary transition-colors duration-300 text-sm">{t('footer_privacy')}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick('Terms')}} className="text-gray-400 hover:text-primary transition-colors duration-300 text-sm">{t('footer_terms')}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick('Procurement')}} className="text-gray-400 hover:text-primary transition-colors duration-300 text-sm">{t('footer_procurement')}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick('Tenders')}} className="text-gray-400 hover:text-primary transition-colors duration-300 text-sm">{t('footer_tenders')}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick('SupplierRegistration')}} className="text-gray-400 hover:text-primary transition-colors duration-300 text-sm">{t('footer_supplier_reg')}</a></li>
                <li className="pt-3 border-t border-white/5 mt-3"><a href="/admin" className="text-gray-500 hover:text-primary transition-colors duration-300 text-xs uppercase tracking-widest font-bold">{t('footer_admin')}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs tracking-wide">
          <p>&copy; {new Date().getFullYear()} {t('footer_copyright')}</p>
          <p className="mt-4 md:mt-0">Defense Industry Engineering Group - Federal Democratic Republic of Ethiopia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;