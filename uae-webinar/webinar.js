(function () {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('[data-slide]'));
  const dots = Array.from(carousel.querySelectorAll('[data-dot]'));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let active = 0;
  let timer = null;

  function show(index) {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const current = slideIndex === active;
      slide.classList.toggle('is-active', current);
      slide.setAttribute('aria-hidden', current ? 'false' : 'true');
    });
    dots.forEach((dot, dotIndex) => {
      const current = dotIndex === active;
      dot.classList.toggle('is-active', current);
      if (current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  }

  function stop() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  function start() {
    if (reducedMotion || document.hidden) return;
    stop();
    timer = window.setInterval(() => show(active + 1), 5500);
  }

  carousel.querySelector('[data-prev]').addEventListener('click', () => { show(active - 1); start(); });
  carousel.querySelector('[data-next]').addEventListener('click', () => { show(active + 1); start(); });
  dots.forEach((dot) => dot.addEventListener('click', () => { show(Number(dot.dataset.dot)); start(); }));
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());

  show(0);
  start();
}());
