# MARJAN.IN — Design System & Brand Identity
Version: Phase 2 / 1.1
Status: Complete design-system foundation on isolated branch; not applied to production.

## 1. Brand foundation
- Brand: MARJAN.IN
- Positioning: Parenting, Kids Education, Creativity and Digital Products.
- Audience: Indian parents and children; Hindi-first, with familiar English learning/technical terms where useful.
- Author identity: S Nafees.
- Voice: warm, clear, practical, trustworthy, encouraging and age-aware.
- Language: Hindi in Devanagari by default; retain standard English terms when they are clearer.

## 2. Logo rules
- Use the dedicated header and footer brand assets configured by the shared layout.
- Keep the asset paths synchronized between `.eleventy.js` and `assets/js/marjan-navigation.js`.
- Do not crop, stretch, recolor or distort either wordmark; preserve its intrinsic aspect ratio with `object-fit: contain`.
- No tagline, “Painting”, “Printing”, or other descriptor below the logo.
- Header actions/navigation sit to the right of the logo on desktop.
- Source asset remains untouched in this phase; any background/resolution correction requires separate visual inspection.

## 3. Color palette
| Token | Value | Role |
|---|---|---|
| Brand navy | `#243047` | Primary brand, headings, navigation |
| Deep navy | `#18243A` | Strong contrast and hover states |
| Slate | `#40516E` | Secondary brand elements |
| Coral | `#E97885` | Accent and meaningful highlights |
| Pale coral | `#F5C4CC` | Soft accent surfaces |
| Warm canvas | `#FFFAF8` | Main page background |
| White | `#FFFFFF` | Cards and header surfaces |
| Soft grey | `#F5F7FB` | Alternate sections |
| Body text | `#303747` | Main reading text |
| Muted text | `#5C6576` | Descriptions and metadata |
| Border | `#E4E8EF` | Dividers and card borders |
| Focus blue | `#2464A5` | Keyboard focus |

Navy is used for readable text; coral is an accent, not small body text on white. Keep backgrounds calm and reserve bright accents for meaningful actions.

## 4. Typography
- Primary family: Noto Sans Devanagari with Noto Sans / Arial fallbacks.
- One sans-serif family for Hindi and English UI.
- Responsive type scale for H1–H4, body, lead, metadata and helper text.
- Compact, strong headings; body line-height 1.7–1.85.
- Avoid decorative script fonts for navigation or long-form reading.

## 5. Layout and spacing
- Maximum content width: 1200px; reading column: 780px.
- Desktop category grids: 3–4 columns where space permits.
- Tablet: generally 2 columns; mobile: single column where readability requires it.
- Standard spacing, radius, shadow, container, header-height and z-index tokens are defined in CSS.
- Cards use white surfaces, subtle borders, rounded corners and restrained shadows.
- Buttons and form controls target at least 44px touch height.

## 6. Component foundation
The stylesheet includes reusable classes for:
- Brand lockup and header foundation
- Containers, sections, headings and text hierarchy
- Cards, category tiles and article/resource cards
- Primary, accent and outline buttons
- Outline SVG icon wrapper (consistent 24px viewBox language, stroke style and alignment)
- Form labels, search/filter controls, help and error text
- Chips/status indicators
- Article reading column and metadata
- Shared footer grid, link groups, social row and copyright area
- Responsive grids, stacks, clusters and dividers

Actual page markup, icon artwork and interactive navigation behavior are integrated in later phases, not simulated in this token/component layer.

## 7. Responsive and accessibility rules
- Header-height targets: 76px desktop, 68px tablet, 60px mobile.
- Mobile gutters about 10px; desktop gutters 16px or more.
- Visible keyboard focus, semantic heading hierarchy and descriptive links.
- Do not rely on color alone to communicate state.
- Respect `prefers-reduced-motion`.
- Support keyboard focus and disabled states; keep touch targets practical.

## 8. Navigation direction for Phase 3
- Desktop: logo left; primary menu alongside; search/actions at far right; no desktop hamburger.
- Mobile: compact logo and three-line menu icon; slide-out drawer with expandable submenus.
- Mega menus group related links clearly and avoid excessive width/height.
- Labels and destinations must match real pages; no placeholder/dead links.

## 9. Inspiration boundaries
Use the references for usability only:
- Parentune: parenting topic organization and age-oriented guidance.
- FirstCry: product discovery and recommendation-card clarity.
- Twinkl: learning-resource organization, filters and printable discovery.
MARJAN.IN retains its own navy/coral identity and original logo; do not copy another site's branding or exact layout.

## 10. Implementation boundary
- CSS: `assets/css/marjan-design-system.css`.
- This file remains opt-in and is not imported site-wide in Phase 2, protecting the existing website.
- Phase 3 integrates the header/navigation and tests pages on a preview branch.
- No production page, canonical URL, existing article, image, affiliate URL, SEO metadata or deployment setting was changed in this phase.
