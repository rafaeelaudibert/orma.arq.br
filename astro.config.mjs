// @ts-check
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  // The floating dev toolbar sits over the bottom of the page, which is exactly
  // where the project captions are. Off, so screenshots show the real design.
  devToolbar: { enabled: false },
})
