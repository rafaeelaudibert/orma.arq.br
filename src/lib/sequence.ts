import type { ImageMetadata } from "astro"

/**
 * The photographs after a project's opening image are shown a screenful at a
 * time: one or two of them, centred, never taller than a grid row.
 *
 * Every photograph keeps its own proportions and is never cropped, so the
 * screens are built from the shapes she actually shot rather than from fixed
 * boxes: a wide photograph holds a screen on its own, uprights pair up.
 */

/** At or above this, a photograph is wide enough to fill a screen alone. */
const WIDE = 1.2

/** Width of a photograph as a share of its own height. */
const ratioOf = (image: ImageMetadata) => image.width / image.height

export type Screen<T> = {
  photos: { item: T; ratio: number }[]
  /** Total width of the row, as a share of its height. */
  sum: number
}

export function toScreens<T extends { src: ImageMetadata }>(
  items: T[],
): Screen<T>[] {
  const queue = items.map((item) => ({ item, ratio: ratioOf(item.src) }))
  const screens: Screen<T>[] = []

  while (queue.length > 0) {
    const photos = [queue.shift()!]

    // An upright takes a companion, if the next one is an upright too.
    if (photos[0].ratio < WIDE && queue[0] && queue[0].ratio < WIDE) {
      photos.push(queue.shift()!)
    }

    screens.push({
      photos,
      sum: photos.reduce((total, { ratio }) => total + ratio, 0),
    })
  }

  return screens
}
