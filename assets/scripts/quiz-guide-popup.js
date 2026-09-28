(() => {
  const dialog = document.querySelector('[data-guide-popup]');
  if (!dialog) return;

  const formId = dialog.dataset.guidePopupForm;
  const closeButton = dialog.querySelector('[data-guide-popup-close]');
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.querySelector('[data-step="success"] .primary')?.focus();
  });

  document.addEventListener('nika:lead-sent', (event) => {
    if (event.detail?.confirmed !== true || event.detail?.formId !== formId) return;
    if (typeof dialog.showModal === 'function' && !dialog.open) dialog.showModal();
  });
})();
