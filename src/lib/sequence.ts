/**
 * The photographs after a project's opening image are shown a screenful at a
 * time: one, two or three of them, centred, each the height of a grid row.
 *
 * A shape lists each photograph's width as a share of that height, measured off
 * the Figma design. The rhythm repeats for as many photographs as a project has.
 */
const SHAPES: number[][] = [[1], [0.76, 0.76], [1.31], [0.56, 0.58, 0.58]]

/** Used when the photographs left over can't fill the next shape. */
const REMAINDER: Record<number, number[]> = {
  1: [1.31],
  2: [0.76, 0.76],
  3: [0.56, 0.58, 0.58],
}

export type Screen<T> = { item: T; ratio: number }[]

export function toScreens<T>(items: T[]): Screen<T>[] {
  const queue = [...items]
  const screens: Screen<T>[] = []
  let shapeIndex = 0

  while (queue.length > 0) {
    let shape = SHAPES[shapeIndex++ % SHAPES.length]

    if (shape.length > queue.length) {
      shape = REMAINDER[queue.length] ?? shape
    }

    screens.push(
      shape
        .slice(0, queue.length)
        .map((ratio) => ({ item: queue.shift()!, ratio })),
    )
  }

  return screens
}
