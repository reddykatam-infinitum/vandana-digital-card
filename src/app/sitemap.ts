import type { MetadataRoute } from "next";
import { cards } from "@/data/cards";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return cards.map((card) => ({
    url: `${siteUrl}/${card.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1
  }));
}
