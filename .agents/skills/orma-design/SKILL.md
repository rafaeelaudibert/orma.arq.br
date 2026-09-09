---
name: orma-design
description: Design direction and build conventions for the Orma architecture website. Consult BEFORE building or changing anything visual — pages, sections, components, colors, fonts, layout, spacing, images. Also defines where design tokens live and the quality bar every change must pass.
---

# Orma — Design Direction

Orma is the website of an architecture studio. The bar is a site that could win an Awwwards "Site of the Day": the confidence of high-end editorial print (think El Croquis, or the sites of studios like Herzog & de Meuron or Norm Architects) — not a template, not a SaaS page.

## The aesthetic in one paragraph

Architecture websites earn "insanely high quality" through **restraint**: enormous, confident typography; photography treated as the main material; a near-monochrome palette with at most one accent; a strict grid that occasionally, deliberately breaks; and lots of empty space. Every screen should feel composed, like a spread in a monograph. When in doubt, remove something.

## Non-negotiables

- **Typography does the heavy lifting.** One display face with real character + one quiet text face. Display sizes should be brave — heroes can be `clamp(3rem, 10vw, 9rem)`. Tight letter-spacing on large sizes (−0.02em to −0.04em), generous line-height only on body text.
- **Near-monochrome palette.** An off-black, an off-white (paper/plaster, never pure `#fff`), two greys between them, and at most one accent used sparingly (a rust, ochre, or deep green reads "material"; never SaaS blue/purple).
- **Photography is full-bleed or grid-locked, never in "cards".** Consistent aspect ratios (`aspect-ratio` + `object-fit: cover`). Every image gets meaningful `alt` text.
- **Whitespace is a feature.** Section padding measured in `clamp(4rem, 12vh, 10rem)`, not `2rem`. Let single elements own the screen.
- **Grid with intent.** A 12-column fluid grid; content usually sits asymmetrically on it (text spanning columns 2–6, an image spanning 7–13). Symmetric centered-everything is the template look — avoid it.

### Banned (the "template look")

Card grids with border-radius + drop shadows everywhere · purple/blue gradients · glassmorphism · emoji as icons · centered-hero-with-two-buttons · stock icon packs · carousels · `#000` on `#fff` (use the token palette) · lorem ipsum (write plausible architecture copy and tell her which words are placeholders).

## Anatomy of the site — build these without being asked

She doesn't know the words "hero", "footer", "nav", or "scroll animation", and she won't request them. **A page is not done until it has all its parts, at full quality, unprompted.** What the best architecture sites (BIG, Gensler, Minale + Mann, Shape Studio…) consistently have:

- **A full-screen opening on every page** — one enormous image or an animated background (`orma-shaders`) with big confident type. Never start a page with a plain heading on white. Home gets the strongest treatment.
- **Minimal navigation, always visible**: logo + at most three or four items (Projetos, Estúdio, Contato). No mega-menus, no hamburger on desktop. On the phone, a full-screen menu that's designed as carefully as any page.
- **Portfolio front and center**: home shows a *curated* set of 3–6 featured projects, not the whole archive; the Projetos page holds everything (add type filters only once there are 8+ projects).
- **Project pages tell a story**: opening image → the brief in two sentences → a sequence of large images with short captions → facts (local, ano, área) → quiet next/previous project links at the bottom. This template is the heart of the site; build it once, superbly.
- **A real footer on every page**: not an afterthought strip — a composed final section with the studio name, contact, WhatsApp CTA, social links, CAU registration. This is a prime spot for a calm animated background (`orma-shaders`).
- **Motion everywhere, restrained**: reveals as you scroll, hover responses, one hero moment per page — via `orma-motion`, without her asking.

When she says "a page about my projects", she means all of this. Build the whole anatomy, then tell her what each part is in plain language so she can react.

## Foundations — single source of truth

Two files hold every constant; nothing is ever hardcoded twice:

- **`src/config.ts`** — the facts: studio name, tagline, city, WhatsApp number, e-mail, Instagram, CAU registration. Components import from here; the phone number must never appear in two places.
- **`src/styles/global.css`** — the look: all design tokens, imported once in `src/layouts/Layout.astro`. Every component uses tokens (`var(--…)`) — never hardcoded colors, font sizes, or magic spacing.

Structure `global.css` with cascade layers so specificity stays predictable:

```css
@layer reset, tokens, base, motion;
```

(`reset` — minimal modern reset; `tokens` — the `:root` custom properties; `base` — element defaults, typography, focus styles; `motion` — the `data-reveal` classes from `orma-motion`. Astro's scoped component styles are unlayered, so they always win over these — which is exactly the mental model: global defaults in layers, component specifics in the component.)

The `tokens` layer defines, as CSS custom properties on `:root`:

- `--color-ink`, `--color-paper`, `--color-grey-1`, `--color-grey-2`, `--color-accent`
- Type scale via `clamp()`: `--text-hero`, `--text-title`, `--text-large`, `--text-body`, `--text-small`
- Spacing: `--space-1` … `--space-8` (0.25rem → 10rem-ish), `--section-pad`, `--container-max` (~1440px), `--gutter`
- Fonts: `--font-display`, `--font-text`

Fonts are self-hosted via `@fontsource-variable/*` or `@fontsource/*` packages (`pnpm add`), imported in `global.css`. Never load fonts from Google's CDN. Preload nothing else; keep the page weight lean.

**If `global.css` doesn't exist yet, the visual identity hasn't been chosen.** Propose 2–3 directions to her in plain visual language (e.g., "Gallery: bone-white pages, huge thin headlines, black-and-white photos" vs. "Atelier: warm dark charcoal, ivory text, one rust accent, moody images"), recommend one, then create the tokens. After she picks, record it under **Decisions** below by editing this file.

## Build conventions

- One `.astro` component per section in `src/components/` (e.g., `Hero.astro`, `ProjectGrid.astro`, `Footer.astro`); pages in `src/pages/` just compose them. Scoped `<style>` in each component; `global.css` only for the layered globals described above.
- **Reuse before rewrite.** Before building anything, check whether a component, token, or pattern already exists and extend it. Two sections that look alike must be one component with props — never a near-duplicate copy. If the same value appears twice, it becomes a token or a `config.ts` entry.
- **Modern CSS, no preprocessors needed**: cascade layers, custom properties, `clamp()`, `aspect-ratio`, `object-fit`, grid + subgrid, logical properties (`margin-block`, `padding-inline`), `:has()`/`:is()` where they simplify, container queries for components that live in varying widths, `100svh` (never `100vh`) for full-screen sections.
- **Mobile is a first-class citizen, not a breakpoint.** Write styles mobile-first (base styles = phone, `@media (min-width: …)` adds the desktop richness). Design the phone layout *deliberately* — most of her visitors will arrive from Instagram or WhatsApp on a phone. Touch targets ≥ 44px; anything revealed on hover must also be visible or reachable on touch; no horizontal scroll, ever; check ~390px width before showing her anything.
- Semantic HTML (`header`, `nav`, `main`, `section`, `figure`, `footer`); real text, never text baked into images; visible focus styles; contrast ≥ 4.5:1 for body text.
- All images through the asset library and `astro:assets` — see `orma-assets`. Logos and icons are SVG.
- Project/portfolio content that repeats (projects, studio info) goes in Astro content collections once there are 3+ entries — until then, keep it inline and simple.

## Quality gate (every visual change)

1. Dev server running (`astro dev --background`), page opened.
2. Screenshot at phone (~390px) **and** desktop (~1440px) width; actually look at both — the phone one first.
3. Browser console clean.
4. Reduced motion respected on anything that moves (see `orma-motion` — this is non-negotiable).
5. For bigger milestones, run the `web-design-guidelines` skill as an audit, and `frontend-design` when starting a new page's direction.

## Related skills

- `orma-copy` — every visitor-facing word is Brazilian Portuguese; writing rules live there.
- `orma-assets` — where images/logos live and how to get files from her.
- `orma-motion` — how anything on this site moves.
- `orma-shaders` — the animated backgrounds for the page openings and footer.

## Decisions

_Record every visual-identity decision she confirms here (date + one line), so future sessions never re-ask._

**2026-09-09 (later) — she designed the home page in Figma and we built to it**

The file: `https://www.figma.com/design/Wn2k92jj8SicjRMy2g7PuF` (she is on a View
seat, so read the design with `get_design_context`, never write to it). Three
artboards at 1920x982 = the home page and its scroll states. Measurements below
are quoted at that size and live as tokens in `global.css`.

- **A page margin of 40px on every side** (`--edge`), equal all round. Inside it,
  the **menu rectangle** spans the full width between those margins, 114px tall,
  fixed, with the words centred in it both ways. Photographs scroll *under* it,
  so the band is painted from the very top of the viewport even though the words
  sit in the lower part of it. Total top band = `--header-height` (154px).
- **The wordmark is turned on its side down the left margin**, reading upwards
  (O at the bottom), top-aligned with the first photograph, centred in the
  `--rail-width` (272px) column. Where the studio works sits at the foot of the
  same column. Both are fixed; on the phone the whole thing becomes one stacked
  header and the location line hides (the footer already says it).
- **The logo is black** (`--color-ink`). She asked for burgundy earlier, saw it,
  and changed her mind. The burgundy `#4f0013` now survives only in the favicon.
  There is no colour anywhere in the interface.
- **One type size for the whole interface** (`--text-ui`, 20px at 1920): menu,
  project captions, studio location. Captions are the project name in bold and
  the city in regular, white, centred at the foot of each photograph, 53px up.
- **Rows: 1, then 3, then 2**, repeating three-up and two-up after that. Every
  row is one screen tall. **One spacing value for everything**: the gap between
  projects, horizontal and vertical, is the same as the page margin
  (`--edge`). She asked for this twice; there is no separate grid-gap token.
- **The opening photograph owns the first screen**: it keeps the 40px page
  margin below it and pushes the next row past the fold, so nothing but the big
  image shows until you scroll.
- Every other page wears the same chrome. Project and studio pages open with a
  photograph exactly one row tall, so all pages open alike.

**2026-09-09 — first build of the site, decided with her directly**

- **Reference**: mir.no. She wants the work to speak first, so the home page **opens straight into the projects** (no separate opening screen, no intro). Confirmed explicitly over the alternatives.
- **Navigation**: superseded by the Figma design above.
- **Colour**: superseded above. Off-white paper (`#f7f6f4`) and off-black ink (`#141414`) plus two greys, and nothing else. **Do not add an accent colour without asking her.**
- **Typeface**: Montserrat everywhere (her choice), self-hosted. The logo's typeface was drawn for the logo only and exists nowhere else, so the wordmark is always the SVG at `src/assets/brand/logo.svg`, never live text. The lockup on the site is the **wordmark alone**, without the "arquitetura" line, because that line would have to be faked in Montserrat.
- **Portfolio grid**: newest project first; the rhythm is set in `src/lib/grid.ts`. Superseded in its details by the Figma design above.
- **Categories**: a project can belong to **more than one** (a house where they did both the architecture and the interiors shows up in both sections). Defined once in `src/lib/categories.ts`.
- **Studio facts**: two partners, Liliane Basso and Letícia Bierhals Ignacio. Based in Porto Alegre, RS; they take work in Porto Alegre and the Serra Gaúcha. Mostly residential, some commercial.
- **Favicon**: the "m." mark in off-white on a burgundy disc, generated from `src/assets/brand/mark.png` into `public/favicon*`. Her source file is a PNG, so the favicon is a PNG too; swap in a vector if she ever produces one.
- **Credentials**: Liliane Basso is CAU A307604-0. Letícia's registration is still pending and `partners[].cau` is `null` until it arrives, which hides her from the footer line automatically.

**Photographs.** `Apartamento BR` is real: her four renders, imported from her
Desktop into `src/assets/projects/apartamento-br/`. The other five projects
borrow those same four images on purpose ("só para ficar mais bonito") — each
`cover:` carries a `# TEMPORARY:` comment, and their own folders were deleted.
Swap each one out as its real photographs arrive.

**Still placeholder, by her explicit decision — do not chase these again:** the WhatsApp number (they do not have one yet), `contato@orma.arq.br` and `@orma.arq.br`. **Still genuinely missing:** every project photograph, Letícia's CAU, and all six project entries in `src/content/projects/`.
