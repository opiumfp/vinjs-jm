import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../../assets/styles/main.scss';

export default function App({ Component, pageProps }: AppProps) {
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
