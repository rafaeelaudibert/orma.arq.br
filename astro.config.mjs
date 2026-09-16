// @ts-check
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  // The floating dev toolbar sits over the bottom of the page, which is exactly
  // where the project captions are. Off, so screenshots show the real design.
  devToolbar: { enabled: false },

  image: {
    // Quality is set per format because the numbers don't mean the same thing
    // in each: AVIF at 60 already looks slightly better than WebP at 80 on
    // these photographs, and weighs about a quarter less. WebP stays where it
    // was, so the browsers that fall back to it lose nothing.
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        avif: { quality: 60 },
        webp: { quality: 80 },
      },
    },
  },

  build: {
    // The reveal script starts every photograph invisible, so it has to run.
    // Inlined scripts are the ones an embedded viewer or a strict content
    // policy quietly drops; served as its own file it behaves like any other
    // asset. Cheap insurance for a portfolio made of photographs.
    inlineStylesheets: "auto",
  },

  vite: {
    build: {
      // 0 = never inline an asset into the HTML (see the note above).
      assetsInlineLimit: 0,
    },
  },
})
