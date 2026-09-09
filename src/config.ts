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
  /** CAU registration is the credential clients look for. `null` until we have it. */
  partners: [
    { name: "Liliane Basso", cau: "A307604-0" },
    { name: "Letícia Bierhals Ignacio", cau: null },
  ],
  email: "contato@orma.arq.br",
  /** Digits only, country code included. Used to build the wa.me link. */
  whatsapp: "5551999999999",
  instagram: "https://www.instagram.com/orma.arq.br",
  instagramHandle: "@orma.arq.br",
  url: "https://orma.arq.br",
} as const

export const whatsappUrl = `https://wa.me/${studio.whatsapp}`

export const partnerNames = studio.partners.map((partner) => partner.name)

/** "CAU A307604-0" — only the partners whose registration we already have. */
export const cauLine = studio.partners
  .filter((partner) => partner.cau)
  .map((partner) => `CAU ${partner.cau}`)
  .join(" · ")
