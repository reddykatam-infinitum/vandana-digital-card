import { NextResponse } from "next/server";
import { getCard } from "@/data/cards";
import { buildVCard } from "@/lib/vcard";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = getCard(slug);
  if (!card) return NextResponse.json({ error: "Card not found" }, { status: 404 });

  return new NextResponse(buildVCard(card), {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `inline; filename="${card.slug}.vcf"`,
      "Cache-Control": "public, max-age=3600"
    }
  });
}
