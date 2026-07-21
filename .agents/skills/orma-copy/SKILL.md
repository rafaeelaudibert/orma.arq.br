---
name: orma-copy
description: Writing rules for ALL user-facing text on the Orma website — headlines, project descriptions, about/services/contact copy, button labels, captions, alt text, page titles, meta descriptions. The site is written 100% in Brazilian Portuguese for people looking to hire an architect. Use whenever writing or editing any words a visitor will read.
---

# Orma — Writing for the Site

## Language: Brazilian Portuguese, always

- **Every word a visitor reads is in Brazilian Portuguese.** The creative director prompts in English — translate her *intent* into natural pt-BR, never word-for-word. If she types a headline in English, deliver it in pt-BR and show her both in your reply.
- **No i18n, ever.** One language, no translations, no language switcher, no `/en/` routes, no i18n libraries or Astro i18n config. Don't prepare for it "just in case".
- `<html lang="pt-BR">` in the layout; page `<title>` and meta descriptions in pt-BR too.
- **Code is 100% English.** File names, component names, CSS classes, variables, functions, comments: always English. Portuguese appears only in the actual content a visitor reads and in visitor-facing URLs (page routes and project folder slugs like `/projetos/casa-do-lago` stay pt-BR).

## Who is reading

Someone thinking about **hiring an architect**: a couple planning to build or renovate a home, a family reforming an apartment, a business owner fitting out a space. They are not architects. They're nervous about cost, timelines, and trusting a stranger with their home — and they're judging taste and professionalism from the very first screen. Every sentence should either show taste or build trust.

## Voice

- **Sóbria, calorosa, confiante.** Short declarative sentences. The studio speaks as "nós" ("projetamos", "acreditamos"); the reader is "você" — never "tu", never "vós", never stiff corporate third person.
- **No architecture jargon.** Not "partido arquitetônico", "programa de necessidades", "setorização", "cortes e elevações". Talk about what people actually feel: luz natural, espaço, materiais, o dia a dia da casa. If a technical idea matters, explain it through its benefit ("janelas posicionadas para receber o sol da manhã", not "orientação solar otimizada").
- **No marketing clichés.** Ban: "soluções personalizadas", "transformamos sonhos em realidade", "excelência e compromisso", "há X anos no mercado" as a personality substitute. Say specific things instead — a real material, a real neighborhood, a real problem solved.
- **Concrete beats abstract.** "Casa de 180 m² em terreno estreito no Petrópolis" earns more trust than "projeto residencial exclusivo".
- **Nothing that smells AI-written.** No em-dash (travessão) as casual mid-sentence punctuation; rewrite with a period, comma, colon, or parentheses. Ban the telltale vocabulary and patterns: "eleve", "desbloqueie", "potencialize", "mergulhe em", "explore um mundo de", "não é apenas X, é Y", rule-of-three adjective strings ("moderno, elegante e sofisticado"), openings like "Bem-vindo ao universo de". If a sentence could open any studio's website, rewrite it until it could only be Orma's.

## pt-BR mechanics (get these right)

- Perfect accents and cedillas, always: "construção", "residência", "área".
- Headlines and buttons in sentence case ("Projetos residenciais", never "Projetos Residenciais" — Title Case is an anglicism).
- Months and weekdays lowercase: "março de 2026". Areas as "180 m²" (space before m²). Decimal comma: "4,5 m". Money: "R$ 1.500".
- No gerundismo: "vamos enviar", never "estaremos enviando".
- Prefer the Portuguese word when it's natural: "projeto" (not "design") for the architectural work itself; "reforma" (not "retrofit") for homes. Established loanwords used by clients (site, e-mail, WhatsApp) are fine.

## Structure and trust

- Headlines: 2–6 words, one idea. Body: short paragraphs, scannable; nobody reads walls of text on a portfolio site.
- Projects are little stories: where, when, for whom (in spirit — no client surnames without permission), what the challenge was, what changed in the way people live there. Size and year add credibility.
- The studio page states real credentials plainly (formação, registro no CAU) — one line, no boasting.
- **Every page ends with a next step.** In Brazil the natural first contact is WhatsApp: primary CTA like "Conversar no WhatsApp" or "Agendar uma conversa". Warmer than "Solicite um orçamento" — nobody wants a quote before a conversation.
- Image `alt` text in pt-BR, describing what's actually in the photo ("Sala de estar com pé-direito duplo e janela para o jardim").

## SEO basics (quietly, on every page)

One `h1` per page. `<title>` pattern: "Página — Orma Arquitetura" (or the studio's confirmed name). Meta descriptions ~150 characters in pt-BR using words clients actually search: "arquiteto em <cidade>", "projeto de casa", "reforma de apartamento". Never stuff keywords into visible copy.

## Placeholders

When a fact is unknown (city, studio history, credentials, prices), write plausible pt-BR copy anyway, and **list every invented fact to her at the end** so she can correct them ("I wrote that the studio is in Porto Alegre and founded in 2019 — tell me the real details and I'll swap them in"). Record confirmed facts in the Decisions section of `orma-design` so they're never re-invented.
