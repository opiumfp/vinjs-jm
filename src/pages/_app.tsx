import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import '@/lib/i18n';
import i18n from '@/lib/i18n';
import '../../assets/styles/main.scss';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const updateLang = () => {
      const lang = i18n.language?.split('-')[0] || 'en';
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
      }
    };
    updateLang();
    i18n.on('languageChanged', updateLang);
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
