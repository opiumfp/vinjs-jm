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

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/vinjs-jm';

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
