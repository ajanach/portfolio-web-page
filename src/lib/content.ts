import type { CollectionEntry } from "astro:content"
import type { SearchEntry } from "../types"

export type SearchableEntry =
  | CollectionEntry<"blog">
  | CollectionEntry<"work">

export function isPublished(entry: SearchableEntry) {
  return !entry.data.draft
}

export function toSearchEntry(entry: SearchableEntry): SearchEntry {
  return {
    collection: entry.collection,
    id: entry.id,
    data: {
      title: entry.data.title,
      summary: entry.data.summary,
      date: entry.data.date,
      tags: entry.data.tags,
    },
  }
}