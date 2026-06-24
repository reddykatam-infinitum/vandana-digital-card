export type SocialPlatform = "linkedin" | "youtube" | "facebook" | "x";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  handle: string;
  url: string;
};

export type DigitalCard = {
  slug: string;
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  company: string;
  headline: string;
  education: string;
  educationSecondary: string;
  profileImage: string;
  companyMark: string;
  companyPattern: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  website: string;
  websiteDisplay: string;
  location: string;
  address: string;
  mapUrl: string;
  socialLinks: SocialLink[];
};

export const cards: DigitalCard[] = [
  {
    slug: "vandana-b",
    name: "Vandana B",
    firstName: "Vandana",
    lastName: "B",
    role: "Co-Founder & Managing Director",
    company: "Infinitum Network Solutions",
    headline: "Building global creator ecosystems, original IPs and digital media businesses.",
    education: "M.B.A. — Finance, Ohio University",
    educationSecondary: "Doctorate in Gen AI — Golden Gate University",
    profileImage: "https://vandana-contact-page-m3gz.vercel.app/avatar.jpg",
    companyMark: "/images/infinitum-mark.svg",
    companyPattern: "/images/infinitum-network.svg",
    phone: "+919885700015",
    phoneDisplay: "+91 98857 00015",
    whatsapp: "919885700015",
    email: "vandana@infinitumnetwork.in",
    website: "https://www.infinitumnetworksolutions.com/",
    websiteDisplay: "infinitumnetworksolutions.com",
    location: "Jubilee Hills, Hyderabad",
    address: "Plot No. 702, Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033, India",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Plot+No+702+Road+No+36+Jubilee+Hills+Hyderabad+Telangana+500033",
    socialLinks: [
      { platform: "linkedin", label: "LinkedIn", handle: "vandanabandaru", url: "https://www.linkedin.com/in/vandanabandaru" }
    ]
  }
];

export function getCard(slug: string): DigitalCard | undefined {
  return cards.find((card) => card.slug === slug);
}
