import React from 'react';
import { translations, type Language } from '../translations';
import { TranslationContext } from './TranslationContextDefinition';

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