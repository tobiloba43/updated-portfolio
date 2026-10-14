import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ContactForm from "./contact-form";
import BrandWordmark from "../components/brand-wordmark";

export const metadata: Metadata = {
  title: "Contact Erinle Tobiloba",
  description: "Get in touch with Erinle Tobiloba about your next digital project.",
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <header className="contact-page-header">
        <Link className="contact-back" href="/">
          <ArrowLeft aria-hidden="true" size={16} />
          <span>Back to portfolio</span>
        </Link>
        <BrandWordmark className="contact-page-wordmark" href="/" />
        <span className="contact-page-index">CONTACT / 01</span>
      </header>

      <div className="contact-page-layout">
        <section className="contact-page-intro">
          <p className="eyebrow"><span className="status-dot" /> LET&apos;S START WITH HELLO</p>
          <h1>Good things<br />start with a<br /><span>conversation.</span></h1>
          <p className="contact-page-copy">
            Share a few details and I&apos;ll be ready to pick things up with you on WhatsApp.
          </p>
          <div className="contact-direct">
            <span className="contact-direct-label">REACH ME DIRECTLY</span>
            <a href="https://wa.me/2349135713212" target="_blank" rel="noreferrer">
              +234 913 571 3212 <ArrowUpRight aria-hidden="true" size={15} />
            </a>
          </div>
          <div className="contact-page-mark" aria-hidden="true"><span>ET</span><i /></div>
        </section>

        <section className="contact-form-panel" aria-labelledby="contact-form-title">
          <div className="contact-form-heading">
            <span className="contact-form-step">01 <i /> 03</span>
            <p className="eyebrow">A few details first</p>
            <h2 id="contact-form-title">Tell me about you.</h2>
            <p>Your details will be added to a WhatsApp message for you to review and send.</p>
          </div>
          <ContactForm />
          <div className="contact-form-foot"><span>PRIVATE BY DEFAULT</span><span>OPENS WHATSAPP ↗</span></div>
        </section>
      </div>

      <footer className="contact-page-footer">
        <span>ERINLE TOBILOBA · FRONTEND DEVELOPER</span>
        <Link href="/">Back to the good stuff <ArrowUpRight aria-hidden="true" size={14} /></Link>
      </footer>
    </main>
  );
}