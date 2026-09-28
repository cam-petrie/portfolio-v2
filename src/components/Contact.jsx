import { useState } from "react";
import emailjs from "@emailjs/browser";

const env = import.meta.env;

export default function Contact({ content }) {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      if (!env.VITE_EMAIL_SERVICE_ID || !env.VITE_EMAIL_TEMPLATE_ID || !env.VITE_EMAIL_PUBLIC_KEY) {
        throw new Error("EmailJS env vars missing — see .env.example");
      }
      await emailjs.send(env.VITE_EMAIL_SERVICE_ID, env.VITE_EMAIL_TEMPLATE_ID, form, { publicKey: env.VITE_EMAIL_PUBLIC_KEY });
      setForm({ name: "", email: "", message: "" });
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__intro">
        <h2 className="contact__title">Let's<br />talk<span className="accent-on-ink">.</span></h2>
        <p className="contact__lede">Send me a message and I'll get back to you as soon as possible.</p>
        <ul className="contact__links">
          <li><a href={content.linkedin} target="_blank" rel="noreferrer">LinkedIn<span>↗</span></a></li>
          <li><a href={content.github} target="_blank" rel="noreferrer">GitHub<span>↗</span></a></li>
          <li><a href={content.resume} download="Cameron Petrie Resume.pdf">Résumé (PDF)<span>↓</span></a></li>
        </ul>
      </div>
      {status === "sent" ? (
        <div className="contact__sent" role="status">
          <span className="tag-accent">✓ Sent</span>
          <p>Thanks for your message. I'll get back to you as soon as possible.</p>
          <button className="btn btn--ghost-ink" onClick={() => setStatus("idle")}>Send another</button>
        </div>
      ) : (
        <form className="contact__form" onSubmit={submit}>
          <label>Name<input required name="name" value={form.name} onChange={update} autoComplete="name" /></label>
          <label>Email<input required type="email" name="email" value={form.email} onChange={update} autoComplete="email" /></label>
          <label>Message<textarea required name="message" rows={5} value={form.message} onChange={update} /></label>
          {status === "error" && <p className="contact__error" role="alert">Something went wrong sending your message. Please try again, or reach out on LinkedIn.</p>}
          <button className="btn btn--accent btn--lg" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message →"}
          </button>
        </form>
      )}
    </section>
  );
}
