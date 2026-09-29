# Mausam Lab Website

## About

The official website for **Mausam Lab**, a youth-led climate policy, research,
and sustainability organisation working to make climate knowledge more
accessible, practical, and relevant to Pakistan.

This is **Version 1**: a static/local-data frontend website. There is no
backend or database — all content (research, publications, team, etc.) lives
in plain JavaScript files under `src/data/` so it's easy to edit without
touching any component code.

Real content has not been supplied yet for most sections, so the site uses
clearly labeled **"Sample / Placeholder"** entries. Replace these before
launching publicly — see "Editing Content" below.

## Technologies

- **React 18** — UI components
- **Vite 5** — dev server and build tool
- **React Router 6** — client-side routing between pages
- **Plain CSS** with CSS variables (no CSS framework) — kept simple on
  purpose so it's easy to read and change

No paid services, backend server, or database are required to run this site.

## Installation

1. Install Node.js (version 18 or newer) if you don't have it: https://nodejs.org/
2. Open this folder in VS Code.
3. Open a terminal in VS Code (Terminal > New Terminal).
4. Run:

   ```
   npm install
   ```

## Development

Start the local dev server (with hot reload):

```
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`) in your browser.

## Production Build

Create an optimized build in the `dist/` folder:

```
npm run build
```

Preview that production build locally before deploying:

```
npm run preview
```

## Project Structure

```
src/
  main.jsx           Entry point - mounts the React app
  App.jsx             Sets up routing and the page layout (Navbar + page + Footer)
  index.css           Design system: colors, fonts, spacing, shared layout classes
  components/          Reusable pieces used across pages (Navbar, Footer, Hero,
                        Button, Card, *Card components, ArticleLayout, EmptyState)
  pages/               One file per route (Home, About, Research, Publications, ...)
  data/                Plain JS files holding all editable content
  assets/              Logo and other images
public/
  favicon.svg, robots.txt   Static files served as-is
```

## Editing Content

You do not need to touch any component or page code to update content - just
edit the matching file in `src/data/`:

| To change...                                            | Edit this file              |
|-----------------------------------------------------------|------------------------------|
| Research articles                                          | `src/data/research.js`      |
| Publications (briefs, reports, papers)                     | `src/data/publications.js`  |
| Initiatives (the 4 programme names)                        | `src/data/initiatives.js`   |
| Projects                                                    | `src/data/projects.js`      |
| Team (executive + departments)                              | `src/data/team.js`          |
| Opportunities                                               | `src/data/opportunities.js` |
| Brand info, tagline, contact, socials, and About page copy  | `src/data/site.js`          |

Each file has comments explaining the shape of the data. To add a new
research article, for example, copy an existing object in `research.js`,
give it a unique `slug`, and fill in the fields - a page at
`/research/article/your-slug` is created automatically.

### Replacing the logo

The real Mausam Lab logo is already in place at `src/assets/logo.png`
(background made transparent so it works on both the white navbar and the
dark green footer) and as `public/favicon.png` for the browser tab icon. The
logo has no text baked into it, so "Mausam Lab" is added as a separate
wordmark next to it in `Navbar.jsx` and `Footer.jsx` — edit those files if
you'd rather use a version of the logo that already includes the wordmark.

### Contact form

The contact form (`/contact`) does full client-side validation but is **not**
connected to a real email service yet - Version 1 intentionally avoids a
backend. Before launch, connect it to a simple form service (e.g. Formspree,
Getform) or a small serverless function, and update the `handleSubmit`
function in `src/pages/Contact.jsx`.




