(function () {
  const amenityToggle = document.querySelector('[data-amenities-toggle]');
  if (amenityToggle) {
    amenityToggle.addEventListener('click', () => {
      const expanded = amenityToggle.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.amenity-extra').forEach((item) => {
        item.hidden = expanded;
      });
      amenityToggle.setAttribute('aria-expanded', String(!expanded));
      amenityToggle.firstChild.textContent = expanded ? 'Показать все зоны ' : 'Свернуть список ';
    });
  }

  const filterButtons = [...document.querySelectorAll('[data-layout-filter]')];
  const layoutCards = [...document.querySelectorAll('[data-layout]')];
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.layoutFilter;
      filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      layoutCards.forEach((card) => {
        card.hidden = filter !== 'all' && card.dataset.layout !== filter;
      });
    });
  });

  document.querySelectorAll('[data-card-gallery]').forEach((gallery) => {
    const images = [...gallery.querySelectorAll('img')];
    let index = 0;
    const show = (nextIndex) => {
      index = (nextIndex + images.length) % images.length;
      images.forEach((image, imageIndex) => image.classList.toggle('is-active', imageIndex === index));
    };
    gallery.querySelector('[data-card-prev]')?.addEventListener('click', () => show(index - 1));
    gallery.querySelector('[data-card-next]')?.addEventListener('click', () => show(index + 1));
  });

  const formatAed = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 });
  const formatUsd = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 });
  const usd = (value) => value / 3.6725;
  const amountText = (value) => `AED ${formatAed.format(value)} · ≈ $${formatUsd.format(usd(value))}`;

  const paymentUnitButtons = [...document.querySelectorAll('[data-payment-unit]')];
  const paymentRates = {
    bookingPlusDld: 0.24,
    construction50: 0.3,
    handover50: 0.5,
    construction60: 0.4,
    post60: 0.4
  };
  const updatePaymentPlans = () => {
    const activeUnit = paymentUnitButtons.find((button) => button.classList.contains('is-active'));
    if (!activeUnit) return;
    const price = Number(activeUnit.dataset.paymentUnit);
    document.querySelectorAll('[data-payment-amount]').forEach((node) => {
      node.textContent = amountText(price * paymentRates[node.dataset.paymentAmount]);
    });
  };
  paymentUnitButtons.forEach((button) => {
    button.addEventListener('click', () => {
      paymentUnitButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle('is-active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      updatePaymentPlans();
    });
  });
  updatePaymentPlans();

  const calcUnitButtons = [...document.querySelectorAll('[data-calc-unit]')];
  const calcPlanButtons = [...document.querySelectorAll('[data-calc-plan]')];
  const yieldInput = document.querySelector('[data-calc-yield]');
  const growthInput = document.querySelector('[data-calc-growth]');
  const yearsInput = document.querySelector('[data-calc-years]');
  const setText = (selector, value) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = value;
  };
  const yearsText = (value) => {
    const last = value % 10;
    const lastTwo = value % 100;
    if (last === 1 && lastTwo !== 11) return `${value} год`;
    if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return `${value} года`;
    return `${value} лет`;
  };
  function updateCalculator() {
    const activeUnit = calcUnitButtons.find((button) => button.classList.contains('is-active'));
    const activePlan = calcPlanButtons.find((button) => button.classList.contains('is-active'));
    if (!activeUnit || !activePlan || !yieldInput || !growthInput || !yearsInput) return;
    const price = Number(activeUnit.dataset.calcUnit);
    const rate = Number(yieldInput.value) / 100;
    const growth = Number(growthInput.value) / 100;
    const years = Number(yearsInput.value);
    const booking = price * 0.24;
    const beforeHandover = price * Number(activePlan.dataset.beforeHandover);
    const annual = price * rate;
    const monthly = annual / 12;
    const resale = price * Math.pow(1 + growth, years);
    const profit = resale - price;
    const total = profit + annual * years;
    const roi = (total / (price * 1.04)) * 100;

    setText('[data-calc-yield-output]', `${String(Number(yieldInput.value)).replace('.', ',')}% в год`);
    setText('[data-calc-growth-output]', `${String(Number(growthInput.value)).replace('.', ',')}% в год`);
    setText('[data-calc-years-output]', yearsText(years));
    setText('[data-calc-years-label]', yearsText(years));
    setText('[data-calc-plan-label]', activePlan.dataset.calcPlan === '50' ? '50/50' : '60/40');
    setText('[data-calc-booking]', `AED ${formatAed.format(booking)}`);
    setText('[data-calc-booking-usd]', `≈ $${formatUsd.format(usd(booking))}`);
    setText('[data-calc-handover]', `AED ${formatAed.format(beforeHandover)}`);
    setText('[data-calc-handover-usd]', `≈ $${formatUsd.format(usd(beforeHandover))}`);
    setText('[data-calc-annual]', `AED ${formatAed.format(annual)}`);
    setText('[data-calc-annual-usd]', `≈ $${formatUsd.format(usd(annual))}`);
    setText('[data-calc-monthly]', `AED ${formatAed.format(monthly)}`);
    setText('[data-calc-monthly-usd]', `≈ $${formatUsd.format(usd(monthly))}`);
    setText('[data-calc-payback]', `${String((1 / rate).toFixed(1)).replace('.', ',')} года`);
    setText('[data-calc-resale]', `AED ${formatAed.format(resale)}`);
    setText('[data-calc-resale-usd]', `≈ $${formatUsd.format(usd(resale))}`);
    setText('[data-calc-profit]', `AED ${formatAed.format(profit)}`);
    setText('[data-calc-profit-usd]', `≈ $${formatUsd.format(usd(profit))}`);
    setText('[data-calc-total]', `AED ${formatAed.format(total)}`);
    setText('[data-calc-total-usd]', `≈ $${formatUsd.format(usd(total))}`);
    setText('[data-calc-roi]', `${String(roi.toFixed(1)).replace('.', ',')}%`);
  }
  calcUnitButtons.forEach((button) => {
    button.addEventListener('click', () => {
      calcUnitButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      updateCalculator();
    });
  });
  calcPlanButtons.forEach((button) => {
    button.addEventListener('click', () => {
      calcPlanButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      updateCalculator();
    });
  });
  [yieldInput, growthInput, yearsInput].forEach((input) => input?.addEventListener('input', updateCalculator));
  updateCalculator();

  const galleryThumbs = [...document.querySelectorAll('[data-gallery-thumb]')];
  const galleryStage = document.querySelector('[data-gallery-stage]');
  const galleryCaption = document.querySelector('[data-gallery-caption]');
  let galleryIndex = 0;
  const showGalleryImage = (nextIndex) => {
    if (!galleryStage || !galleryThumbs.length) return;
    galleryIndex = (nextIndex + galleryThumbs.length) % galleryThumbs.length;
    const thumb = galleryThumbs[galleryIndex];
    galleryStage.src = thumb.dataset.src;
    galleryStage.alt = thumb.dataset.alt;
    galleryCaption.textContent = thumb.dataset.caption;
    galleryThumbs.forEach((item, index) => item.classList.toggle('is-active', index === galleryIndex));
    thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };
  galleryThumbs.forEach((thumb, index) => thumb.addEventListener('click', () => showGalleryImage(index)));
  document.querySelector('[data-gallery-prev]')?.addEventListener('click', () => showGalleryImage(galleryIndex - 1));
  document.querySelector('[data-gallery-next]')?.addEventListener('click', () => showGalleryImage(galleryIndex + 1));

  const modal = document.querySelector('[data-layout-modal]');
  let modalTrigger = null;
  const closeModal = () => {
    if (!modal) return;
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    modalTrigger?.focus();
  };
  document.querySelectorAll('[data-layout-open]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!modal) return;
      const card = button.closest('[data-layout]');
      modalTrigger = button;
      modal.querySelector('[data-modal-title]').textContent = card.dataset.title;
      modal.querySelector('[data-modal-price]').textContent = card.dataset.price;
      modal.querySelector('[data-modal-area]').textContent = card.dataset.area;
      modal.querySelector('[data-modal-booking]').textContent = card.dataset.booking;
      modal.querySelector('[data-modal-dld]').textContent = card.dataset.dld;
      modal.querySelector('[data-modal-yield]').textContent = card.dataset.yield;
      const activeImage = card.querySelector('.layout-gallery img.is-active') || card.querySelector('.layout-gallery img');
      modal.querySelector('[data-modal-image]').src = activeImage.src;
      modal.querySelector('[data-modal-image]').alt = activeImage.alt;
      modal.hidden = false;
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      modal.querySelector('.layout-modal-close')?.focus();
    });
  });
  modal?.querySelectorAll('[data-layout-close]').forEach((button) => button.addEventListener('click', closeModal));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && !modal.hidden) closeModal();
  });

  const stickyCta = document.querySelector('.mobile-cta');
  if (stickyCta) {
    const updateStickyCta = () => stickyCta.classList.toggle('not-past-hero', window.scrollY < 680);
    window.addEventListener('scroll', updateStickyCta, { passive: true });
    updateStickyCta();

    const calculator = document.querySelector('.archive-calculator');
    if (calculator && 'IntersectionObserver' in window) {
      const interactiveObserver = new IntersectionObserver((entries) => {
        stickyCta.classList.toggle('on-interactive-section', entries.some((entry) => entry.isIntersecting));
      }, { threshold: 0.05 });
      interactiveObserver.observe(calculator);
    }
  }
}());
