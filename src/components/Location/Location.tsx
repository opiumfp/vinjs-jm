import type { LocationData } from '@/types/content';
import ExportedImage from 'next-image-export-optimizer';

interface Props {
  locationData: LocationData;
}

export default function Location({ locationData }: Props) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  return (
    <div className="location">
      <div className="location_head mb-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 text-center">
              <address>
                <span>Location: </span>
                <a
                  className="lead"
                  href="http://butterfly.vn.ua/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Recreation base &quot;Butterfly&quot;
                </a>
                <br />
                <span>20km Khmel&apos;nyts&apos;ke hwy, Sadove, Ukraine</span>
              </address>
            </div>
          </div>
        </div>
      </div>
      <div className="location_content">
        {locationData.image && (
          <div className="location_bg">
            <div className="location_bg_wrap">
              <div className="location_bg_prlx">
                <ExportedImage
                  className="location_bg_img location_bg_img-landscape"
                  src={`${basePath}${locationData.image}`}
                  alt="VinnytsiaJS - Butterfly"
                  loading="lazy"
                  decoding="async"
                  style={{ objectFit: 'cover' }}
                  fill
                  sizes="100vw"
                />
                {locationData.imagePt && (
                  <ExportedImage
                    className="location_bg_img location_bg_img-portrait"
                    src={`${basePath}${locationData.imagePt}`}
                    alt="VinnytsiaJS - Butterfly"
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
        <div className="location_map">
          <div className="container-fluid pt-4 pb-4 pt-lg-5 pb-lg-5">
            <div className="row justify-content-center">
              {locationData.logo && (
                <a
                  href="http://butterfly.vn.ua/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-8 text-center mb-4 mb-lg-5"
                >
                  <img
                    className="location_logo"
                    src={`${basePath}${locationData.logo}`}
                    alt="Butterfly"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              )}
            </div>
            <div className="row justify-content-md-center">
              <div className="col-12 col-md-10 p-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d166582.16801339688!2d28.17665828754939!3d49.27930813095509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x472d5b3c078b4b0f%3A0x56d1766af88db234!2z0JLQuNC90L3QuNGG0LAsINCS0ZbQvdC90LjRhtGPLCDQktGW0L3QvdC40YbRjNC60LAg0L7QsdC70LDRgdGC0YwsIDIxMDAw!3m2!1d49.239428!2d28.510665099999997!4m5!1s0x472d652c320f0057%3A0x689995ceead9496b!2z0JHQsNGC0YLQtdGA0YTQu9GP0LksINCh0LDQtNC-0LLQvtC1!3m2!1d49.3252958!2d28.1269016!5e0!3m2!1sru!2sua!4v1577965525920!5m2!1sru!2sua"
                  width="100%"
                  height="450"
                  frameBorder="0"
                  style={{ border: 0 }}
                  allowFullScreen
                  title="Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
