(function () {
  const copy = {
    eligibility: {
      third: { title: 'Подберём объекты под ПМЖ', text: 'Проверим первую продажу, цену от €300 000 без VAT и то, подходит ли объект под состав вашей семьи.' },
      eu: { title: 'Подберём жильё без маршрута ПМЖ', text: 'Для граждан ЕС/ЕЭЗ сначала смотрим объект и условия покупки. Пришлём три варианта под ваш бюджет.' },
      unsure: { title: 'Сначала уточним гражданство', text: 'Это один вопрос, который определяет, подбирать ли новостройку под ПМЖ или обычную покупку.' }
    },
    city: {
      budget: { title: 'Соберём три объекта с ценами', text: 'Покажем варианты под ваш бюджет: где находится объект, когда его сдадут, сколько стоит и как устроена оплата.' }
    },
    memo: {
      income: { title: 'Сравним сценарии аренды', text: 'На встрече разберём спрос, расходы и допущения — без обещания фиксированного процента.' },
      capital: { title: 'Разложим срок и выход из сделки', text: 'Сравним графики платежей, сроки сдачи и то, что может повлиять на стоимость объекта.' },
      home: { title: 'Сверим жизнь и экономику объекта', text: 'Посмотрим, можно ли совместить собственное проживание с арендным сценарием без самообмана.' }
    }
  };

  document.querySelectorAll('[data-cyprus-flow]').forEach((flow) => {
    const type = flow.dataset.cyprusFlow;
    const values = {};
    const result = flow.querySelector('[data-flow-result]');
    const title = flow.querySelector('[data-result-title]');
    const text = flow.querySelector('[data-result-text]');
    const cta = flow.querySelector('[data-result-cta]');
    const form = document.querySelector(flow.dataset.formTarget || '');
    const required = (flow.dataset.required || '').split(',').filter(Boolean);

    function messageFor() {
      if (type === 'eligibility') {
        if (values.citizenship === 'ЕС / ЕЭЗ') return copy.eligibility.eu;
        if (values.citizenship === 'Нужно уточнить') return copy.eligibility.unsure;
        return copy.eligibility.third;
      }
      if (type === 'city') return copy.city.budget;
      return copy.memo[values.goal] || copy.memo.capital;
    }

    function render() {
      if (!required.every((key) => values[key])) return;
      const message = messageFor();
      title.textContent = message.title;
      text.textContent = message.text;
      result.hidden = false;
      if (form) {
        Object.entries(values).forEach(([key, value]) => {
          const input = form.querySelector(`[name="${key}"]`);
          if (input) input.value = value;
        });
      }
    }

    flow.querySelectorAll('[data-flow-option]').forEach((button) => {
      button.addEventListener('click', () => {
        const key = button.dataset.flowKey;
        values[key] = button.dataset.flowValue;
        flow.querySelectorAll(`[data-flow-option][data-flow-key="${key}"]`).forEach((item) => {
          item.classList.toggle('is-selected', item === button);
          item.setAttribute('aria-pressed', String(item === button));
        });
        render();
      });
    });

    if (cta && form) cta.addEventListener('click', () => form.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  });

  document.querySelectorAll('.cyprus-form').forEach((form) => {
    form.addEventListener('submit', () => {
      const status = form.querySelector('[data-form-status]');
      if (status) status.textContent = 'Отправляем заявку в Nika Estate…';
    });
  });
}());
