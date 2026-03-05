import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDevice } from '@/stores/deviceStore';
import type { HeroData } from '@/types/content';
import ExportedImage from 'next-image-export-optimizer';

interface Props {
  id?: string;
  heroData: HeroData;
}

export default function Hero({ id, heroData }: Props) {
  const { t } = useTranslation();
  const device = useDevice();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!device?.isShowVideo || !videoRef.current) return;

    const video = videoRef.current;
    video.play();

    setTimeout(() => {
      video.classList.add('hero_bg_video-loaded');
    }, 1);

    let videoHide = false;
    const windowHeight = window.innerHeight;

    const handleScroll = () => {
      if (window.scrollY < windowHeight) {
        if (!videoHide) return;
        video.play();
        videoHide = false;
      } else if (!videoHide) {
        video.pause();
        videoHide = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [device]);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  return (
    <div className="hero" id={id}>
      <div className="hero_wrapper">
        <div className="hero_bg">
          {device && !device.isShowVideo ? (
            <>
              {heroData.image && (
                <ExportedImage
                  className="hero_bg_image hero_bg_image-landscape"
                  src={`${basePath}${heroData.image}`}
                  alt="Vinnytsia JS - Javascript Open Air"
                  fill
                  sizes='100vw'
                />
              )}
            </>
          ) : (
            <video
              ref={videoRef}
              className="hero_bg_video"
              muted
              loop
              playsInline
              suppressHydrationWarning
            >
              <source suppressHydrationWarning src={`${basePath}/assets/videos/vjs21.mp4`} type="video/mp4" />
              <source suppressHydrationWarning src={`${basePath}/assets/videos/vjs21.ogg`} type="video/ogg" />
              <source suppressHydrationWarning src={`${basePath}/assets/videos/vjs21.webm`} type="video/webm" />
            </video>
          )}
          {heroData.imagePt && (
            <ExportedImage
              className="hero_bg_image hero_bg_image-portrait"
              src={`${basePath}${heroData.imagePt}`}
              alt="Vinnytsia JS - Javascript Open Air"
              fill
              sizes='100vw'
            />
          )}
        </div>
        <div className="hero_content pt-4">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {heroData.date && (
                  <h2 className="h3 hero_date text-uppercase font-weight-bold">
                    {heroData.date}
                  </h2>
                )}
                {/* Conference Logo */}
                <img
                  className="hero_logo d-block mx-auto my-4"
                  src={`${basePath}/assets/images/logo/VinnytsiaJS-2020-logo.svg`}
                  alt="VinnytsiaJS - Javascript Open Air Conference"
                />
                <h2 className="h1 hero_subtitle text-uppercase font-weight-bold">
                  {t('hero.subtitleShort')}
                </h2>
                <div className="h1 hero_subtitle-pt text-uppercase font-weight-bold">
                  {t('hero.subtitleShortLine1')}
                  <br />
                  {t('hero.subtitleShortLine2')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
