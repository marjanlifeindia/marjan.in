# MARJAN.IN — Shared Header & Footer System

## Single source of truth
Every generated HTML page receives the official header, navigation, search control, footer, and shared CSS from the Eleventy transforms in `.eleventy.js`. Do not hand-build or paste a page-specific header/footer.

## Creating a new page
1. Copy `_templates/page.html` into the intended site route (for example, `new-topic.html` or `new-topic/index.html`).
2. Update the page title, description, canonical/SEO metadata as appropriate, and the content inside `<main>`.
3. Keep the empty `<header></header>` and `<footer></footer>` placeholders. The build replaces them with the official shared components.
4. Do not add a second navigation, search icon, footer logo, social block, or footer links.
5. Run `npm run build` and `npm run test:responsive`.

## Design rules
- Official logo assets: use the header and footer image paths declared together in `.eleventy.js` and `assets/js/marjan-navigation.js`. Keep both references synchronized; never point to a deleted legacy file. Preserve each logo's intrinsic aspect ratio with `object-fit: contain`; do not crop, stretch, recolor, or add a tagline.
- Header: transparent/white canvas, full-ratio logo, shared navigation, same-page expandable search, accessible mobile menu.
- Footer: deep navy surface, white wordmark shown uncropped directly on the deep navy surface, shared category links, social links and legal links.
- All spacing, typography, focus states, breakpoints and responsive behavior are controlled centrally by `assets/css/marjan-navigation.css` and `assets/css/marjan-footer.css`.
- Page-specific content styles must not override global `header`, `footer`, `.marjan-header`, or `.marjan-site-footer` selectors.

## Regression guard
The Playwright suite checks shared chrome across homepage, static pages, blog, Baby Names, article and policy routes at desktop and mobile viewports. A new page must pass the same header/footer checks before release.
