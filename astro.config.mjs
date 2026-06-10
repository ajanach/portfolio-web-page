import { defineConfig, passthroughImageService } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import solidJs from "@astrojs/solid-js"
import tailwindcss from "@tailwindcss/vite"
import { fileURLToPath } from "url"

// https://astro.build/config
export default defineConfig({
  site: "https://janach.cloud",
  image: {
    service: passthroughImageService()
  },
  integrations: [
    mdx(), 
    sitemap(), 
    solidJs({
      exclude: ["**/CVDocument.tsx"]
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})