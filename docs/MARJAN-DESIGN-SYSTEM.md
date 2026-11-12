# MARJAN.IN — Design System & Brand Identity
Version: Phase 2 / 1.0
Status: Prepared on isolated branch; not applied to production.

## 1. Brand foundation
- Brand: MARJAN.IN
- Positioning: Parenting, Kids Education, Creativity and Digital Products.
- Audience: Indian parents and children; Hindi-first, with familiar English technical/learning terms where useful.
- Author identity: S Nafees.
- Voice: warm, clear, practical, trustworthy, encouraging and age-aware.
- Language: Hindi in Devanagari by default; retain standard English terms when they are clearer.

## 2. Logo rules
- Keep the existing supplied asset: `media/marjan.in logo png.png`.
- Do not redraw, replace, recolor or distort the logo.
- Use `object-fit: contain`; preserve its aspect ratio and clear space.
- Do not place a tagline, “Painting”, “Printing”, or any other descriptor below the logo.
- Header actions/navigation belong to the right of the logo on desktop.
- Logo background/resolution may be corrected only as a separate asset-preparation task after visual inspection; the source asset remains untouched in this phase.

## 3. Color palette
| Token | Value | Role |
|---|---|---|
| Brand navy | `#243047` | Primary brand, headings, navigation |
| Deep navy | `#18243A` | Strong contrast and hover states |
| Slate | `#40516E` | Secondary brand elements |
| Coral | `#E97885` | Brand accent, highlights |
| Pale coral | `#F5C4CC` | Soft accent surfaces |
| Warm canvas | `#FFFAF8` | Main page background |
| White | `#FFFFFF` | Cards and header surfaces |
| Soft grey | `#F5F7FB` | Alternate sections |
| Body text | `#303747` | Main reading text |
| Muted text | `#5C6576` | Descriptions and metadata |
| Border | `#E4E8EF` | Dividers and card borders |
| Focus blue | `#2464A5` | Visible keyboard focus |

Use navy for readable text; coral is an accent, not small body text on white. Keep backgrounds calm and reserve bright accents for meaningful actions.

## 4. Typography
- Primary family: Noto Sans Devanagari with Noto Sans / Arial fallbacks.
- Use a single sans-serif family for both Hindi and English UI to keep the site cohesive.
- Strong, compact headings; comfortable body line-height (about 1.7–1.85).
- Avoid decorative script fonts for navigation or long-form reading.

## 5. Layout and components
- Maximum content width: 1200px.
- Desktop content grid: 4 columns where space permits.
- Tablet/mobile: 2 columns, then single-column content where cards need room.
- Cards: white surface, subtle border, rounded corners, restrained shadow.
- Buttons: pill-shaped, at least 44px high.
- Reading column: approximately 780px maximum.
- Keep whitespace purposeful; avoid oversized empty header/hero areas.

## 6. Responsive and accessibility rules
- Compact header targets: 76px desktop, 68px tablet, 60px mobile.
- Mobile content gutters: about 10px; desktop gutters about 16px or more.
- Visible keyboard focus, semantic headings, descriptive link text and reduced-motion support.
- Touch targets should be at least 44px where practical.
- Do not rely on color alone to communicate state.

## 7. Navigation direction for Phase 3
- Desktop: logo left; primary menu to its right; search/actions at far right; no desktop hamburger.
- Mobile: compact logo and a three-unequal-line menu icon; slide-out drawer with expandable submenus.
- Mega menus should group related links clearly and avoid excessive width/height.
- Navigation labels and destinations must match real pages; no placeholder or dead links.

## 8. Inspiration boundaries
Use the user-provided reference direction for information architecture and usability:
- Parentune: parenting topic organization and age-oriented guidance.
- FirstCry: product discovery and recommendation-card clarity.
- Twinkl: learning-resource organization, filters and printable discovery.
These are usability references only. MARJAN.IN must retain its own navy/coral visual identity and original logo; do not copy another site's branding or exact layout.

## 9. Implementation boundary
The CSS file `assets/css/marjan-design-system.css` defines reusable tokens/components. It is intentionally not imported by the live site in Phase 2. Phase 3 will integrate header/navigation and test pages on a preview branch. No production page, canonical URL, existing article, image, or deployment setting was changed in this phase.
