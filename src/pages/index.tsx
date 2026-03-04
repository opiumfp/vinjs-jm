import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import DefaultLayout from '@/layouts/DefaultLayout';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Stat from '@/components/Stat/Stat';
import PageTitle from '@/components/PageTitle/PageTitle';
import MediaTiles from '@/components/MediaTiles/MediaTiles';
import Speakers from '@/components/Speakers/Speakers';
import Talks from '@/components/Talks/Talks';
import ScheduleTable from '@/components/ScheduleTable/ScheduleTable';
import Pricing from '@/components/Pricing/Pricing';
import Partners from '@/components/Partners/Partners';
import Location from '@/components/Location/Location';
import ContactUs from '@/components/ContactUs/ContactUs';
import TelegramWidget from '@/components/TelegramWidget/TelegramWidget';
import { getConferenceData, getSpeakersData, getPartnersData } from '@/lib/content';
import type { ConferenceData, SpeakersDataFile, PartnersData } from '@/types/content';

interface Props {
  pageData: ConferenceData;
  speakersData: SpeakersDataFile;
  partnersData: PartnersData;
}

const IndexPage: NextPage<Props> = ({ pageData, speakersData, partnersData }) => {
  const { t } = useTranslation();

  return (
  <DefaultLayout navData={pageData.nav}>
    <Head>
      <title>Javascript Open Air Conference and Meetups</title>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
      <meta
        name="keywords"
        content="ReactJS, React, React Native, Vue, VueJS, Angular, GraphQL framework, JavaScript, development, Facebook, vinnitsa, conference, вінниця, винница"
      />
      <meta
        name="description"
        content="VinnytsiaJS conference is a full day open-air conference and meetups of all things Javascript, gathering Front-end developers across Ukraine and abroad in the heart of the country."
      />
      <meta property="og:title" content="VinnytsiaJS, UA Javascript Community" />
      <meta property="og:type" content="article" />
      <link rel="canonical" href="http://vinnytsiajs.org/" />
    </Head>

    {pageData.hero?.image && (
      <Hero id={pageData.hero.id} heroData={pageData.hero} />
    )}

    <div className="layer layer-content">
      {/* About Section */}
      <section
        className="py-7 vjs-bg-logo vjs-bg-logo-red text-white section-vh-100 d-flex align-items-center justify-content-center"
        id={pageData.about?.id}
      >
        {pageData.about?.title && <About aboutData={pageData.about} />}
      </section>

      {/* Stat Section */}
      <section id={pageData.stat?.id}>
        {pageData.stat?.items && <Stat statData={pageData.stat} />}
      </section>

      {/* Media Tiles Section */}
      <section id={pageData.mediaTiles?.id} className="vjs-bg-logo vjs-bg-logo-green text-white">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <PageTitle
                className="position-relative py-8"
                title={t('mediaTiles.title')}
                subtitle={t('mediaTiles.subtitle')}
              />
            </div>
          </div>
        </div>
        <MediaTiles mediaTilesData={pageData.mediaTiles} />
      </section>

      {/* Speakers Section */}
      {/* <section className="position-relative pt-5 pb-5">
        <div className="anchor-id" id={speakersData.confspeakers?.id}></div>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <PageTitle
                className="position-relative"
                title={speakersData.confspeakers?.title}
                subtitle={speakersData.confspeakers?.subtitle}
              />
              <Speakers className="mt-5" speakersData={speakersData.confspeakers} />
            </div>
          </div>
        </div>
      </section> */}

      {/* Call for Papers */}
      <section className="vjs-bg-logo vjs-bg-logo-blue text-white py-6">
        <div className="anchor-id" id="cfp"></div>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <PageTitle className="position-relative" title={t('cfp.title')} />
              <p className="my-4 lead">{t('cfp.lead')}</p>
              <a
                href="https://forms.gle/hExVNTtWWDpuFgrH8"
                className="btn btn-primary my-2 px-5 my-sm-0"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('cfp.submit')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Talks Section */}
      {/* <section className="position-relative pt-5 pb-5">
        <div className="anchor-id" id={speakersData.talks?.id}></div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <PageTitle
                className="position-relative"
                title={speakersData.talks?.title}
                subtitle={speakersData.talks?.subtitle}
              />
              <Talks className="mt-5" talksData={speakersData.talks} />
            </div>
          </div>
        </div>
      </section> */}

      {/* Schedule Section */}
      {/* <section className="position-relative pt-5 pb-5">
        <div className="anchor-id" id={speakersData.schedule?.id}></div>
        <PageTitle className="position-relative" title="Conference Schedule" />
        <h5 className="text-center pt-3 pt-lg-4">
          21.08<span className="font-weight-normal"> - VinnytsiaJS 2021 - Open Air Conference</span>
        </h5>
        <div className="h6 text-center">
          <span>Location: </span>
          <a href="#location">Recreation Base &quot;Butterfly&quot;</a>
        </div>
        <h4 className="h5 text-center py-4">Minor Changes Are Possible</h4>
        <div className="schedule_slot_talk_buttons text-center mb-5">
          {speakersData.scheduletable?.items && (
            <ScheduleTable scheduleTableData={speakersData.scheduletable.items} />
          )}
          <div className="h5">Join Us:</div>
          <a href="#pricing" className="btn btn-primary mt-2 mx-2">Get Ticket</a>
        </div>
      </section> */}

      {/* Pricing Section */}
      {/* <section className="position-relative pb-5">
        <div className="anchor-id" id={pageData.pricing?.id}></div>
        <PageTitle
          className="pt-5 pb-4"
          title={pageData.pricing?.title}
          subtitle={pageData.pricing?.subtitle}
        />
        <Pricing pricingData={pageData.pricing} />
        <PageTitle
          className="pt-6 pb-4"
          title={pageData.pricing?.title}
          subtitle="Sale of tickets on the event is temporary suspended!"
        />
      </section> */}

      {/* <hr /> */}

      {/* Partners Section */}
      <section className="position-relative">
        <div className="anchor-id" id={partnersData.partners?.id}></div>
        <PageTitle
          className="pt-5 pb-4"
          title={t('partners.partnersTitle')}
          subtitle={t('partners.partnersSubtitle')}
        />
        {/* <Partners partnersData={partnersData.partners} mode="xlarge" /> */}
        {/* <div className="text-center pt-5 pb-4">
          <a
            href="mailto:partners@vinnytsiajs.org?subject=VinnytsiaJS%202020%3A%20Became%20a%20Partner"
            className="btn btn-primary my-2 my-sm-0"
          >
            {t('partnersCta.becomePartner')}
          </a>
        </div> */}
      </section>

      <section className="position-relative">
        <PageTitle
          className="pt-5 pb-4"
          title={t('partners.friendsTitle')}
          subtitle={t('partners.friendsSubtitle')}
        />
        <Partners partnersData={partnersData.friends} mode="large" />
      </section>

      <section>
        <PageTitle
          className="pt-5 pb-4"
          title={t('partners.mediapartnersTitle')}
          subtitle={t('partners.mediapartnersSubtitle')}
        />
        <Partners partnersData={partnersData.mediapartners} mode="small" />
        <div className="text-center pt-5 pb-4">
          <a
            href="mailto:partners@vinnytsiajs.org?subject=VinnytsiaJS%202020%3A%20Became%20a%20Partner"
            className="btn btn-primary my-2 my-sm-0"
          >
            {t('partnersCta.becomePartner')}
          </a>
        </div>
      </section>

      <hr />

      {/* Location Section */}
      {/* <section id={pageData.location?.id}>
        <PageTitle className="pt-4 pb-3" title="Location" id="location" />
        <Location locationData={pageData.location} />
      </section> */}

      {/* Contact Us Section */}
      <section className="position-relative">
        <div className="anchor-id" id="contact"></div>
        <PageTitle className="pt-5 pb-3" title={t('contact.contactUs')} />
        <ContactUs contactUsData={{}} socialIconsData={pageData.nav} />
      </section>

      <div className="spacer-nav-bottom"></div>
    </div>

    <TelegramWidget channel="vinjs" postid="141" />
  </DefaultLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const pageData = getConferenceData();
  const speakersData = getSpeakersData();
  const partnersData = getPartnersData();

  return {
    props: {
      pageData,
      speakersData,
      partnersData,
    },
  };
};

export default IndexPage;
