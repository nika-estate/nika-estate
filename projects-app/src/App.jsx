import React, { useEffect, useMemo, useRef, useState } from "react";
import { currentProject as project } from "./projects.jsx";

const ENDPOINT = "https://script.google.com/macros/s/AKfycbwioz7fVEzsnDXOz5EOG5f7Db1detqxZYDZF1T8OqyU2DAeUW-_P5envHK6vwCtcNKAbg/exec";
const asset = (name) => `${document.documentElement.dataset.assetBase || "../project-assets/"}${name}`;
const nav = [["Планировки", "#plans"], ["Условия покупки", "#payment"], ["Локация", "#location"], ["Преимущества", "#why"]];

function LeadForm({ id, bare = false, onPrivacy }) {
  return <div className={`lead-form-wrap ${bare ? "is-bare" : ""}`}>
    <form id={id} className="valia-form" aria-label={`Заявка по ${project.name}`} data-offer-name={`${project.name} — цены, планировки и консультация`}>
      <label htmlFor={`${id}-name`}>Ваше имя<input id={`${id}-name`} name="name" type="text" autoComplete="given-name" minLength="2" maxLength="80" required /></label>
      <label htmlFor={`${id}-phone`}>Телефон для связи<input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Укажите номер с кодом страны" minLength="7" maxLength="25" pattern="[0-9\s\+\-\(\)]{7,25}" required /></label>
      <label htmlFor={`${id}-rooms`}>Какая квартира вам интересна?
        <select id={`${id}-rooms`} name="apartment">
          {[...new Set(project.plans.map((p) => p.bedrooms))].map((n) => <option key={n}>{n === 0 ? "Студия" : `${n} ${n === 1 ? "спальня" : "спальни"}`}</option>)}
          <option>Пока не знаю — помогите выбрать</option>
        </select>
      </label>
      <label className="consent"><input name="privacy_consent" type="checkbox" value="yes" required />Согласен на обработку данных для ответа на заявку. <a href="#privacy" onClick={onPrivacy}>Подробнее</a></label>
      <button type="submit">Получить цены и планировки</button>
      <p data-form-status="" role="status" aria-live="polite" className="form-status" />
    </form>
    <div className="form-trust">
      <span><img src={asset("shield.svg")} alt="" />Данные защищены</span>
      <span><img src={asset("check.svg")} alt="" />Брокер Nika Estate</span>
      <span><img src={asset("check.svg")} alt="" />Без обязательств</span>
    </div>
  </div>;
}

function Details({ title, children }) {
  return <details className="responsive-details"><summary>{title}</summary>{children}</details>;
}

function App() {
  const [menu, setMenu] = useState(false);
  const [more, setMore] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [stickyHidden, setStickyHidden] = useState(false);
  const [modal, setModal] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [image, setImage] = useState(null);
  const [galleryFilter, setGalleryFilter] = useState("Все");
  const bedroomOptions = useMemo(() => [...new Set(project.plans.map((p) => p.bedrooms))], []);
  const [bedrooms, setBedrooms] = useState(bedroomOptions[0]);
  const [selectedPlan, setSelectedPlan] = useState(project.plans[0]);
  const [mapOpen, setMapOpen] = useState(false);
  const modalRef = useRef(null);
  const lastFocus = useRef(null);
  const gallery = project.gallery.filter((item) => galleryFilter === "Все" || item[2] === galleryFilter);

  const openModal = () => { lastFocus.current = document.activeElement; setMenu(false); setMore(false); setModal(true); };
  const closeModal = () => { setModal(false); setPrivacy(false); setImage(null); lastFocus.current?.focus?.(); };
  const chooseBedroom = (count) => { setBedrooms(count); setSelectedPlan(project.plans.find((p) => p.bedrooms === count)); };

  useEffect(() => {
    const onScroll = () => { setStuck(window.scrollY > 60); setSticky(window.scrollY > 500); };
    const smooth = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const target = document.getElementById(link.getAttribute("href").slice(1));
      if (target) { event.preventDefault(); history.pushState(null, "", link.getAttribute("href")); target.scrollIntoView({behavior: "smooth", block: "start"}); }
    };
    window.addEventListener("scroll", onScroll, {passive: true});
    document.addEventListener("click", smooth);
    onScroll();
    const script = document.createElement("script");
    script.src = asset("lead-capture.js");
    script.dataset.endpoint = ENDPOINT;
    script.dataset.landingName = `${project.name} — ${project.location} (RU)`;
    script.dataset.offerName = `${project.name} — цены, планировки и консультация`;
    script.onload = () => window.NikaLeadCapture?.init(document);
    document.body.appendChild(script);
    return () => { window.removeEventListener("scroll", onScroll); document.removeEventListener("click", smooth); script.remove(); };
  }, []);

  useEffect(() => {
    if (!modal && !privacy && !image) return;
    document.body.classList.add("modal-open");
    const onKey = (e) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    requestAnimationFrame(() => modalRef.current?.querySelector("button, input, select, a")?.focus());
    return () => { document.body.classList.remove("modal-open"); document.removeEventListener("keydown", onKey); };
  }, [modal, privacy, image]);

  return <>
    <a className="screen-reader-text" href="#main">Перейти к содержимому</a>
    <header className={`site-header ${stuck ? "is-stuck" : ""}`}><div className="header-inner">
      <a className="brand" href="#main">{project.brand}<span>{project.location}</span></a>
      <button className="nav-toggle" type="button" aria-controls="navigation" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? "Закрыть" : "Меню"}</button>
      <nav id="navigation" className={`main-nav ${menu ? "open" : ""}`} aria-label="Навигация"><ul>
        {nav.map(([label, href]) => <li key={href}><a href={href} onClick={() => setMenu(false)}>{label}</a></li>)}
        <li className="more-nav"><button className="mega-toggle" type="button" aria-expanded={more} onClick={() => setMore(!more)}>Ещё</button>{more && <div className="more-panel"><a href="#gallery">Галерея</a><a href="#amenities">Инфраструктура</a><a href="#faq">Вопросы и ответы</a></div>}</li>
        <li><button type="button" className="nav-cta" onClick={openModal}>Получить цены</button></li>
      </ul></nav>
    </div></header>

    <main id="main">
      <section className="hero hero-photo section-dark">
        <img className="hero-backdrop" src={project.hero} alt={project.heroAlt} fetchPriority="high" />
        <div className="wrap"><div className="hero-grid">
          <div className="hero-copy"><span className="hero-badge"><span className="dot" />{project.status}</span><h1>{project.title}</h1><p className="lede">{project.lede}</p>
            <div className="hero-facts">{project.facts.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
            <div className="hero-actions"><button className="btn btn-light hero-enquire" type="button" onClick={openModal}>Получить цены и планировки</button><a className="hero-secondary" href="#plans">Планировки и площади</a><a className="hero-secondary" href="#payment">Условия покупки</a></div>
          </div>
          <div className="hero-form"><div className="form-head"><h2>Получите цены и планировки</h2><p className="form-sub">Брокер Nika Estate проверит доступные квартиры и подберёт варианты под ваш бюджет.</p></div><LeadForm id={`${project.slug}-hero`} bare onPrivacy={(e) => {e.preventDefault(); setPrivacy(true);}} /></div>
        </div></div>
      </section>

      <section id="overview" className="section"><div className="wrap"><div className="split-52">
        <div><span className="eyebrow">О проекте</span><h2>{project.introTitle}</h2><p><strong>{project.name}</strong> — {project.intro}</p><Details title="Подробнее о проекте"><p>{project.introMore}</p><ul className="spec-list">{project.specs.map(([k,v]) => <li key={k}><span className="k">{k}</span><span className="v">{v}</span></li>)}</ul></Details><div className="btn-row"><button className="btn btn-primary" type="button" onClick={openModal}>Получить презентацию</button><a href="#location" className="link-arrow">Посмотреть расположение</a></div></div>
        <div><figure className="media-frame"><img className="img-wide" src={project.gallery[1]?.[0] || project.hero} alt={project.gallery[1]?.[1] || project.heroAlt} loading="lazy" /></figure><p className="img-caption">Визуальные материалы проекта и комьюнити. Фактический вид зависит от выбранной квартиры.</p></div>
      </div></div></section>

      <section id="gallery" className="section section-alt"><div className="wrap"><span className="eyebrow">Архитектура и окружение</span><h2>{project.galleryTitle}</h2><p className="lede">{project.galleryText}</p>
        <div className="filter-tabs" aria-label="Фильтр галереи">{["Все", ...new Set(project.gallery.map((x) => x[2]))].map((f) => <button key={f} type="button" aria-pressed={galleryFilter === f} onClick={() => setGalleryFilter(f)}>{f}</button>)}</div>
        <div className="gallery-grid">{gallery.map(([src, alt], i) => <button key={src} type="button" className={`gallery-item ${i === 0 ? "gallery-main" : ""}`} onClick={() => setImage({src, alt})} aria-label={`Увеличить: ${alt}`}><img src={src} alt={alt} loading="lazy" /><span>{alt}</span></button>)}</div>
        <p className="img-caption">Изображения предоставлены девелоперами или взяты из материалов проекта. Отделка и виды зависят от конкретного лота.</p>
      </div></section>

      <section id="plans" className="section section-dark"><div className="wrap"><div className="grid-2"><div><span className="eyebrow">Квартиры и цены</span><h2>Планировки под вашу цель</h2><p className="lede">{project.planIntro}</p></div><div className="btn-row"><button className="btn btn-light" type="button" onClick={openModal}>Запросить актуальный прайс</button></div></div>
        <div className="filter-tabs dark-tabs" aria-label="Число спален">{bedroomOptions.map((n) => <button key={n} type="button" aria-pressed={bedrooms === n} onClick={() => chooseBedroom(n)}><span className="bedroom-full">{n === 0 ? "Студия" : `${n} ${n === 1 ? "спальня" : "спальни"}`}</span><span className="bedroom-short" aria-hidden="true">{n === 0 ? "Ст." : `${n} сп.`}</span></button>)}</div>
        <div className="plan-panel"><div className="plan-visual"><button type="button" onClick={() => setImage({src:selectedPlan.image, alt:`${project.name}: ${selectedPlan.type}`})} aria-label="Увеличить изображение"><img className="plan-drawing" src={selectedPlan.image} alt={`${project.name}: ${selectedPlan.type}`} loading="lazy" /><span>Увеличить изображение</span></button></div>
          <Details title="Площадь, цена и варианты планировки"><div className="plan-details"><span className="eyebrow">{project.developer}</span><h3>{selectedPlan.type}</h3><p>{selectedPlan.details}</p><div className="plan-variants" aria-label="Варианты планировки">{project.plans.filter((p) => p.bedrooms === bedrooms).map((p) => <button key={p.type} type="button" aria-pressed={p.type === selectedPlan.type} onClick={() => setSelectedPlan(p)}>{p.type}</button>)}</div><ul className="spec-list"><li><span className="k">Площадь</span><span className="v">{selectedPlan.area}</span></li><li><span className="k">Цена</span><span className="v">{selectedPlan.price}</span></li><li><span className="k">Статус</span><span className="v">Подтвердим по лоту</span></li></ul><button className="btn btn-primary" type="button" onClick={openModal}>Получить презентацию и план</button><a className="download-link" href={project.planPdf} target="_blank" rel="noopener">Официальные планы и материалы</a></div></Details>
        </div><p className="small-note">* Точная площадь, цена, этаж и планировка подтверждаются по актуальному свободному лоту. Опубликованный типовой план может отличаться от схемы выбранной квартиры.</p>
      </div></section>

      <section id="payment" className="section"><div className="wrap"><div className="split-52"><div><span className="eyebrow">Условия покупки</span><h2>{project.paymentTitle}</h2><p className="lede">{project.paymentText}</p><button className="btn btn-primary" type="button" onClick={openModal}>Рассчитать мой план</button></div><div className="payment-steps">{project.payments.map(([value,label],i) => <div key={label}><span>{String(i+1).padStart(2,"0")}</span><strong>{value}</strong><p>{label}</p></div>)}</div></div></div></section>

      <section id="location" className="section section-alt"><div className="wrap"><div className="split-52"><div><span className="eyebrow">Локация</span><h2>{project.locationTitle}</h2><p className="lede">{project.location}. Маршруты указаны как ориентиры и зависят от трафика.</p><div className="distance-grid">{project.distances.map(([v,l]) => <div key={l}><strong>{v}</strong><span>{l}</span></div>)}</div><a className="btn btn-primary" href={project.mapLink} target="_blank" rel="noopener">Открыть на Google Картах</a></div><div className="map-plan">{mapOpen ? <iframe title={`Карта ${project.name}`} src={`https://www.google.com/maps?q=${encodeURIComponent(project.mapQuery)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /> : <button type="button" className="map-placeholder" onClick={() => setMapOpen(true)}><img src={project.hero} alt="" /><span>Показать интерактивную карту</span></button>}</div></div></div></section>

      <section id="amenities" className="section section-dark"><div className="wrap"><span className="eyebrow">Инфраструктура</span><h2>Всё нужное внутри проекта</h2><div className="amenity-grid">{project.amenities.map((item,i) => <div key={item}><span>{String(i+1).padStart(2,"0")}</span><h3>{item}</h3></div>)}</div></div></section>

      <section id="why" className="section"><div className="wrap"><div className="grid-2"><div><span className="eyebrow">Почему {project.name}</span><h2>Пять причин присмотреться</h2><ul className="reason-list">{project.reasons.map(([title,text]) => <li key={title}><Details title={title}><p>{text}</p></Details></li>)}</ul></div><div id="faq"><span className="eyebrow">Нас часто спрашивают</span><h2>Вопросы о {project.name}</h2><div className="faq-list">{project.faq.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></div></div></div></section>

      <section id="contact" className="section section-alt"><div className="wrap"><div className="split-52"><div><span className="eyebrow">Следующий шаг</span><h2>Обсудите {project.name} с брокером Nika Estate</h2><p className="lede">Проверим доступные квартиры, сравним варианты и рассчитаем бюджет входа без скрытых допущений.</p><figure className="media-frame"><img className="img-wide" src={project.gallery[0][0]} alt={project.gallery[0][1]} loading="lazy" /></figure></div><LeadForm id={`${project.slug}-contact`} onPrivacy={(e) => {e.preventDefault(); setPrivacy(true);}} /></div><p className="small-note">{project.source}</p></div></section>
    </main>

    <footer className="site-footer"><div className="wrap"><div><a className="brand" href="#main">Nika Estate<span>Недвижимость в ОАЭ</span></a><p>Подбираем объекты под жизнь, аренду и инвестиции. Контакт — только через форму заявки.</p></div><div><a href="#plans">Планировки</a><a href="#payment">Условия покупки</a><a href="#location">Локация</a></div><p id="privacy">© 2026 Nika Estate</p></div></footer>

    {sticky && !stickyHidden && <div className="sticky-cta"><div className="sticky-cta-inner"><div className="sticky-cta-copy"><strong>{project.name}</strong><span>{project.facts[0][0]} · {project.location}</span></div><button className="btn btn-primary" type="button" onClick={openModal}>Получить цены</button><button className="dismiss-text" type="button" onClick={() => setStickyHidden(true)}>Скрыть</button></div></div>}
    <button className="floating-enquiry" type="button" onClick={openModal}><img src={asset("email.svg")} alt="" />Отправить заявку</button>

    {(modal || privacy || image) && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => {if (e.target === e.currentTarget) closeModal();}}><div className={`modal-card ${image ? "image-dialog" : ""}`} role="dialog" aria-modal="true" aria-label={image ? image.alt : privacy ? "Обработка заявки" : `Материалы ${project.name}`} ref={modalRef}><button className="modal-close" type="button" onClick={closeModal} aria-label="Закрыть">×</button>{image ? <><img src={image.src} alt={image.alt} /><p>{image.alt}</p></> : privacy ? <><h3>Обработка заявки</h3><p>Мы используем указанные вами данные только для связи по запросу и подбора недвижимости. Данные передаются Nika Estate через защищённую форму.</p></> : <><div className="modal-intro"><img src={project.hero} alt="" /><div><span className="eyebrow">{project.developer} · {project.location}</span><h2>Получите материалы {project.name}</h2><p>Оставьте заявку брокеру Nika Estate.</p></div></div><LeadForm id={`${project.slug}-modal`} bare onPrivacy={(e) => {e.preventDefault(); setModal(false); setPrivacy(true);}} /></>}</div></div>}
  </>;
}

export default App;
