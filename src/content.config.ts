import { defineCollection } from "astro:content"
import { z } from "astro/zod"
import { glob } from "astro/loaders"

// Preserve the exact slugs produced by Astro's legacy content collections
// (path relative to the collection, without the file extension, case kept)
// so that public URLs remain unchanged after the Content Layer migration.
const legacyId = ({ entry }: { entry: string }) =>
  entry.replace(/\.[^/.]+$/, "")

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog", generateId: legacyId }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
  }),
})

const work = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/work", generateId: legacyId }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    featured: z.object({
      order: z.number(),
      category: z.string(),
      title: z.string(),
      summary: z.string(),
    }).optional(),
  }),
})

const legal = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/legal", generateId: legacyId }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
})

export const collections = { work, blog, legal }
