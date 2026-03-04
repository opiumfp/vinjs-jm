import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import DefaultLayout from '@/layouts/DefaultLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import ContactUs from '@/components/ContactUs/ContactUs';
import ReactMarkdown from 'react-markdown';
import { getConferenceData, getPolicyData } from '@/lib/content';
import type { NavData, PolicyData } from '@/types/content';

interface Props {
  navData: NavData;
  policyData: PolicyData;
}

function getPolicyContent(policyData: PolicyData, locale: string): { title: string; description: string } {
  const lang = locale?.split('-')[0] || 'en';
  switch (lang) {
    case 'uk':
      return {
        title: policyData.titleUA ?? policyData.title,
        description: policyData.descriptionUA ?? policyData.description,
      };
    case 'pl':
      return {
        title: policyData.titlePL ?? policyData.title,
        description: policyData.descriptionPL ?? policyData.description,
      };
    case 'de':
      return {
        title: policyData.titleDE ?? policyData.title,
        description: policyData.descriptionDE ?? policyData.description,
      };
    default:
      return { title: policyData.title, description: policyData.description };
  }
}

const PolicyPage: NextPage<Props> = ({ navData, policyData }) => {
  const { i18n, t } = useTranslation();
  const { title, description } = useMemo(
    () => getPolicyContent(policyData, i18n.language),
    [policyData, i18n.language]
  );

  return (
    <DefaultLayout navData={navData}>
      <Head>
        <title>Policy - VinnytsiaJS</title>
      </Head>

      <div className="layer layer-content">
        <section className="section-vh-100">
          <div className="position-relative">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="policy_content">
                    <PageTitle className="pt-5 pb-5" title={title} />
                    <div className="text-center pb-5">
                      <ReactMarkdown>{description}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr />

        <section className="position-relative pb-5">
          <div className="anchor-id" id="contact"></div>
          <PageTitle className="pt-5 pb-3" title={t('contact.contactUs')} />
          <ContactUs contactUsData={{}} socialIconsData={navData} />
        </section>
      </div>
    </DefaultLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const confData = getConferenceData();
  const { frontmatter } = getPolicyData();

  return {
    props: {
      navData: confData.nav,
      policyData: frontmatter,
    },
  };
};

export default PolicyPage;
