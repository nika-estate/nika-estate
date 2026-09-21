(function (window, document) {
  'use strict';

  if (window.NikaValueGallery) return;
  window.NikaValueGallery = true;

  const marker = '/nika-estate/';
  const pathname = window.location.pathname;
  const markerIndex = pathname.indexOf(marker);
  const root = markerIndex >= 0 ? pathname.slice(0, markerIndex) + marker : '/';
  const relativePath = markerIndex >= 0
    ? pathname.slice(markerIndex + marker.length)
    : pathname.replace(/^\/+/, '');
  const normalizedPath = relativePath.replace(/\/+$/, '');
  const isEnglish = normalizedPath === 'valia/en';
  const isQuiz = /^quiz\//.test(normalizedPath);
  const pageKey = normalizedPath.replace(/^quiz\//, '');
  const image = (name) => root + 'assets/images/' + name;
  const valiaImage = (name) => root + 'valia/assets/' + name;

  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = root + 'assets/styles/value-gallery.css?v=20260921-1';
  css.dataset.nikaValueGallery = 'style';
  document.head.appendChild(css);

  const sharedDubaiGallery = [
    [image('central-park-terrace.jpg'), 'Central Park at City Walk'],
    [image('portfolio/havencia-ala.jpg'), 'Havencia by ALA'],
    [image('portfolio/jadeel-living.jpg'), 'Jadeel at Madinat Jumeirah Living'],
    [image('the-archive/official-interior-03.webp'), 'The Archive by Imtiaz']
  ];

  const cityWalkGallery = [
    [image('central-park-terrace.jpg'), 'Террасы с видом на парк'],
    [image('central-park-pool.jpg'), 'Бассейны среди зелени'],
    [image('central-park-garden.jpg'), 'Прогулочные маршруты'],
    [image('central-park-arrival.jpg'), 'Архитектура резиденций']
  ];

  const configs = {
    '': {
      title: 'Ориентиры по покупке в City Walk',
      intro: 'Собрали в одном месте бюджет входа, рыночный ориентир доходности и детали, которые важно проверить до сделки.',
      metrics: [
        ['Стоимость', 'от AED 2,1 млн · ≈ $572 тыс.', 'ориентир для готового Thyme'],
        ['Первый взнос', 'от 10%*', 'точная сумма зависит от условий продавца'],
        ['Доходность', '≈ 5,37% gross*', 'ориентир готового жилья в City Walk']
      ],
      benefits: ['Готовые квартиры и новые проекты в одном сравнении', 'Полный бюджет сделки с комиссиями и сборами', 'Парк, City Walk и центральные районы рядом'],
      gallery: cityWalkGallery,
      source: ['Рыночный ориентир доходности: DataDubai, зарегистрированные сделки и аренда по City Walk.', 'https://datadubai.ae/communities/city-walk/']
    },
    'cyprus/city-match': {
      title: 'Ориентиры по недвижимости на Кипре',
      intro: 'Сравниваем не только города, но и реальный бюджет входа, график платежей и сценарий аренды конкретного объекта.',
      metrics: [
        ['Стоимость', 'от €220 000 + VAT', 'стартовый ориентир открытого рынка'],
        ['Первый взнос', 'по графику проекта', 'фиксируем только после проверки предложения'],
        ['Доходность', '≈ 4,66–5,32% gross*', 'ориентир квартир Пафоса и Лимасола']
      ],
      benefits: ['Подбор города под жизнь, ВНЖ или аренду', 'Проверка VAT, сборов и полного бюджета', 'Прогноз аренды по конкретной планировке'],
      gallery: [
        [image('cyprus/city-match-hero.jpg'), 'Города и районы Кипра'],
        [image('cyprus/eligibility-hero.jpg'), 'Жильё для жизни и инвестиций'],
        [image('cyprus/investment-memo-hero.jpg'), 'Средиземноморские резиденции'],
        [image('portfolio/nika-team.jpg'), 'Сопровождение Nika Estate']
      ],
      source: ['Ориентир доходности: RICS/KPMG Cyprus Property Index, Q4 2025; доходность зависит от города и объекта.', 'https://cedevproperty.com/en/blog/cyprus-rental-yield-2026']
    },
    'cyprus/eligibility': null,
    'dubai': {
      title: 'Цифры, с которых начинается подбор',
      intro: 'Показываем не только красивые проекты: сразу считаем цену, реальный бюджет первого платежа и прогноз аренды после расходов.',
      metrics: [
        ['Стоимость', 'от AED 649 тыс. · ≈ $177 тыс.', 'доступный вход в новых проектах'],
        ['Первый взнос', 'от 20% + сборы', 'сумма зависит от проекта и лота'],
        ['Доходность', '≈ 5–6% gross*', 'рабочий сценарный ориентир по объектам']
      ],
      benefits: ['Сравнение готовых квартир и off-plan', 'План платежей и все расходы до бронирования', 'Расчёт аренды, простоя и управления'],
      gallery: sharedDubaiGallery,
      source: ['Диапазон доходности — сценарный ориентир, не гарантия. По каждому лоту делается отдельный расчёт.', 'https://datadubai.ae/communities/dubai-land-residence-complex/studio/']
    },
    'invest-meeting': {
      title: 'Что получаете после консультации',
      intro: 'Не общий список проектов, а понятную финансовую картину: сколько стоит вход, как идут платежи и что объект может приносить.',
      metrics: [
        ['Объекты', 'от AED 649 тыс. · ≈ $177 тыс.', 'подбираем под бюджет и цель'],
        ['Первый взнос', 'от 10–20% + сборы', 'по актуальному плану выбранного проекта'],
        ['Доходность', '≈ 5–6% gross*', 'сценарный ориентир до расходов']
      ],
      benefits: ['3–5 подходящих объектов вместо каталога', 'Сравнение готовых квартир и рассрочки', 'Прогноз аренды с учётом простоя и управления'],
      gallery: sharedDubaiGallery,
      source: ['Цифры приведены как ориентиры по текущим предложениям; точные условия подтверждаются перед бронированием.', 'https://datadubai.ae/communities/dubai-land-residence-complex/studio/']
    },
    'uae': {
      title: 'Ориентиры по бюджету и доходности',
      intro: 'Для каждого объекта показываем цену в дирхамах и долларах, первый платёж и прогноз аренды — до того, как вы принимаете решение.',
      metrics: [
        ['Стоимость', 'от AED 649 тыс. · ≈ $177 тыс.', 'студии в новых проектах'],
        ['Первый взнос', 'от 5–20%*', 'по условиям конкретного проекта'],
        ['Доходность', '≈ 4,5–8% gross*', 'диапазон сценариев, не гарантия']
      ],
      benefits: ['Дубай и Абу-Даби в одном сравнении', 'Цена, план платежей и полный бюджет входа', 'Доходность считаем после сервисных сборов и управления'],
      gallery: [
        [image('central-park-terrace.jpg'), 'Central Park at City Walk'],
        [image('portfolio/abu-saadiyat.jpg'), 'Saadiyat Island, Abu Dhabi'],
        [image('portfolio/havencia-ala.jpg'), 'Havencia by ALA'],
        [image('the-archive/official-interior-03.webp'), 'The Archive by Imtiaz']
      ],
      source: ['Диапазон зависит от локации, формата и стадии проекта. Для выбранной квартиры готовится отдельный расчёт.', 'https://datadubai.ae/communities/dubai-creek-harbour/']
    },
    'real-estate': {
      title: 'Ориентиры для сравнения рынков',
      intro: 'Цифры по ОАЭ публикуем сразу. По Саудовской Аравии цену и прогноз считаем только после получения свежего предложения от проекта.',
      metrics: [
        ['Стоимость в ОАЭ', 'от AED 649 тыс. · ≈ $177 тыс.', 'по текущим доступным проектам'],
        ['Первый взнос в ОАЭ', 'от 20% + сборы', 'условия зависят от проекта'],
        ['Доходность в ОАЭ', '≈ 5–6% gross*', 'сценарный ориентир по объектам']
      ],
      benefits: ['Сравнение Дубая, Абу-Даби и Эр-Рияда', 'Проверка права покупки и условий сделки', 'Отдельный прогноз по каждому рынку и лоту'],
      gallery: [
        [image('portfolio/havencia-ala.jpg'), 'Новые проекты Дубая'],
        [image('central-park-terrace.jpg'), 'City Walk, Dubai'],
        [image('portfolio/osus-eye.jpg'), 'Проекты OSUS, Riyadh'],
        [image('portfolio/abu-saadiyat.jpg'), 'Saadiyat Island, Abu Dhabi']
      ],
      source: ['Данные по Саудовской Аравии подтверждаются отдельно по свежему прайсу и официальным индексам REGA.', 'https://rei.rega.gov.sa/en/cities/Riyadh']
    },
    'saudi-arabia': {
      title: 'Проверяем цифры до презентации объекта',
      intro: 'По проектам OSUS не публикуем неподтверждённые обещания: сначала получаем свежий прайс, график платежей и данные для расчёта аренды.',
      metrics: [
        ['Стоимость', 'по свежему прайсу OSUS', 'подтверждаем доступный лот'],
        ['Первый взнос', 'по актуальному payment plan', 'фиксируем условия в предложении'],
        ['Доходность', 'индивидуальный расчёт', 'после проверки аренды и расходов']
      ],
      benefits: ['Проверка условий владения для иностранца', 'Сравнение объектов и полного бюджета сделки', 'Прогноз только на подтверждённых данных'],
      gallery: [
        [image('portfolio/osus-eye.jpg'), 'Архитектура проекта OSUS'],
        [image('portfolio/osus-lobby.jpg'), 'Лобби и общие пространства'],
        [image('portfolio/nika-team.jpg'), 'Консультация Nika Estate']
      ],
      source: ['Рыночные индексы Эр-Рияда: официальный портал Real Estate General Authority.', 'https://rei.rega.gov.sa/en/cities/Riyadh']
    },
    'the-archive': {
      title: 'Финансовые ориентиры The Archive',
      intro: 'Цена и первый платёж видны сразу, а доходность показываем как сценарий по району — без рекламных обещаний.',
      metrics: [
        ['Стоимость', 'от AED 666 тыс. · ≈ $181 тыс.', 'студия по текущему ориентиру'],
        ['Первый взнос', '20% · ≈ $36,3 тыс. + DLD', 'точная сумма по выбранному лоту'],
        ['Доходность', '≈ 5–6% gross*', 'сценарный ориентир для DLRC']
      ],
      benefits: ['Полная меблировка и техника', 'Бассейн, gym и пространства для работы', 'Компактные форматы для аренды и жизни'],
      gallery: [
        [image('the-archive/official-exterior-01.webp'), 'Архитектура The Archive'],
        [image('the-archive/official-interior-03.webp'), 'Интерьер квартиры'],
        [image('the-archive/pool.jpg'), 'Бассейн на крыше'],
        [image('the-archive/reading-lounge.jpg'), 'Reading lounge']
      ],
      source: ['Доходность — ориентир по зарегистрированному рынку DLRC; результат конкретной квартиры зависит от расходов и простоя.', 'https://www.equityedge.ae/communities/dubai-land-residence-complex']
    },
    'central-park': {
      title: 'Финансовые ориентиры Central Park Plaza',
      intro: 'Цена от застройщика, понятный первый платёж и рыночный ориентир аренды по готовому жилью City Walk.',
      metrics: [
        ['Стоимость', 'от AED 2,73 млн · ≈ $743 тыс.', 'официальная стартовая цена'],
        ['Первый взнос', '20% · ≈ AED 546 тыс.', 'плюс регистрационные расходы'],
        ['Доходность', '≈ 5,37% gross*', 'ориентир готового жилья City Walk']
      ],
      benefits: ['Финальная премиальная очередь Meraas', 'Большой частный парк в центре города', 'Проверка этажа, вида и полного графика платежей'],
      gallery: cityWalkGallery,
      source: ['Доходность: ориентир по зарегистрированному рынку City Walk, не гарантия для будущего объекта.', 'https://datadubai.ae/communities/city-walk/']
    },
    'thyme': {
      title: 'Финансовые ориентиры Thyme',
      intro: 'Готовый объект можно проверить до сделки: сравнить цену, вид, сервисные сборы и реальный сценарий аренды.',
      metrics: [
        ['Стоимость', 'от AED 2,1 млн · ≈ $572 тыс.', 'ориентир вторичного рынка'],
        ['Первый взнос', 'обычно 10%*', 'точная сумма фиксируется в MOU'],
        ['Доходность', '≈ 5,37% gross*', 'ориентир готового жилья City Walk']
      ],
      benefits: ['Готовая квартира без ожидания строительства', 'Парк и инфраструктура City Walk рядом', 'Проверка документов, NOC и расходов до оффера'],
      gallery: cityWalkGallery,
      source: ['Доходность: зарегистрированный ориентир по City Walk; цена и депозит зависят от конкретного продавца.', 'https://datadubai.ae/communities/city-walk/']
    },
    'jadeel': {
      title: 'Финансовые ориентиры Jadeel',
      intro: 'Сравниваем готовые лоты по цене, площади, виду на Burj Al Arab и сценарию аренды.',
      metrics: [
        ['Стоимость', 'от AED 2,3 млн · ≈ $626 тыс.', 'готовый лот с 1 спальней'],
        ['Первый взнос', 'обычно 10%*', 'условия фиксируются в MOU'],
        ['Доходность', '≈ 6–6,3% gross*', 'сценарный ориентир до расходов']
      ],
      benefits: ['Готовая квартира — вид можно проверить', 'Премиальная локация рядом с Burj Al Arab', 'Документы, сервисные сборы и аренда в одном расчёте'],
      gallery: [
        [image('portfolio/jadeel-view.jpg'), 'Вид на Burj Al Arab'],
        [image('portfolio/jadeel-living.jpg'), 'Интерьер готовой квартиры'],
        ['https://dev.meraas.com/sites/default/files/2023-11/MJL%20Jadeel%20hero%20banner.jpg', 'Архитектура Jadeel'],
        ['https://dev.meraas.com/sites/default/files/2023-11/MJL%20Jadeel%20slide%202.jpg', 'Бассейн для резидентов']
      ],
      source: ['Доходность — сценарный прогноз для конкретного предложения; итог зависит от расходов, ставки аренды и простоя.', 'https://meraas.com/en/mjl-jadeel']
    },
    'havencia': {
      title: 'Финансовые ориентиры Havencia',
      intro: 'Доступный вход в DLRC с заранее понятным первым платежом и реалистичным прогнозом аренды.',
      metrics: [
        ['Стоимость', 'от AED 649 тыс. · ≈ $177 тыс.', 'официальный старт проекта'],
        ['Первый взнос', '20% + DLD/admin', 'от ≈ $44,5 тыс. по клиентскому офферу'],
        ['Доходность', '≈ 5–6% gross*', 'реалистичный сценарий для studio']
      ],
      benefits: ['Infinity pool, gym и business lounge', 'Компактные форматы для аренды', 'Свежий payment plan проверяем по каждому лоту'],
      gallery: [
        [image('portfolio/havencia-ala.jpg'), 'Архитектура Havencia'],
        ['https://aladevelopments.com/wp-content/uploads/2026/02/11.webp', 'Современные интерьеры'],
        ['https://aladevelopments.com/wp-content/uploads/2026/02/14.webp', 'Общие пространства'],
        ['https://aladevelopments.com/wp-content/uploads/2026/02/16.webp', 'Lifestyle-инфраструктура']
      ],
      source: ['Доходность — сценарий, не гарантия. Рыночный ориентир DLRC сверяется по зарегистрированным данным.', 'https://www.equityedge.ae/communities/dubai-land-residence-complex']
    },
    'valia': {
      title: 'Финансовые ориентиры Emaar Valia',
      intro: 'Стартовая цена, первый платёж и рыночный ориентир аренды в Dubai Creek Harbour — в одном блоке.',
      metrics: [
        ['Стоимость', 'от AED 1,96 млн · ≈ $534 тыс.', 'официальный старт проекта'],
        ['Первый взнос', '10% · ≈ AED 196 тыс.', 'плюс DLD и административные расходы'],
        ['Доходность', '≈ 5,66% gross*', 'ориентир готового жилья в районе']
      ],
      benefits: ['Проект Emaar у парка и набережной', 'План 80/20 и поэтапная оплата', 'Подбор этажа, вида и планировки под цель'],
      gallery: [
        [valiaImage('valia-hero-2.webp'), 'Архитектура Valia'],
        [valiaImage('exterior-2.webp'), 'Парк и набережная'],
        [valiaImage('interior-1.webp'), 'Интерьеры резиденций'],
        [valiaImage('waterfront.webp'), 'Инфраструктура для отдыха']
      ],
      source: ['Доходность: ориентир готового жилья Dubai Creek Harbour по зарегистрированным данным, не гарантия для будущего объекта.', 'https://datadubai.ae/communities/dubai-creek-harbour/']
    },
    'valia/en': {
      kicker: 'Purchase guide',
      title: 'Emaar Valia financial benchmarks',
      intro: 'Starting price, first payment and the district rental benchmark — presented together before you enquire.',
      metrics: [
        ['Price guide', 'from AED 1.96m · ≈ $534k', 'official project starting price'],
        ['First payment', '10% · ≈ AED 196k', 'plus DLD and administration costs'],
        ['Rental yield', '≈ 5.66% gross*', 'ready-home district benchmark']
      ],
      benefits: ['Emaar project beside the park and waterfront', '80/20 phased payment plan', 'We compare floor, view and layout for your goal'],
      gallery: [
        [valiaImage('valia-hero-2.webp'), 'Valia architecture'],
        [valiaImage('exterior-2.webp'), 'Park and waterfront setting'],
        [valiaImage('interior-1.webp'), 'Residence interiors'],
        [valiaImage('waterfront.webp'), 'Leisure amenities']
      ],
      source: ['Yield is a registered ready-home benchmark for Dubai Creek Harbour, not a guarantee for a future unit.', 'https://datadubai.ae/communities/dubai-creek-harbour/']
    }
  };

  configs['cyprus/eligibility'] = configs['cyprus/city-match'];
  configs['cyprus/investment-memo'] = configs['cyprus/city-match'];

  const config = configs[pageKey];
  if (!config) return;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function createMetric(metric, compact) {
    const wrapper = element('div', compact ? 'nika-quiz-metric' : 'nika-value-metric');
    wrapper.appendChild(element('span', compact ? '' : 'nika-value-metric-label', metric[0]));
    wrapper.appendChild(element('strong', '', metric[1]));
    if (!compact && metric[2]) wrapper.appendChild(element('small', '', metric[2]));
    return wrapper;
  }

  function createPhoto(photo, compact) {
    if (compact) {
      const img = element('img');
      img.src = photo[0];
      img.alt = photo[1];
      img.loading = 'lazy';
      return img;
    }
    const figure = element('figure', 'nika-value-photo');
    const img = element('img');
    img.src = photo[0];
    img.alt = photo[1];
    img.loading = 'lazy';
    img.decoding = 'async';
    figure.appendChild(img);
    figure.appendChild(element('figcaption', '', photo[1]));
    return figure;
  }

  function mountQuiz() {
    const fact = document.querySelector('.quiz-fact');
    if (!fact || fact.querySelector('.nika-quiz-signals')) return Boolean(fact);
    const compact = element('span', 'nika-quiz-signals');
    compact.textContent = ' · ' + (isEnglish ? 'FIRST PAYMENT ' : 'ПЕРВЫЙ ВЗНОС ') + config.metrics[1][1]
      + ' · ' + (isEnglish ? 'YIELD ' : 'ДОХОДНОСТЬ ') + config.metrics[2][1];
    fact.appendChild(compact);
    return true;
  }

  function mountFull() {
    if (document.querySelector('.nika-value-section')) return true;
    const footer = document.querySelector('footer');
    if (!footer) return false;

    const section = element('section', 'nika-value-section');
    section.id = 'purchase-benchmarks';
    const shell = element('div', 'nika-value-shell');
    shell.appendChild(element('p', 'nika-value-kicker', config.kicker || 'Цена · первый взнос · доходность'));
    shell.appendChild(element('h2', 'nika-value-heading', config.title));
    shell.appendChild(element('p', 'nika-value-intro', config.intro));

    const metrics = element('div', 'nika-value-metrics');
    config.metrics.forEach((metric) => metrics.appendChild(createMetric(metric, false)));
    shell.appendChild(metrics);

    const benefits = element('div', 'nika-value-benefits');
    config.benefits.forEach((benefit) => benefits.appendChild(element('div', 'nika-value-benefit', benefit)));
    shell.appendChild(benefits);

    const galleryHead = element('div', 'nika-value-gallery-head');
    galleryHead.appendChild(element('h3', '', isEnglish ? 'See the project in detail' : 'Посмотрите проект ближе'));
    galleryHead.appendChild(element('p', '', isEnglish ? 'Architecture, interiors and resident amenities in one compact gallery.' : 'Архитектура, интерьеры и инфраструктура — в компактной галерее без лишнего текста.'));
    shell.appendChild(galleryHead);

    const gallery = element('div', 'nika-value-gallery');
    config.gallery.forEach((photo) => gallery.appendChild(createPhoto(photo, false)));
    shell.appendChild(gallery);

    const bottom = element('div', 'nika-value-footer');
    const note = element('p', 'nika-value-note');
    note.appendChild(document.createTextNode((isEnglish ? '* Gross yield before service charges, vacancy and management. ' : '* Gross-доходность до сервисных сборов, простоя и управления. ') + config.source[0] + ' '));
    const sourceLink = element('a', '', isEnglish ? 'Source' : 'Источник');
    sourceLink.href = config.source[1];
    sourceLink.target = '_blank';
    sourceLink.rel = 'noopener noreferrer';
    note.appendChild(sourceLink);
    bottom.appendChild(note);
    const cta = element('a', 'nika-value-cta', isEnglish ? 'Request a personal calculation' : 'Получить расчёт по объекту');
    cta.href = document.querySelector('#contact') ? '#contact' : (document.querySelector('#request') ? '#request' : '#quiz');
    bottom.appendChild(cta);
    shell.appendChild(bottom);

    section.appendChild(shell);
    footer.parentNode.insertBefore(section, footer);
    return true;
  }

  function mount() {
    return isQuiz ? mountQuiz() : mountFull();
  }

  if (!mount()) {
    const observer = new MutationObserver(function () {
      if (mount()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 12000);
  }
}(window, document));
