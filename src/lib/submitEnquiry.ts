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

export type EnquiryResult = { ok: true } | { ok: false; error: string };

export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult> {
  if (process.env.NODE_ENV !== "production") {
    console.info("[submitEnquiry] stub received", payload);
  }
  await new Promise((r) => setTimeout(r, 600));
  return { ok: true };
}
