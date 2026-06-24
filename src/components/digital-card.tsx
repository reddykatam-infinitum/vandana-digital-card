"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { DigitalCard as CardData } from "@/data/cards";

const Icon = ({ children }: { children: React.ReactNode }) => <span className="icon">{children}</span>;

export function DigitalCard({ card }: { card: CardData }) {
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!qrOpen) return;
    const close = (e: KeyboardEvent) => e.key === "Escape" && setQrOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", close);
    };
  }, [qrOpen]);

  async function shareCard() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${card.name} — ${card.company}`, text: card.role, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }
    } catch (error) {
      if ((error as DOMException)?.name !== "AbortError") {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }
    }
  }

  const actions = [
    { label: "Call", icon: "☎", href: `tel:${card.phone}` },
    { label: "WhatsApp", icon: "◉", href: `https://wa.me/${card.whatsapp}?text=${encodeURIComponent(`Hello ${card.firstName}, I found your digital business card.`)}` },
    { label: "Email", icon: "✉", href: `mailto:${card.email}` },
    { label: "Website", icon: "◎", href: card.website }
  ];

  return (
    <main className="page-shell">
      <article className="card-shell">
        <section className="hero">
          <Image src={card.companyLogo} alt="" width={1200} height={700} className="network-bg" priority />
          <header className="brand-row">
            <a href={card.website} target="_blank" rel="noreferrer" className="brand">
              <Image src={card.companyLogo} alt="Infinitum" width={48} height={34} />
              <span><b>INFINITUM</b><small>NETWORK SOLUTIONS</small></span>
            </a>
            <button className="icon-button" onClick={() => setQrOpen(true)} aria-label="Show QR code">▦</button>
          </header>

          <div className="profile-grid">
            <div className="photo-wrap">
              <Image src={card.profileImage} alt={card.name} width={190} height={190} className="photo" priority />
              <span className="status"><i /> Executive Profile</span>
            </div>
            <div className="identity">
              <p className="eyebrow">DIGITAL BUSINESS CARD</p>
              <h1>{card.name}</h1>
              <h2>{card.role}</h2>
              <p className="company">{card.company}</p>
              <p className="headline">{card.headline}</p>
              <span className="education">{card.education}</span>
            </div>
          </div>

          <div className="main-actions">
            <a href={`/api/vcard/${card.slug}`} className="save-button">↓ <span>Save Contact</span></a>
            <button onClick={shareCard} className="share-button">{copied ? "✓ Link Copied" : "↗ Share Card"}</button>
          </div>
        </section>

        <nav className="quick-actions" aria-label="Quick contact actions">
          {actions.map((item) => (
            <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              <Icon>{item.icon}</Icon><span>{item.label}</span>
            </a>
          ))}
        </nav>

        <section className="section">
          <p className="eyebrow">CONTACT DETAILS</p>
          <h3>Connect directly</h3>
          <div className="contact-list">
            <a href={`tel:${card.phone}`}><Icon>☎</Icon><span><small>Mobile</small><b>{card.phoneDisplay}</b></span><em>›</em></a>
            <a href={`mailto:${card.email}`}><Icon>✉</Icon><span><small>Email</small><b>{card.email}</b></span><em>›</em></a>
            <a href={card.website} target="_blank" rel="noreferrer"><Icon>◎</Icon><span><small>Website</small><b>{card.websiteDisplay}</b></span><em>›</em></a>
            <a href={card.mapUrl} target="_blank" rel="noreferrer"><Icon>⌖</Icon><span><small>Office</small><b>{card.location}</b><p>{card.address}</p></span><em>›</em></a>
          </div>
        </section>

        <section className="panel">
          <p className="eyebrow">SOCIAL PRESENCE</p>
          <h3>Follow & connect</h3>
          <div className="social-list">
            {card.socialLinks.map((link) => (
              <a key={link.platform} href={link.url} target="_blank" rel="noreferrer">
                <Icon>{link.platform === "linkedin" ? "in" : "◎"}</Icon>
                <span><b>{link.label}</b><small>{link.handle}</small></span><em>›</em>
              </a>
            ))}
          </div>
        </section>

        <section className="panel qr-panel">
          <p className="eyebrow">ONE SCAN. INSTANT ACCESS.</p>
          <h3>Share this digital card</h3>
          <p>Let anyone save Vandana&apos;s details in seconds.</p>
          <button onClick={() => setQrOpen(true)}>▦ Show QR Code</button>
        </section>

        <footer><Image src={card.companyLogo} alt="" width={36} height={28} /><span><b>INFINITUM</b><small>NETWORK SOLUTIONS</small></span><em>© 2026</em></footer>
      </article>

      {qrOpen && (
        <div className="modal" onMouseDown={() => setQrOpen(false)}>
          <div className="modal-card" onMouseDown={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setQrOpen(false)}>×</button>
            <p className="eyebrow">SCAN TO CONNECT</p>
            <h3>{card.name}</h3>
            <div className="qr-box"><QRCodeSVG value={typeof window === "undefined" ? `/${card.slug}` : window.location.href} size={230} level="H" marginSize={2} /></div>
            <p>Point any phone camera at this QR code.</p>
          </div>
        </div>
      )}
    </main>
  );
}
