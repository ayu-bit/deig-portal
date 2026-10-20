
import * as React from 'react';

export type Language = 'en' | 'am';

export interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string, fallback?: string) => string;
}

export const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);
