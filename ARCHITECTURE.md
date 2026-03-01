# Architecture

## Overview

VinnytsiaJS is a **Jamstack** static website built with [Gridsome](https://gridsome.org/) (Vue.js static site generator). Content is authored in Markdown files, transformed into a GraphQL data layer at build time, and deployed as static HTML/CSS/JS to GitHub Pages.

```
┌─────────────────────────────────────────────────────┐
│  Content (Markdown + YAML frontmatter)               │
│  content/conf/  content/speakers/  content/nav/ …   │
└────────────────────┬────────────────────────────────┘
                     │ @gridsome/source-filesystem
                     │ @gridsome/transformer-remark
                     ▼
┌─────────────────────────────────────────────────────┐
│  GraphQL Data Layer  (Gridsome build-time)           │
│  Types: Conf · Speakersdata · Partners · Policy · Nav│
└────────────────────┬────────────────────────────────┘
                     │ <static-query> / <page-query>
                     ▼
┌─────────────────────────────────────────────────────┐
│  Vue.js 2 Application                               │
│  Layout → Pages → Components                        │
└────────────────────┬────────────────────────────────┘
                     │ gridsome build
                     ▼
┌─────────────────────────────────────────────────────┐
│  Static dist/  (HTML + JS + CSS + assets)            │
│  Published to GitHub Pages via gh-pages CLI          │
└─────────────────────────────────────────────────────┘
```

---

## Technology Stack

| Layer | Technology |
|---|---|
| Site generator | Gridsome 0.7 |
| UI framework | Vue.js 2 |
| CSS | Bootstrap 4 + Bootstrap-Vue + SCSS |
| Content | Markdown + YAML frontmatter |
| Data layer | GraphQL (Gridsome built-in) |
| Media | youtube-vue, vue-prlx (parallax) |
| State | Vue.observable (lightweight store) |
| Deployment | GitHub Pages (`gh-pages` CLI) |

---

## Project Structure

```
gridsome.config.js     # Site config, plugins, pathPrefix
gridsome.server.js     # Server-side hooks (Data Store / Pages API)
src/
  main.js              # Gridsome client API bootstrap; imports global SCSS
  layouts/
    Default.vue        # Shell: NavBar + <slot> + PopupYoutube modal
  pages/
    Index.vue          # Main single-page site (all sections)
    About.vue          # /about route
    Policy.vue         # /policy route
    ua._vue            # Ukrainian-language variant
  components/          # ~20 reusable section components (see below)
  stores/
    store.js           # Vue.observable: device detection state
  templates/           # (reserved for auto-generated node templates)
content/
  conf/                # Conference config (Conf GraphQL type)
    vinnytsiajs-2022-conference.md   # Active config (nav, hero, sections…)
    speakersdata/      # Speaker profiles (Speakersdata type)
    partnersdata/      # Partner/sponsor entries (Partners type)
  policy/              # Policy page (Policy type)
  nav/                 # Navigation overrides (Nav type)
  speakers/ talks/ schedule/ …  # Legacy standalone content
assets/
  styles/              # main.scss → base.scss + custom.scss + _fonts.scss
  images/ fonts/ videos/
static/
  admin/               # Netlify CMS admin (optional)
uploads/               # User-uploaded images (referenced from Markdown)
```

---

## Data Flow

Content is consumed exclusively through Gridsome's GraphQL layer.

**Static queries** (available in any component, cached at build time):

```graphql
# Default.vue – loads nav config
pageData: conf(path: "/content/conf/vinnytsiajs-2022-conference") {
  nav { button { … } items { … } socialicons { … } }
}
```

**Page queries** — `Index.vue` issues a single `<page-query>` with three named roots:

```graphql
query Conf {
  # Site config: hero, about, stat, mediaTiles, pricing, location, nav
  pageData: conf(path: "/content/conf/vinnytsiajs-2022-conference") { … }

  # Conference speakers, talks, and schedule table
  speakersData: conf(path: "/content/conf/speakersdata/speakers-2022") { … }

  # Partners grouped into three tiers: partners, friends, mediapartners
  partnersData: partners(path: "/content/conf/partnersdata/partners-2022") { … }
}
```

All three results are available in the template as `$page.pageData`, `$page.speakersData`, and `$page.partnersData`.

---

## Key Components

| Component | Active | Role |
|---|---|---|
| `NavBar` | ✅ | Fixed-bottom Bootstrap navbar; scroll spy; collapsible on mobile |
| `Hero` | ✅ | Full-screen section with background image **or** looping video |
| `HeroPT` | ⬜ commented out | Hero variant for Pub Talks events |
| `HeroCF` | ⬜ commented out | Hero variant for dedicated Conference mode |
| `About` | ✅ | Community description + Code of Conduct link |
| `Stat` | ✅ | Statistics tiles (attendees, speakers, streams, format) |
| `MediaTiles` | ✅ | Responsive grid of photo galleries & YouTube highlights |
| `Speakers` | ✅ | Conference speaker card grid (`confspeakers` data from `speakersdata/speakers-2022`) |
| `Talks` | ✅ | Accepted talk listing |
| `ScheduleTable` | ✅ | Tabular conference timetable |
| `Schedule` | ⬜ commented out | Alternative multi-day timeline view |
| `Pricing` | ✅ | Ticket tier cards with WayForPay CTA; shows suspension notice |
| `Partners` | ✅ × 3 | Sponsor logo grid rendered three times: `xlarge` (main), `large` (friends), `small` (media) |
| `Location` | ✅ | Venue details + OpenStreetMap embed |
| `ContactUs` | ✅ | Social icons contact block |
| `TelegramWidget` | ✅ | Embedded Telegram channel widget |
| `SocialIcons` | ✅ | Icon links (Facebook, Instagram, Twitter, YouTube, Telegram) |
| `PopupYoutube` | ✅ | Lightbox YouTube player (triggered from `MediaTiles`) |
| `PageTitle` | ✅ | Reusable section heading |
| `PopupYoutube` | Lightbox YouTube player (event-bus triggered) |
| `TelegramWidget` | Embedded Telegram channel widget |
| `PageTitle` | Reusable section heading |

---

## Build & Deployment

```bash
# Development
npm run develop          # gridsome develop (hot reload, localhost:8080)

# Production build
npm run build            # gridsome build → dist/

# Deploy to GitHub Pages
npm run deploy
# cross-env NODE_OPTIONS=--openssl-legacy-provider gridsome build
# && npx gh-pages -d dist
```

The project historically used a subpath (`/vinjs-jm`) for GitHub Pages. The Next.js migration uses root paths by default (no `pathPrefix`/`basePath`) so internal links and assets resolve from `/`. If you need to deploy under a subpath, set `basePath` accordingly in `next.config.js`.

---

## Configuration

All site content (navigation items, sections visibility, hero copy, tickets, social links) is controlled through **Markdown frontmatter** in `content/conf/vinnytsiajs-2022-conference.md` — no code change is required to update text, images, or toggle sections on/off. Section components receive their data as props from the GraphQL query result.
