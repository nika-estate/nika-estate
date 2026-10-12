(() => {
  const form = document.querySelector('[data-property-quiz]');
  if (!form) return;
  const russian = form.dataset.language === 'ru';
  const steps = [...document.querySelectorAll('[data-step]')];
  const names = ['purpose', 'budget', 'timing'];
  const captions = russian
    ? { intro: 'Консультация начинается здесь', human: 'Небольшая проверка', contact: 'Почти готово', success: 'Готово' }
    : { intro: 'Your consultation starts here', human: 'One quick check', contact: 'Almost done', success: 'Complete' };
  const progress = { intro: 0, purpose: 25, budget: 50, timing: 75, human: 90, contact: 95, success: 100 };
  const label = document.getElementById('progress-label');
  const number = document.getElementById('progress-number');
  const bar = document.getElementById('progress-bar');
  const count = document.getElementById('step-count');

  function show(name) {
    document.body.dataset.quizStep = name;
    form.dataset.quizFinished = name === 'contact' || name === 'success' ? 'true' : 'false';
    steps.forEach(step => { step.hidden = step.dataset.step !== name; });
    const index = names.indexOf(name);
    label.textContent = index < 0 ? captions[name] : russian ? `Вопрос ${index + 1} из 3` : `Question ${index + 1} of 3`;
    number.textContent = `${progress[name]}%`;
    bar.style.width = `${progress[name]}%`;
    count.textContent = index < 0 ? (russian ? 'Около 1 минуты' : 'About 1 minute') : `${index + 1} / 3`;
    if (name !== 'intro') {
      const heading = document.querySelector(`[data-step="${name}"] legend, [data-step="${name}"] h2`);
      if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  document.querySelector('[data-start]').addEventListener('click', () => {
    window.NikaLeadCapture?.markQuizStarted(form);
    show('purpose');
  });
  document.querySelectorAll('[data-back]').forEach(button => {
    button.addEventListener('click', () => show(button.dataset.back));
  });
  document.querySelectorAll('[data-next]').forEach(button => {
    button.addEventListener('click', () => {
      const step = button.closest('fieldset');
      if (step.dataset.step === 'human') {
        if (step.querySelector('[name="human_check"]').reportValidity()) show('contact');
      } else if (step.querySelector('input:checked')) show(button.dataset.next);
    });
  });
  form.querySelectorAll('[data-step="purpose"] input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', () => {
      form.querySelector('[data-step="purpose"] [data-next]').disabled = !form.querySelector('[data-step="purpose"] input:checked');
    });
  });
  form.querySelectorAll('fieldset[data-step] input[type="radio"]').forEach(input => {
    const advance = () => {
      const step = input.closest('fieldset[data-step]');
      if (document.body.dataset.quizStep !== step.dataset.step || !input.checked) return;
      step.querySelector('[data-next]').disabled = false;
      show(step.querySelector('[data-next]').dataset.next);
    };
    input.addEventListener('click', advance);
    input.addEventListener('change', advance);
  });
  form.querySelectorAll('[name="messenger"]').forEach(input => {
    input.addEventListener('change', () => {
      form.querySelector('[data-telegram-handle]').hidden = input.value !== 'Telegram';
    });
  });
  document.addEventListener('nika:lead-sent', event => {
    if (event.detail?.confirmed && event.detail?.formId === form.id) show('success');
  });
  document.addEventListener('nika:lead-duplicate', event => {
    if (event.detail?.formId === form.id) show('success');
  });
  show('intro');
})();
