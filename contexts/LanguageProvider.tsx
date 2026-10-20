// FIX: Reordered imports to ensure global JSX namespace augmentation from `types.ts` is applied before React is imported. This resolves errors where standard HTML elements were not recognized in JSX.
import '../types';
import * as React from 'react';

import { Language, LanguageContext } from './LanguageContext';

const translationsCache: { [key in Language]?: any } = {};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = React.useState<Language>(localStorage.getItem('deig-lang') as Language || 'en');
    const [translations, setTranslations] = React.useState<any | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchTranslations = async () => {
            setLoading(true);
            try {
                if (!translationsCache.en) {
                    const enRes = await fetch('./locales/en.json');
                    if (!enRes.ok) throw new Error(`Failed to fetch en.json: ${enRes.statusText}`);
                    translationsCache.en = await enRes.json();
                }
                if (!translationsCache.am) {
                    const amRes = await fetch('./locales/am.json');
                    if (!amRes.ok) throw new Error(`Failed to fetch am.json: ${amRes.statusText}`);
                    translationsCache.am = await amRes.json();
                }
                setTranslations({ ...translationsCache });
            } catch (e) {
                console.error("Failed to load translations", e);
            } finally {
                setLoading(false);
            }
        };
        fetchTranslations();
    }, []);

    React.useEffect(() => {
        localStorage.setItem('deig-lang', language);
        document.documentElement.lang = language;
    }, [language]);

    const setLanguage = React.useCallback((lang: Language) => {
        setLanguageState(lang);
    }, []);

    const t = React.useCallback((key: string, fallback?: string): string => {
        if (loading || !translations || !translations[language]) {
            return fallback || key;
        }

        const getNestedTranslation = (lang: Language, k: string): string | undefined => {
            return k.split('.').reduce((obj, part) => obj && obj[part], translations[lang]);
        };

        const translation = getNestedTranslation(language, key);
        if (translation) {
            return translation;
        }
        if (fallback) {
            return fallback;
        }
        if (language !== 'en') {
             const enTranslation = getNestedTranslation('en', key);
             if (enTranslation) return enTranslation;
        }
        
        return key;
    }, [language, translations, loading]);

    const value = React.useMemo(() => ({
        language,
        setLanguage,
        t,
    }), [language, setLanguage, t]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};