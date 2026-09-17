// ORMA shared motion script — the ONLY scroll-reveal mechanism on the site.
// Elements with [data-reveal] get [data-reveal-shown] once they reach the
// trigger line; the actual animation lives in CSS (see global.css "Motion").
//
// The reveal starts elements at opacity 0, so a reveal that never runs costs a
// visitor the photographs entirely. That makes robustness the first
// requirement, and it rules out hanging the trigger on any single browser
// feature: an IntersectionObserver that stays quiet, or a viewer that never
// emits scroll events, must not be able to leave a page blank. So the check is
// plain geometry, driven by scroll for immediacy and by a slow poll for
// certainty, and it stops as soon as everything has been revealed.

/** Elements reveal once their top edge enters the lowest tenth of the screen. */
const TRIGGER = 0.9

/** How often the fallback looks, for the case where no scroll event arrives. */
const POLL_MS = 400

let timer
let ticking = false

function pending() {
  return document.querySelectorAll("[data-reveal]:not([data-reveal-shown])")
}

function show(elements) {
  for (const el of elements) el.setAttribute("data-reveal-shown", "")
}

/**
 * Last line of defence. A revealed element whose transition never actually ran
 * stays transparent, which on a portfolio means a blank screen where a
 * photograph should be. Anything still invisible long after its cue gives up
 * the animation and simply appears.
 */
function settleStragglers() {
  for (const el of document.querySelectorAll("[data-reveal-shown]")) {
    if (Number(getComputedStyle(el).opacity) < 1) el.style.transition = "none"
  }
}

function stop() {
  clearInterval(timer)
  timer = undefined
  window.removeEventListener("scroll", onScroll)
  window.removeEventListener("resize", onScroll)
}

function revealVisible() {
  const line = window.innerHeight * TRIGGER
  const waiting = pending()

  if (!waiting.length) {
    stop()
    return
  }

  let revealed = false

  for (const el of waiting) {
    const { top, bottom } = el.getBoundingClientRect()
    if (top < line && bottom > 0) {
      el.setAttribute("data-reveal-shown", "")
      revealed = true
    }
  }

  // Comfortably past the 700ms entrance, so a real one is never cut short.
  if (revealed) setTimeout(settleStragglers, 3000)
}

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    ticking = false
    revealVisible()
  })
}

function watchReveals() {
  try {
    stop()

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      show(pending())
      return
    }

    revealVisible()
    if (!pending().length) return

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    timer = setInterval(revealVisible, POLL_MS)
  } catch {
    // Never let a broken reveal hide the work.
    show(pending())
  }
}

// Fires on the first load and again after every page swap, so reveals keep
// working once the router is doing the navigating. The second call covers the
// case where the router never gets to announce the first page.
document.addEventListener("astro:page-load", watchReveals)

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", watchReveals, { once: true })
} else {
  watchReveals()
}
