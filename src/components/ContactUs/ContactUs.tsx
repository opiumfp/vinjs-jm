import { useTranslation } from 'react-i18next';
import SocialIcons from '@/components/SocialIcons/SocialIcons';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';
import type { NavData } from '@/types/content';

interface Props {
  contactUsData: Record<string, unknown>;
  socialIconsData: NavData;
}

export default function ContactUs({ contactUsData, socialIconsData }: Props) {
  const { t } = useTranslation();

  return (
    <div className="contact-us">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <div className="text-center pb-4">
              <p className="h5 font-weight-normal">
                {t('contact.followUs')}
                <br />
                {t('contact.seeYouSoon')}
              </p>
              <div className="contact-us_social-icons navbar-expand d-inline-block h4 my-3">
                <SocialIcons socialIconsData={socialIconsData.socialicons} />
              </div>
              <div className="mb-3 d-flex flex-wrap justify-content-center align-items-center">
                <a className="btn btn-secondary py-1 m-1" href="/policy/">
                  {t('contact.policy')}
                </a>
                <a
                  className="btn btn-secondary py-1 m-1"
                  href="https://vinnytsiajs.org/docs/Code_of_Conduct_-_VinnytsiaJS.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('contact.codeOfConduct')}
                </a>
                <LanguageSwitcher />
              </div>
              <ul className="list-unstyled">
                <li>
                  <a href="mailto:vinnytsiajs@gmail.com">vinnytsiajs@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
