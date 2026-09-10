import type { Metadata } from "next";
import Link from "next/link";
import { Container, MarkedProse } from "@/components/ui";
import { Credentials } from "@/components/home/08-Credentials";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { CONTACT } from "@/data/enquiry";
import { LEGAL } from "@/data/nav";

export const metadata: Metadata = {
  title: "Contact — Create your own Caviar Bakhoor | Elixir Signature Scents",
  description:
    "Enquire about Caviar Bakhoor for your brand: perfume houses, luxury brands, hotel groups and private label. Your scent, your packaging, our technology.",
};

/**
 * /contact — a centred opener and the enquiry form, the contact details and
 * legal links beneath, then the credentials strip; the layout adds the
 * footer. Follows the reference's contact page structure.
 */
export default function ContactPage() {
  const legal = LEGAL.filter((l) => l.href === "/privacy" || l.href === "/terms");

  return (
    <>
      <section className="contact" data-label="Contact">
        <Container>
          <div className="contact-head">
            <h1 className="contact-headline">
              {CONTACT.headline.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <MarkedProse
              className="type-body contact-copy"
              text={CONTACT.paragraph}
              em={CONTACT.em}
            />
          </div>

          <div className="contact-form">
            <EnquiryForm />
          </div>

          <address className="contact-details">
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <p>
              {CONTACT.phones.map((phone, i) => (
                <span key={phone}>
                  {i > 0 ? <span aria-hidden className="contact-sep">·</span> : null}
                  <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
                </span>
              ))}
            </p>
            <p className="contact-confirm" role="note">
              {CONTACT.detailsConfirm}
            </p>
          </address>

          <ul className="contact-legal">
            {legal.map((item, i) => (
              <li key={item.href}>
                {i > 0 ? <span aria-hidden className="contact-sep">|</span> : null}
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Credentials />
    </>
  );
}
