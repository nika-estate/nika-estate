import React, { useEffect, useRef, useState } from "react";
import { offerKey, quizOffer, quizProject } from "./quiz-content.js";

const ENDPOINT = "https://script.google.com/macros/s/AKfycbwioz7fVEzsnDXOz5EOG5f7Db1detqxZYDZF1T8OqyU2DAeUW-_P5envHK6vwCtcNKAbg/exec";
const goals = [
  ["Инвестиции", "Доход и рост стоимости"],
  ["Для жизни", "Квартира для себя или семьи"],
  ["Сохранить капитал", "Надёжный актив в дирхамах"],
  ["Пока сравниваю", "Хочу понять варианты и бюджет"],
];
const contacts = ["WhatsApp", "Telegram", "Звонок"];

export default function QuizApp() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");
  const [contactMethod, setContactMethod] = useState("WhatsApp");
  const [sent, setSent] = useState(false);
  const formRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("quiz-page");
    const leadScript = document.createElement("script");
    leadScript.src = "../../project-assets/lead-capture.js";
    leadScript.dataset.endpoint = ENDPOINT;
    leadScript.dataset.landingName = `${quizProject.name} — короткий квиз (RU)`;
    leadScript.dataset.offerName = `${quizProject.name} — ${offerKey}`;
    leadScript.onload = () => window.NikaLeadCapture?.init(document);
    document.body.appendChild(leadScript);

    const onLead = (event) => {
      if (event.detail?.confirmed && event.detail?.formId === "project-quiz") setSent(true);
    };
    document.addEventListener("nika:lead-sent", onLead);
    return () => {
      document.body.classList.remove("quiz-page");
      document.removeEventListener("nika:lead-sent", onLead);
      leadScript.remove();
    };
  }, []);

  useEffect(() => {
    if (step === 2) requestAnimationFrame(() => headingRef.current?.focus());
  }, [step]);

  const goNext = () => {
    if (!goal) return;
    setStep(2);
  };

  return <main className="quiz-shell">
    <img className="quiz-backdrop" src={quizProject.hero} alt={quizProject.heroAlt} fetchPriority="high" />
    <div className="quiz-overlay" />

    <header className="quiz-header">
      <a className="quiz-brand" href="../../" aria-label="Nika Estate — на главную">
        <strong>NIKA ESTATE</strong><span>Недвижимость в ОАЭ</span>
      </a>
      <div className="quiz-project"><strong>{quizProject.name}</strong><span>{quizProject.location}</span></div>
    </header>

    <div className="quiz-layout">
      <section className="quiz-offer" aria-label="Предложение">
        <span className="quiz-badge"><i />{quizOffer.badge}</span>
        <h1>{quizOffer.title}</h1>
        <p>{quizOffer.text}</p>
        <div className="quiz-fact">{quizProject.fact}</div>
      </section>

      <section className="quiz-card" aria-live="polite">
        {sent ? <div className="quiz-success">
          <span className="success-mark" aria-hidden="true">✓</span>
          <p className="quiz-kicker">Заявка отправлена</p>
          <h2>Спасибо! Брокер Nika Estate скоро свяжется с вами.</h2>
          <p>Мы уже получили ваши ответы и подготовим варианты по вашей цели.</p>
        </div> : <form ref={formRef} id="project-quiz" className="quiz-form" data-quiz-form data-offer-name={`${quizProject.name} — ${offerKey}`} aria-label={`Короткий квиз по ${quizProject.name}`}>
          <input type="hidden" name="project" value={quizProject.name} />
          <input type="hidden" name="offer_variant" value={offerKey} />

          <div className="quiz-progress"><span>Шаг {step} из 2</span><span className="quiz-progress-track"><i style={{width: `${step * 50}%`}} /></span></div>

          {step === 1 ? <fieldset className="quiz-step">
            <legend>С какой целью рассматриваете покупку?</legend>
            <p className="quiz-hint">Выберите один вариант — это займёт несколько секунд.</p>
            <div className="goal-grid">
              {goals.map(([title, note]) => <label key={title} className={goal === title ? "is-selected" : ""}>
                <input type="radio" name="purchase_goal" value={title} checked={goal === title} onChange={() => setGoal(title)} required />
                <span><strong>{title}</strong><small>{note}</small></span><i aria-hidden="true" />
              </label>)}
            </div>
            <button className="quiz-submit" type="button" onClick={goNext} disabled={!goal}>Продолжить <span aria-hidden="true">→</span></button>
          </fieldset> : <div className="quiz-step contact-step">
            <p className="quiz-legend" ref={headingRef} tabIndex="-1">Как с вами связаться?</p>
            <p className="quiz-hint">Оставьте контакт — пришлём варианты и расчёт без навязчивых звонков.</p>

            <label className="text-field"><span>Ваше имя</span><input name="name" type="text" autoComplete="given-name" minLength="2" maxLength="80" placeholder="Как к вам обращаться?" required /></label>
            <label className="text-field"><span>Телефон или @username</span><input name="contact" type="text" autoComplete="tel" minLength="5" maxLength="80" placeholder="+7 999 000-00-00 или @username" required /></label>

            <fieldset className="contact-choice"><legend>Куда удобнее написать?</legend><div>{contacts.map((method) => <label key={method} className={contactMethod === method ? "is-selected" : ""}><input type="radio" name="preferred_contact" value={method} checked={contactMethod === method} onChange={() => setContactMethod(method)} /><span>{method}</span></label>)}</div></fieldset>

            <label className="quiz-consent"><input name="privacy_consent" type="checkbox" value="yes" required /><span>Согласен на обработку данных для ответа на заявку.</span></label>
            <div className="quiz-actions"><button type="button" className="quiz-back" onClick={() => setStep(1)}>Назад</button><button className="quiz-submit" type="submit">Получить подборку <span aria-hidden="true">→</span></button></div>
            <p data-form-status role="status" aria-live="polite" className="quiz-status" />
          </div>}
        </form>}
      </section>
    </div>

    <footer className="quiz-footer"><span>{quizProject.developer}</span><span>Персональный подбор Nika Estate</span></footer>
  </main>;
}
