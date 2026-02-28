import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
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

const PolicyPage: NextPage<Props> = ({ navData, policyData }) => {
  const [lang, setLang] = useState<'EN' | 'UA'>('EN');
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/vinjs-jm';

  return (
    <DefaultLayout navData={navData}>
      <Head>
        <title>Policy - VinnytsiaJS</title>
      </Head>

      <div className="layer layer-content">
        <section>
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <div className="btn-group">
                  <button
                    className="btn btn-secondary policy_btn-lang flex align-items-center"
                    onClick={() => setLang('EN')}
                  >
                    <img className="flag" src={`${basePath}/assets/images/flags/en.svg`} alt="EN" />
                    <span className="label">EN</span>
                  </button>
                  <button
                    className="btn btn-secondary policy_btn-lang flex align-items-center"
                    onClick={() => setLang('UA')}
                  >
                    <img className="flag" src={`${basePath}/assets/images/flags/ua.svg`} alt="UA" />
                    <span className="label">UA</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-vh-100">
          <div className="position-relative">
            <div className="container">
              <div className="row">
                <div className="col">
                  {lang === 'EN' ? (
                    <div className="policy_content-en">
                      <PageTitle className="pt-5 pb-5" title={policyData.title} />
                      <div className="text-center pb-5">
                        <ReactMarkdown>{policyData.description}</ReactMarkdown>
                      </div>
                    </div>
                  ) : (
                    <div className="policy_content-ua">
                      <PageTitle className="pt-5 pb-5" title={policyData.titleUA} />
                      <div className="text-center pb-5">
                        <ReactMarkdown>{policyData.descriptionUA}</ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr />

        <section className="position-relative pb-5">
          <div className="anchor-id" id="contact"></div>
          <PageTitle className="pt-5 pb-3" title="Contact Us" />
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
