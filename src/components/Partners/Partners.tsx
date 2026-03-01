import type { PartnerGroup } from '@/types/content';

interface Props {
  partnersData: PartnerGroup;
  mode: string;
}

function getBlockSizes(mode: string): string {
  switch (mode) {
    case 'xlarge':
      return 'col-6 col-sm-4 col-md-4 col-lg-4 px-4';
    case 'large':
      return 'col-4 col-sm-3 col-md-3 col-lg-2';
    case 'small':
      return 'col-4 col-sm-3 col-md-3 col-lg-2 px-3';
    default:
      return '';
  }
}

export default function Partners({ partnersData, mode }: Props) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  return (
    <div className="partners">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          {partnersData.items.map((item, index) => (
            <div
              key={index}
              className={`stat_col ${getBlockSizes(mode)}`}
            >
              {item.active && (
                <div className="partners_item text-center pb-4 px-1">
                  <a href={item.fields.src} target="_blank" rel="noopener noreferrer">
                    {item.fields.image && (
                      <img
                        className="partners_img"
                        src={`${basePath}${item.fields.image}`}
                        alt={item.fields.title}
                      />
                    )}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
