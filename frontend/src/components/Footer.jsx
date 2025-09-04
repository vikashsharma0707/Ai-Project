import React from "react";
import "../assets/css/footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = {
    about: [
      { label: "Our Story", href: "/about" },
      { label: "Affiliate Program", href: "/affiliates" },
      { label: "Wholesale Program", href: "/wholesale" },
      { label: "Press Inquiries", href: "/press" },
      { label: "Careers", href: "/careers" },
    ],
    support: [
      { label: "Returns & Exchanges", href: "/returns" },
      { label: "Shipping Information", href: "/shipping" },
      { label: "Track Your Order", href: "/orders/track" },
      { label: "Promo Code Lookup", href: "/promo-lookup" },
      { label: "Gift Card Lookup", href: "/giftcard-lookup" },
      { label: "Help Center", href: "/help" },
      { label: "Contact Us", href: "/contact" },
    ],
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          {/* columns */}
          <div className="footer-columns">
            <div className="col">
              <h4>ABOUT US</h4>
              <ul className="footer-links">
                {links.about.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col">
              <h4>CUSTOMER SUPPORT</h4>
              <ul className="footer-links">
                {links.support.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col connect">
              <h4>CONNECT WITH US</h4>

              {/* Social icons (pure SVG, no extra lib) */}
              <div className="social">
                <a aria-label="Facebook" href="https://facebook.com" target="_blank" rel="noreferrer">
                  {/* facebook */}
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.63-1.3 1.3V12h2.2l-.35 3h-1.85v7A10 10 0 0 0 22 12"/></svg>
                </a>
                <a aria-label="X" href="https://twitter.com" target="_blank" rel="noreferrer">
                  {/* X / Twitter */}
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M3 3h3.7l5.2 7.4L17.8 3H21l-7 9.9L21 21h-3.7l-5.6-8-5.9 8H3l7.6-10.3L3 3z"/></svg>
                </a>
                <a aria-label="YouTube" href="https://youtube.com" target="_blank" rel="noreferrer">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c2.1.6 9.4.6 9.4.6s7.3 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.8 15.5v-7l6.3 3.5-6.3 3.5Z"/></svg>
                </a>
                <a aria-label="LinkedIn" href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.1h.1c.5-1 1.8-2.1 3.8-2.1 4 0 4.7 2.6 4.7 6v9H16V15.7c0-1.7 0-3.8-2.3-3.8s-2.7 1.8-2.7 3.7V23H8V8z"/></svg>
                </a>
                <a aria-label="Instagram" href="https://instagram.com" target="_blank" rel="noreferrer">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M7 2C4 2 2 4 2 7v10c0 3 2 5 5 5h10c3 0 5-2 5-5V7c0-3-2-5-5-5H7zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3zm11 1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM12 7a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7z"/></svg>
                </a>
                <a aria-label="Pinterest" href="https://pinterest.com" target="_blank" rel="noreferrer">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 2C6.5 2 3 6 3 10.6c0 3.4 2 5.3 3.2 5.3.5 0 .8-1.4.8-1.8 0-.5-1.3-1.6-1.3-3.7 0-4.4 3.4-7.5 7.8-7.5 3.8 0 6.6 2.2 6.6 6 0 2.9-1.3 8.4-5.6 8.4-1.5 0-2.8-1.1-2.7-2.7.1-1.8 1.1-3.7 1.1-5.5 0-3.2-4.6-2.6-4.6 1.5 0 1.3.4 2.2.4 2.2l-1.6 6.7c-.5 2 .1 5 .1 5s.1.1.2.1c.1 0 1.9-2.6 2.5-4.9l1-3.6c.5 1 2 1.9 3.6 1.9 4.7 0 7.9-4.3 7.9-9.5C21 5.5 17.1 2 12 2z"/></svg>
                </a>
                <a aria-label="TikTok" href="https://tiktok.com" target="_blank" rel="noreferrer">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M21 8.3a6.9 6.9 0 0 1-4.1-1.4v7.5a6.5 6.5 0 1 1-5.5-6.4v3.2a3.1 3.1 0 1 0 2.2 3V2h3a4.9 4.9 0 0 0 4.4 3v3.3z"/></svg>
                </a>
              </div>

              <p className="nl-copy">
                Want ₹200 Off? Sign up for our Newsletter.<br />
                Sign up for SMS alerts and be the first to know!
              </p>

              <button className="cta">
                <span className="mail">✉</span> Get in the loop!
              </button>
            </div>
          </div>

          {/* bottom bar */}
          <div className="footer-bottom">
            <div className="bbb">
              <div className="bbb-badge">ACCREDITED<br/>BUSINESS</div>
            </div>

            <nav className="legal" aria-label="Legal">
              <a href="/privacy">Privacy Policy</a>
              <span> | </span>
              <a href="/terms">Terms &amp; Conditions</a>
              <span> | </span>
              <a href="/accessibility">Accessibility Statement</a>
            </nav>

            <div className="copy">
              © {year} Your Brand. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
