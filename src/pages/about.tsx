import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import DefaultLayout from '@/layouts/DefaultLayout';
import { getConferenceData } from '@/lib/content';
import type { NavData } from '@/types/content';

interface Props {
  navData: NavData;
}

const AboutPage: NextPage<Props> = ({ navData }) => (
  <DefaultLayout navData={navData}>
    <Head>
      <title>About us - VinnytsiaJS</title>
    </Head>
    <div className="layer layer-content">
      <div className="container py-5">
        <h1>About us</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error doloremque omnis animi,
          eligendi magni a voluptatum, vitae, consequuntur rerum illum odit fugit assumenda rem
          dolores inventore iste reprehenderit maxime! Iusto.
        </p>
      </div>
    </div>
  </DefaultLayout>
);

export const getStaticProps: GetStaticProps = async () => {
  const confData = getConferenceData();
  return {
    props: {
      navData: confData.nav,
    },
  };
};

export default AboutPage;
