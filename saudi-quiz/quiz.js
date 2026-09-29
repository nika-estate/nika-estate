(() => {
  const form = document.getElementById('saudi-quiz-form');
  const steps = [...document.querySelectorAll('[data-step]')];
  const progressLabel = document.getElementById('progress-label');
  const progressNumber = document.getElementById('progress-number');
  const progressBar = document.getElementById('progress-bar');
  const stepCount = document.getElementById('step-count');
  const progress = {
    intro: ['Your guide starts here', 0, 'About 30 seconds'],
    purpose: ['Question 1 of 2', 32, 'Step 1 of 2'],
    purchase: ['Question 2 of 2', 65, 'Step 2 of 2'],
    human: ['One quick check', 90, 'Human check'],
    contact: ['Almost done', 95, 'Contact details'],
    success: ['Complete', 100, 'Thank you']
  };

  function show(name) {
    document.body.dataset.quizStep = name;
    form.dataset.quizFinished = name === 'contact' || name === 'success' ? 'true' : 'false';
    steps.forEach((step) => { step.hidden = step.dataset.step !== name; });
    const [label, percent, count] = progress[name];
    progressLabel.textContent = label;
    progressNumber.textContent = `${percent}%`;
    progressBar.style.width = `${percent}%`;
    stepCount.textContent = count;
    if (name !== 'intro') {
      const heading = document.querySelector(`[data-step="${name}"] legend, [data-step="${name}"] h2`);
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  document.body.dataset.quizStep = 'intro';
  document.querySelector('[data-start]').addEventListener('click', () => {
    window.NikaLeadCapture?.markQuizStarted(form);
    show('purpose');
  });
  document.querySelectorAll('[data-next]').forEach((button) => {
    button.addEventListener('click', () => {
      const fieldset = button.closest('fieldset');
      if (fieldset.dataset.step === 'human') {
        const answer = fieldset.querySelector('[name="human_check"]');
        if (answer.reportValidity()) show(button.dataset.next);
        return;
      }
      if (fieldset.querySelector('input[type="radio"]:checked')) show(button.dataset.next);
    });
  });
  document.querySelectorAll('[data-back]').forEach((button) => {
    button.addEventListener('click', () => show(button.dataset.back));
  });
  form.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.addEventListener('change', () => {
      const group = input.closest('fieldset[data-step]');
      if (group) {
        const next = group.querySelector('[data-next]');
        next.disabled = false;
        show(next.dataset.next);
      }
      const telegram = document.querySelector('[data-telegram-handle]');
      if (input.name === 'messenger') telegram.hidden = input.value !== 'Telegram';
    });
  });
  document.addEventListener('nika:lead-sent', (event) => {
    if (event.detail?.confirmed && event.detail?.formId === form.id) show('success');
  });
})();
