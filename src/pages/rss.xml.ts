import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { SITE } from "@consts"
import { isPublished } from "@lib/content"

type Context = {
  site: string
}

export async function GET(context: Context) {
  const posts = (await getCollection("blog")).filter(isPublished)
  const work = (await getCollection("work")).filter(isPublished)

  const items = [...posts, ...work]

  items.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())

  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.summary,
      pubDate: item.data.date,
      link: item.collection === "blog"
        ? `/blog/${item.id}/`
        : `/work/${item.id}/`,
    })),
  })
}