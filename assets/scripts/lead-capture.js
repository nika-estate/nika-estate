(function () {
  if (window.NikaLeadCapture) return;

  const sourceScript = document.currentScript;
  if (!sourceScript) return;

  const pageConfig = {
    endpoint: sourceScript.dataset.endpoint || '',
    landingName: sourceScript.dataset.landingName || document.title,
    offerName: sourceScript.dataset.offerName || ''
  };

  function text(value) {
    return value == null ? '' : String(value).trim();
  }

  function controlByName(form, name) {
    const escapedName = String(name).replace(/["\\]/g, '\\$&');
    return form.querySelector(`[name="${escapedName}"]`);
  }

  function byNames(form, names) {
    for (const name of names) {
      const element = form.elements.namedItem(name);
      const value = element && 'value' in element ? text(element.value) : '';
      if (value) return value;
    }
    return '';
  }

  function formDataObject(form) {
    const result = {};
    new FormData(form).forEach((value, key) => {
      if (value instanceof File) return;
      if (Object.prototype.hasOwnProperty.call(result, key)) {
        result[key] = Array.isArray(result[key]) ? result[key] : [result[key]];
        result[key].push(value);
      } else {
        result[key] = value;
      }
    });
    return result;
  }

  function labelFor(form, name) {
    const control = controlByName(form, name);
    if (!control) return name;
    const label = control.labels && control.labels[0]
      ? control.labels[0]
      : control.closest('label');
    return text(label && label.textContent) || name;
  }

  function answerList(form, fields) {
    const skipped = new Set([
      'name', 'first_name', 'firstname', 'last_name', 'phone', 'contact',
      'tel', 'telephone', 'email', 'e_mail', 'telegram', 'tg', 'whatsapp',
      'messenger', 'preferred_contact', 'contact_method', 'privacy_consent',
      'consent', 'project', 'offer_name'
    ]);

    return Object.keys(fields)
      .filter((key) => !skipped.has(key))
      .map((key) => ({
        field: key,
        question: labelFor(form, key),
        answer: fields[key]
      }));
  }

  function getUtm() {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
      utm_term: params.get('utm_term') || ''
    };
  }

  function createLeadId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return window.crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function buildPayload(form) {
    const fields = formDataObject(form);
    const fullName = byNames(form, ['name', 'first_name', 'firstname']);
    const nameParts = fullName.split(/\s+/).filter(Boolean);
    const isQuiz = form.matches('[data-quiz-form], .quiz-form')
      || Boolean(form.querySelector('[data-quiz-next]'));
    const preferredContact = byNames(form, ['messenger', 'preferred_contact', 'contact_method']);
    const offerName = text(form.dataset.offerName || fields.offer_name || pageConfig.offerName);
    const generalContact = byNames(form, ['contact']);
    const explicitPhone = byNames(form, ['phone', 'tel', 'telephone']);
    const explicitTelegram = byNames(form, ['telegram', 'tg']);
    const phone = explicitPhone || (generalContact.startsWith('@') ? '' : generalContact);
    const telegram = explicitTelegram || (generalContact.startsWith('@') ? generalContact : '');
    const utm = getUtm();

    return {
      lead_id: createLeadId(),
      received_at: new Date().toISOString(),
      time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Moscow',
      form_type: isQuiz ? 'Квиз' : 'Мини-лид-форма',
      landing_name: text(form.dataset.landingName || pageConfig.landingName),
      offer_name: offerName,
      landing_url: window.location.origin + window.location.pathname,
      page_url: window.location.href,
      referrer: document.referrer || '',
      channel: utm.utm_source || 'direct',
      form_id: form.id || form.dataset.formId || '',
      form_name: text(form.getAttribute('aria-label') || form.dataset.formName || form.className),
      first_name: nameParts.shift() || '',
      last_name: nameParts.join(' '),
      phone,
      email: byNames(form, ['email', 'e_mail']),
      telegram,
      whatsapp: byNames(form, ['whatsapp']),
      city_country: byNames(form, ['city_country', 'city', 'country']),
      preferred_contact: preferredContact,
      privacy_consent: form.querySelector('[name="privacy_consent"], [name="consent"]')
        ? byNames(form, ['privacy_consent', 'consent'])
        : 'Да',
      answers: answerList(form, fields),
      tags: [
        text(form.dataset.landingName || pageConfig.landingName),
        offerName,
        isQuiz ? 'Квиз' : 'Мини-форма'
      ].filter(Boolean),
      dedupe_key: [phone || telegram || byNames(form, ['email']), window.location.pathname, offerName]
        .filter(Boolean)
        .join('|'),
      ...utm
    };
  }

  function send(form) {
    if (!pageConfig.endpoint || !form.checkValidity()) return Promise.resolve(false);

    const payload = buildPayload(form);
    return fetch(pageConfig.endpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify(payload),
      keepalive: true
    }).then(() => {
      document.dispatchEvent(new CustomEvent('nika:lead-sent', {
        detail: {
          formType: payload.form_type === 'Квиз' ? 'quiz' : 'mini_form',
          formId: payload.form_id,
          landingName: payload.landing_name,
          offerName: payload.offer_name
        }
      }));
      return true;
    }).catch(() => false);
  }

  function init(root) {
    (root || document).querySelectorAll('form').forEach((form) => {
      if (form.dataset.nikaLeadBound === 'true') return;
      if (!form.querySelector('[name="phone"], [name="contact"], [name="email"]')) return;
      form.dataset.nikaLeadBound = 'true';
      form.addEventListener('submit', () => send(form), true);
    });
  }

  window.NikaLeadCapture = { init, send, buildPayload };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init(document));
  } else {
    init(document);
  }
}());
