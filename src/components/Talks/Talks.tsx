import ReactMarkdown from 'react-markdown';
import type { TalksData } from '@/types/content';

interface Props {
  talksData: TalksData;
  className?: string;
}

export default function Talks({ talksData, className }: Props) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/vinjs-jm';

  return (
    <div className={`talks${className ? ' ' + className : ''}`}>
      <div className="container">
        <div>
          {talksData.items.map((item, index) => (
            <div key={index} className="row align-items-top">
              <div className="col-12 talks_item px-1 mb-3">
                <div id={item.talk.id} className="talks-item p-3 p-lg-4 text-white">
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3 pr-lg-5 text-center align-self-baseline">
                      <a className="talks_item_a" href={`#${item.speaker.id}`}>
                        {item.speaker.image && (
                          <img
                            className="talks_img"
                            src={`${basePath}${item.speaker.image}`}
                            alt={item.speaker.name}
                          />
                        )}
                        {item.speaker.name && (
                          <h3 className="talks_item-speaker-name h5 mt-3 mb-0">
                            {item.speaker.name}
                          </h3>
                        )}
                      </a>
                    </div>
                    <div className="col-12 col-md-9">
                      {item.talk.title && (
                        <h3 className="talks_item_title mt-3 mt-md-0">
                          {item.talk.title}
                        </h3>
                      )}
                      {item.talk.description && (
                        <div className="mt-3 text-left">
                          <div>
                            <ReactMarkdown>{item.talk.description}</ReactMarkdown>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
