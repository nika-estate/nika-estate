const menu = document.querySelector('.menu');
const nav = document.querySelector('.site-nav');

if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelectorAll('.faq-button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const open = item.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
});

function checkedValue(form, name) {
  return form.querySelector(`[name="${name}"]:checked`)?.value || '';
}

function initPhoneMask(input) {
  if (!input.value.trim()) input.value = '+';

  input.addEventListener('focus', () => {
    if (!input.value.trim()) input.value = '+';
  });

  input.addEventListener('input', () => {
    const cleaned = input.value.replace(/[^0-9+ ()-]/g, '');
    input.value = `+${cleaned.replace(/\+/g, '')}`;
  });
}

document.querySelectorAll('[data-phone]').forEach(initPhoneMask);

function updateTelegramField(form) {
  const field = form.querySelector('[data-telegram-field]');
  const input = field?.querySelector('input');
  if (!field || !input) return;

  const needsTelegram = checkedValue(form, 'messenger') === 'Telegram';
  field.hidden = !needsTelegram;
  input.required = needsTelegram;
  if (!needsTelegram) input.setCustomValidity('');
}

document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('change', (event) => {
    if (event.target.name === 'messenger') updateTelegramField(form);
  });
  updateTelegramField(form);
});

const quiz = document.querySelector('[data-quiz-form]');

if (quiz) {
  const steps = [...quiz.querySelectorAll('[data-quiz-step]')];
  const counter = quiz.querySelector('[data-quiz-counter]');
  const progress = quiz.querySelector('[data-quiz-progress]');
  const bottomGoal = document.querySelector('[data-goal-select]');
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
    if (radios.length && !radios.some((input) => input.checked)) {
      const first = radios[0];
      first.setCustomValidity('Выберите один вариант');
      first.reportValidity();
      first.setCustomValidity('');
      return false;
    }
    return true;
  }

  quiz.querySelectorAll('[data-quiz-next]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!stepHasAnswer(steps[activeStep])) return;
      activeStep = Math.min(activeStep + 1, steps.length - 1);
      renderQuiz();
      quiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  quiz.querySelectorAll('[data-quiz-back]').forEach((button) => {
    button.addEventListener('click', () => {
      activeStep = Math.max(activeStep - 1, 0);
      renderQuiz();
    });
  });

  quiz.addEventListener('change', (event) => {
    if (event.target.matches('.quiz-option input')) {
      event.target.closest('.quiz-options').querySelectorAll('.quiz-option').forEach((option) => {
        option.classList.toggle('is-selected', option.querySelector('input').checked);
      });

      if (quiz.hasAttribute('data-quiz-auto-advance') && activeStep < steps.length - 1) {
        const currentStep = steps[activeStep];
        const nextButton = currentStep.querySelector('[data-quiz-next]');
        if (nextButton) nextButton.disabled = true;
        window.clearTimeout(autoAdvanceTimer);
        autoAdvanceTimer = window.setTimeout(() => {
          if (steps[activeStep] !== currentStep || !stepHasAnswer(currentStep)) return;
          activeStep += 1;
          renderQuiz();
          quiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 320);
      }
    }

    if (event.target.name === 'quiz_goal' && bottomGoal) {
      bottomGoal.value = event.target.value;
    }
  });

  renderQuiz();
}

const consultationForm = document.querySelector('.lead-form');

document.querySelectorAll('[data-project-link]').forEach((link) => {
  link.addEventListener('click', () => {
    if (!consultationForm) return;
    const project = link.dataset.projectLink;
    consultationForm.elements.project.value = project;
    const selected = consultationForm.querySelector('[data-selected-project]');
    selected.querySelector('strong').textContent = project;
    selected.hidden = false;
  });
});

const mobileCta = document.querySelector('.mobile-cta');

if (mobileCta && 'IntersectionObserver' in window) {
  const coveredSections = [...document.querySelectorAll('[data-quiz-form], [data-mobile-cta-cover], #request')];
  const visibleSections = new Set();
  const mobileCtaObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visibleSections.add(entry.target);
      else visibleSections.delete(entry.target);
    });
    mobileCta.classList.toggle('is-hidden', visibleSections.size > 0);
  }, { threshold: 0.05 });

  coveredSections.forEach((section) => mobileCtaObserver.observe(section));
}
