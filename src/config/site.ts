export const siteConfig = {
  name: "Restaurante Gladys",
  shortName: "Gladys",
  tagline: "Cocina Tradicional Peruana",
  description:
    "Saborea la auténtica cocina peruana en el corazón de la ciudad. Platos tradicionales preparados con los mejores ingredientes.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  contact: {
    address: "Av. Peru 1234, Lima Centro",
    city: "Lima, Perú",
    phone: "+51 987 654 321",
    schedule: "Lunes a Domingo · 11:00 AM - 10:00 PM",
  },
  social: {
    twitter: "#",
    instagram: "#",
    facebook: "#",
  },
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
} as const;

export type SiteConfig = typeof siteConfig;
