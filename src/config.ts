/**
 * Studio facts, defined once and imported everywhere.
 * Never hardcode these in a component or page.
 */
export const studio = {
  name: "Orma Arquitetura",
  shortName: "Orma",
  city: "Porto Alegre",
  state: "RS",
  email: "contato@orma.arq.br",
  /** Digits only, country code included. Used to build the wa.me link. */
  whatsapp: "5551999999999",
  instagram: "https://www.instagram.com/orma.arq.br",
  url: "https://orma.arq.br",
} as const

export const whatsappUrl = `https://wa.me/${studio.whatsapp}`
