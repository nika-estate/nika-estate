(function () {
  const copy = {
    eligibility: {
      third: { title: 'Ваш первый шаг — проверить исходные условия', text: 'Не нужно выбирать квартиру вслепую. Уточним гражданство, состав семьи и бюджет, затем покажем, какие новостройки имеет смысл смотреть.' },
      eu: { title: 'Начните с города и дома, а не со статуса', text: 'Для граждан ЕС инвестиционный маршрут обычно не должен быть первым фильтром. Сначала подберём сценарий жизни и объекты под него.' },
      unsure: { title: 'Сначала уточним гражданство', text: 'Этого достаточно, чтобы не прислать вам неподходящую схему. Затем разберём семью, бюджет и первые объекты.' }
    },
    city: {
      city: { title: 'Начните с Limassol', text: 'В подборке покажем районы, где деловой ритм, сервисы и городская жизнь не требуют долгих поездок.' },
      calm: { title: 'Начните с Paphos', text: 'В подборке покажем районы, где дом и повседневный ритм важнее плотной городской среды.' },
      balance: { title: 'Сравните два сценария', text: 'Не будем назначать победителя за вас. Покажем по одному разумному маршруту для Limassol и Paphos.' }
    },
    memo: {
      income: { title: 'Сначала проверим модель аренды', text: 'В мемо покажем, откуда берётся спрос, какие расходы уже известны и где расчёт зависит от допущений.' },
      capital: { title: 'Сначала разложим платёжный план', text: 'В мемо покажем сумму входа, этапы оплаты, срок готовности и факторы, от которых зависит выход из сделки.' },
      home: { title: 'Сначала разделим две задачи', text: 'В мемо сравним, что работает для собственного проживания и что может быть разумным для аренды — это не всегда один объект.' }
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

    function render() {
      if (!required.every((key) => values[key])) return;
      let message = copy[type];
      if (type === 'eligibility') {
        message = values.citizenship === 'ЕС / ЕЭЗ' ? copy.eligibility.eu : (values.citizenship === 'Нужно уточнить' ? copy.eligibility.unsure : copy.eligibility.third);
      }
      if (type === 'city') message = copy.city[values.rhythm] || copy.city.balance;
      if (type === 'memo') message = copy.memo[values.goal] || copy.memo.capital;
      title.textContent = message.title;
      text.textContent = message.text;
      result.hidden = false;
      if (form) {
        Object.entries(values).forEach(([key, value]) => {
          const input = form.querySelector(`[name="${key}"]`);
          if (input) input.value = value;
        });
        const goal = form.querySelector('[name="goal"]');
        if (goal && values.goal) goal.value = values.goal;
      }
    }

    flow.querySelectorAll('[data-flow-option]').forEach((button) => {
      button.addEventListener('click', () => {
        const key = button.dataset.flowKey;
        const value = button.dataset.flowValue;
        values[key] = value;
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
      if (status) status.textContent = 'Проверяем заявку и готовим сообщение для Nika Estate…';
    });
  });
}());
