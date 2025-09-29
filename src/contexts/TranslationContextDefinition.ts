import { createContext } from "react";
import type { Language, Translations } from "../translations";

export interface TranslationContextType {
  t: Translations;
  language: Language;
}

export const TranslationContext = createContext<
  TranslationContextType | undefined
>(undefined);
