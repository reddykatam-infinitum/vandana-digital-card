import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DigitalCard } from "@/components/digital-card";
import { cards, getCard } from "@/data/cards";

export function generateStaticParams() {
  return cards.map((card) => ({ slug: card.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const card = getCard(slug);
  if (!card) return {};
  return {
    title: `${card.name} — ${card.role}`,
    description: card.headline,
    alternates: { canonical: `/${card.slug}` },
    openGraph: {
      title: `${card.name} | ${card.company}`,
      description: card.headline,
      url: `/${card.slug}`,
      images: [{ url: card.profileImage, width: 900, height: 900 }]
    }
  };
}

export default async function CardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = getCard(slug);
  if (!card) notFound();
  return <DigitalCard card={card} />;
}
