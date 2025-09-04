import React, { useState } from "react";
import "./contact.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const INIT = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [f, setF] = useState(INIT);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!f.name || !f.email || !f.message) {
      toast.info("Please fill name, email and message.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Thanks! We’ll get back to you soon.");
      setF(INIT);
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-wrap">
      <ToastContainer position="top-center" autoClose={1500} theme="light" />
      <div className="contact-grid">
        <section className="contact-form panel">
          <h2>Contact Us</h2>
          <p className="muted">Have a question or feedback? Send us a message.</p>

          <form onSubmit={onSubmit} className="form">
            <div className="row2">
              <div className="field">
                <label>Name</label>
                <input
                  value={f.name}
                  onChange={(e) => setF({ ...f, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  value={f.email}
                  onChange={(e) => setF({ ...f, email: e.target.value })}
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div className="field">
              <label>Subject</label>
              <input
                value={f.subject}
                onChange={(e) => setF({ ...f, subject: e.target.value })}
                placeholder="How can we help?"
              />
            </div>

            <div className="field">
              <label>Message</label>
              <textarea
                rows={5}
                value={f.message}
                onChange={(e) => setF({ ...f, message: e.target.value })}
                placeholder="Write your message here…"
              />
            </div>

            <button className="btn" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </section>

        <aside className="contact-info panel">
          <h3>Support</h3>
          <p className="muted">Mon–Fri • 10:00–18:00</p>
          <ul className="info-list">
            <li><b>Email:</b> support@example.com</li>
            <li><b>Phone:</b> +91-98765-43210</li>
            <li><b>Address:</b> Rewa, MP, India</li>
          </ul>
          <div className="map-skel">Map placeholder</div>
        </aside>
      </div>
    </div>
  );
}
