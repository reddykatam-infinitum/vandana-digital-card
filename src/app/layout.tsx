import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://vandana-card.vercel.app"),
  title: { default: "Vandana B | Infinitum Network Solutions", template: "%s | Infinitum" },
  description: "Official digital business card for Vandana B, Founder and Managing Director at Infinitum Network Solutions.",
  applicationName: "Vandana B Digital Card",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/images/infinitum-icon.svg", apple: "/images/infinitum-icon.svg" },
  openGraph: {
    type: "profile",
    siteName: "Infinitum Digital Card",
    title: "Vandana B | Infinitum Network Solutions",
    description: "Founder and Managing Director at Infinitum Network Solutions.",
    images: [{ url: "/images/vandana.webp", width: 900, height: 900 }]
  },
  twitter: { card: "summary_large_image", images: ["/images/vandana.webp"] }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#020608",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
