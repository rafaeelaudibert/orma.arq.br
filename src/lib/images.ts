import type { ImageMetadata } from "astro"

/**
 * Working out the `sizes` attribute for photographs cropped with
 * `object-fit: cover`.
 *
 * The browser picks a file from the box's *width*, but a cover crop scales the
 * photo until it covers both sides. In a box taller than the photo's own
 * proportions the photo is painted much wider than the box, so the file the
 * browser picked gets stretched and goes soft. These helpers ask for the width
 * the photo is really painted at: `max(box width, box height x its ratio)`.
 *
 * The measurements below mirror the layout in `global.css`; `sizes` cannot read
 * custom properties, so they are rounded generously on purpose. Asking for a
 * slightly larger file costs bandwidth, asking for a smaller one costs sharpness.
 */

/** Content column, i.e. the viewport minus the left rail and the right margin. */
const COLUMN = "83.75vw"
/** A grid row: the screen minus the menu band and the bottom margin. */
const ROW = "85vh"
/** The same row on the phone, where the header sits in the page instead. */
const ROW_PHONE = "82vh"
/** Every other tile on the phone, which is a 4:3 box the width of the screen. */
const TILE_PHONE = "75vw"

const covered = (image: ImageMetadata, width: string, height: string) =>
  `max(${width}, calc(${height} * ${(image.width / image.height).toFixed(3)}))`

/** A tile in the portfolio grid, spanning `span` of the 12 columns. */
export function tileSizes(image: ImageMetadata, span: number, lead: boolean) {
  const desktop = covered(image, `calc(${COLUMN} * ${span} / 12)`, ROW)
  const phone = covered(image, "100vw", lead ? ROW_PHONE : TILE_PHONE)
  return `(min-width: 60rem) ${desktop}, ${phone}`
}

/**
 * The photograph a project or studio page opens with: one row, full column.
 * `zoom` is the largest scale a slow zoom on it reaches, so we ask for a file
 * big enough for the end of the movement rather than the start.
 */
export function openingSizes(image: ImageMetadata, zoom = 1) {
  const grow = (size: string) => (zoom === 1 ? size : `calc(${size} * ${zoom})`)
  const desktop = covered(image, grow(COLUMN), grow(ROW))
  const phone = covered(image, grow("100vw"), grow(ROW_PHONE))
  return `(min-width: 60rem) ${desktop}, ${phone}`
}

/** Widths offered for every photograph on the site. */
export const PHOTO_WIDTHS = [640, 960, 1280, 1600, 2000, 2400]
