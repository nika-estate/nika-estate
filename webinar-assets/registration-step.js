(function () {
  document.addEventListener('nika:lead-sent', function (event) {
    if (!event.detail || event.detail.confirmed !== true || event.detail.formId !== 'webinar-registration') return;
    var formStep = document.querySelector('[data-registration-form]');
    var botStep = document.querySelector('[data-registration-success]');
    if (!formStep || !botStep) return;
    formStep.hidden = true;
    botStep.hidden = false;
    botStep.scrollIntoView({ block: 'nearest' });
  });
}());
