# Migration Plan: Gridsome → Next.js

## Overview

This document provides a detailed, step-by-step plan for migrating the **VinnytsiaJS** website from Gridsome 0.7 (Vue.js 2 SSG) to **Next.js 14+** (React SSG/SSR). The goal is to preserve all existing design, animations, UI behaviors, and content management patterns while moving to a modern, actively maintained framework.

---

## Why Next.js?

| Concern | Current (Gridsome) | Next.js |
|---|---|---|
| Maintenance | EOL / no active development | Actively maintained by Vercel |
| Vue.js 2 | EOL (Jan 2024) | Not applicable (React) |
| Node.js compat | Requires `--openssl-legacy-provider` | Fully modern Node.js |
| Image opt. | Gridsome `g-image` (build-time) | `next/image` (runtime + build) |
| Static export | `gridsome build` + `gh-pages` | `next export` + `gh-pages` |
| TypeScript | Limited | First-class |

---

## Migration Strategy

- **Output type:** Static export (`next export`) → same GitHub Pages deployment
- **Data layer:** Replace GraphQL + `@gridsome/source-filesystem` with direct Markdown parsing via `gray-matter` + `fs` inside `getStaticProps`
- **Styling:** Keep all existing SCSS files as-is; Next.js supports SCSS natively with `sass`
- **Components:** Migrate Vue SFCs → React functional components (TSX), preserving HTML structure and CSS class names
- **Animations/behaviors:** Preserve via direct DOM APIs (scroll listeners) and CSS; replace Vue-specific libraries with React equivalents

---

## Phase 0 — Pre-migration Preparation

### 0.1 Audit Current Dependencies

| Current Package | Role | Next.js Replacement |
|---|---|---|
| `gridsome` | SSG framework | `next` |
| `@gridsome/source-filesystem` | Markdown file loader | `gray-matter` + `fs` |
| `@gridsome/transformer-remark` | Markdown → HTML | `remark` + `remark-html` |
| `bootstrap` | CSS framework | `bootstrap` (same, v5 recommended) |
| `bootstrap-vue` | Vue component wrappers | `react-bootstrap` or plain Bootstrap CSS |
| `vue-youtube` | YouTube player | `react-youtube` |
| `vue-markdown` | Markdown renderer | `react-markdown` |
| `vue-prlx` | Parallax directive | CSS `background-attachment: fixed` (already in SCSS) |
| `smoothscroll-polyfill` | Smooth scroll | CSS `scroll-behavior: smooth` |
| `mobile-device-detect` | Device detection | `react-device-detect` |
| `moment` | Date formatting | `date-fns` or native `Intl` |
| `gh-pages` | Deploy to GitHub Pages | `gh-pages` (unchanged) |
| `cross-env` | Cross-platform env vars | `cross-env` (unchanged) |
| `sass` / `sass-loader` | SCSS compilation | `sass` (Next.js built-in support) |

### 0.2 Create a New Branch

```bash
git checkout -b migration/nextjs
```

### 0.3 Snapshot Content Files

No Markdown content files change during migration. Commit a snapshot tag:

```bash
git tag pre-migration-snapshot
```

---

## Phase 1 — Project Scaffolding

### 1.1 Initialize Next.js Project (in a temp directory or alongside)

```bash
npx create-next-app@latest vinjs-nextjs \
  --typescript \
  --tailwind=false \
  --eslint \
  --app=false \       # Use Pages Router for simpler migration from Gridsome's page-per-file model
  --src-dir=true \
  --import-alias="@/*"
```

> **Note:** Use the **Pages Router** (not App Router) to mirror Gridsome's `src/pages/` structure and minimize cognitive overhead during migration. App Router can be adopted in a follow-up refactor.

### 1.2 Install Core Dependencies

```bash
npm install gray-matter remark remark-html
npm install react-youtube react-markdown react-device-detect
npm install bootstrap
npm install react-bootstrap
npm install date-fns
npm install sass
npm install gh-pages cross-env
```

### 1.3 Configure `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',             // Static export (replaces gridsome build)
  basePath: '',        // Replaces gridsome.config.js pathPrefix (use empty string for root)
  trailingSlash: true,          // GitHub Pages compatibility
  images: {
    unoptimized: true,          // Required for static export
  },
};

module.exports = nextConfig;
```

### 1.4 Configure `package.json` Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next build",
    "deploy": "next build && npx gh-pages -d out"
  }
}
```

---

## Phase 2 — Data Layer Migration

This is the most significant architectural change. Gridsome's GraphQL build-time layer is replaced with direct Node.js file reading inside `getStaticProps`.

### 2.1 Directory Structure (unchanged)

Keep `content/` exactly as-is. Next.js reads these files at build time:

```
content/
  conf/
    vinnytsiajs-2022-conference.md   ← main config
    speakersdata/speakers-2022.md    ← speakers + talks + schedule
    partnersdata/partners-2022.md    ← partners tiers
  policy/policy.md
  nav/main-menu.md
```

### 2.2 Create `lib/content.ts` — Central Data Access Layer

```typescript
// src/lib/content.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

export function readMarkdownFile(relativePath: string) {
  const fullPath = path.join(contentDir, relativePath);
  const raw = fs.readFileSync(fullPath, 'utf-8');
  const { data, content } = matter(raw);
  return { frontmatter: data, body: content };
}

export function getConferenceData() {
  return readMarkdownFile('conf/vinnytsiajs-2022-conference.md').frontmatter;
}

export function getSpeakersData() {
  return readMarkdownFile('conf/speakersdata/speakers-2022.md').frontmatter;
}

export function getPartnersData() {
  return readMarkdownFile('conf/partnersdata/partners-2022.md').frontmatter;
}

export function getPolicyData() {
  return readMarkdownFile('policy/policy.md');
}
```

### 2.3 Use in `getStaticProps`

```typescript
// src/pages/index.tsx
export const getStaticProps: GetStaticProps = async () => {
  const pageData    = getConferenceData();
  const speakersData = getSpeakersData();
  const partnersData = getPartnersData();

  return {
    props: { pageData, speakersData, partnersData },
  };
};
```

**This exactly replicates the `<page-query>` pattern from `Index.vue`** — all three data roots are available as page-level props.

### 2.4 Image Paths

- Gridsome's `g-image` processed paths like `image (quality:90, width:200)` at build time
- In Next.js, images referenced in Markdown frontmatter are static paths relative to `uploads/` or `assets/`
- Replace all `g-image` with `next/image` providing `width`, `height`, and `quality` props
- Gridsome image transformation query params (`quality`, `width`, `height`) become `next/image` props

```tsx
// Before (Gridsome Vue)
<g-image :src="speaker.image" width="200" quality="90" />

// After (Next.js React)
import Image from 'next/image';
<Image src={speaker.image} width={200} height={200} quality={90} alt={speaker.name} />
```

---

## Phase 3 — Project File Structure

```
src/
  lib/
    content.ts              # Data access layer (replaces GraphQL)
    device.ts               # Device detection hook
  layouts/
    DefaultLayout.tsx       # Shell: NavBar + children + PopupYoutube
  pages/
    index.tsx               # Main single-page site
    about.tsx               # /about
    policy.tsx              # /policy
    ua.tsx                  # Ukrainian-language variant
  components/
    NavBar/
      NavBar.tsx
      NavBar.module.scss
    Hero/
      Hero.tsx
      Hero.module.scss
    HeroPT/
    About/
    Stat/
    MediaTiles/
    Speakers/
    Talks/
    ScheduleTable/
    Pricing/
    Partners/
    Location/
    ContactUs/
    TelegramWidget/
    SocialIcons/
    PopupYoutube/
    PageTitle/
  stores/
    deviceStore.tsx         # React Context replacing Vue.observable
assets/
  styles/                   # Keep all SCSS files unchanged
  images/
  fonts/
  videos/
uploads/                    # Keep as-is; copy to public/ for static serving
static/admin/               # Copy to public/admin/
content/                    # Keep as-is
```

> **Key:** Copy `uploads/` and `static/` → `public/` for Next.js static file serving.

---

## Phase 4 — Layout Migration

### 4.1 `Default.vue` → `DefaultLayout.tsx`

**Key behaviors to preserve:**
- NavBar receives navigation config data
- `PopupYoutube` modal controlled by layout-level state
- `loadPopupVideo(id)` triggered from `MediaTiles` (currently event bus → becomes React Context)
- Device detection data set in layout, stored in context

```tsx
// src/layouts/DefaultLayout.tsx
import { useState, useEffect, useCallback } from 'react';
import NavBar from '@/components/NavBar/NavBar';
import PopupYoutube from '@/components/PopupYoutube/PopupYoutube';
import { DeviceProvider } from '@/stores/deviceStore';
import { YoutubePopupProvider } from '@/stores/youtubeStore';

interface Props {
  navData: NavData;
  children: React.ReactNode;
}

export default function DefaultLayout({ navData, children }: Props) {
  const [videoId, setVideoId] = useState<string | null>(null);

  const openPopup = useCallback((id: string) => setVideoId(id), []);
  const closePopup = useCallback(() => setVideoId(null), []);

  return (
    <DeviceProvider>
      <YoutubePopupProvider onOpen={openPopup}>
        <div className="layout">
          <header className="header">
            <NavBar navData={navData} />
          </header>
          <div id="main">{children}</div>
          {videoId && (
            <PopupYoutube youtubeId={videoId} onClose={closePopup} />
          )}
        </div>
      </YoutubePopupProvider>
    </DeviceProvider>
  );
}
```

---

## Phase 5 — State Management Migration

### 5.1 Device Detection — `store.js` → React Context

**Current:** `Vue.observable` store set in `Default.vue`, consumed across components.

```tsx
// src/stores/deviceStore.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { isMobile, isMobileOnly, isTablet, isBrowser, isIE, isEdge } from 'react-device-detect';

interface DeviceState {
  isMobile: boolean;
  isMobileOnly: boolean;
  isTablet: boolean;
  isBrowser: boolean;
  isIE: boolean;
  isEdge: boolean;
  isShowVideo: boolean;
  noPrlx: boolean;
}

const DeviceContext = createContext<DeviceState | null>(null);

export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const [device, setDevice] = useState<DeviceState | null>(null);

  useEffect(() => {
    // Run only client-side (Next.js SSR safety)
    const deviceData: DeviceState = {
      isMobile, isMobileOnly, isTablet, isBrowser, isIE, isEdge,
      noPrlx: isEdge || isIE,
      isShowVideo: isBrowser && !isIE && !isEdge,
    };
    setDevice(deviceData);
  }, []);

  return <DeviceContext.Provider value={device}>{children}</DeviceContext.Provider>;
}

export const useDevice = () => useContext(DeviceContext);
```

### 5.2 YouTube Popup Event Bus → React Context

**Current:** `this.$root.$emit('showPopupYoutube', id)` in `MediaTiles.vue` triggers `Default.vue` handler via Vue event bus.

```tsx
// src/stores/youtubeStore.tsx
import { createContext, useContext } from 'react';

const YoutubePopupContext = createContext<(id: string) => void>(() => {});

export function YoutubePopupProvider({
  children,
  onOpen,
}: {
  children: React.ReactNode;
  onOpen: (id: string) => void;
}) {
  return (
    <YoutubePopupContext.Provider value={onOpen}>
      {children}
    </YoutubePopupContext.Provider>
  );
}

export const useOpenYoutubePopup = () => useContext(YoutubePopupContext);
```

---

## Phase 6 — Component Migration Reference

Each Vue SFC maps to a React component. SCSS styles are preserved and imported as CSS Modules (`.module.scss`) or global SCSS.

### 6.1 Component Migration Table

| Vue Component | React Component | Key Migration Notes |
|---|---|---|
| `NavBar.vue` | `NavBar.tsx` | Scroll listener in `useEffect`; `router.options.base` → `process.env.NEXT_PUBLIC_BASE_PATH`; `computeHref()` preserved as utility function |
| `Hero.vue` | `Hero.tsx` | Video autoplay + scroll listener in `useEffect`; `g-image` → `next/image`; `store.device` → `useDevice()` hook |
| `HeroPT.vue` | `HeroPT.tsx` | Same as Hero pattern |
| `About.vue` | `About.tsx` | Static content; `g-image` → `next/image` |
| `Stat.vue` | `Stat.tsx` | `g-image` → `next/image`; map over items |
| `MediaTiles.vue` | `MediaTiles.tsx` | `linkClick` for youtube popup → `useOpenYoutubePopup()`; `g-image` → `next/image` |
| `Speakers.vue` | `Speakers.tsx` | Speaker card grid; `g-image` → `next/image` |
| `Talks.vue` | `Talks.tsx` | Talk listing with speaker images |
| `ScheduleTable.vue` | `ScheduleTable.tsx` | Timetable grid; no image dependency |
| `Pricing.vue` | `Pricing.tsx` | Ticket tier cards; external links unchanged |
| `Partners.vue` | `Partners.tsx` | `mode` prop preserved; `getBlockSizes()` utility function preserved; `g-image` → `next/image` |
| `Location.vue` | `Location.tsx` | OSM iframe embed; `g-image` → `next/image` |
| `ContactUs.vue` | `ContactUs.tsx` | Social links from nav data prop |
| `SocialIcons.vue` | `SocialIcons.tsx` | Icon font classes preserved (IcoMoon); map over items |
| `TelegramWidget.vue` | `TelegramWidget.tsx` | Script injection via `useEffect` (Telegram widget script); `'use client'` / `dynamic` with `ssr: false` |
| `PopupYoutube.vue` | `PopupYoutube.tsx` | `vue-youtube` → `react-youtube`; open/close via props; scroll lock on body |
| `PageTitle.vue` | `PageTitle.tsx` | Simple presentational; direct port |
| `FeaturedImage.vue` | `FeaturedImage.tsx` | `g-image` → `next/image` |

### 6.2 Example: NavBar Migration

```tsx
// src/components/NavBar/NavBar.tsx
'use client';
import { useEffect } from 'react';
import SocialIcons from '@/components/SocialIcons/SocialIcons';
import styles from './NavBar.module.scss';

export default function NavBar({ navData }: { navData: NavData }) {
  useEffect(() => {
    const handleOrientationChange = () => {
      document.querySelector('body')?.classList.remove('nav_dropmenu-show');
    };
    const handleScroll = () => {
      if (window.scrollY === 0) {
        document.querySelector('body')?.classList.remove('page-scrolled');
      } else {
        document.querySelector('body')?.classList.add('page-scrolled');
      }
    };
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const computeHref = (src: string) => {
    const normSrc = src.startsWith('/') ? src : '/' + src;
    return basePath + normSrc;
  };

  const toggleDropNav = () =>
    document.querySelector('body')?.classList.toggle('nav_dropmenu-show');
  const closeDropNav = () =>
    document.querySelector('body')?.classList.remove('nav_dropmenu-show');

  return (
    <nav className="vjs-navbar navbar navbar-expand-lg fixed-bottom navbar-dark bg-dark">
      <div className="vjs-navbar_nav-mobile">
        <button onClick={toggleDropNav} className="navbar-toggler" type="button"
          aria-controls="navbar_dropmenu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="vjs-navbar_collaplse navbar-collapse" id="navbar_dropmenu">
        <div className="vjs-navbar_social-wrap">
          <SocialIcons socialIconsData={navData.socialicons} />
        </div>
        <ul className="vjs-navbar_nav navbar-nav">
          {navData.items.map((item) =>
            item.active ? (
              <li key={item.src} className="nav-item">
                <a className="vjs-navbar_link nav-link scroll text-uppercase"
                  href={computeHref(item.src)} onClick={closeDropNav}>
                  {item.title}
                </a>
              </li>
            ) : null
          )}
        </ul>
        {navData.button && (
          <div className="vjs-navbar_button-wrap text-right">
            <a href={navData.button.src} target="_blank" rel="noreferrer"
              className="btn btn-primary d-inline-block mx-auto ml-lg-auto mr-lg-0 px-4 px-lg-5">
              {navData.button.title}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
```

### 6.3 Example: Hero Migration

```tsx
// src/components/Hero/Hero.tsx
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useDevice } from '@/stores/deviceStore';

export default function Hero({ heroData }: { heroData: HeroData }) {
  const device = useDevice();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!device?.isShowVideo || !videoRef.current) return;

    const video = videoRef.current;
    video.play();
    setTimeout(() => video.classList.add('hero_bg_video-loaded'), 1);

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

  return (
    <div className="hero">
      <div className="hero_wrapper">
        <div className="hero_bg">
          {!device?.isShowVideo ? (
            heroData.image && (
              <Image className="hero_bg_image hero_bg_image-landscape"
                src={heroData.image} fill alt="Vinnytsia JS - Javascript Open Air"
                quality={95} priority />
            )
          ) : (
            <video ref={videoRef} className="hero_bg_video" muted loop playsInline>
              <source src="/assets/videos/vjs21.mp4" type="video/mp4" />
              <source src="/assets/videos/vjs21.ogg" type="video/ogg" />
              <source src="/assets/videos/vjs21.webm" type="video/webm" />
            </video>
          )}
          {heroData.imagePt && (
            <Image className="hero_bg_image hero_bg_image-portrait"
              src={heroData.imagePt} fill alt="Vinnytsia JS" quality={65} />
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="hero_logo d-block mx-auto my-4"
                  src="/assets/images/logo/VinnytsiaJS_20-logo-sm.png"
                  alt="VinnytsiaJS - Javascript Open Air Conference" />
                <h2 className="h1 hero_subtitle text-uppercase font-weight-bold">
                  Javascript Community
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 6.4 Example: TelegramWidget (SSR-safe)

```tsx
// src/components/TelegramWidget/TelegramWidget.tsx
import dynamic from 'next/dynamic';

// Loaded only client-side because it injects a third-party script
const TelegramWidgetClient = dynamic(
  () => import('./TelegramWidgetClient'),
  { ssr: false }
);

export default function TelegramWidget({ channel, postid }: { channel: string; postid: number }) {
  return <TelegramWidgetClient channel={channel} postid={postid} />;
}

// TelegramWidgetClient.tsx
import { useEffect, useRef } from 'react';
export default function TelegramWidgetClient({ channel, postid }: { channel: string; postid: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-post', `${channel}/${postid}`);
    script.setAttribute('data-width', '100%');
    script.async = true;
    ref.current?.appendChild(script);
  }, [channel, postid]);
  return <div ref={ref} />;
}
```

---

## Phase 7 — Styling Migration

### 7.1 SCSS — Zero Changes Required

All existing SCSS files in `assets/styles/` work unchanged in Next.js with `sass` installed. Import global styles in `_app.tsx`:

```tsx
// src/pages/_app.tsx
import '../assets/styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
```

> **Note:** Bootstrap 4 SCSS imports currently reference `~bootstrap`. In Next.js, change `~bootstrap` → `bootstrap` in SCSS `@import` statements.

```scss
/* Before */
@import "~bootstrap/scss/functions";

/* After */
@import "bootstrap/scss/functions";
```

### 7.2 CSS Parallax — Preserved Automatically

The `.vjs-bg-logo` fixed background parallax effect is pure CSS (`background-attachment: fixed`) and requires no code change. The `vue-prlx` directive was not actively used in the current codebase — the SCSS handles the effect.

### 7.3 CSS Modules for Component Styles

Optionally convert `<style scoped>` blocks to CSS Modules (`NavBar.module.scss`) for scoping. This is optional — global SCSS classes work identically.

### 7.4 IcoMoon Icon Font

Copy `assets/fonts/iconmoon/` → `public/fonts/iconmoon/` (or keep in `assets/`). Update `_fonts.scss` path if needed. No behavior change.

### 7.5 Edge / IE Body Class Detection

The SCSS uses `html.browser:not(.edge):not(.ie)` selectors. These class names are applied by the `DeviceProvider` in `useEffect`:

```tsx
useEffect(() => {
  if (isBrowser) document.documentElement.classList.add('browser');
  if (isEdge) document.documentElement.classList.add('edge');
  if (isIE) document.documentElement.classList.add('ie');
}, []);
```

---

## Phase 8 — Page Migration

### 8.1 `Index.vue` → `src/pages/index.tsx`

```tsx
// src/pages/index.tsx
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import DefaultLayout from '@/layouts/DefaultLayout';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Stat from '@/components/Stat/Stat';
import MediaTiles from '@/components/MediaTiles/MediaTiles';
import Speakers from '@/components/Speakers/Speakers';
import Talks from '@/components/Talks/Talks';
import ScheduleTable from '@/components/ScheduleTable/ScheduleTable';
import Pricing from '@/components/Pricing/Pricing';
import Partners from '@/components/Partners/Partners';
import Location from '@/components/Location/Location';
import ContactUs from '@/components/ContactUs/ContactUs';
import TelegramWidget from '@/components/TelegramWidget/TelegramWidget';
import PageTitle from '@/components/PageTitle/PageTitle';
import { getConferenceData, getSpeakersData, getPartnersData } from '@/lib/content';

interface Props {
  pageData: ConferenceData;
  speakersData: SpeakersData;
  partnersData: PartnersData;
}

const IndexPage: NextPage<Props> = ({ pageData, speakersData, partnersData }) => (
  <DefaultLayout navData={pageData.nav}>
    <Head>
      <title>Javascript Open Air Conference and Meetups</title>
      <meta name="description" content="VinnytsiaJS conference is a full day open-air conference..." />
      <meta property="og:title" content="VinnytsiaJS, UA Javascript Community" />
      {/* ... other meta tags from Index.vue metaInfo */}
    </Head>

    {pageData.hero.image && <Hero heroData={pageData.hero} id={pageData.hero.id} />}

    <div className="layer layer-content">
      <section className="py-7 vjs-bg-logo vjs-bg-logo-red text-white section-vh-100 d-flex align-items-center justify-content-center"
        id={pageData.about.id}>
        {pageData.about.title && <About aboutData={pageData.about} />}
      </section>

      <section id={pageData.stat.id}>
        {pageData.stat.items && <Stat statData={pageData.stat} />}
      </section>

      <section id={pageData.mediaTiles.id} className="vjs-bg-logo vjs-bg-logo-green text-white">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <PageTitle className="position-relative py-8"
                title={pageData.mediaTiles.title} subtitle={pageData.mediaTiles.subtitle} />
            </div>
          </div>
        </div>
        <MediaTiles mediaTilesData={pageData.mediaTiles} />
      </section>

      {/* Speakers, CFP, Talks, ScheduleTable, Pricing, Partners, Location, ContactUs */}
      {/* ... (same structure as Index.vue template, translated to JSX) */}

      <TelegramWidget channel="vinjs" postid={141} />
    </div>
  </DefaultLayout>
);

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    pageData:     getConferenceData(),
    speakersData: getSpeakersData(),
    partnersData: getPartnersData(),
  },
});

export default IndexPage;
```

### 8.2 `About.vue` → `src/pages/about.tsx`

Currently just the site About page (separate from the About section component). Mirror with a simple `getStaticProps` fetching nav data and any about-specific content.

### 8.3 `Policy.vue` → `src/pages/policy.tsx`

```tsx
export const getStaticProps: GetStaticProps = async () => {
  const { frontmatter, body } = getPolicyData();
  const { unified } = await import('unified');
  const remarkParse = (await import('remark-parse')).default;
  const remarkHtml = (await import('remark-html')).default;
  const result = await unified().use(remarkParse).use(remarkHtml).process(body);
  return { props: { policyHtml: result.toString(), ...frontmatter } };
};
```

### 8.4 `ua._vue` → `src/pages/ua.tsx`

Ukrainian-language variant. Mirror `index.tsx` with Ukrainian locale data if Markdown files are already localized, or apply i18n filtering per `titleI18N.ua` fields.

---

## Phase 9 — Animation & UI Behavior Preservation

### 9.1 Scroll Spy / Page-Scrolled Class

```
Current: NavBar.vue window.addEventListener('scroll', ...)
Next.js: useEffect in NavBar.tsx with identical logic
```
**No behavior change.** The `page-scrolled` CSS class on `<body>` drives the navbar background fade.

### 9.2 Hero Background Video

```
Current: Hero.vue mounted() → video.play(), scroll listener to pause/play
Next.js: Hero.tsx useEffect with same scroll listener + cleanup
```
Video files move from `assets/videos/` → `public/assets/videos/` (served statically by Next.js).

### 9.3 Fixed Background Parallax (`.vjs-bg-logo`)

Pure CSS `background-attachment: fixed` — works identically. No code change.

### 9.4 Mobile Hamburger Nav Toggle

```
Current: body.classList.toggle('nav_dropmenu-show') + CSS transitions
Next.js: Same DOM manipulation in NavBar.tsx click handler
```
**No behavior change** — CSS class-based toggle is framework-agnostic.

### 9.5 YouTube Popup Lightbox

```
Current: MediaTiles emits on $root → Default.vue handles → PopupYoutube shown
Next.js: MediaTiles calls useOpenYoutubePopup() context function 
         → DefaultLayout sets videoId state → PopupYoutube renders
```
The `react-youtube` package provides an equivalent `<YouTube videoId={id} />` component.

### 9.6 Smooth Scroll

Replace `smoothscroll-polyfill` with CSS:

```scss
// Add to base.scss
html {
  scroll-behavior: smooth;
}
```

### 9.7 Partner Hover Opacity

SCSS `@include transition` stays unchanged — no migration needed.

### 9.8 Device-Conditional Rendering

```
Current: store.device.isShowVideo drives Hero template v-if
Next.js: useDevice() hook + null-safe rendering (null on SSR, populated on client)
```

---

## Phase 10 — SEO & Meta Tags

Replace Vue's `vue-meta` / Gridsome's `metaInfo` with `next/head`:

```tsx
import Head from 'next/head';

<Head>
  <title>Javascript Open Air Conference and Meetups</title>
  <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
  <meta name="keywords" content="ReactJS, React, Vue, VueJS, Angular, JavaScript, conference, Vinnytsia..." />
  <meta name="description" content="VinnytsiaJS conference is a full day open-air..." />
  <meta property="og:title" content="VinnytsiaJS, UA Javascript Community" />
  <meta property="og:type" content="article" />
  <link rel="canonical" href="http://vinnytsiajs.org/" />
</Head>
```

---

## Phase 11 — Deployment

### 11.1 Static Export for GitHub Pages

```bash
# next.config.js already sets output: 'export'
npm run build
# Output → out/
```

### 11.2 Deploy Script (identical to current)

```bash
npx gh-pages -d out
```

### 11.3 GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml` to automate deployment on push to `master`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

### 11.4 `basePath` in Environment

```bash
# .env.production
NEXT_PUBLIC_BASE_PATH=
```

---

## Phase 12 — TypeScript Type Definitions

Create `src/types/content.ts` with interfaces matching the YAML frontmatter shape:

```typescript
// src/types/content.ts

export interface NavItem { active: boolean; src: string; title: string; }
export interface NavButton { active: boolean; src: string; title: string; }
export interface SocialIcon { active: boolean; icon: string; src: string; title: string; }

export interface NavData {
  button: NavButton;
  items: NavItem[];
  socialicons: { items: SocialIcon[] };
}

export interface HeroData {
  id: string; title: string; subtitle?: string; date?: string;
  image?: string; imagePt?: string;
  button?: { title: string; link: string };
}

export interface SpeakerFields {
  id: string; name: string; title: string; company: string;
  city: string; country: string; bio: string;
  image?: string;
  socialLinks: { src: string; icon: string }[];
}

export interface Talk { id: string; title: string; description?: string; }

export interface SpeakerItem { fields: SpeakerFields; talk: Talk; }

export interface ConferenceSpeakers {
  id: string; title: string; subtitle?: string;
  items: SpeakerItem[];
}

export interface PartnerFields {
  title: string; description?: string; image?: string; src: string;
}

export interface PartnerItem { active: boolean; fields: PartnerFields; }

export interface PartnerGroup {
  id: string; title: string; subtitle?: string;
  items: PartnerItem[];
}

export interface PartnersData {
  partners: PartnerGroup;
  friends: PartnerGroup;
  mediapartners: PartnerGroup;
}

export interface PricingItem {
  title: string; status: string; caption?: string;
  btnLabel: string; btnSrc: string; price: number;
}
```

---

## Phase 13 — Testing & Validation Checklist

After completing each phase, validate the following:

### Visual / Design
- [ ] All section background colors and logo watermark (`vjs-bg-logo`) display correctly
- [ ] Hero section is full-screen (`100vh`) with fixed background image or looping video
- [ ] Hero video autoplays, pauses when section scrolls out of view, resumes on return
- [ ] NavBar is fixed to bottom, shows hamburger on mobile
- [ ] NavBar background fades from transparent → `rgba(#dark, 0.7)` on scroll
- [ ] All section padding, spacing, and typography match original
- [ ] Speaker cards display photo, name, title, company, city/country, social links
- [ ] Partner logos render at correct sizes (`xlarge`, `large`, `small`)
- [ ] Pricing tiles show all tiers, statuses, and WayForPay links
- [ ] Location section shows OpenStreetMap iframe
- [ ] IcoMoon icon font renders all social/action icons correctly

### UI Behaviors
- [ ] YouTube popup opens from MediaTiles click, plays video, closes on overlay click or ✕
- [ ] Hamburger menu opens/closes nav on mobile, closes on link click
- [ ] Smooth scroll works when clicking navbar anchor links
- [ ] Parallax background effect on desktop (non-IE/Edge)
- [ ] Static (scroll) background on IE/Edge/mobile fallback
- [ ] Telegram widget renders embedded channel feed

### Data
- [ ] All Markdown frontmatter fields parse correctly via `gray-matter`
- [ ] Inactive nav items (`active: false`) are hidden
- [ ] Inactive partners (`active: false`) are not rendered
- [ ] Policy page renders Markdown body as HTML

### Deployment
- [ ] `npm run build` produces `out/` directory
- [ ] All asset paths are root-relative (no `/vinjs-jm` prefix)
- [ ] `npx gh-pages -d out` deploys correctly
- [ ] Site accessible at the expected URL (no subpath prefix unless intentionally deployed under one)

---

## Migration Timeline

| Phase | Task | Estimated Effort |
|---|---|---|
| 0 | Pre-migration prep, audit, branch | 0.5 day |
| 1 | Next.js scaffolding + config | 0.5 day |
| 2 | Data layer (`lib/content.ts`) | 1 day |
| 3 | Project structure setup | 0.5 day |
| 4 | Layout (`DefaultLayout`) | 1 day |
| 5 | State management (device + youtube context) | 1 day |
| 6 | Component migration (×17 components) | 5–7 days |
| 7 | SCSS / styling cleanup | 0.5 day |
| 8 | Pages (index, about, policy, ua) | 1.5 days |
| 9 | Animation & behavior verification | 1 day |
| 10 | SEO meta tags | 0.5 day |
| 11 | Deployment pipeline | 0.5 day |
| 12 | TypeScript types | 0.5 day |
| 13 | Testing & QA | 1–2 days |
| **Total** | | **~15–17 days** |

---

## Risk Register

| Risk | Impact | Mitigation |
|---|---|---|
| `gray-matter` YAML parsing differences vs Gridsome's remark transformer | Medium | Test all frontmatter fields; add integration test for each content file |
| `next/image` requires explicit `width`/`height` for non-fill mode | Low | Use `fill` prop with `position: relative` wrapper for dynamic-size images |
| Telegram widget script SSR incompatibility | Low | Use `dynamic(() => import(...), { ssr: false })` |
| `background-attachment: fixed` on iOS Safari (known limitation) | Low | Already handled in current SCSS with IE fallback pattern; add iOS fallback similarly |
| GraphQL query field aliases (`pageData`, `speakersData`, `partnersData`) have no direct equivalent | Low | Replicated structurally in `getStaticProps` return shape — no consumer code change needed |
| `vue-prlx` directive references in `HeroCF` / `HeroPT` if re-enabled | Low | Replace with `react-scroll-parallax` or CSS-only alternative |
| IcoMoon font paths may need updating for `public/` static serving | Low | Update `@font-face` `url()` paths in `_fonts.scss` to reference `/fonts/` public path |

---

## Summary of Key Mappings

```
Gridsome                          →  Next.js
─────────────────────────────────────────────────────
gridsome.config.js pathPrefix     →  next.config.js basePath
<static-query> / <page-query>     →  getStaticProps + lib/content.ts
@gridsome/source-filesystem       →  gray-matter + fs.readFileSync
GraphQL types (Conf, Partners…)   →  TypeScript interfaces + plain objects
g-image                           →  next/image
g-link                            →  next/link
Vue.observable store              →  React Context
Vue event bus ($root.$emit)       →  React Context function
<style scoped lang="scss">        →  .module.scss or global SCSS
vue-youtube                       →  react-youtube
vue-markdown                      →  react-markdown
mobile-device-detect (Vue)        →  react-device-detect
smoothscroll-polyfill             →  CSS scroll-behavior: smooth
gridsome build → dist/            →  next build → out/ (static export)
npm run deploy (gh-pages dist)    →  npm run deploy (gh-pages out)
```
