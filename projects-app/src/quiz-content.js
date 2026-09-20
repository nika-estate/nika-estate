const projectOffers = {
  "central-park": {
    name: "Central Park Plaza",
    location: "City Walk · Dubai",
    developer: "Meraas",
    hero: "https://nika-estate.github.io/nika-estate/assets/images/central-park-terrace.jpg",
    heroAlt: "Central Park Plaza — резиденции вокруг большого парка в City Walk",
    fact: "от AED 2,73 млн · ≈ $743 тыс. · 1–4 спальни · план 70/30",
    default: {
      badge: "Новая очередь Meraas в City Walk",
      title: "Получите цены и планировки Central Park Plaza",
      text: "Подберём доступные квартиры у парка и покажем полный бюджет покупки.",
    },
    invest: {
      badge: "Недвижимость в центре Дубая",
      title: "Подберём квартиру в Central Park Plaza для инвестиций",
      text: "Сравним лоты, план платежей и сценарий аренды под ваш бюджет.",
    },
    life: {
      badge: "Квартиры у большого частного парка",
      title: "Подберём квартиру в City Walk для вашей жизни",
      text: "Учтём состав семьи, площадь, вид, этаж и удобный график оплаты.",
    },
  },
  "thyme": {
    name: "Thyme at Central Park",
    location: "City Walk · Dubai",
    developer: "Meraas",
    hero: "https://meraas.com/sites/default/files/2024-03/CP%20-%20THYME%20PHASE%20HEADER%20%E2%80%93%201.jpg",
    heroAlt: "Thyme at Central Park — готовые резиденции у парка в City Walk",
    fact: "ориентир от AED 2,1 млн · ≈ $572 тыс. · готовый дом",
    default: {
      badge: "Готовые квартиры Meraas",
      title: "Получите актуальные предложения в Thyme",
      text: "Проверим свободные квартиры, цены, вид и условия готовой сделки.",
    },
    invest: {
      badge: "Готовая недвижимость в центре Дубая",
      title: "Подберём готовую квартиру в Thyme для аренды",
      text: "Сравним доступные лоты и рассчитаем сценарий после расходов.",
    },
    life: {
      badge: "Можно заселиться после сделки",
      title: "Найдём готовую квартиру у парка в City Walk",
      text: "Подберём планировку, этаж и вид под ваш образ жизни.",
    },
  },
  "jadeel": {
    name: "Jadeel",
    location: "Madinat Jumeirah Living",
    developer: "Meraas",
    hero: "https://nika-estate.github.io/nika-estate/assets/images/portfolio/jadeel-view.jpg",
    heroAlt: "Jadeel — вид на Burj Al Arab из готовой квартиры",
    fact: "готовые 1–2BR · от AED 2,3 млн · ≈ $626 тыс.",
    default: {
      badge: "Готовые квартиры в MJL",
      title: "Получите предложения Jadeel с видом на Burj Al Arab",
      text: "Покажем доступные 1–2BR, реальные цены, площади и условия сделки.",
    },
    invest: {
      badge: "Премиальный адрес рядом с Burj Al Arab",
      title: "Сравните готовые лоты Jadeel для инвестиций",
      text: "Проверим объект, расходы и сценарий аренды по конкретной квартире.",
    },
    life: {
      badge: "Пешеходное комьюнити Madinat Jumeirah",
      title: "Подберём готовую квартиру Jadeel для жизни",
      text: "Учтём площадь, вид, этаж и доступность квартиры для просмотра.",
    },
  },
  "havencia": {
    name: "Havencia by ALA",
    location: "Dubai Land Residence Complex",
    developer: "ALA Developments",
    hero: "https://aladevelopments.com/wp-content/uploads/2026/02/10.webp",
    heroAlt: "Havencia by ALA — жилой проект в Dubai Land Residence Complex",
    fact: "от AED 649 тыс. · ≈ $177 тыс. · первый платёж 20%",
    default: {
      badge: "Доступный вход в недвижимость Дубая",
      title: "Получите цены и планировки Havencia",
      text: "Покажем свободные студии и квартиры, бюджет входа и график платежей.",
    },
    invest: {
      badge: "Студии от AED 649 тыс. · ≈ $177 тыс.",
      title: "Рассчитайте инвестицию в Havencia под ваш бюджет",
      text: "Сравним лоты, реальный первый взнос и сценарий аренды после сдачи.",
    },
    life: {
      badge: "Lifestyle-проект с сильной инфраструктурой",
      title: "Подберём квартиру в Havencia для жизни",
      text: "Учтём планировку, бюджет и удобный график оплаты до 2028 года.",
    },
  },
};

const requestedProject = document.documentElement.dataset.project || "central-park";
const requestedOffer = new URLSearchParams(window.location.search).get("offer") || "default";

export const quizProject = projectOffers[requestedProject] || projectOffers["central-park"];
export const offerKey = Object.hasOwn(quizProject, requestedOffer) ? requestedOffer : "default";
export const quizOffer = quizProject[offerKey];
