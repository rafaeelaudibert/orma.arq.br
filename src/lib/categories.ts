/**
 * The three kinds of work the studio shows, in menu order.
 * A project can belong to more than one.
 */
export const categories = [
  {
    slug: "arquitetura",
    label: "Arquitetura",
    intro: "Casas e residências projetadas do terreno ao último detalhe.",
  },
  {
    slug: "interiores",
    label: "Interiores",
    intro: "Ambientes desenhados para o jeito de morar de cada família.",
  },
  {
    slug: "comercial",
    label: "Comercial",
    intro: "Lojas, escritórios e espaços de atendimento que recebem bem.",
  },
] as const

export type CategorySlug = (typeof categories)[number]["slug"]

export const categorySlugs = categories.map((c) => c.slug)

export function categoryLabel(slug: CategorySlug) {
  return categories.find((c) => c.slug === slug)!.label
}

/** Everything in the left-hand menu, in order. */
export const navLinks = [
  ...categories.map((c) => ({ href: `/${c.slug}`, label: c.label })),
  { href: "/sobre", label: "Sobre nós" },
  { href: "/contato", label: "Contato" },
]
