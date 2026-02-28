import ReactMarkdown from 'react-markdown';
import type { ConferenceSpeakers } from '@/types/content';

interface Props {
  speakersData: ConferenceSpeakers;
  className?: string;
}

export default function Speakers({ speakersData, className }: Props) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/vinjs-jm';

  return (
    <div className={`speakers${className ? ' ' + className : ''}`}>
      <div className="container">
        <div className="row justify-content-center align-items-top">
          {speakersData.items.map((item, index) => (
            <div key={index} className="stat_col col-md-6 col-lg-4">
              <div id={item.fields.id} className="speakers_item text-center px-1 mb-5">
                {item.fields.image && (
                  <img
                    className="speakers_img"
                    src={`${basePath}${item.fields.image}`}
                    alt={item.fields.title}
                  />
                )}
                {item.fields.name && (
                  <h3 className="h3 my-3">{item.fields.name}</h3>
                )}
                <div>
                  <span className="lead text-warning">{item.fields.company}</span>
                </div>
                <div className="speakers_item_caption">
                  {item.fields.title && <span>{item.fields.title}</span>}
                  {item.fields.city && <span>, {item.fields.city}</span>}
                  {item.fields.country && <span>, {item.fields.country}</span>}
                </div>
                {item.fields.socialLinks?.length > 0 && item.fields.socialLinks[0]?.src && (
                  <div className="contact-us_social-icons navbar-expand d-inline-block h4 mt-3 my-0">
                    <ul className="social-icons list-unstyled navbar-nav">
                      {item.fields.socialLinks.map((socialLink, sIndex) => (
                        <li key={sIndex} className="social-icons_item nav-item">
                          {socialLink.src && (
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              className="social-icons_link nav-link"
                              href={socialLink.src}
                            >
                              <i className={socialLink.icon}></i>
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.fields.bio && (
                  <div className="mt-3 text-left">
                    <div>
                      <ReactMarkdown>{item.fields.bio}</ReactMarkdown>
                    </div>
                    <div className="text-center py-3">
                      {item.talk?.id ? (
                        <a
                          className="btn btn-outline-primary btn-sm"
                          href={`#${item.talk.id}`}
                        >
                          Talk Info
                        </a>
                      ) : (
                        <span className="btn btn-outline-secondary btn-sm">
                          Talk Will Be Announced
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
