import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: 'en' | 'am') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-semibold tracking-wider text-textLight hover:bg-textLight/20 transition-colors duration-300"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.002 6.002 0 0111.336 0H4.332zM15.668 11.973a6.002 6.002 0 01-11.336 0h11.336z" clipRule="evenodd" />
        </svg>
        <span>{language.toUpperCase()}</span>
        <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
      </button>

      <div className={`absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-primaryDark ring-1 ring-black ring-opacity-5 origin-top-right transition-all duration-200 ease-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <div className="py-1" role="menu" aria-orientation="vertical">
          <button
            onClick={() => handleLanguageChange('en')}
            className={`w-full text-left block px-4 py-2 text-sm transition-colors ${language === 'en' ? 'font-bold text-white' : 'text-textLight/80 hover:bg-textLight/20'}`}
            role="menuitem"
          >
            {t('lang_en')}
          </button>
          <button
            onClick={() => handleLanguageChange('am')}
            className={`w-full text-left block px-4 py-2 text-sm transition-colors font-nyala ${language === 'am' ? 'font-bold text-white' : 'text-textLight/80 hover:bg-textLight/20'}`}
            role="menuitem"
          >
            {t('lang_am')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
