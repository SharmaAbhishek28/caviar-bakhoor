import type { Metadata } from "next";
import { BizClients, BizCollabs, BizMade, BizOffer, BizOpener, BizProcess, BizStatement } from "@/components/business/BusinessSections";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { Credentials } from "@/components/home/08-Credentials";
import { Container, Reveal } from "@/components/ui";
import { BUSINESS } from "@/data/business";

export const metadata: Metadata = {
  title: "Caviar Bakhoor Manufacturing & Private Label | Elixir",
  description:
    "Elixir develops and manufactures Caviar Bakhoor for perfume houses, luxury brands and private label.",
};

/**
 * /for-business — eight sections: opener, statement, who we work with,
 * what we offer, process, made for your brand, collaborations, enquiry;
 * then the credentials strip and the layout's footer. Metadata per
 * docs/content.md § Metadata.
 */
export default function ForBusinessPage() {
  return (
    <>
      <BizOpener />
      <BizStatement />
      <BizClients />
      <BizOffer />
      <BizProcess />
      <BizMade />
      <BizCollabs />
      <section id="enquire" className="biz-enquiry" data-label="Enquire">
        <Container>
          <Reveal className="biz-enquiry-head">
            <h2 className="biz-enquiry-title">{BUSINESS.enquiry.title}</h2>
            <p className="type-body">{BUSINESS.enquiry.line}</p>
          </Reveal>
          <Reveal className="contact-form">
            <EnquiryForm />
          </Reveal>
        </Container>
      </section>
      <Credentials />
    </>
  );
}
