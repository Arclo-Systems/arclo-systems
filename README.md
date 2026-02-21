# arclo

Custom software for your business.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · next-intl · Motion · GSAP · Three.js

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

```
BREVO_API_KEY=
BREVO_SENDER_EMAIL=
CONTACT_RECIPIENT=
```

## Project Structure

```
src/
├── app/
│   ├── actions/         # Server actions (contact, newsletter)
│   ├── [locale]/        # i18n routes (es, en)
│   ├── robots.ts        # SEO crawling rules
│   ├── sitemap.ts       # XML sitemap with hreflang
│   └── manifest.ts      # Web app manifest
├── components/          # UI and animation components
├── i18n/                # Routing, navigation, request config
├── lib/                 # Utilities
└── messages/            # Translation files (es.json, en.json)
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## License

Proprietary. All rights reserved.
