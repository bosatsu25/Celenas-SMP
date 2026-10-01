# Design-system foundation

## Direction and scope

Celenas uses a restrained night-sky palette, generous space and clear typography.
Moon and orbit imagery can shape the later identity. Minecraft screenshots are
content, not the visual language for controls. Avoid RGB effects, repetitive
card grids and decorative statistics.

Phase 1 implements typography, spacing, color, focus and motion tokens; it does
not deliver the full Liquid Glass design. Preserve the canonical logo when
available. There is no logo asset in the repository yet, so use text branding.

## Tokens and components

`src/styles/tokens.css` is the source of truth. Background `#10141f`, text
`#f3f4fa`, muted text `#b7bfce`, accent `#d2d0ff` and focus `#f6dc98` form the
initial palette. Use semantic tokens instead of duplicating color literals.
Control radius, spacing, readable width and type scale live here too.

Use system sans-serif for copy and monospace only for connection addresses.
The page has a quiet header, typographic hero, participation details in a
definition list and a small footer. No decorative image or fake logo is needed.

## Interaction and accessibility

- Preserve one descriptive `h1`, logical headings and named navigation.
- Use links for navigation, buttons for actions and native HTML where possible.
- Keep the first keyboard stop a visible-on-focus skip link to focusable `main`.
- Keep a visible focus outline and sufficient text/control contrast.
- Interactive targets have at least 44 CSS pixels of height.
- At narrow widths, stack content and wrap long strings. Test enlarged text.
- Respect `prefers-reduced-motion`; motion cannot be required to understand content.
- Future blur/transparency must have an opaque fallback and preserve contrast.

Automated axe results are evidence, not proof of complete accessibility. Before
release, manually inspect focus order, zoom, screen-reader output and real
device behavior. No third-party font or image request is needed for Phase 1.
