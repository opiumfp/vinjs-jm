import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

interface Props {
  channel: string;
  postid: string;
}

function TelegramWidgetClient({ channel, postid }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleTme = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div id="tme" className="tme">
      <button onClick={toggleTme} className="tme_button">
        <i className="icon icon-telegram"></i>
      </button>
      <div className="tme_main">
        <div
          id="tme_main_overlay"
          className={`tme_main_overlay${isOpen ? ' show' : ''}`}
        >
          <button onClick={toggleTme} className="tme_main_btn-close">
            <i className="icon icon-angle-right"></i>
          </button>
          <div className="tme_main_wrap p-4">
            <div className="tme_main_body" ref={ref}>
              <TelegramEmbed channel={channel} postid={postid} containerRef={ref} />
              <a
                href={`https://t.me/${channel}`}
                target="_blank"
                rel="noopener noreferrer"
                className="tme_main_btn-channel btn btn-primary py-1 mt-3"
              >
                View in Channel
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TelegramEmbed({
  channel,
  postid,
  containerRef,
}: {
  channel: string;
  postid: string;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  useEffect(() => {
    if (!containerRef.current) return;
    // Check if script already exists
    const existing = containerRef.current.querySelector('script');
    if (existing) return;

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-post', `${channel}/${postid}`);
    script.setAttribute('data-width', '100%');
    script.setAttribute('data-color', 'DB8400');
    script.setAttribute('data-userpic', 'false');
    script.async = true;
    containerRef.current.insertBefore(script, containerRef.current.firstChild);
  }, [channel, postid, containerRef]);

  return null;
}

const TelegramWidget = dynamic(
  () => Promise.resolve(TelegramWidgetClient),
  { ssr: false }
);

export default TelegramWidget;
