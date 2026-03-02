# VinnytsiaJS — Official Site

The official website for the **VinnytsiaJS** JavaScript community in Vinnytsia, Ukraine.  
Built as a Jamstack static site with [Gridsome](https://gridsome.org/) (Vue.js) and deployed to GitHub Pages.

🌐 **Live site:** https://vinnytsiajs.org

---

## Documentation

| Document | Description |
|---|---|
| [PRODUCT.md](PRODUCT.md) | Product overview — site sections, event formats, content management |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Technical architecture — stack, data flow, components, deployment |

---

## Quick Start

**Prerequisites:** Node.js 14+ (Node 16 recommended for legacy OpenSSL compatibility)

```bash
# Install dependencies
npm install

# Start development server (localhost:8080)
npm run develop

# Production build → dist/
npm run build

# Build and deploy to GitHub Pages
npm run deploy
```

---

## Project Structure

```
content/          # Markdown content (conf config, speakers, partners, policy)
src/
  layouts/        # Default.vue — shared page shell
  pages/          # Index.vue, About.vue, Policy.vue, ua._vue
  components/     # ~20 section components (Hero, Speakers, Schedule, …)
  stores/         # Vue.observable store (device detection)
assets/           # SCSS, fonts, images, videos
uploads/          # Images referenced from Markdown frontmatter
static/admin/     # Netlify CMS (optional GUI editor)
gridsome.config.js  # Site config, plugins, pathPrefix
```

---

## Content Updates

All page content (text, images, navigation, tickets, social links) is managed through Markdown files — no code changes required:

- **Site config / sections:** `content/conf/vinnytsiajs-2022-conference.md`
- **Speaker profiles:** `content/conf/speakersdata/*.md`
- **Partners / sponsors:** `content/conf/partnersdata/*.md`
- **Uploaded images:** `uploads/`

---

## Tech Stack

- **Gridsome 0.7** — static site generator
- **Vue.js 2** — UI framework
- **Bootstrap 4 + Bootstrap-Vue** — component library & responsive grid
- **SCSS** — styling
- **GraphQL** — build-time data layer (Gridsome built-in)
- **gh-pages** — deployment to GitHub Pages
