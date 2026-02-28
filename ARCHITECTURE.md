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

**Page queries** (bound to the current page node):  
`Index.vue` issues a `<page-query>` that pulls the full conference config object (hero, about, stat, mediaTiles, pricing, location, speakers, schedule, etc.) plus `Speakersdata` nodes into `$page`.

---

## Key Components

| Component | Role |
|---|---|
| `NavBar` | Fixed-bottom Bootstrap navbar; scroll spy; collapsible on mobile |
| `Hero` | Full-screen section with background image **or** looping video |
| `HeroPT` / `HeroCF` | Hero variants for Pub Talks / Conference modes |
| `About` | Community description + Code of Conduct link |
| `Stat` | Statistics tiles (attendees, speakers, streams, format) |
| `MediaTiles` | Responsive grid of photo galleries & YouTube highlights |
| `Speakers` | Speaker card grid |
| `Talks` | Talk listing |
| `Schedule` / `ScheduleTable` | Day-by-day event timetable |
| `Pricing` | Ticket tier cards with CTA buttons |
| `Location` | Venue details + OpenStreetMap embed |
| `Partners` | Sponsor logo grid |
| `SocialIcons` | Icon links (Facebook, Instagram, Twitter, YouTube, Telegram) |
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

The site is served from `https://opiumfp.github.io/vinjs-jm`; `pathPrefix: '/vinjs-jm'` is set in `gridsome.config.js` so all internal links and assets resolve correctly under the subpath.

---

## Configuration

All site content (navigation items, sections visibility, hero copy, tickets, social links) is controlled through **Markdown frontmatter** in `content/conf/vinnytsiajs-2022-conference.md` — no code change is required to update text, images, or toggle sections on/off. Section components receive their data as props from the GraphQL query result.
