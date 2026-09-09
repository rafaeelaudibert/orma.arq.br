---
name: orma-motion
description: Animation system and motion rules for the Orma architecture website. Consult BEFORE adding or changing any animation, transition, hover effect, scroll effect, or when she asks for the site to feel "more alive", "smoother", or "fancier". Defines the shared reveal-on-scroll system, easing/duration tokens, and when to escalate to WebGL.
---

# Orma — Motion

Motion on this site should feel like **mass and light** — heavy things settling into place, light sweeping across a facade. Calm, slow, few. Never bouncy, never busy: architecture doesn't spring.

## Principles

- **Motion ships by default.** She won't ask for animations — she doesn't know the words. Every new section gets its `data-reveal` entrances and hover responses as part of being built; a static page is an unfinished page.
- **One hero moment per page** (usually the shader background or the hero type reveal). Everything else is quiet support.
- **Entrances are slow and eased-out**: 500–900ms, `--ease-out-soft`. Hovers are quick: 150–250ms. Nothing ever bounces or overshoots.
- **Animate only `transform`, `opacity`, `clip-path`, and `filter`.** Never `top/left/width/height/margin` (they cause jank).
- **Respect `prefers-reduced-motion` everywhere**, always, non-negotiably. Reduced motion = content simply visible, no movement. Every new animation — CSS or script — must have its reduced path before it ships.
- **Phones are first-class.** Most visitors arrive on a phone: reveals must feel right at 390 × 844 (sections are taller there — check that things don't reveal too late), hover-only effects need a visible or touch equivalent, and nothing may rely on a mouse existing.
- Favorite moves for this aesthetic: fade-up reveals, `clip-path: inset()` image reveals (like a curtain drawing back), oversized headline sliding up behind an invisible mask, slow Ken Burns on hero photography (`scale(1) → scale(1.06)` over 8s+), underline draw-in on links.

## Page-to-page transitions

The site navigates through Astro's `<ClientRouter />` (in `Layout.astro`), so
moving between pages is a swap rather than a reload and the browser can animate
across it.

- **A project photograph flies from the grid into its own page.** Both the tile
  image and the project page's opening image carry
  `transition:name={`cover-`}`, which is all the browser needs to
  treat them as the same thing and morph one into the other.
- The morph borrows the site's own timing: `::view-transition-group(*)` is set
  to `--motion-slow` and `--ease-out-soft` in `global.css`.
- Reduced motion kills the animation outright (`::view-transition-*` set to
  `animation: none`), leaving an instant, honest page change.
- **Anything script-driven must re-run per page.** Hoisted scripts execute once
  for the whole session now, so wire work to the `astro:page-load` event, which
  fires on the first load and after every swap. `motion.js` already does this.

## The shared system (set up once, reuse forever)

Everything scroll-triggered goes through **one** mechanism — never write a new IntersectionObserver per component.

1. Copy `assets/motion.js` (next to this file) to **`src/scripts/motion.js`**.
2. Load it in `src/layouts/Layout.astro` body: `<script src="../scripts/motion.js"></script>`.
3. Add the motion tokens + classes below to `src/styles/global.css` (once):

```css
:root {
  --motion-fast: 200ms;
  --motion-slow: 700ms;
  --ease-out-soft: cubic-bezier(0.16, 1, 0.3, 1);
}

/* Reveal-on-scroll: add data-reveal to any element.
   Stagger siblings with style="--stagger: 1" (2, 3, …). */
[data-reveal] {
  opacity: 0;
  transform: translateY(1.5rem);
  transition:
    opacity var(--motion-slow) var(--ease-out-soft),
    transform var(--motion-slow) var(--ease-out-soft);
  transition-delay: calc(var(--stagger, 0) * 90ms);
}
[data-reveal='clip'] {
  transform: none;
  clip-path: inset(0 0 100% 0);
  transition:
    opacity var(--motion-slow) var(--ease-out-soft),
    clip-path 900ms var(--ease-out-soft);
}
[data-reveal-shown] {
  opacity: 1;
  transform: none;
  clip-path: inset(0 0 0 0);
}
@media (prefers-reduced-motion: reduce) {
  [data-reveal] {
    transition: none;
    transform: none;
    clip-path: none;
    opacity: 1;
  }
}
```

Usage after setup: `<h2 data-reveal>` fades up; `<figure data-reveal="clip">` unveils top-to-bottom; siblings stagger with `style="--stagger: 2"`. That's the whole API.

## Choosing the technique

| She asks for | Use |
| --- | --- |
| Hover/focus feedback (links, images, buttons) | Plain CSS `transition` in the component, `--motion-fast` |
| Things appearing as you scroll | The `data-reveal` system above |
| A slow ambient loop (breathing, drifting, Ken Burns) | CSS `@keyframes` in the component |
| Page-to-page transitions | Astro `<ClientRouter />` view transitions — only if she asks, and keep the default crossfade |
| A "wow" animated background / hero / footer | The `orma-shaders` skill |

**No animation libraries** (GSAP, Motion, Lottie…). This palette of techniques covers everything this site needs; if something truly can't be done with it, say so to Rafael in the summary rather than silently adding a dependency.

## Quality gate

After motion work: watch it once at normal speed and once while scrolling fast (nothing should flicker or pop); check ~390px width; toggle reduced motion if the change is big. The easiest cross-platform way is DevTools (Rendering panel → "Emulate CSS media feature `prefers-reduced-motion`"); the OS switch lives under Accessibility settings ("Reduce motion" on macOS, "Animation effects" on Windows 11). For a serious motion pass, run the installed `improve-animations` or `review-animations` skills. When she describes an effect she can't name ("the thing where it un-blurs"), use `animation-vocabulary` to decode it, then translate back to plain language.
