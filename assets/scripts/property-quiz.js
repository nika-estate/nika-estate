(() => {
  const form = document.querySelector('[data-property-quiz]');
  const hasBudgetStep = Boolean(form.querySelector('[data-step="budget"]'));
  const turkish = form.dataset.language === 'tr';
  const steps = [...document.querySelectorAll('[data-step]')];
  const progressLabel = document.getElementById('progress-label');
  const progressNumber = document.getElementById('progress-number');
  const progressBar = document.getElementById('progress-bar');
  const stepCount = document.getElementById('step-count');
  const progress = {
    intro: ['Your guide starts here', 0, hasBudgetStep ? 'About 45 seconds' : 'About 30 seconds'],
    purpose: [hasBudgetStep ? 'Question 1 of 3' : 'Question 1 of 2', 30, hasBudgetStep ? 'Step 1 of 3' : 'Step 1 of 2'],
    purchase: [hasBudgetStep ? 'Question 2 of 3' : 'Question 2 of 2', 60, hasBudgetStep ? 'Step 2 of 3' : 'Step 2 of 2'],
    budget: ['Question 3 of 3', 80, 'Step 3 of 3'],
    contact: ['Almost done', 95, 'Contact details'],
    success: ['Complete', 100, 'Thank you']
  };
  if (turkish) {
    Object.assign(progress, {
      intro: ['Rehberiniz burada başlıyor', 0, 'Yaklaşık 45 saniye'],
      purpose: ['3 sorudan 1.si', 30, '1 / 3'],
      purchase: ['3 sorudan 2.si', 60, '2 / 3'],
      budget: ['3 sorudan 3.sü', 80, '3 / 3'],
      contact: ['Neredeyse tamam', 95, 'İletişim bilgileri'],
      success: ['Tamamlandı', 100, 'Teşekkürler']
    });
  }

  function show(name) {
    document.body.dataset.quizStep = name;
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
  document.querySelector('[data-start]').addEventListener('click', () => show('purpose'));
  document.querySelectorAll('[data-next]').forEach((button) => {
    button.addEventListener('click', () => {
      const fieldset = button.closest('fieldset');
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
