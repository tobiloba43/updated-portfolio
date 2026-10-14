"use client";

import type { FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";

const whatsappNumber = "2349135713212";

export default function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = [
      "Hello Erinle, I would like to start a conversation.",
      "",
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `Address / location: ${formData.get("address")}`,
    ].join("\n");

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <form className="whatsapp-form" onSubmit={handleSubmit}>
      <label className="form-field">
        <span>Your name</span>
        <input autoComplete="name" name="name" placeholder="e.g. Ada Okafor" required />
      </label>
      <label className="form-field">
        <span>Email address</span>
        <input autoComplete="email" name="email" type="email" placeholder="you@example.com" required />
      </label>
      <label className="form-field">
        <span>Address or location</span>
        <input autoComplete="street-address" name="address" placeholder="City, country" required />
      </label>
      <button className="whatsapp-submit" type="submit">
        Continue to WhatsApp <ArrowUpRight aria-hidden="true" size={17} />
      </button>
    </form>
  );
}