import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import '@/lib/i18n';
import i18n, { fallbackLng, STORAGE_KEY } from '@/lib/i18n';
import '../../assets/styles/main.scss';

const SUPPORTED = ['en', 'uk', 'ua', 'pl', 'de'] as const;

function detectBrowserLanguage(): string {
  if (typeof navigator === 'undefined') return fallbackLng;
  let lang = navigator.language?.split('-')[0];
  if (lang && SUPPORTED.includes(lang as (typeof SUPPORTED)[number])) {
    if (lang === 'uk' && Array.isArray(i18n.options.supportedLngs) && i18n.options.supportedLngs.includes('ua')) lang = 'ua';
    return lang;
  }
  const next = navigator.languages?.find((l) => {
    const code = l.split('-')[0];
    return code && SUPPORTED.includes(code as (typeof SUPPORTED)[number]);
  });
  const resolved = next?.split('-')[0] || fallbackLng;
  if (resolved === 'uk' && Array.isArray(i18n.options.supportedLngs) && i18n.options.supportedLngs.includes('ua')) return 'ua';
  return resolved;
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const lang = i18n.language?.split('-')[0] || 'en';
    if (typeof document !== 'undefined') document.documentElement.lang = lang;
    const updateLang = () => {
      const l = i18n.language?.split('-')[0] || 'en';
      if (typeof document !== 'undefined') document.documentElement.lang = l;
      try {
        localStorage.setItem(STORAGE_KEY, i18n.language || l);
      } catch {}
    };
    i18n.on('languageChanged', updateLang);

    const cached = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY)?.split('-')[0] : null;
    const supported = Array.isArray(i18n.options.supportedLngs) ? i18n.options.supportedLngs : [];
    const toApply = cached && supported.includes(cached) ? cached : detectBrowserLanguage();
    if (toApply && toApply !== i18n.language?.split('-')[0]) {
      i18n.changeLanguage(toApply);
    } else {
      updateLang();
    }

    return () => i18n.off('languageChanged', updateLang);
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
