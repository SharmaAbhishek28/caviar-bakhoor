"use client";

import { useState, type FormEvent } from "react";
import { BUSINESS_TYPES, CONTACT, CONTACT_METHODS } from "@/data/enquiry";
import { submitEnquiry } from "@/lib/submitEnquiry";

/**
 * The enquiry form. Native validation for the required fields; the business
 * type is a single-select row of chips (radio inputs, visually hidden, so
 * keyboard and screen-reader behaviour is the browser's own); the contact
 * preference is a row of checkboxes.
 *
 * Posts through submitEnquiry — the one stub the Shopify developer replaces
 * — and swaps to the brief's success line on a good result.
 */
type Status = "idle" | "sending" | "sent" | "error";

export function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError(null);

    const result = await submitEnquiry({
      name: String(data.get("name") ?? ""),
      company: String(data.get("company") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      country: String(data.get("country") ?? ""),
      businessType: String(data.get("businessType") ?? ""),
      quantity: String(data.get("quantity") ?? ""),
      message: String(data.get("message") ?? ""),
      contactBy: data.getAll("contactBy").map(String),
    });

    if (result.ok) {
      setStatus("sent");
      form.reset();
    } else {
      setStatus("error");
      setError(result.error);
    }
  }

  if (status === "sent") {
    return (
      <p className="enquiry-success" role="status">
        {CONTACT.success}
      </p>
    );
  }

  return (
    <form className="enquiry" onSubmit={onSubmit} noValidate={false}>
      <div className="enquiry-grid">
        <Field name="name" label="Name" required autoComplete="name" />
        <Field name="company" label="Company" required autoComplete="organization" />
        <Field name="email" label="Email" type="email" required autoComplete="email" />
        <Field name="phone" label="Phone" type="tel" autoComplete="tel" />
        <Field name="country" label="Country" autoComplete="country-name" />
        <Field name="quantity" label="Estimated quantity" />
      </div>

      <fieldset className="enquiry-chips">
        <legend className="enquiry-legend">
          Business type <span aria-hidden>*</span>
        </legend>
        <div className="enquiry-chip-row">
          {BUSINESS_TYPES.map((type, i) => (
            <label key={type} className="enquiry-chip">
              <input type="radio" name="businessType" value={type} required={i === 0} />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="enquiry-field enquiry-field--area">
        <label htmlFor="enquiry-message" className="sr-only">
          Message (required)
        </label>
        <textarea
          id="enquiry-message"
          name="message"
          required
          rows={5}
          placeholder="Message*"
        />
      </div>

      <fieldset className="enquiry-checks">
        <legend className="enquiry-legend">How may we contact you?</legend>
        <div className="enquiry-check-row">
          {CONTACT_METHODS.map((method) => (
            <label key={method} className="enquiry-check">
              <input type="checkbox" name="contactBy" value={method} />
              <span aria-hidden className="enquiry-check-box" />
              <span>{method}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {error ? (
        <p className="enquiry-error" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" className="enquiry-submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : CONTACT.submitLabel}
      </button>
    </form>
  );
}

/** A text field whose label is the placeholder, with a real label for AT. */
function Field({
  name,
  label,
  type = "text",
  required = false,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  const id = `enquiry-${name}`;
  return (
    <div className="enquiry-field">
      <label htmlFor={id} className="sr-only">
        {label}
        {required ? " (required)" : ""}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={required ? `${label}*` : label}
      />
    </div>
  );
}
