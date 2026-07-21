// Orma shared motion script — the ONLY scroll-reveal mechanism on the site.
// Elements with [data-reveal] get [data-reveal-shown] when they enter the
// viewport; the actual animation lives in CSS (see global.css "Motion").
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const targets = document.querySelectorAll('[data-reveal]');

if (reduced) {
  targets.forEach((el) => el.setAttribute('data-reveal-shown', ''));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-reveal-shown', '');
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
  );
  targets.forEach((el) => io.observe(el));
}
