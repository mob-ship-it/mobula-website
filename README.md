# Mobula Website

**Mobula Estudio** marketing agency website. Built with Astro, React and Tailwind CSS.

## Prerequisites

- **Node.js** 18+ (recommended 18.x or 20.x)
- **npm** 9+

## Installation

```bash
# Clone the repository (if applicable)
git clone <repo-url>
cd mobula-website

# Install dependencies
npm install
```

## Development

```bash
npm run dev
```

The server runs at [http://localhost:4321](http://localhost:4321) by default.

## Build and preview

```bash
# Generate static site
npm run build

# Preview the build locally
npm run preview
```

## Project structure

```
src/
├── components/     # Reusable components (Header, Footer, modals)
├── sections/       # Home sections (Hero, Services, Plans, Team...)
├── pages/          # Routes and pages
│   └── en/         # English pages
├── i18n/           # i18n configuration (es, en)
├── services/       # API and form logic
├── hooks/          # React hooks (useModal, useFormState)
├── layouts/        # Astro layouts
└── styles/         # Global styles
```

## Tech stack

- **Astro 5** — Static framework
- **React 18** — Interactive components
- **Tailwind CSS** — Styling
- **Vite** — Build tool
- **i18n** — ES/EN support

## Languages

- **Spanish** — Default language (`/`)
- **English** — `/en` prefix (e.g. `/en/projects`)

## Available scripts

| Command           | Description              |
|-------------------|--------------------------|
| `npm run dev`     | Development server       |
| `npm run build`   | Production build         |
| `npm run preview` | Preview build locally    |

## Brief form

There is a `/brief` page (and `/en/brief` in English) with a Brief-style form for proposal requests. Data is sent to the API configured in `src/services/api.js`.
