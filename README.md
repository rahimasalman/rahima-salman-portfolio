# rahimasalman.netlify.app

My personal site: who I am, where I've worked, and a few things I've built.
It's also where I practise the parts of Nuxt that rarely come up in day-to-day product work, like rendering strategies, SEO and i18n done properly.

**Live:** [rahimasalman.netlify.app](https://rahimasalman.netlify.app)

Built with Nuxt 4 · Vue 3 · TypeScript · `@nuxtjs/i18n` · `@nuxtjs/sitemap` · deployed on Netlify

---

## What's interesting here

### One site, three rendering modes

Not every page needs the same treatment, so each route gets the mode that fits it:

| Route | Mode | Why |
|---|---|---|
| `/`, `/projects`, `/projects/*` | **SSG** (prerendered at build) | Content only changes when I deploy |
| `/activity` | **ISR**, refreshed every hour | Pulls from the GitHub API, so it needs to stay fresh without a deploy |
| `/craft` | **Not built at all** until the first article exists | An empty page is a broken promise to visitors and thin content for Google |

The rules live in `routeRules` in `nuxt.config.ts`.

### Five languages, done properly

The site is in English, Azerbaijani, Russian, Spanish and German. Each locale carries its BCP 47 `language` code, so the pages get correct `hreflang` tags and Google treats them as translations of each other rather than duplicate content.

Only text that actually changes by language lives in the locale files. Names, dates and technology names stay in the data layer, so there's one source of truth instead of five copies.

### SEO basics, all of them

- Every page has its own title and description, in every language
- A sitemap per locale, `robots.txt`, canonical URLs and `hreflang` alternates
- `Person` structured data (JSON-LD)
- The email address is never in the static HTML. It's assembled on the client, so scrapers reading the markup don't find it.

### Content is data

Adding a job or a project doesn't touch any components:

- `app/data/experience.ts`: jobs, dates, tech
- `app/data/projects.ts`: projects, repo and live links, and whether a project is featured
- `i18n/locales/*.json`: all the words

The `/activity` page is curated from GitHub itself. It shows only repos tagged with the `portfolio` topic, so which repos appear is decided on GitHub, not in the code.

### Small things I care about

- Tap targets are at least 24×24 px (WCAG 2.2)
- "You can click this" cues don't depend on hover, because touch screens don't have hover
- Scroll animations are pure CSS (`animation-timeline: view()`), so content is visible before JavaScript loads, and they respect `prefers-reduced-motion`
- The theme is applied before the first paint, so there's no flash of the wrong colours

---

## Running it locally

```bash
pnpm install
pnpm dev        # http://localhost:5000
```

```bash
pnpm build      # production build (prerenders the static pages)
pnpm preview    # serve the build locally
```

## Project structure

```
app/
  pages/        index · projects · activity · craft
  components/   ProjectCard, icons
  data/         experience, projects, craft, cv
  layouts/      nav + footer
i18n/locales/   en · az · ru · es · de
public/         favicon, robots.txt, CV
```

---

Find me on [LinkedIn](https://www.linkedin.com/in/rahima-salman/), or through the contact links on the [site](https://rahimasalman.netlify.app).
