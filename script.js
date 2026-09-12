const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.site-nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const slides = [...document.querySelectorAll('.hero-image')];
const currentSlide = document.querySelector('.current-slide');
let activeSlide = 0;

function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === activeSlide));
  currentSlide.textContent = String(activeSlide + 1).padStart(2, '0');
}

document.querySelector('.gallery-prev')?.addEventListener('click', () => showSlide(activeSlide - 1));
document.querySelector('.gallery-next')?.addEventListener('click', () => showSlide(activeSlide + 1));

document.querySelectorAll('.residence-toggle').forEach((button) => button.addEventListener('click', () => {
  const card = button.closest('.residence-card');
  const wasOpen = card.classList.contains('open');
  document.querySelectorAll('.residence-card').forEach((item) => {
    item.classList.remove('open');
    item.querySelector('.residence-toggle').setAttribute('aria-expanded', 'false');
  });
  if (!wasOpen) {
    card.classList.add('open');
    button.setAttribute('aria-expanded', 'true');
  }
}));

const requestForm = document.querySelector('.request-form');

function updateTelegramField() {
  const telegramField = requestForm?.querySelector('[data-telegram-field]');
  const telegramInput = telegramField?.querySelector('input');
  if (!telegramField || !telegramInput) return;
  const needsTelegram = requestForm.elements.messenger.value === 'Telegram';
  telegramField.hidden = !needsTelegram;
  telegramInput.required = needsTelegram;
}

requestForm?.addEventListener('change', (event) => {
  if (event.target.name === 'messenger') updateTelegramField();
});

requestForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  updateTelegramField();
  if (!requestForm.checkValidity()) {
    requestForm.reportValidity();
    return;
  }
  const name = requestForm.elements.name.value.trim();
  const phone = requestForm.elements.phone.value.trim();
  const goal = requestForm.elements.goal.value.trim();
  const messenger = requestForm.elements.messenger.value;
  const telegram = requestForm.elements.telegram.value.trim();
  const status = requestForm.querySelector('.form-success');
  const text = [
    'Здравствуйте! Хочу получить подбор по City Walk и Central Park.',
    `Имя: ${name}.`,
    `Телефон: ${phone}.`,
    `Связаться: ${messenger}.`,
    telegram ? `Telegram: ${telegram}.` : '',
    goal ? `Задача: ${goal}.` : ''
  ].filter(Boolean).join('\n');
  status.textContent = 'Заявка заполнена. Открываем сообщение для Nika Estate…';
  window.open(`https://wa.me/971508698020?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});

updateTelegramField();
