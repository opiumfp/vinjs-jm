import ReactMarkdown from 'react-markdown';
import type { StatData } from '@/types/content';

interface Props {
  statData: StatData;
}

export default function Stat({ statData }: Props) {
  const colWidth = statData.items.length ? Math.floor(12 / statData.items.length) : 12;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  return (
    <div className="stat">
      {statData.image && (
        <div className="stat_bg">
          <div className="stat_bg_wrap">
            {statData.imagePt && (
              <img
                className="stat_bg_img stat_bg_img-portrait"
                src={`${basePath}${statData.imagePt}`}
                alt="Vinnytsia JS - UA Frontend Conference"
              />
            )}
            <div className="stat_bg_prlx">
              {statData.image && (
                <img
                  className="stat_bg_img stat_bg_img-landscape"
                  src={`${basePath}${statData.image}`}
                  alt="Vinnytsia JS - UA Frontend Conference"
                />
              )}
            </div>
          </div>
        </div>
      )}
      <div className="container pt-6 pb-6">
        <div className="row justify-content-center">
          {statData.items.map((item, index) => (
            <div
              key={index}
              className={`stat_col col-12 col-lg-${colWidth}`}
            >
              <div className="stat_item text-center">
                {item.title && (
                  <div className="h3 stat_title mb-2 mb-lg-3">
                    <ReactMarkdown components={{ p: ({ children }) => <span>{children}</span> }}>{item.title}</ReactMarkdown>
                  </div>
                )}
                {item.paragraph && (
                  <div className="stat_paragraph">
                    <ReactMarkdown>{item.paragraph}</ReactMarkdown>
                  </div>
                )}
                {index !== statData.items.length - 1 && (
                  <hr className="stat_hr bg-light w-25 my-4" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
