import React, { useState, useEffect, useRef } from 'react';
import { Page, CurrentView, Industry } from '../types';
import { NAV_LINKS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';


interface HeaderProps {
  currentView: CurrentView;
  setCurrentView: (view: CurrentView) => void;
  industries: Industry[];
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, industries }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const industriesTimeoutRef = useRef<number | null>(null);
  const { language, t } = useLanguage();
  const isHomePage = currentView.page === 'Home';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (page: Page) => {
    setCurrentView({ page });
    setIsMenuOpen(false);
  };
  
  const handleIndustryLinkClick = (industryId: string) => {
    setCurrentView({ page: 'Industry', industryId });
    setIsMenuOpen(false);
    setIsIndustriesOpen(false);
  };
  
  const handleIndustriesMouseEnter = () => {
    if (industriesTimeoutRef.current) {
      clearTimeout(industriesTimeoutRef.current);
    }
    setIsIndustriesOpen(true);
  };

  const handleIndustriesMouseLeave = () => {
    industriesTimeoutRef.current = window.setTimeout(() => {
      setIsIndustriesOpen(false);
    }, 200);
  };
  
  const NavLink: React.FC<{ page: string }> = ({ page }) => {
    const pageKey = page as Page;
    const isActive = currentView.page === pageKey && !currentView.industryId;
    
    if (pageKey === 'Industry') {
      const isIndustryActive = currentView.page === 'Industry';
      return (
        <div 
            className="relative"
            onMouseEnter={handleIndustriesMouseEnter}
            onMouseLeave={handleIndustriesMouseLeave}
        >
          <button
            onClick={() => handleLinkClick('Industry')}
            className={`px-3 py-2 rounded-md text-sm font-medium tracking-wide transition-all duration-300 ${isIndustryActive ? 'text-white bg-white/10' : 'text-textLight/70 hover:text-white hover:bg-white/5'}`}
          >
            {t('nav_Industry')}
          </button>
          <div
            className={`absolute left-0 top-full mt-2 w-72 bg-surface dark:bg-surfaceDark shadow-2xl rounded-xl border border-primary/10 dark:border-white/10 transition-all duration-300 ease-out transform origin-top ${isIndustriesOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}
            onMouseEnter={handleIndustriesMouseEnter}
            onMouseLeave={handleIndustriesMouseLeave}
          >
            <div className="py-3">
                <a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick('Industry'); setIsIndustriesOpen(false); }} className="block px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary/5 dark:text-primary dark:hover:bg-white/5">{t('nav_all_industries')}</a>
                <div className="border-t border-gray-100 dark:border-white/5 my-2"></div>
                {industries.map(industry => (
                    <a key={industry.id} href="#" onClick={(e) => { e.preventDefault(); handleIndustryLinkClick(industry.id); }} className={`block px-5 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-primary/5 dark:hover:bg-white/5 hover:text-primary dark:hover:text-primary transition-colors ${language === 'am' ? 'font-nyala text-base' : ''}`}>
                        {industry.fullName[language]}
                    </a>
                ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); handleLinkClick(pageKey); }}
        className={`px-3 py-2 rounded-md text-sm font-medium tracking-wide transition-all duration-300 ${isActive ? 'text-white bg-white/10' : 'text-textLight/70 hover:text-white hover:bg-white/5'}`}
      >
        {t(`nav_${page}` as any)}
      </a>
    );
  };
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || isMenuOpen || !isHomePage ? 'bg-primary/95 backdrop-blur-md shadow-xl border-b border-white/10' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick('Home'); }} className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg className="w-full h-full transform transition-transform duration-500 group-hover:rotate-12" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M50 5 L95 27.5 V72.5 L50 95 L5 72.5 V27.5 L50 5 Z" className="logo-path" />
                      <path d="M50 25 L75 37.5 V62.5 L50 75 L25 62.5 V37.5 L50 25 Z" className="logo-path" style={{ animationDelay: '0.5s' }} />
                  </g>
              </svg>
            </div>
            <span className="text-2xl font-bold text-white font-display tracking-tight">DEIG</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-2">
            {NAV_LINKS.map(page => <NavLink key={page} page={page} />)}
            <LanguageSwitcher />
            <ThemeSwitcher />
          </nav>
          
          {/* Mobile Nav Toggle */}
          <div className="lg:hidden flex items-center">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-2 text-textLight">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} /></svg>
            </button>
          </div>
        </div>
      </div>
      
       {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}>
        <nav className="px-6 pb-4 flex flex-col space-y-2">
            {NAV_LINKS.map(page => {
                 const pageKey = page as Page;
                 if (pageKey === 'Industry') {
                     return (
                         <div key={pageKey}>
                             <a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick('Industry'); }} className="block px-3 py-2 text-textLight/80 hover:text-white">{t('nav_Industry')}</a>
                             <div className="pl-4 border-l-2 border-textLight/30 ml-3">
                                {industries.map(industry => (
                                    <a key={industry.id} href="#" onClick={(e) => { e.preventDefault(); handleIndustryLinkClick(industry.id); }} className={`block px-3 py-1 text-sm text-textLight/70 hover:text-white ${language === 'am' ? 'font-nyala' : ''}`}>
                                        {industry.fullName[language]}
                                    </a>
                                ))}
                             </div>
                         </div>
                     )
                 }
                return (
                    <a key={pageKey} href="#" onClick={(e) => { e.preventDefault(); handleLinkClick(pageKey); }} className="block px-3 py-2 text-textLight/80 hover:text-white">{t(`nav_${page}` as any)}</a>
                )
            })}
        </nav>
      </div>
    </header>
  );
};

export default Header;