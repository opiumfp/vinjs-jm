import { useEffect } from 'react';
import SocialIcons from '@/components/SocialIcons/SocialIcons';
import type { NavData } from '@/types/content';

interface Props {
  navData: NavData;
}

export default function NavBar({ navData }: Props) {
  useEffect(() => {
    const handleOrientationChange = () => {
      document.querySelector('body')?.classList.remove('nav_dropmenu-show');
    };

    let pageScrolled = false;
    const handleScroll = () => {
      if (window.scrollY === 0) {
        document.querySelector('body')?.classList.remove('page-scrolled');
        pageScrolled = false;
      } else {
        if (pageScrolled) return;
        document.querySelector('body')?.classList.add('page-scrolled');
        pageScrolled = true;
      }
    };

    window.addEventListener('orientationchange', handleOrientationChange, false);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Ensure in-page anchor links (class "scroll") jump to the right
  // position on mobile/with fixed bottom navbar and when loading with a hash.
  useEffect(() => {
    const scrollToHash = (hash: string, behavior: ScrollBehavior = 'auto') => {
      if (!hash) return;
      const id = decodeURIComponent(hash.replace('#', ''));
      const el = document.getElementById(id) || (document.getElementsByName(id)[0] as HTMLElement | undefined);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top;
      window.scrollTo({ top: Math.max(0, absoluteTop), behavior });
    };

    const onDocumentClick = (ev: Event) => {
      const target = ev.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;
      // only handle anchors that have a hash and the "scroll" class
      if (!anchor.hash || !anchor.classList.contains('scroll')) return;

      ev.preventDefault();
      // close mobile drop nav immediately
      closeDropNav();

      const hash = anchor.hash;
      // update URL without navigating
      try {
        history.pushState(null, '', hash);
      } catch {}

      // give the UI a moment to update (menu close) before scrolling
      setTimeout(() => scrollToHash(hash, 'smooth'), 50);
    };

    document.addEventListener('click', onDocumentClick);

    // If the page loaded with a hash, adjust scroll after mount.
    if (window.location.hash) {
      // Delay briefly so layout (and any mobile nav state) stabilizes.
      setTimeout(() => scrollToHash(window.location.hash, 'auto'), 50);
    }

    return () => {
      document.removeEventListener('click', onDocumentClick);
    };
  }, []);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  const computeHref = (src: string) => {
    try {
      const normBase = basePath && basePath !== '/' ? (basePath.endsWith('/') ? basePath.slice(0, -1) : basePath) : '';
      const normSrc = src.startsWith('/') ? src : '/' + src;
      return normBase + normSrc;
    } catch {
      return src.startsWith('/') ? src : '/' + src;
    }
  };

  const toggleDropNav = () => {
    document.querySelector('body')?.classList.toggle('nav_dropmenu-show');
  };

  const closeDropNav = () => {
    document.querySelector('body')?.classList.remove('nav_dropmenu-show');
  };

  return (
    <nav className="vjs-navbar navbar navbar-expand-lg fixed-bottom navbar-dark bg-dark">
      <div className="vjs-navbar_nav-mobile">
        <button
          onClick={toggleDropNav}
          className="navbar-toggler"
          type="button"
          data-target="#navbar_dropmenu"
          aria-controls="navbar_dropmenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      <div className="vjs-navbar_collaplse navbar-collapse" id="navbar_dropmenu">
        <div className="vjs-navbar_social-wrap">
          <SocialIcons socialIconsData={navData.socialicons} />
        </div>
        <ul className="vjs-navbar_nav navbar-nav">
          {navData.items.map((item, index) => (
            <li key={index} className="nav-item">
              {item.active && (
                <a
                  className="vjs-navbar_link nav-link scroll text-uppercase"
                  href={computeHref(item.src)}
                  onClick={closeDropNav}
                >
                  {item.title}
                  <span className="sr-only">(current)</span>
                </a>
              )}
            </li>
          ))}
        </ul>
        <div className="vjs-navbar_button-wrap text-right">
          {navData.button && (
            <a
              href={navData.button.src}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary d-inline-block mx-auto ml-lg-auto mr-lg-0 px-4 px-lg-5"
            >
              {navData.button.title}
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
