/**
 * Turns a flat list of projects into the rows of the portfolio grid, following
 * the Figma design: the newest project alone across the content column, then a
 * repeating rhythm of three-up and two-up rows. Every row is the same height,
 * set in CSS, so a row fills exactly one screen.
 *
 * A shape is a list of spans, each a share of 12 columns.
 */
type Shape = number[]

const LEAD: Shape = [12]

const SHAPES: Shape[] = [
  [4, 4, 4],
  [6, 6],
]

/** Fallbacks used when the remaining projects can't fill the next shape. */
const REMAINDER: Record<number, Shape> = {
  1: [12],
  2: [6, 6],
  3: [4, 4, 4],
}

export type Row<T> = { cells: { item: T; span: number }[] }

export function toRows<T>(items: T[], { lead = true } = {}): Row<T>[] {
  const queue = [...items]
  const rows: Row<T>[] = []
  let shapeIndex = 0

  while (queue.length > 0) {
    const isLead = lead && rows.length === 0
    let shape = isLead ? LEAD : SHAPES[shapeIndex++ % SHAPES.length]

    if (shape.length > queue.length) {
      shape = REMAINDER[queue.length] ?? shape
    }

    const cells = shape
      .slice(0, queue.length)
      .map((span) => ({ item: queue.shift()!, span }))

    rows.push({ cells })
  }

  return rows
}
