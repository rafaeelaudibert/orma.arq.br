/**
 * Turns a flat list of projects into the editorial rows of the portfolio grid:
 * the newest project alone across the full width, then a repeating rhythm of
 * wide/narrow pairs and triplets so no two screens look alike.
 *
 * `span` is a share of 12 columns; `height` is the row's height in svh.
 */
type Shape = { spans: number[]; height: number }

const LEAD: Shape = { spans: [12], height: 86 }

const SHAPES: Shape[] = [
  { spans: [7, 5], height: 60 },
  { spans: [4, 4, 4], height: 44 },
  { spans: [5, 7], height: 60 },
  { spans: [6, 6], height: 54 },
  { spans: [8, 4], height: 48 },
]

/** Fallbacks used when the remaining projects can't fill the next shape. */
const REMAINDER: Record<number, Shape> = {
  1: { spans: [12], height: 64 },
  2: { spans: [6, 6], height: 54 },
  3: { spans: [4, 4, 4], height: 44 },
}

export type Row<T> = { height: number; cells: { item: T; span: number }[] }

export function toRows<T>(items: T[], { lead = true } = {}): Row<T>[] {
  const queue = [...items]
  const rows: Row<T>[] = []
  let shapeIndex = 0

  while (queue.length > 0) {
    const isLead = lead && rows.length === 0
    let shape = isLead ? LEAD : SHAPES[shapeIndex++ % SHAPES.length]

    if (shape.spans.length > queue.length) {
      shape = REMAINDER[queue.length] ?? shape
    }

    const cells = shape.spans
      .slice(0, queue.length)
      .map((span) => ({ item: queue.shift()!, span }))

    rows.push({ height: shape.height, cells })
  }

  return rows
}
