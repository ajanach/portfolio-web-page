import { defineConfig, passthroughImageService } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"
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
    tailwind({ applyBaseStyles: false })
  ],
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
})