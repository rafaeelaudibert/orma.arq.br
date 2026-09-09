/**
 * Studio facts, defined once and imported everywhere.
 * Never hardcode these in a component or page.
 */
export const studio = {
  name: "Orma Arquitetura",
  shortName: "Orma",
  /** One line, used on the studio page and in meta descriptions. */
  tagline: "Arquitetura e interiores em Porto Alegre e na Serra Gaúcha",
  city: "Porto Alegre",
  state: "RS",
  /** Where the studio takes on work, in visitor-facing wording. */
  regions: ["Porto Alegre", "Serra Gaúcha"],
  partners: ["Liliane Basso", "Letícia Bierhals Ignacio"],
  email: "contato@orma.arq.br",
  /** Digits only, country code included. Used to build the wa.me link. */
  whatsapp: "5551999999999",
  instagram: "https://www.instagram.com/orma.arq.br",
  instagramHandle: "@orma.arq.br",
  url: "https://orma.arq.br",
} as const

export const whatsappUrl = `https://wa.me/${studio.whatsapp}`

/** Pretty phone number for display: +55 (51) 99999-9999 */
export const whatsappDisplay = studio.whatsapp.replace(
  /^(\d{2})(\d{2})(\d{5})(\d{4})$/,
  "+$1 ($2) $3-$4",
)
