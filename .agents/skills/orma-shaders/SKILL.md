---
name: orma-shaders
description: Animated WebGL shader backgrounds for the Orma architecture website — the "wow" layer for the page-top opening (hero), footer, or any full-bleed section. Use PROACTIVELY whenever building or redesigning a hero or footer — she doesn't know these words and will never ask; it's part of the standard quality bar. Also when she says "alive", "moving", "fancy", "magical". Ships a ready-made canvas component and four tested shader looks; never write WebGL boilerplate from scratch.
---

# Orma — Shader Backgrounds

Full-screen animated backgrounds rendered on the GPU, with her text and images sitting on top as normal HTML. All the WebGL plumbing is already written — your job is only to pick/tune a *look* and compose content over it.

## Offering it to her

**Don't wait to be asked.** She won't say "hero", "footer", or "animated background" — when you build the opening of a page or the footer, include one of these looks (or an equally strong full-bleed photograph) by default, matched to the identity in `orma-design`, then describe what you made in plain language so she can react.

Never say "shader", "WebGL", or "canvas". Describe the looks and let her pick or veto:

| File | Say to her | Best for |
| --- | --- | --- |
| `ink-flow.glsl` | "Dark liquid ink slowly swirling, like smoke settling — moody and premium" | Hero, dark identity |
| `blueprint.glsl` | "Deep-blue drafting paper with a fine grid drifting past, light sweeping over it like sun on a drawing board" | Hero, literal architecture nod |
| `warm-haze.glsl` | "Bright ivory with soft pools of warm light drifting through, like morning light on plaster" | Hero, light identity |
| `concrete.glsl` | "Almost-still dark concrete texture, very calm" | Footer |

All four subtly follow the visitor's cursor. Match the choice to the identity in `orma-design` (Decisions section) — the shader palette must use the same family of colors as the site tokens.

## Setup (first time only)

1. Copy `assets/ShaderCanvas.astro` (next to this file) → `src/components/ShaderCanvas.astro`. **Copy it verbatim — don't rewrite or trim it.** It already handles: sizing/retina, pausing when scrolled off screen, `prefers-reduced-motion` (freezes on one frame), no-WebGL fallback, and mouse smoothing.
2. Copy the chosen look from `assets/shaders/` → `src/shaders/<name>.glsl`.

## Using it

```astro
---
import ShaderCanvas from '../components/ShaderCanvas.astro';
import frag from '../shaders/ink-flow.glsl?raw'; // ?raw = load file as plain text
---

<ShaderCanvas frag={frag} class="hero" fallback="linear-gradient(#0b0b0e, #23242a)">
  <h1>Orma</h1>
  <p>Estúdio de arquitetura</p>
</ShaderCanvas>

<style>
  .hero {
    min-height: 100svh;
    display: grid;
    place-items: center;
  }
</style>
```

Rules:

- **Content goes in the slot as real HTML** — never bake text into the shader. Screen readers and SEO see normal markup; the canvas is `aria-hidden`.
- **Set `fallback`** to a CSS gradient sampled from the shader's own palette, so visitors without WebGL still get the right mood.
- **Guarantee contrast.** If text is hard to read over the animation, add a scrim inside the slot content (e.g. a `linear-gradient(rgba(0,0,0,0.35), transparent)` overlay) or darken the shader palette — don't shrink the text.
- **At most two shader sections per page** (hero + footer is the intended pair — offscreen ones pause automatically, so this stays cheap).

## Translating her feedback into edits

Every `.glsl` file has its knobs labeled in comments:

- "slower / calmer / less busy" → lower the number on the `// SPEED` line (and vice versa).
- "different colors / warmer / darker" → edit the `const vec3` PALETTE lines at the top. Values are RGB 0–1 (hex channel ÷ 255).
- "follow the mouse more / less" → scale the `u_mouse` term (or the `cursor` factor in blueprint).
- A whole new look → write a new `.glsl` in `src/shaders/`, keeping the same skeleton: WebGL1 GLSL (`precision highp float;` first, output via `gl_FragColor`), the three uniforms, loops with small constant bounds (≤5), and always the final grain line — it prevents color banding.

## Quality gate (every shader change)

1. Load the page with the dev server and open the browser console: any `[ShaderCanvas]` error means the shader failed to compile — the message includes the GLSL line number. Fix it; never ship a page where the fallback shows because of a compile error.
2. Screenshot desktop and ~390px width; confirm text stays readable over the brightest part of the animation.
3. Scroll the section off and back on screen once — it should resume moving.
