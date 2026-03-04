import { useState, useCallback, useEffect, ReactNode } from 'react';
import { scroller } from 'react-scroll';
import NavBar from '@/components/NavBar/NavBar';
import PopupYoutube from '@/components/PopupYoutube/PopupYoutube';
import { DeviceProvider } from '@/stores/deviceStore';
import { YoutubePopupProvider } from '@/stores/youtubeStore';
import type { NavData } from '@/types/content';

interface Props {
  navData: NavData;
  children: ReactNode;
}

export default function DefaultLayout({ navData, children }: Props) {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = useCallback((id: string) => {
    setVideoId(id);
    setShowPopup(true);
  }, []);

  const closePopup = useCallback(() => {
    setShowPopup(false);
    setVideoId(null);
    document.querySelector('body')?.classList.remove('body-blurred');
  }, []);

  // In-page # links that are not react-scroll Link (e.g. in content): scroll via react-scroll.
  // Nav uses <Link> from react-scroll and handles its own clicks.
  useEffect(() => {
    const scrollToId = (id: string, smooth: boolean) => {
      scroller.scrollTo(id, {
        duration: smooth ? 500 : 0,
        smooth,
        offset: 0,
      });
    };

    const handleAnchorClick = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (!href || !href.startsWith('#') || href.length <= 1) return;
      const id = decodeURIComponent(href.slice(1));
      if (!document.getElementById(id) && !document.getElementsByName(id)[0]) return;
      e.preventDefault();
      document.querySelector('body')?.classList.remove('nav_dropmenu-show');
      scrollToId(id, true);
      try {
        history.replaceState(null, '', href);
      } catch {
        // ignore
      }
    };

    const onPopState = () => {
      const hash = window.location.hash;
      if (!hash) return;
      scrollToId(decodeURIComponent(hash.slice(1)), true);
    };

    const anchors = document.querySelectorAll('a[href^="#"]:not(.vjs-navbar a)');
    anchors.forEach((anchor) => anchor.addEventListener('click', handleAnchorClick));
    window.addEventListener('popstate', onPopState);

    if (window.location.hash) {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (document.getElementById(id) ?? document.getElementsByName(id)[0]) {
        requestAnimationFrame(() => scrollToId(id, false));
      }
    }

    return () => {
      anchors.forEach((anchor) => anchor.removeEventListener('click', handleAnchorClick));
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  return (
    <DeviceProvider>
      <YoutubePopupProvider onOpen={openPopup}>
        <div className="layout">
          <header className="header">
            <NavBar navData={navData} />
          </header>
          <div id="main">
            {children}
          </div>
          {showPopup && videoId && (
            <PopupYoutube youtubeId={videoId} onClose={closePopup} />
          )}
        </div>
      </YoutubePopupProvider>
    </DeviceProvider>
  );
}
