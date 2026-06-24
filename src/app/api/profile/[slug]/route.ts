import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

const files: Record<string, string> = {
  "satyadev-chada": "satyadev-profile.jpg.b64"
};

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fileName = files[slug];

  if (!fileName) {
    return new Response("Profile image not found", { status: 404 });
  }

  const source = path.join(process.cwd(), "public", "images", fileName);
  const encoded = (await readFile(source, "utf8")).trim();
  const image = Buffer.from(encoded, "base64");

  return new Response(image, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}
