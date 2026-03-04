import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from '@/locales/en/common.json';
import uk from '@/locales/uk/common.json';
import pl from '@/locales/pl/common.json';
import de from '@/locales/de/common.json';

const supportedLngs = ['en', 'uk', 'pl', 'de'] as const;
export type SupportedLocale = (typeof supportedLngs)[number];

export const defaultNS = 'common';
export const fallbackLng = 'en';

if (typeof window !== 'undefined') {
  i18n.use(LanguageDetector);
}

i18n.use(initReactI18next).init({
    resources: {
      en: { [defaultNS]: en },
      uk: { [defaultNS]: uk },
      pl: { [defaultNS]: pl },
      de: { [defaultNS]: de },
    },
    defaultNS,
    fallbackLng,
    supportedLngs: [...supportedLngs],
    interpolation: {
      escapeValue: false,
    },
    ...(typeof window !== 'undefined' && {
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupLocalStorage: 'i18nextLng',
      },
    }),
  });

export default i18n;
