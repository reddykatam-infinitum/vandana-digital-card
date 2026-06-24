import type { DigitalCard } from "@/data/cards";

function escapeVCard(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export function buildVCard(card: DigitalCard): string {
  const socialProfiles = card.socialLinks.map((link) => `X-SOCIALPROFILE;TYPE=${link.platform.toUpperCase()}:${escapeVCard(link.url)}`);
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeVCard(card.lastName)};${escapeVCard(card.firstName)};;;`,
    `FN:${escapeVCard(card.name)}`,
    `ORG:${escapeVCard(card.company)}`,
    `TITLE:${escapeVCard(card.role)}`,
    `TEL;TYPE=CELL,VOICE:${escapeVCard(card.phone)}`,
    `TEL;TYPE=CELL,MSG:+${card.whatsapp}`,
    `EMAIL;TYPE=INTERNET,WORK:${escapeVCard(card.email)}`,
    `URL;TYPE=WORK:${escapeVCard(card.website)}`,
    `ADR;TYPE=WORK:;;${escapeVCard(card.address)};;;;`,
    `NOTE:${escapeVCard(`${card.headline}\n${card.education}\n${card.educationSecondary}`)}`,
    ...socialProfiles,
    "END:VCARD"
  ].join("\r\n");
}
