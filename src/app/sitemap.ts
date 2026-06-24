import type { MetadataRoute } from "next";
import { cards } from "@/data/cards";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vandana-card.vercel.app";
  return cards.map((card) => ({
    url: `${baseUrl}/${card.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1
  }));
}
