import type { HeroData } from '@/types/content';

interface Props {
  id?: string;
  heroPTData: HeroData;
  center?: boolean;
}

export default function HeroPT({ id, heroPTData, center }: Props) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/vinjs-jm';

  return (
    <div className="heropt" id={id}>
      <div className="heropt_wrapper">
        <div className="heropt_bg">
          {heroPTData.image && (
            <img
              className="heropt_bg_image heropt_bg_image-landscape"
              src={`${basePath}${heroPTData.image}`}
              alt="Vinnytsia JS - Javascript Open Air"
            />
          )}
          {heroPTData.imagePt && (
            <img
              className="heropt_bg_image heropt_bg_image-portrait"
              src={`${basePath}${heroPTData.imagePt}`}
              alt="Vinnytsia JS - Javascript Open Air"
            />
          )}
        </div>
        <div className="heropt_content pt-6">
          <div className="container">
            <div className="row">
              <div
                className={`col-12 text-center text-lg-left ${
                  center ? 'text-lg-center col-lg-12' : 'col-lg-7'
                }`}
              >
                {heroPTData.date && (
                  <h2 className="h3 heropt_date text-uppercase font-weight-bold text-warning">
                    {heroPTData.date}
                  </h2>
                )}
                <h2 className="h1 heropt_subtitle font-weight-bold">
                  {heroPTData.title}
                </h2>
                {heroPTData.subtitle && (
                  <h2 className="h4 heropt_subtitle">{heroPTData.subtitle}</h2>
                )}
                <div className="h1 heropt_subtitle-pt text-uppercase font-weight-bold">
                  {heroPTData.title}
                </div>
                {heroPTData.button && (
                  <div className="mt-4">
                    <a className="btn btn-primary" href={heroPTData.button.link}>
                      {heroPTData.button.title}
                    </a>
                  </div>
                )}
              </div>
              {!center && (
                <div className="col-5 d-none d-lg-block">
                  <img
                    className="heropt_logo d-block mx-auto my-4"
                    src={`${basePath}/assets/images/logo/VinJS_PUB_TALKS-LOGO.png`}
                    alt="VinnytsiaJS - Javascript Open Air Conference"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
