# Product

## What Is VinnytsiaJS?

**VinnytsiaJS** is the official website for the VinnytsiaJS JavaScript community based in Vinnytsia, Ukraine. The site serves as the public face of the community and its events — an annual open-air conference, recurring Pub Talks, and online meetup series (Online Thursdays). The community has been active since **2016** and regularly gathers 400+ attendees.

---

## Audience

| Segment | Purpose |
|---|---|
| JavaScript developers | Discover upcoming events, submit talks (CFP), buy tickets |
| Speakers | Review schedule, find submission form |
| Sponsors / Partners | Learn about partnership opportunities |
| Community members | Stay connected via social channels and Telegram |

---

## Site Sections

The website is a single-page application with anchor-based navigation. Every section can be independently toggled on/off via the content configuration file.

### Navigation Bar
Fixed to the bottom of the viewport. Contains:
- Anchor links to all active sections (Home, About, Speakers, Schedule, CFP, Partners, Tickets, Contact)
- Social media icons (Facebook, Instagram, Twitter, YouTube, Telegram)
- Primary CTA button (e.g., "Follow Us" → Telegram channel)
- Collapses into a hamburger menu on mobile

### Hero
Full-screen opening section with:
- Background image (landscape and portrait variants) **or** a looping background video
- Event title, subtitle, and date
- CTA button (e.g., "Join Pub Talks", "Registration")
- Multiple hero variants supported: main conference (`Hero`), Pub Talks (`HeroPT`), and dedicated conference (`HeroCF`)

### About
Community introduction including:
- VinnytsiaJS logo
- Short community description paragraph
- Link to the Code of Conduct PDF
- Multilingual title support (`en` / `ua` / `ru`)

### Statistics
Four highlight tiles displayed as a visual strip:
- **400+ Attendees**
- **2 Streams** (General + Lightning talks)
- **15+ Speakers**
- **Open Air** (outdoor venue format)

### Media Tiles — "Feel The Vibes"
Responsive image/video grid showcasing highlights from every year since **2016**. Each tile is one of three types:
- **youtubePopup** — opens a YouTube lightbox player in-page
- **youtubelink** — external link to a playlist
- **gallery** — external link to a Facebook photo album

### Call for Papers (CFP)
A dedicated section with a submit button linking to the Google Forms talk submission form. Visibility and link are configurable in the content file.

### Speakers
Speaker card grid fed from `content/conf/speakersdata/`. Each card can include photo, name, title, and social links. The section is togglable (shown/hidden per event edition).

### Talks
Listing of accepted talks. Togglable per edition.

### Schedule
Day-by-day event timeline supporting multiple formats:
- Multi-day conference schedule (`Schedule` component)
- Tabular timetable (`ScheduleTable` component)
- Dedicated pages for online event days (Online Thursdays, Pub Talks series)

### Tickets / Pricing
Ticket tier cards with:
- Tier name (Early Bird, Smart Bird, Regular, Last Chance)
- Price in UAH (₴)
- Status badge (available / sold out)
- Purchase CTA linking to **WayForPay** payment gateway

### Location
Venue details including:
- Venue name and address
- Embedded **OpenStreetMap** iframe
- Direct map link and Google Maps link
- Background venue photo

### Partners
Sponsor / community partner logo grid. Partner data is stored in `content/conf/partnersdata/` and can be added/removed without code changes.

### Contact / Social
Social media icon links and an embedded **Telegram** channel widget for direct community engagement.

---

## Event Formats

| Format | Description |
|---|---|
| Open-Air Conference | Annual outdoor multi-track conference (400+ attendees, pool venue) |
| Pub Talks | Informal evening meetups at a pub venue |
| Online Thursdays | Weekly online talk series (2020 pandemic edition) |
| Online Days | Multi-day online conference stream |

---

## Content Management

All website content is managed through **Markdown files with YAML frontmatter** — no CMS login or database required. Editors update:

- `content/conf/vinnytsiajs-2022-conference.md` — all section data (nav, hero text, statistics, media, tickets, location…)
- `content/conf/speakersdata/*.md` — individual speaker profiles
- `content/conf/partnersdata/*.md` — partner entries
- `uploads/` — images referenced from Markdown

A **Netlify CMS** admin interface (`static/admin/`) is present for optional GUI-based content editing.

---

## Localization

The site supports a Ukrainian-language variant (`src/pages/ua._vue`). Multilingual title fields (`titleI18N: { en, ua, ru }`) are available on select content nodes.

---

## Social Presence

| Platform | Link |
|---|---|
| Facebook | [VinnytsiaJS](https://www.facebook.com/VinnytsiaJS/) |
| Instagram | [@vinnytsiajs](https://www.instagram.com/vinnytsiajs/) |
| Twitter / X | [@VinnytsiaJS](https://twitter.com/VinnytsiaJS) |
| YouTube | [youtube.com/vinnytsiajs](http://youtube.com/vinnytsiajs) |
| Telegram | [t.me/vinjs](https://t.me/vinjs) |
