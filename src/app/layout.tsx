import type { Metadata, Viewport } from "next";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const profileImage = "/images/vandana.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Vandana B | Infinitum Network Solutions", template: "%s | Infinitum" },
  description: "Official digital business card for Vandana B, Co-Founder at Infinitum Network Solutions.",
  applicationName: "Vandana B Digital Card",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/images/infinitum-icon.svg", apple: "/images/infinitum-icon.svg" },
  openGraph: {
    type: "profile",
    siteName: "Infinitum Digital Card",
    title: "Vandana B | Infinitum Network Solutions",
    description: "Co-Founder at Infinitum Network Solutions.",
    images: [{ url: profileImage, width: 627, height: 612, alt: "Vandana B" }]
  },
  twitter: { card: "summary_large_image", images: [profileImage] }
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
