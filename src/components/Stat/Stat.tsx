import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import type { StatData } from '@/types/content';
import ExportedImage from 'next-image-export-optimizer';

interface Props {
  statData: StatData;
}

export default function Stat({ statData }: Props) {
  const { t } = useTranslation();
  const colWidth = statData.items.length ? Math.floor(12 / statData.items.length) : 12;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  return (
    <div className="stat">
      {statData.image && (
        <div className="stat_bg">
          <div className="stat_bg_wrap">
            {statData.imagePt && (
              <ExportedImage
                className="stat_bg_img stat_bg_img-portrait"
                src={`${basePath}${statData.imagePt}`}
                alt="Vinnytsia JS - UA Frontend Conference"
                loading="lazy"
                decoding="async"
                fill
                sizes="100vw"
              />
            )}
            <div className="stat_bg_prlx">
              {statData.image && (
                <ExportedImage
                  className="stat_bg_img stat_bg_img-landscape"
                  src={`${basePath}${statData.image}`}
                  alt="Vinnytsia JS - UA Frontend Conference"
                  loading="lazy"
                  decoding="async"
                  style={{ objectFit: 'cover' }}
                  fill
                  sizes="100vw"
                />
              )}
            </div>
          </div>
        </div>
      )}
      <div className="container pt-6 pb-6">
        <div className="row justify-content-center">
          {statData.items.map((item, index) => {
            const titleKey = `stat.items.${index}.title`;
            const paragraphKey = `stat.items.${index}.paragraph`;
            const title = t(titleKey);
            const paragraph = t(paragraphKey);
            const useTranslated = title !== titleKey;
            const displayTitle = useTranslated ? title : item.title;
            const displayParagraph = useTranslated ? paragraph : item.paragraph;

            return (
            <div
              key={index}
              className={`stat_col col-12 col-lg-${colWidth}`}
            >
              <div className="stat_item text-center">
                {displayTitle && (
                  <div className="h3 stat_title mb-2 mb-lg-3">
                    <ReactMarkdown components={{ p: ({ children }) => <span>{children}</span> }}>{displayTitle}</ReactMarkdown>
                  </div>
                )}
                {displayParagraph && (
                  <div className="stat_paragraph">
                    <ReactMarkdown>{displayParagraph}</ReactMarkdown>
                  </div>
                )}
                {index !== statData.items.length - 1 && (
                  <hr className="stat_hr bg-light w-25 my-4" />
                )}
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
