import { useDevice } from '@/stores/deviceStore';
import { useOpenYoutubePopup } from '@/stores/youtubeStore';
import type { MediaTilesData } from '@/types/content';

interface Props {
  mediaTilesData: MediaTilesData;
}

function getYoutubeID(url: string): string | false {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
}

export default function MediaTiles({ mediaTilesData }: Props) {
  const device = useDevice();
  const openYoutubePopup = useOpenYoutubePopup();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  const linkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    type: string,
    src: string
  ) => {
    if (type === 'youtubePopup' && device && !device.isMobile) {
      e.preventDefault();
      const videoId = getYoutubeID(src);
      if (videoId) {
        openYoutubePopup(videoId);
      }
    }
  };

  return (
    <div className="media-tiles">
      <div className="container-fluid">
        <div className="row">
          {mediaTilesData.items.map((item, index) => (
            <div
              key={index}
              className={`col-12 col-md-6 p-0 col-lg-${item.colDesk || '4'}`}
            >
              <div className={`media-tiles_item media-tiles_item-${item.type}`}>
                {(item.type === 'gallery' || item.type === 'youtubePopup' || item.type === 'youtubelink') && (
                  <a
                    href={item.src}
                    className="media-tiles_item_href"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => linkClick(e, item.type, item.src)}
                  >
                    {item.image && (
                      <img
                        className="media-tiles_item_img"
                        src={`${basePath}${item.image}`}
                        alt={`VinnytsiaJS - ${item.title}`}
                      />
                    )}
                    <div className="media-tiles_item_overlay d-flex align-items-center justify-content-center text-center">
                      <div className="media-tiles_item_overlay_tile">
                        {item.type === 'gallery' && (
                          <span className="display-4 d-inline-block mb-1 icon-facebook-square"></span>
                        )}
                        {item.type === 'youtubelink' && (
                          <span className="display-4 d-inline-block mb-1 icon-youtube-play"></span>
                        )}
                        {item.type === 'youtubePopup' && (
                          <span className="display-4 d-inline-block mb-1 icon-youtube-play"></span>
                        )}
                        {item.title && <div className="h5">{item.title}</div>}
                      </div>
                    </div>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
