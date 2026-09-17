const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.site-nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const slides = [...document.querySelectorAll('.hero-image')];
const currentSlide = document.querySelector('.current-slide');
let activeSlide = 0;

function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === activeSlide));
  currentSlide.textContent = String(activeSlide + 1).padStart(2, '0');
}

document.querySelector('.gallery-prev')?.addEventListener('click', () => showSlide(activeSlide - 1));
document.querySelector('.gallery-next')?.addEventListener('click', () => showSlide(activeSlide + 1));

document.querySelectorAll('.residence-toggle').forEach((button) => button.addEventListener('click', () => {
  const card = button.closest('.residence-card');
  const wasOpen = card.classList.contains('open');
  document.querySelectorAll('.residence-card').forEach((item) => {
    item.classList.remove('open');
    item.querySelector('.residence-toggle').setAttribute('aria-expanded', 'false');
  });
  if (!wasOpen) {
    card.classList.add('open');
    button.setAttribute('aria-expanded', 'true');
  }
}));

const requestForm = document.querySelector('.request-form');

function checkedValue(form, name) {
  return form.querySelector(`[name="${name}"]:checked`)?.value || '';
}

function updateTelegramField(form) {
  const telegramField = form?.querySelector('[data-telegram-field]');
  const telegramInput = telegramField?.querySelector('input');
  if (!telegramField || !telegramInput) return;
  const needsTelegram = checkedValue(form, 'messenger') === 'Telegram';
  telegramField.hidden = !needsTelegram;
  telegramInput.required = needsTelegram;
}

document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('change', (event) => {
    if (event.target.name === 'messenger') updateTelegramField(form);
  });
  updateTelegramField(form);
});

document.querySelectorAll('[data-project-link]').forEach((link) => {
  link.addEventListener('click', () => {
    if (requestForm?.elements.project) requestForm.elements.project.value = link.dataset.projectLink;
  });
});

const quiz = document.querySelector('[data-quiz-form]');

if (quiz) {
  const steps = [...quiz.querySelectorAll('[data-quiz-step]')];
  const counter = quiz.querySelector('[data-quiz-counter]');
  const progress = quiz.querySelector('[data-quiz-progress]');
  let activeStep = 0;
  let autoAdvanceTimer;

  function renderQuiz() {
    steps.forEach((step, index) => {
      step.hidden = index !== activeStep;
      const nextButton = step.querySelector('[data-quiz-next]');
      if (nextButton) nextButton.disabled = false;
    });
    counter.textContent = `${activeStep + 1} из ${steps.length}`;
    progress.style.width = `${((activeStep + 1) / steps.length) * 100}%`;
  }

  function stepHasAnswer(step) {
    const radios = [...step.querySelectorAll('input[type="radio"][required]')];
    if (!radios.length || radios.some((input) => input.checked)) return true;
    radios[0].setCustomValidity('Выберите один вариант');
    radios[0].reportValidity();
    radios[0].setCustomValidity('');
    return false;
  }

  quiz.querySelectorAll('[data-quiz-next]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!stepHasAnswer(steps[activeStep])) return;
      activeStep = Math.min(activeStep + 1, steps.length - 1);
      renderQuiz();
    });
  });

  quiz.querySelectorAll('[data-quiz-back]').forEach((button) => {
    button.addEventListener('click', () => {
      activeStep = Math.max(activeStep - 1, 0);
      renderQuiz();
    });
  });

  quiz.addEventListener('change', (event) => {
    if (!event.target.matches('.quiz-option input')) return;
    event.target.closest('.quiz-options').querySelectorAll('.quiz-option').forEach((option) => {
      option.classList.toggle('is-selected', option.querySelector('input').checked);
    });
    if (!quiz.hasAttribute('data-quiz-auto-advance') || activeStep >= steps.length - 1) return;
    const currentStep = steps[activeStep];
    const nextButton = currentStep.querySelector('[data-quiz-next]');
    if (nextButton) nextButton.disabled = true;
    window.clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = window.setTimeout(() => {
      if (steps[activeStep] !== currentStep || !stepHasAnswer(currentStep)) return;
      activeStep += 1;
      renderQuiz();
    }, 320);
  });

  renderQuiz();
}
