import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

type Language = 'en' | 'am';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('deig-lang') as Language) || 'en';
  });
  
  const [translations, setTranslations] = useState<Record<Language, Record<string, any>>>({ en: {}, am: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const [enResponse, amResponse] = await Promise.all([
          fetch('./locales/en.json'),
          fetch('./locales/am.json')
        ]);

        if (!enResponse.ok || !amResponse.ok) {
            throw new Error(`Failed to fetch translation files. Status: ${enResponse.status}, ${amResponse.status}`);
        }

        const enData = await enResponse.json();
        const amData = await amResponse.json();

        setTranslations({ en: enData, am: amData });
      } catch (error) {
        console.error("Could not load translation files:", error);
        setTranslations({ en: {}, am: {} });
      } finally {
        setLoading(false);
      }
    };
    fetchTranslations();
  }, []);

  useEffect(() => {
    localStorage.setItem('deig-lang', language);
    document.documentElement.lang = language;
    document.body.classList.remove('lang-en', 'lang-am');
    document.body.classList.add(`lang-${language}`);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = useMemo(() => (key: string): string => {
    if (loading) {
      return ''; // Return empty string to prevent flash of untranslated keys
    }
    const currentLangTranslations = translations[language];
    const fallbackLangTranslations = translations['en'];
    
    return currentLangTranslations?.[key] || fallbackLangTranslations?.[key] || key;
  }, [language, translations, loading]);

  const value = {
    language,
    setLanguage,
    t,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
