
import React from 'react';
// FIX: Reordered imports to ensure global JSX namespace augmentation from `types.ts` is applied correctly.
import '../types';
// Fix: Use named imports for react-router-dom to resolve module export errors and for consistency.
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { getIndustries } from '../services/api';
import type { Industry } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import Logo from './Logo';

const SunIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 12a5 5 0 100-10 5 5 0 000 10z"></path></svg>
);

const MoonIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
);

const ThemeToggleInHeader: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const { language } = useLanguage();
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    if (!isMounted) {
        return <div className="w-8 h-8" />; 
    }

    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white ${language === 'en' ? 'text-[#1172ba]' : 'text-[#006937]'}`}
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
    );
};

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [industries, setIndustries] = React.useState<Industry[]>([]);
  const { language, setLanguage, t } = useLanguage();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    const fetchIndustries = async () => {
        try {
            const data = await getIndustries();
            setIndustries(data);
        } catch (error) {
            console.error("Failed to fetch industries for header:", error);
        }
    };
    fetchIndustries();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Language based styling for nav links
  const langStyles = {
    en: {
      color: '#1172ba',
      fontFamily: 'font-verdana',
      fontWeight: 'font-bold'
    },
    am: {
      color: '#006937',
      fontFamily: 'font-nokia-pure',
      fontWeight: 'font-bold'
    }
  };

  const currentLangStyle = langStyles[language as 'en' | 'am'] || langStyles.en;

  const navLinkClass = `relative py-2.5 px-4 transition-all duration-300 text-sm tracking-widest group ${currentLangStyle.fontFamily} ${currentLangStyle.fontWeight} uppercase`;
  const navLinkDynamicStyle = (isActive: boolean) => ({
    color: isActive ? currentLangStyle.color : `${currentLangStyle.color}cc`, // Use brand color even for inactive with slightly less opacity
  });

  const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <NavLink to={to} className={navLinkClass} style={({ isActive }) => navLinkDynamicStyle(isActive)}>
      {({ isActive }) => (
        <>
          <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5 inline-block">
            {children}
          </span>
          {isActive && (
            <motion.div
              layoutId="nav-underline"
              className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full"
              style={{ backgroundColor: currentLangStyle.color }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          {!isActive && (
            <div 
              className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              style={{ backgroundColor: `${currentLangStyle.color}60` }}
            />
          )}
        </>
      )}
    </NavLink>
  );

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 bg-white border-b border-gray-100 ${isScrolled ? 'shadow-xl py-1' : 'py-3'}`}>
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <Logo 
              className="w-24 h-24 transition-transform duration-500 group-hover:scale-110" 
              textClassName={`text-3xl font-black ml-4 ${language === 'en' ? 'text-[#1172ba] font-verdana' : 'text-[#006937] font-nokia-pure'}`} 
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-0.5">
            <NavItem to="/">{t('header.home', 'Home')}</NavItem>
            <NavItem to="/about">{t('header.about', 'About')}</NavItem>
            <div className="relative group/industry" onMouseEnter={() => setIsIndustryDropdownOpen(true)} onMouseLeave={() => setIsIndustryDropdownOpen(false)}>
              <NavLink to="/industry" className={navLinkClass} style={({ isActive }) => navLinkDynamicStyle(isActive)}>
                {({ isActive }) => (
                  <>
                    <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5 inline-block">
                      {t('header.industry', 'Industry')}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full"
                        style={{ backgroundColor: currentLangStyle.color }}
                      />
                    )}
                    {!isActive && (
                      <div 
                        className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                        style={{ backgroundColor: `${currentLangStyle.color}60` }}
                      />
                    )}
                  </>
                )}
              </NavLink>
              <AnimatePresence>
                {isIndustryDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full -left-10 mt-1 w-[500px] bg-white rounded-lg shadow-2xl p-4 grid grid-cols-2 gap-2 border border-gray-100 z-50"
                  >
                    <div className="absolute inset-x-0 -top-1 h-1 rounded-t-lg bg-[#1172BA]" />
                    {industries.length > 0 ? (
                      industries.map(industry => (
                        <Link 
                          key={industry.id} 
                          to={`/industry/${industry.id}`} 
                          className="group/item block px-4 py-3 text-sm text-gray-800 hover:bg-gray-50 rounded-lg transition-all"
                        >
                          <span className="font-bold group-hover/item:text-[#1172BA] transition-colors">{t(`industries.${industry.id}.acronym`, industry.acronym)}</span>
                          <span className="block text-xs text-gray-500 truncate mt-0.5">{t(`industries.${industry.id}.name`, industry.name)}</span>
                        </Link>
                      ))
                    ) : (
                      <p className="col-span-2 px-4 py-10 text-center text-sm text-gray-500 italic">{t('common.loading', 'Loading...')}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <NavItem to="/production">{t('header.production', 'Production')}</NavItem>
            <NavItem to="/news">{t('header.news', 'News')}</NavItem>
            <NavItem to="/procurement">{t('footer.procurement', 'Procurement')}</NavItem>
            <NavItem to="/presentation-template">Resources</NavItem>
            <NavItem to="/vacancy">{t('header.vacancy', 'Vacancy')}</NavItem>
            <NavItem to="/contact">{t('header.contact', 'Contact')}</NavItem>
            
            {/* Language Switcher */}
            <div className="relative group ml-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center bg-gray-50 border border-gray-200 py-1.5 px-5 rounded-full transition-all duration-300 hover:shadow-md text-sm font-bold tracking-widest ${language === 'en' ? 'text-[#1172ba] font-verdana' : 'text-[#006937] font-nokia-pure'}`}
                >
                    <span className="mr-1 uppercase">{language === 'en' ? 'English' : 'አማርኛ'}</span>
                    <svg className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                </motion.button>
                <div className="absolute top-full right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl py-2.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-500 border border-gray-100 z-[60] transform translate-y-4 group-hover:translate-y-0">
                    <button 
                      onClick={() => setLanguage('en')} 
                      className={`flex items-center w-full text-left px-6 py-3 text-sm hover:bg-blue-50 transition-all font-verdana font-bold text-[#1172ba] group/en ${language === 'en' ? 'bg-blue-50/50' : ''}`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full bg-[#1172ba] mr-3 transition-transform duration-300 ${language === 'en' ? 'scale-100' : 'scale-0'}`} />
                      <span className="uppercase tracking-widest">English</span>
                    </button>
                    <button 
                      onClick={() => setLanguage('am')} 
                      className={`flex items-center w-full text-left px-6 py-3 text-sm hover:bg-green-50 transition-all font-nokia-pure font-bold text-[#006937] group/am ${language === 'am' ? 'bg-green-50/50' : ''}`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full bg-[#006937] mr-3 transition-transform duration-300 ${language === 'am' ? 'scale-100' : 'scale-0'}`} />
                      <span className="uppercase tracking-widest">አማርኛ</span>
                    </button>
                </div>
            </div>
            <div className="ml-3">
                <ThemeToggleInHeader />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggleInHeader />
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className={`p-2 rounded-xl transition-colors ${language === 'en' ? 'text-[#1172ba] hover:bg-blue-50' : 'text-[#006937] hover:bg-green-50'}`}
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              id="mobile-menu" 
              className={`md:hidden overflow-hidden flex flex-col items-stretch space-y-1 bg-white rounded-2xl mt-4 p-4 shadow-2xl border border-gray-100 ${currentLangStyle.fontFamily} ${currentLangStyle.fontWeight}`}
            >
              {[
                { to: '/', label: t('header.home', 'Home') },
                { to: '/about', label: t('header.about', 'About') },
                { to: '/industry', label: t('header.industry', 'Industry') },
                { to: '/production', label: t('header.production', 'Production') },
                { to: '/news', label: t('header.news', 'News') },
                { to: '/procurement', label: t('footer.procurement', 'Procurement') },
                { to: '/vacancy', label: t('header.vacancy', 'Vacancy') },
                { to: '/contact', label: t('header.contact', 'Contact') }
              ].map((link) => (
                <NavLink 
                  key={link.to}
                  to={link.to} 
                  className="block py-3.5 px-6 text-center w-full rounded-xl transition-all uppercase tracking-widest text-sm" 
                  style={({ isActive }) => ({ 
                    backgroundColor: isActive ? `${currentLangStyle.color}10` : 'transparent',
                    color: isActive ? currentLangStyle.color : '#4B5563',
                    fontWeight: isActive ? '900' : 'bold'
                  })} 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="flex justify-center items-center space-x-3 mt-6 pt-6 border-t border-gray-100 w-full">
                  <button 
                    onClick={() => { setLanguage('en'); setIsMobileMenuOpen(false); }} 
                    className={`flex-1 py-3.5 rounded-xl font-verdana font-bold uppercase tracking-widest text-sm transition-all ${language === 'en' ? 'bg-[#1172BA] text-white shadow-lg' : 'bg-gray-50 text-gray-800'}`}
                  >
                    English
                  </button>
                  <button 
                    onClick={() => { setLanguage('am'); setIsMobileMenuOpen(false); }} 
                    className={`flex-1 py-3.5 rounded-xl font-nokia-pure font-bold uppercase tracking-widest text-sm transition-all ${language === 'am' ? 'bg-[#006937] text-white shadow-lg' : 'bg-gray-50 text-gray-800'}`}
                  >
                    አማርኛ
                  </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
