"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { DigitalCard as CardData } from "@/data/cards";

type IconName = "phone" | "whatsapp" | "mail" | "location" | "linkedin" | "instagram" | "download" | "share" | "qr";

function AppIcon({ name }: { name: IconName }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true
  };

  if (name === "phone") return <svg {...common}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z"/></svg>;
  if (name === "whatsapp") return <svg {...common}><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.45L3 20.5l1.4-4.75A8.5 8.5 0 1 1 20.5 11.7z"/><path d="M8.3 7.9c.25-.55.5-.56.75-.57h.64c.2 0 .52.08.8.7.28.63.95 2.2 1.03 2.36.08.16.14.35.03.55-.1.2-.16.32-.32.5-.16.18-.34.4-.48.53-.16.16-.33.33-.14.65.2.32.87 1.43 1.87 2.32 1.29 1.15 2.38 1.5 2.7 1.67.32.16.5.14.7-.08.19-.22.83-.96 1.05-1.29.22-.32.44-.27.75-.16.3.11 1.93.91 2.26 1.08.32.16.54.24.62.38.08.14.08.8-.19 1.57-.27.76-1.59 1.45-2.18 1.54-.56.09-1.29.13-2.08-.13-.48-.16-1.1-.36-1.9-.7-3.34-1.44-5.53-4.82-5.7-5.04-.16-.22-1.36-1.81-1.36-3.45 0-1.64.86-2.45 1.16-2.79z" strokeWidth="1.2"/></svg>;
  if (name === "mail") return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>;
  if (name === "location") return <svg {...common}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2.5"/></svg>;
  if (name === "linkedin") return <svg {...common} fill="currentColor" stroke="none"><rect x="3" y="9" width="4" height="12" rx="1"/><circle cx="5" cy="5" r="2"/><path d="M10 9h4v1.7c1.1-1.4 2.5-2.1 4.1-2.1 3 0 4.9 1.9 4.9 5.8V21h-4v-6.1c0-1.9-.7-3.1-2.3-3.1-1.7 0-2.7 1.2-2.7 3.5V21h-4z"/></svg>;
  if (name === "instagram") return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
  if (name === "download") return <svg {...common}><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16"/></svg>;
  if (name === "share") return <svg {...common}><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.5m-7.6 6.9 7.6 4.5"/></svg>;
  return <svg {...common}><rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><path d="M14 14h2v2h-2zm4 0h2v6h-6v-2h4z"/></svg>;
}

const IconBox = ({ name }: { name: IconName }) => <span className="icon"><AppIcon name={name} /></span>;

const driveLogoSources = [
  "https://lh3.googleusercontent.com/d/1DOneq1T0Hyi-xtbXrtSlX_ikvLq22Q9X",
  "https://drive.google.com/uc?export=view&id=1DOneq1T0Hyi-xtbXrtSlX_ikvLq22Q9X",
  "https://drive.google.com/thumbnail?id=1DOneq1T0Hyi-xtbXrtSlX_ikvLq22Q9X&sz=w1000"
];

function BrandLogo({ className, alt = "Infinitum" }: { className?: string; alt?: string }) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    <img
      src={driveLogoSources[sourceIndex]}
      alt={alt}
      className={className}
      loading="eager"
      onError={() => {
        if (sourceIndex < driveLogoSources.length - 1) {
          setSourceIndex((current) => current + 1);
        } else {
          setHidden(true);
        }
      }}
    />
  );
}

const networkPattern = "/images/infinitum-network.svg";

export function DigitalCard({ card }: { card: CardData }) {
  const [qrOpen, setQrOpen] = useState(false);
  const [contactHelpOpen, setContactHelpOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!qrOpen && !contactHelpOpen) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setQrOpen(false);
        setContactHelpOpen(false);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", close);
    };
  }, [qrOpen, contactHelpOpen]);

  async function saveContact() {
    const contactUrl = `/api/vcard/${card.slug}`;
    const isAppleMobile = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isAppleMobile) {
      window.location.assign(contactUrl);
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(contactUrl);
      const blob = await response.blob();
      const file = new File([blob], `${card.slug}.vcf`, { type: "text/vcard" });
      const shareData = { files: [file], title: `${card.name} contact` };
      const nav = navigator as Navigator & { canShare?: (data: ShareData) => boolean };

      if (navigator.share && nav.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else {
        setContactHelpOpen(true);
      }
    } catch (error) {
      if ((error as DOMException)?.name !== "AbortError") {
        setContactHelpOpen(true);
      }
    } finally {
      setSaving(false);
    }
  }

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

  const whatsappUrl = `https://wa.me/${card.whatsapp}?text=${encodeURIComponent(`Hello ${card.firstName}, I found your digital business card.`)}`;

  return (
    <main className="page-shell">
      <article className="card-shell">
        <section className="hero">
          <img src={networkPattern} alt="" className="network-bg" aria-hidden="true" />
          <header className="brand-row">
            <a href={card.website} target="_blank" rel="noreferrer" className="brand">
              <BrandLogo className="brand-mark" />
              <span><b>INFINITUM</b><small>NETWORK SOLUTIONS</small></span>
            </a>
            <button className="icon-button" onClick={() => setQrOpen(true)} aria-label="Show QR code"><AppIcon name="qr" /></button>
          </header>

          <div className="profile-grid">
            <div className="photo-wrap">
              <img src={card.profileImage} alt={card.name} className="photo" loading="eager" referrerPolicy="no-referrer" />
              <span className="status"><i /> Executive Profile</span>
            </div>
            <div className="identity">
              <p className="eyebrow">DIGITAL BUSINESS CARD</p>
              <h1>{card.name}</h1>
              <h2>{card.role}</h2>
              <p className="company">{card.company}</p>
              <p className="headline">{card.headline}</p>
              <div className="education">
                <span>{card.education}</span>
                <span>{card.educationSecondary}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <p className="eyebrow">CONTACT DETAILS</p>
          <h3>Connect directly</h3>
          <div className="contact-list">
            <a href={`tel:${card.phone}`}><IconBox name="phone" /><span><small>Mobile</small><b>{card.phoneDisplay}</b></span><em>›</em></a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer"><IconBox name="whatsapp" /><span><small>WhatsApp</small><b>{card.phoneDisplay}</b></span><em>›</em></a>
            <a href={`mailto:${card.email}`}><IconBox name="mail" /><span><small>Email</small><b>{card.email}</b></span><em>›</em></a>
            <a href={card.mapUrl} target="_blank" rel="noreferrer"><IconBox name="location" /><span><small>Office</small><b>{card.location}</b><p>{card.address}</p></span><em>›</em></a>
          </div>
        </section>

        <section className="panel social-panel">
          <h3>Connect Directly</h3>
          <div className="social-list">
            {card.socialLinks.map((link) => (
              <a key={link.platform} href={link.url} target="_blank" rel="noreferrer">
                <IconBox name={link.platform === "linkedin" ? "linkedin" : "instagram"} />
                <span><b>{link.label}</b><small>{link.handle}</small></span><em>›</em>
              </a>
            ))}
          </div>
        </section>

        <section className="panel qr-panel">
          <p className="eyebrow">ONE SCAN. INSTANT ACCESS.</p>
          <h3>Share this digital card</h3>
          <p>Let anyone save Vandana&apos;s details in seconds.</p>
          <button onClick={() => setQrOpen(true)}><AppIcon name="qr" /> Show QR Code</button>
        </section>

        <section className="bottom-actions" aria-label="Card actions">
          <div className="main-actions">
            <button type="button" onClick={saveContact} className="save-button"><AppIcon name="download" /><span>{saving ? "Opening…" : "Save Contact"}</span></button>
            <button onClick={shareCard} className="share-button"><AppIcon name="share" />{copied ? "Link Copied" : "Share Card"}</button>
          </div>
        </section>

        <footer><BrandLogo alt="" /><span><b>INFINITUM</b><small>NETWORK SOLUTIONS</small></span><em>© 2026</em></footer>
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

      {contactHelpOpen && (
        <div className="modal" onMouseDown={() => setContactHelpOpen(false)}>
          <div className="modal-card contact-help" onMouseDown={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setContactHelpOpen(false)}>×</button>
            <p className="eyebrow">SAVE TO CONTACTS</p>
            <h3>One confirmation is required</h3>
            <p>Android browsers do not allow a website to silently add someone to your phonebook. Download the contact card, open it from your Downloads notification, then choose <b>Contacts → Import</b>.</p>
            <a className="contact-download" href={`/api/vcard/${card.slug}`} download={`${card.slug}.vcf`}><AppIcon name="download" /> Download Contact Card</a>
            <button className="contact-cancel" onClick={() => setContactHelpOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </main>
  );
}
