/**
 * The three kinds of work the studio shows, in menu order.
 * A project can belong to more than one.
 *
 * `intro` is never shown: those pages are photographs only. It survives as the
 * page description search engines read.
 *
 * `phrase` is the category written as a noun phrase, for the sentences the bare
 * label cannot go into: "projetos de arquitetura" works, "projetos de
 * comercial" does not.
 */
export const categories = [
  {
    slug: "arquitetura",
    label: "Arquitetura",
    intro: "Casas e residências projetadas do terreno ao último detalhe.",
    phrase: "projetos de arquitetura",
  },
  {
    slug: "interiores",
    label: "Interiores",
    intro: "Ambientes desenhados para o jeito de morar de cada família.",
    phrase: "projetos de interiores",
  },
  {
    slug: "comercial",
    label: "Comercial",
    intro: "Lojas, escritórios e espaços de atendimento que recebem bem.",
    phrase: "projetos comerciais",
  },
] as const

export type CategorySlug = (typeof categories)[number]["slug"]

export const categorySlugs = categories.map((c) => c.slug)

export function categoryLabel(slug: CategorySlug) {
  return categories.find((c) => c.slug === slug)!.label
}

export function categoryPhrase(slug: CategorySlug) {
  return categories.find((c) => c.slug === slug)!.phrase
}

/** Everything in the left-hand menu, in order. */
export const navLinks = [
  ...categories.map((c) => ({ href: `/${c.slug}`, label: c.label })),
  { href: "/sobre", label: "Sobre nós" },
  { href: "/contato", label: "Contato" },
]
