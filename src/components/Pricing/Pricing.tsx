import type { PricingData } from '@/types/content';

interface Props {
  pricingData: PricingData;
}

export default function Pricing({ pricingData }: Props) {
  const colSize = pricingData.col ? 12 / parseInt(pricingData.col) : 4;

  return (
    <div className="pricing">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          {pricingData.items.map((item, index) => (
            <div
              key={index}
              className={`col-md-6 col-lg-${colSize}`}
            >
              <div
                className={`pricing_item text-center mb-4 mb-lg-0 pricing_item-${item.status}`}
              >
                {item.title && (
                  <div className="pricing_item_title h5 text-white text-uppercase py-2">
                    <span>{item.title}</span>
                  </div>
                )}
                {item.price && (
                  <div className="pricing_item_price display-4 py-4">
                    <span>{item.price}</span>
                    <span>{pricingData.currency}</span>
                  </div>
                )}
                {item.caption && (
                  <div className="pricing_item_caption mx-4 py-2">
                    <span>{item.caption}</span>
                  </div>
                )}
                {item.btnLabel && (
                  <div className="pricing_item_btn text-center py-4">
                    {item.status === 'active' ? (
                      <a
                        href={item.btnSrc}
                        className="btn my-2 my-sm-0 btn-success"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.btnLabel}
                      </a>
                    ) : (
                      <div className="btn my-2 my-sm-0 btn-primary">
                        {item.btnLabel}
                      </div>
                    )}
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
