import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/locales/en/common.json';
import uk from '@/locales/uk/common.json';
import pl from '@/locales/pl/common.json';
import de from '@/locales/de/common.json';

const supportedLngs = ['en', 'uk', 'pl', 'de'] as const;
export type SupportedLocale = (typeof supportedLngs)[number];

export const defaultNS = 'common';
export const fallbackLng = 'en';

const STORAGE_KEY = 'i18nextLng';

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
    load: 'languageOnly',
    interpolation: {
      escapeValue: false,
    },
  });

export { STORAGE_KEY };
export default i18n;
