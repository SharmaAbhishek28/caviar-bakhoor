/**
 * src/lib/submitEnquiry.ts
 *
 * The single place every form on the site posts to — CLAUDE.md handover
 * rules. The Shopify developer replaces the body of this one function with
 * the real destination (a Shopify app proxy, a form service, an email
 * endpoint) and nothing else changes.
 *
 * Today it is a stub: it resolves after a short delay so the UI's pending
 * and success states can be built and tested, and logs the payload in
 * development so a submission is visible in the console.
 */

export type EnquiryPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  businessType: string;
  quantity: string;
  message: string;
  /** How the enquirer would like to be contacted. */
  contactBy: string[];
};

/** An application from the /career form. */
export type CareerPayload = {
  kind: "career";
  name: string;
  email: string;
  phone: string;
  city: string;
  role: string;
  /** Portfolio or LinkedIn. */
  link: string;
  message: string;
  /** The attached CV, sent as a file by whatever replaces the stub. */
  cv: File | null;
};

export type EnquiryResult = { ok: true } | { ok: false; error: string };

export async function submitEnquiry(payload: EnquiryPayload | CareerPayload): Promise<EnquiryResult> {
  if (process.env.NODE_ENV !== "production") {
    console.info("[submitEnquiry] stub received", payload);
  }
  await new Promise((r) => setTimeout(r, 600));
  return { ok: true };
}
