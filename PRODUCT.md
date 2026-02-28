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
- Active variant: `Hero` (main conference). `HeroPT` (Pub Talks) and `HeroCF` (Conference) are available components but currently toggled off in the template.

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

### Conference Speakers
Speaker card grid sourced from `content/conf/speakersdata/speakers-2022.md` (`confspeakers` data block). Each card includes photo, name, job title, company, city/country, bio, and social links. A second general Speakers view exists but is currently inactive.

### Talks
Listing of accepted conference talks including title, description, speaker name and photo.

### Conference Schedule
Tabular timetable rendered by `ScheduleTable` showing the full conference day (currently hardcoded to 21 August — VinnytsiaJS 2021 Open Air at Recreation Base "Butterfly"). Includes a "Get Ticket" CTA button inline. An alternative multi-day `Schedule` timeline component is available but currently inactive.

### Tickets / Pricing
Ticket tier cards with:
- Tier name (Early Bird, Smart Bird, Regular, Last Chance)
- Price in UAH (₴)
- Status badge (available / sold out)
- Purchase CTA linking to **WayForPay** payment gateway
- A notice "Sale of tickets on the event is temporarily suspended" is displayed below the pricing grid when sales are paused.

### Location
Venue details including:
- Venue name and address
- Embedded **OpenStreetMap** iframe
- Direct map link and Google Maps link
- Background venue photo

### Partners
Partner data is sourced from `content/conf/partnersdata/partners-2022.md` and rendered as three distinct sections by the same `Partners` component:

| Section | Display mode | CTA |
|---|---|---|
| Main Partners | Extra-large logos | "Become a Partner" button |
| Community Friends | Large logos | — |
| Media Partners | Small logos | "Become a Partner" button |

### Contact Us
Social media icon links rendered via `ContactUs` component using the `nav.socialicons` data.

### Telegram Widget
An embedded Telegram channel widget (`@vinjs`) is displayed at the bottom of the page for instant community following.

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
- `content/conf/speakersdata/speakers-2022.md` — speaker profiles for the active edition
- `content/conf/partnersdata/partners-2022.md` — partner entries for the active edition
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
