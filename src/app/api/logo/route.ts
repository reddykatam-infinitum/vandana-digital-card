import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function GET() {
  const source = path.join(process.cwd(), "public", "images", "infinitum-logo-original.png.b64");
  const encoded = (await readFile(source, "utf8")).trim();
  const image = Buffer.from(encoded, "base64");

  return new Response(image, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}
