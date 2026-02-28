import SocialIcons from '@/components/SocialIcons/SocialIcons';
import type { NavData } from '@/types/content';

interface Props {
  contactUsData: Record<string, unknown>;
  socialIconsData: NavData;
}

export default function ContactUs({ contactUsData, socialIconsData }: Props) {
  return (
    <div className="contact-us">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <div className="text-center pb-4">
              <p className="h5 font-weight-normal">
                Follow us on social media for more information and news about the conference.
                <br />See you soon!
              </p>
              <div className="contact-us_social-icons navbar-expand d-inline-block h4 my-3">
                <SocialIcons socialIconsData={socialIconsData.socialicons} />
              </div>
              <div className="mb-3">
                <a className="btn btn-secondary py-1 m-1" href="/policy/">Policy</a>
                <a
                  className="btn btn-secondary py-1 m-1"
                  href="https://vinnytsiajs.org/docs/Code_of_Conduct_-_VinnytsiaJS.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Code of Conduct
                </a>
              </div>
              <ul className="list-unstyled">
                <li>
                  <a href="mailto:info@vinnytsiajs.org">info@vinnytsiajs.org</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
