import { useState, useCallback, useEffect, ReactNode } from 'react';
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

  // Anchor smooth scroll behavior
  useEffect(() => {
    const handleAnchorClick = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      document.querySelector('body')?.classList.remove('nav_dropmenu-show');
      el.scrollIntoView({ behavior: 'smooth' });
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
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
