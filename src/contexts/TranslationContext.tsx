import React, { createContext, useContext } from 'react';
import { translations, type Language, type Translations } from '../translations';

interface TranslationContextType {
    t: Translations;
    language: Language;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
    children: React.ReactNode;
    language: Language;
}

export function TranslationProvider({ children, language }: TranslationProviderProps) {
    const t = translations[language];

    return (
        <TranslationContext.Provider value={{ t, language }}>
            {children}
        </TranslationContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(TranslationContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }
    return context;
}

// Helper function to replace placeholders in translations
export function formatTranslation(text: string, replacements: Record<string, string | number>): string {
    return text.replace(/\{(\w+)\}/g, (match, key) => {
        return replacements[key]?.toString() || match;
    });
}