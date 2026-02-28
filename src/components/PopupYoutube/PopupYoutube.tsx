import { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';

interface Props {
  youtubeId: string;
  onClose: () => void;
}

export default function PopupYoutube({ youtubeId, onClose }: Props) {
  const [popupClosed, setPopupClosed] = useState(false);

  useEffect(() => {
    document.querySelector('body')?.classList.add('body-blurred');
    return () => {
      document.querySelector('body')?.classList.remove('body-blurred');
    };
  }, []);

  const closePopup = () => {
    setPopupClosed(true);
    document.querySelector('body')?.classList.remove('body-blurred');
    onClose();
  };

  if (popupClosed) return null;

  return (
    <div className="popup">
      <div className="popup_overlay" onClick={closePopup}></div>
      <div className="popup_body">
        <div className="popup_wrap">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="popup_video">
                  <button
                    type="button"
                    className="btn btn-default p-0 text-white popup_video_close-btn"
                    aria-label="Close"
                    onClick={closePopup}
                  >
                    <span className="icon-close"></span>
                  </button>
                  <YouTube
                    videoId={youtubeId}
                    opts={{
                      width: '100%',
                      height: '100%',
                      playerVars: { autoplay: 1 },
                    }}
                    className="popup_youtube_player"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
