// Orma shared motion script — the ONLY scroll-reveal mechanism on the site.
// Elements with [data-reveal] get [data-reveal-shown] when they enter the
// viewport; the actual animation lives in CSS (see global.css "Motion").
let observer

function watchReveals() {
  observer?.disconnect()

  const targets = document.querySelectorAll(
    "[data-reveal]:not([data-reveal-shown])",
  )

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targets.forEach((el) => el.setAttribute("data-reveal-shown", ""))
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-reveal-shown", "")
          observer.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
  )
  targets.forEach((el) => observer.observe(el))
}

// Fires on the first load and again after every page swap, so reveals keep
// working once the router is doing the navigating.
document.addEventListener("astro:page-load", watchReveals)
