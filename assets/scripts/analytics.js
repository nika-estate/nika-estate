(function (window, document) {
  if (window.NikaAnalytics) return;
  const counterId = 112565381;
  const metaPixelId = '1758103622093263';
  const trackedLeads = new Set();

  window.ym = window.ym || function () {
    (window.ym.a = window.ym.a || []).push(arguments);
  };
  window.ym.l = window.ym.l || Date.now();

  const tagUrl = `https://mc.yandex.ru/metrika/tag.js?id=${counterId}`;
  const alreadyLoaded = Array.from(document.scripts).some((script) => script.src === tagUrl);
  if (!alreadyLoaded) {
    const tag = document.createElement('script');
    const firstScript = document.getElementsByTagName('script')[0];
    tag.async = true;
    tag.src = tagUrl;
    firstScript.parentNode.insertBefore(tag, firstScript);
  }

  window.ym(counterId, 'init', {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: 'dataLayer',
    referrer: document.referrer,
    url: window.location.href,
    accurateTrackBounce: true,
    trackLinks: true
  });

  function reachGoal(goal, params) {
    window.ym(counterId, 'reachGoal', goal, params || {});
  }

  document.addEventListener('nika:lead-sent', (event) => {
    const detail = event.detail || {};
    // Only the lead endpoint's matching success acknowledgement can convert.
    if (detail.confirmed !== true || !detail.leadId) return;
    if (trackedLeads.has(detail.leadId)) return;
    trackedLeads.add(detail.leadId);

    const params = {
      form_type: detail.formType || '',
      form_id: detail.formId || '',
      landing: detail.landingName || document.title,
      offer: detail.offerName || ''
    };

    reachGoal('lead_sent', params);
    reachGoal(detail.formType === 'quiz' ? 'quiz_sent' : 'mini_form_sent', params);

    if (typeof window.fbq === 'function') {
      // Metadata only: never send names, phone numbers or form answers to Meta.
      window.fbq('track', 'Lead', params, { eventID: detail.leadId });
      window.fbq('trackCustom', detail.formType === 'quiz' ? 'QuizLead' : 'MiniFormLead',
        params, { eventID: detail.leadId + ':' + detail.formType });
    }
  });

  document.addEventListener('click', (event) => {
    const link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;

    let url;
    try {
      url = new URL(link.href, window.location.href);
    } catch (error) {
      return;
    }

    const host = url.hostname.toLowerCase();
    const isWhatsApp = host === 'wa.me' || host.endsWith('.whatsapp.com');
    const isTelegram = host === 't.me' || host.endsWith('.telegram.me');
    const isMax = host === 'max.ru' || host.endsWith('.max.ru');
    if (!isWhatsApp && !isTelegram && !isMax) return;

    reachGoal('messenger_click', {
      messenger: isWhatsApp ? 'whatsapp' : (isTelegram ? 'telegram' : 'max'),
      landing: document.title,
      link_url: `${url.origin}${url.pathname}`
    });
  }, true);

  window.NikaAnalytics = { counterId, metaPixelId, reachGoal };
}(window, document));
