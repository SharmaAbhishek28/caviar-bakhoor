"use client";

import { useState, type FormEvent } from "react";
import { CAREER_FORM } from "@/data/career";
import { submitEnquiry } from "@/lib/submitEnquiry";

/**
 * The application form on /career, in the enquiry form's style. Native
 * validation for the required fields; an optional CV (PDF or Word, up to
 * 5 MB). Posts through submitEnquiry, the one stub the developer replaces.
 */
type Status = "idle" | "sending" | "sent" | "error";

export function CareerForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [cvName, setCvName] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const file = data.get("cv");
    const cv = file instanceof File && file.size > 0 ? file : null;
    if (cv && cv.size > CAREER_FORM.cvMaxMb * 1024 * 1024) {
      setStatus("error");
      setError(CAREER_FORM.tooLarge);
      return;
    }
    setStatus("sending");
    setError(null);

    const result = await submitEnquiry({
      kind: "career",
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      city: String(data.get("city") ?? ""),
      role: String(data.get("role") ?? ""),
      link: String(data.get("link") ?? ""),
      message: String(data.get("message") ?? ""),
      cv,
    });

    if (result.ok) {
      setStatus("sent");
      form.reset();
    } else {
      setStatus("error");
      setError(result.error);
    }
  }

  return (
    <section className="pol-section career" aria-labelledby="career-apply">
      <span className="pol-rule" aria-hidden />
      <h2 id="career-apply" className="pol-section-title">
        {CAREER_FORM.heading}
      </h2>

      {status === "sent" ? (
        <p className="enquiry-success" role="status">
          {CAREER_FORM.success}
        </p>
      ) : (
        <form className="enquiry career-form" onSubmit={onSubmit}>
          <p className="type-body career-intro">{CAREER_FORM.intro}</p>

          <div className="enquiry-grid career-grid">
            <Field name="name" label="Name" required autoComplete="name" />
            <Field name="email" label="Email" type="email" required autoComplete="email" />
            <Field name="phone" label="Phone" type="tel" autoComplete="tel" />
            <Field name="city" label="City" autoComplete="address-level2" />
            <Field name="role" label="Role you are interested in" required />
            <Field name="link" label="Portfolio or LinkedIn" type="url" autoComplete="url" />
          </div>

          <label className="career-cv">
            <input
              type="file"
              name="cv"
              accept={CAREER_FORM.cvAccept}
              onChange={(e) => setCvName(e.currentTarget.files?.[0]?.name ?? null)}
            />
            <span className="career-cv-button">Attach CV</span>
            <span className="career-cv-name">
              {cvName ?? `PDF or Word, up to ${CAREER_FORM.cvMaxMb} MB`}
            </span>
          </label>

          <div className="enquiry-field enquiry-field--area">
            <label htmlFor="career-message" className="sr-only">
              Message (required)
            </label>
            <textarea id="career-message" name="message" required rows={5} placeholder="Tell us about yourself*" />
          </div>

          {error ? (
            <p className="enquiry-error" role="alert">
              {error}
            </p>
          ) : null}

          <button type="submit" className="enquiry-submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : CAREER_FORM.submitLabel}
          </button>
        </form>
      )}
    </section>
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
  const id = `career-${name}`;
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
