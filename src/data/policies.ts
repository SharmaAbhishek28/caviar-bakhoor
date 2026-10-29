/**
 * src/data/policies.ts
 *
 * The customer pages linked from the footer: shipping, returns, payment
 * methods, career, privacy, terms and the help centre. One shape, one page
 * component, typed data (CLAUDE.md).
 *
 * Text: the parent house's own pages on elixirperfumery.com (site owner,
 * 2026-10-29: "add these pages, all same content, change the name of Elixir
 * to Caviar Bakhoor"). Copied as published, with the brand name changed.
 * The email address, the legal entity (Jiyo Fragrances) and its address are
 * facts, not the brand, and stay as they are.
 *
 * A body item is a paragraph (string), a bullet list (string[]) or a
 * question and answer. Inline links are written [text](url).
 *
 * A policy with no section text is unpublished: its route 404s and its
 * link is hidden (site owner, 2026-10-18).
 */

export type PolicyBlock = string | string[] | { q: string; a: string };

export type PolicySection = { heading: string; body: PolicyBlock[] | null };

export type Policy = {
  slug: string;
  title: string;
  /** The small line above the title. Defaults to "Policies". */
  eyebrow?: string;
  /** The short word in the side labels. Defaults to "Policies". */
  label?: string;
  /** A form after the sections. */
  form?: "career";
  lede: string | null;
  updated: string | null;
  sections: PolicySection[];
};

const EMAIL = "[contact@elixirperfumery.com](mailto:contact@elixirperfumery.com)";

export const POLICIES: Policy[] = [
  {
    slug: "shipping",
    title: "Shipping and delivery",
    lede:
      "At Caviar Bakhoor, every order is prepared with exceptional care to ensure that your experience from browsing our fragrances to receiving your package is seamless, refined, and truly indulgent. Each product is handled meticulously in our studio before being dispatched through our trusted courier partners, ensuring that the elegance of our brand is reflected at every step of the delivery journey.",
    updated: null,
    sections: [
      {
        heading: "Processing time",
        body: [
          "All orders placed with Caviar Bakhoor are processed within one to two business days. Orders received on weekends or public holidays are processed on the next working day. Once your order has been inspected, packaged, and prepared for dispatch, it is handed over to our logistics partners for delivery across India and select international destinations. Our team works diligently to maintain swift processing without compromising on the craftsmanship and safety standards that define our brand.",
        ],
      },
      {
        heading: "Delivery timeline",
        body: [
          "Delivery timelines vary depending on your location. Standard delivery within India typically requires three to five business days, while customers in major metropolitan cities may have access to faster delivery options, which can arrive within one to two business days. For custom-made, personalized, or limited-edition products, preparation and delivery may require seven to ten business days, as these items often involve specialised craftsmanship or additional production steps.",
          "Delivery durations may also vary depending on courier availability, festive seasons, local regulations, or operational delays beyond our control. Estimated timelines provided at checkout serve as an approximate guide, and we strive to uphold them while maintaining consistency and reliability.",
        ],
      },
      {
        heading: "Order tracking",
        body: [
          "Once your order has been dispatched, you will receive an email containing your tracking details. This allows you to monitor your shipment in real time as it moves through the courier network. Should you experience any issues or require assistance with tracking, our support team will gladly assist you. We are always available to ensure that you remain informed and supported at every stage of the delivery process.",
        ],
      },
      {
        heading: "Packaging standards",
        body: [
          "Each Caviar Bakhoor product is packaged with exceptional attention to detail. We use secure, protective, and eco-conscious materials designed to safeguard your fragrance throughout transit. Every element of our packaging from the structural design to the finishing touches reflects our commitment to a luxurious and responsible unboxing experience.",
        ],
      },
      {
        heading: "Shipping charges",
        body: [
          "Shipping charges are calculated at checkout based on your delivery location, courier availability, and the shipping method selected. During special promotions, launches, or seasonal campaigns, complimentary shipping may be offered for eligible orders. The final shipping amount will always be stated clearly before payment.",
        ],
      },
      {
        heading: "International shipping",
        body: [
          "We proudly ship to select international destinations. International shipping fees, delivery timelines, and courier availability vary depending on the destination country and service provider.",
          "For select countries, international shipments may be sent through FedEx under the DDP (Delivered Duty Paid) model. Under this arrangement, the shipping charges you pay at checkout may include the base shipping cost, applicable import duties and taxes, customs clearance processes, courier disbursement or advancement fees, and any additional courier-specific surcharges such as handling fees, dimensional charges, remote area fees, or weekend delivery adjustments. These inclusions ensure a more seamless international delivery wherever possible, minimizing the likelihood of unexpected charges upon arrival.",
        ],
      },
      {
        heading: "Customs disclaimer",
        body: [
          "Customs regulations differ across countries, and the customer is responsible for understanding the import policies applicable in their region. Caviar Bakhoor is not responsible for customs duties, tariffs, taxes, storage fees, inspection fees, or any other charges imposed by your country’s customs authorities. If such fees arise, they must be paid directly by the customer in order to facilitate clearance and delivery.",
          "Failure to settle customs charges may result in delays, retention of the package by customs authorities, or return of the parcel to us. Should the item be returned due to unpaid customs duties, reshipping fees and additional handling charges may apply.",
        ],
      },
      {
        heading: "Delivery delays and issues",
        body: [
          "Although we work closely with reliable courier partners to ensure timely delivery, occasional delays may occur due to unforeseen circumstances such as weather disturbances, public holidays, courier capacity constraints, or accessibility limitations in certain locations. If you encounter issues such as delayed delivery, damaged products, or a lost shipment, we request that you notify us within three days of receiving your order (or within three days of the expected delivery date, in case of non-delivery). Please include your order number and any supporting photographs, as this enables our team to respond promptly and resolve the matter effectively.",
        ],
      },
    ],
  },
  {
    slug: "returns",
    title: "Returns and exchange",
    lede: `If you are unhappy with your purchase, Caviar Bakhoor will be pleased to accept items for return or exchange that meet our company's requirements. If you have any questions or need assistance, contact us at ${EMAIL}.`,
    updated: null,
    sections: [
      {
        heading: "Return policy",
        body: [
          [
            "We accept return or exchange requests within 14 calendar days of the delivery date. Any request made more than 14 days after delivery will not be accepted.",
            "Only products in unopened, original packaging that have not been tampered with or used may be returned for a refund or exchange.",
            "If you return an order in full and received a complimentary sample, the sample must also be returned, otherwise a deduction will be applied to your refund.",
            "Products damaged or defective upon delivery may be returned or exchanged. Please inspect your items upon receipt and contact us immediately with photos.",
            "Returns are only accepted for purchases made on caviarbakhoor.com. Refunds will be issued to the original payment method.",
            "Orders purchased with a voucher will receive a new voucher with the same expiration date as the original, if eligible.",
            "Shipping costs are non-refundable except for items received as damaged or faulty.",
            "Sale, special orders, engraved, or personalized items are not eligible for returns.",
            "Return products must be sent with the original box, packing materials, and a copy of the shipping invoice. Caviar Bakhoor is not responsible for lost, stolen, or mishandled return shipments.",
          ],
        ],
      },
      {
        heading: "Faulty goods",
        body: [
          `Any items received broken or faulty will be exchanged or refunded. Please email ${EMAIL} and we will assist you with your claim, including a courtesy return label.`,
        ],
      },
      {
        heading: "How to make a return",
        body: [
          { q: "Contact us", a: `Contact us at ${EMAIL} or via live chat to initiate your return, providing photos of the package.` },
          { q: "Receive return label", a: "Once approved, you'll receive a return label." },
          { q: "Pack and ship", a: "Carefully repack items in their original packaging (including outer delivery box) with sufficient protection." },
          { q: "Ship your return", a: "Attach the return label to your package and drop it off at your nearest shipping location." },
          { q: "Receive your refund", a: "Once we receive and inspect your return, your refund will be processed within 5-7 business days." },
        ],
      },
      { heading: "Need help?", body: [`Email us at ${EMAIL}.`] },
    ],
  },
  {
    slug: "payment-methods",
    title: "Payment methods",
    lede: "We accept the following payment methods for your convenience.",
    updated: null,
    sections: [
      { heading: "Credit and debit cards", body: ["Visa, Mastercard, American Express, and Discover."] },
      { heading: "Digital wallets", body: ["Apple Pay, Google Pay, and PayPal."] },
      { heading: "Bank transfer", body: ["Direct bank transfers for larger orders."] },
      { heading: "Buy now, pay later", body: ["Klarna, Afterpay, and Shop Pay Installments."] },
    ],
  },
  {
    slug: "career",
    title: "Career",
    eyebrow: "Be a part of Caviar Bakhoor",
    label: "Career",
    form: "career",
    lede: null,
    updated: null,
    sections: [
      {
        heading: "Build your future with Caviar Bakhoor",
        body: [
          "At Caviar Bakhoor, work is a quiet craft practiced behind the scenes of an increasingly public world. Here, a small circle of creators, storytellers, and strategists come together to shape experiences where fragrance becomes dialogue and scent becomes identity.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy policy",
    lede:
      "Caviar Bakhoor operates this store and website, including all related information, content, features, tools, products and services, in order to provide you, the customer, with a curated shopping experience (the \"Services\"). Caviar Bakhoor is powered by Shopify, which enables us to provide the Services to you. This Privacy Policy describes how we collect, use, and disclose your personal information when you visit, use, or make a purchase or other transaction using the Services or otherwise communicate with us. If there is a conflict between our Terms of Service and this Privacy Policy, this Privacy Policy controls with respect to the collection, processing, and disclosure of your personal information.",
    updated: "August 12, 2026",
    sections: [
      {
        heading: "Before you read",
        body: [
          "Please read this Privacy Policy carefully. By using and accessing any of the Services, you acknowledge that you have read this Privacy Policy and understand the collection, use, and disclosure of your information as described in this Privacy Policy.",
        ],
      },
      {
        heading: "Personal information we collect or process",
        body: [
          "When we use the term \"personal information,\" we are referring to information that identifies or can reasonably be linked to you or another person. Personal information does not include information that is collected anonymously or that has been de-identified, so that it cannot identify or be reasonably linked to you. We may collect or process the following categories of personal information, including inferences drawn from this personal information, depending on how you interact with the Services, where you live, and as permitted or required by applicable law:",
          [
            "Contact details including your name, address, billing address, shipping address, phone number, and email address.",
            "Financial information including credit card, debit card, and financial account numbers, payment card information, financial account information, transaction details, form of payment, payment confirmation and other payment details.",
            "Account information including your username, password, security questions, preferences and settings.",
            "Transaction information including the items you view, put in your cart, add to your wishlist, or purchase, return, exchange or cancel and your past transactions.",
            "Communications with us including the information you include in communications with us, for example, when sending a customer support inquiry.",
            "Device information including information about your device, browser, or network connection, your IP address, and other unique identifiers.",
            "Usage information including information regarding your interaction with the Services, including how and when you interact with or navigate the Services.",
          ],
        ],
      },
      {
        heading: "Personal information sources",
        body: [
          "We may collect personal information from the following sources:",
          [
            "Directly from you including when you create an account, visit or use the Services, communicate with us, or otherwise provide us with your personal information;",
            "Automatically through the Services including from your device when you use our products or services or visit our websites, and through the use of cookies and similar technologies;",
            "From our service providers including when we engage them to enable certain technology and when they collect or process your personal information on our behalf;",
            "From our partners or other third parties.",
          ],
        ],
      },
      {
        heading: "How we use your personal information",
        body: [
          "Depending on how you interact with us or which of the Services you use, we may use personal information for the following purposes:",
          [
            "Provide, Tailor, and Improve the Services. We use your personal information to provide you with the Services, including to perform our contract with you, to process your payments, to fulfill your orders, to remember your preferences and items you are interested in, to send notifications to you related to your account, to process purchases, returns, exchanges or other transactions, to create, maintain and otherwise manage your account, to arrange for shipping, to facilitate any returns and exchanges, to enable you to post reviews, and to create a customized shopping experience for you, such as recommending products related to your purchases. This may include using your personal information to better tailor and improve the Services.",
            "Marketing and Advertising. We use your personal information for marketing and promotional purposes, such as to send marketing, advertising and promotional communications by email, text message or postal mail, and to show you online advertisements for products or services on the Services or other websites, including based on items you previously have purchased or added to your cart and other activity on the Services.",
            "Security and Fraud Prevention. We use your personal information to authenticate your account, to provide a secure payment and shopping experience, detect, investigate or take action regarding possible fraudulent, illegal, unsafe, or malicious activity, protect public safety, and to secure our services. If you choose to use the Services and register an account, you are responsible for keeping your account credentials safe. We highly recommend that you do not share your username, password or other access details with anyone else.",
            "Communicating with You. We use your personal information to provide you with customer support, to be responsive to you, to provide effective services to you and to maintain our business relationship with you.",
            "Legal Reasons. We use your personal information to comply with applicable law or respond to valid legal process, including requests from law enforcement or government agencies, to investigate or participate in civil discovery, potential or actual litigation, or other adversarial legal proceedings, and to enforce or investigate potential violations of our terms or policies.",
          ],
        ],
      },
      {
        heading: "How we disclose personal information",
        body: [
          "In certain circumstances, we may disclose your personal information to third parties for legitimate purposes subject to this Privacy Policy. Such circumstances may include:",
          [
            "With Shopify, vendors and other third parties who perform services on our behalf (e.g. IT management, payment processing, data analytics, customer support, cloud storage, fulfillment and shipping).",
            "With business and marketing partners to provide marketing services and advertise to you. For example, we use Shopify to support personalized advertising with third-party services based on your online activity with different merchants and websites. Our business and marketing partners will use your information in accordance with their own privacy notices. Depending on where you reside, you may have a right to direct us not to share information about you to show you targeted advertisements and marketing based on your online activity with different merchants and websites. You can exercise your rights to opt-out of those uses [here](https://privacy.shopify.com/en).",
            "When you direct, request us or otherwise consent to our disclosure of certain information to third parties, such as to ship you products or through your use of social media widgets or login integrations.",
            "With our affiliates or otherwise within our corporate group.",
            "In connection with a business transaction such as a merger or bankruptcy, to comply with any applicable legal obligations (including to respond to subpoenas, search warrants and similar requests), to enforce any applicable terms of service or policies, and to protect or defend the Services, our rights, and the rights of our users or others.",
          ],
        ],
      },
      {
        heading: "Relationship with Shopify",
        body: [
          "The Services are hosted by Shopify, which collects and processes personal information about your access to and use of the Services in order to provide and improve the Services for you. Information you submit to the Services will be transmitted to and shared with Shopify as well as third parties that may be located in countries other than where you reside, in order to provide and improve the Services for you. In addition, to help protect, grow, and improve our business, we use certain Shopify enhanced features that incorporate data and information obtained from your interactions with our Store, along with other merchants and with Shopify. To provide these enhanced features, Shopify may make use of personal information collected about your interactions with our store, along with other merchants, and with Shopify. In these circumstances, Shopify is responsible for the processing of your personal information, including for responding to your requests to exercise your rights over use of your personal information for these purposes. To learn more about how Shopify uses your personal information and any rights you may have, you can visit the [Shopify Consumer Privacy Policy](https://www.shopify.com/legal/privacy/app-users). Depending on where you live, you may exercise certain rights with respect to your personal information here: [Shopify Privacy Portal](https://privacy.shopify.com/en).",
        ],
      },
      {
        heading: "Third party websites and links",
        body: [
          "The Services may provide links to websites or other online platforms operated by third parties. If you follow links to sites not affiliated or controlled by us, you should review their privacy and security policies and other terms and conditions. We do not guarantee and are not responsible for the privacy or security of such sites, including the accuracy, completeness, or reliability of information found on these sites. Information you provide on public or semi-public venues, including information you share on third-party social networking platforms may also be viewable by other users of the Services and/or users of those third-party platforms without limitation as to its use by us or by a third party. Our inclusion of such links does not, by itself, imply any endorsement of the content on such platforms or of their owners or operators, except as disclosed on the Services.",
        ],
      },
      {
        heading: "Children's data",
        body: [
          "The Services are not intended to be used by children, and we do not knowingly collect any personal information about children under the age of majority in your jurisdiction. If you are the parent or guardian of a child who has provided us with their personal information, you may contact us using the contact details set out below to request that it be deleted. As of the Effective Date of this Privacy Policy, we do not have actual knowledge that we \"share\" or \"sell\" (as those terms are defined in applicable law) personal information of individuals under 16 years of age.",
        ],
      },
      {
        heading: "Security and retention of your information",
        body: [
          "Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee \"perfect security.\" In addition, any information you send to us may not be secure while in transit. We recommend that you do not use unsecure channels to communicate sensitive or confidential information to us.",
          "How long we retain your personal information depends on different factors, such as whether we need the information to maintain your account, to provide you with Services, comply with legal obligations, resolve disputes or enforce other applicable contracts and policies.",
        ],
      },
      {
        heading: "Your rights and choices",
        body: [
          "Depending on where you live, you may have some or all of the rights listed below in relation to your personal information. However, these rights are not absolute, may apply only in certain circumstances and, in certain cases, we may decline your request as permitted by law.",
          [
            "Right to Access / Know. You may have a right to request access to personal information that we hold about you.",
            "Right to Delete. You may have a right to request that we delete personal information we maintain about you.",
            "Right to Correct. You may have a right to request that we correct inaccurate personal information we maintain about you.",
            "Right of Portability. You may have a right to receive a copy of the personal information we hold about you and to request that we transfer it to a third party, in certain circumstances and with certain exceptions.",
            "Right to Opt out of Sale or Sharing for Targeted Advertising. Depending on where you reside, you may have a right to opt out of the \"sale\" or \"share\" of your personal information or to opt out of the processing of your personal information for purposes considered to be \"targeted advertising\", as defined in applicable privacy laws. You can exercise your rights to opt-out of those uses [here](https://privacy.shopify.com/en). Please note that if you visit our website with the Global Privacy Control opt-out preference signal enabled, depending on where you are, we will automatically treat this as a request to opt-out for the device and browser that you use to visit the website. If we are able to associate the device sending the signal to a Shopify account, we will apply the opt out request to the account as well. To learn more about Global Privacy Control, you can visit [globalprivacycontrol.org](https://globalprivacycontrol.org/). Other than the Global Privacy Control, we do not recognize other \"Do Not Track\" signals that may be sent from your web browser or device.",
            "Managing Communication Preferences. We may send you promotional emails, and you may opt out of receiving these at any time by using the unsubscribe option displayed in our emails to you. If you opt out, we may still send you non-promotional emails, such as those about your account or orders that you have made.",
          ],
          "If you reside in the UK or European Economic Area, and subject to exceptions and limitations provided by local law, you may exercise the following rights in addition to the rights outlined above:",
          [
            "Objection to Processing and Restriction of Processing: You may have the right to ask us to stop or restrict our processing of personal information for certain purposes.",
            "Withdrawal of Consent: Where we rely on consent to process your personal information, you have the right to withdraw this consent. If you withdraw your consent, this will not affect the lawfulness of any processing based on your consent before its withdrawal.",
          ],
          "You may exercise any of these rights where indicated on the Services or by contacting us using the contact details provided below. To learn more about how Shopify uses your personal information and any rights you may have, including rights related to data processed by Shopify, you can visit [privacy.shopify.com](https://privacy.shopify.com/en).",
          "We will not discriminate against you for exercising any of these rights. We may need to verify your identity before we can process your requests, as permitted or required under applicable law. In accordance with applicable laws, you may designate an authorized agent to make requests on your behalf to exercise your rights. Before accepting such a request from an agent, we will require that the agent provide proof you have authorized them to act on your behalf, and we may need you to verify your identity directly with us. We will respond to your request in a timely manner as required under applicable law.",
        ],
      },
      {
        heading: "Complaints",
        body: [
          "If you have complaints about how we process your personal information, please contact us using the contact details provided below. Depending on where you live, you may have the right to appeal our decision by contacting us using the contact details set out below, or lodge your complaint with your local data protection authority. For the EEA, you can find a list of the responsible data protection supervisory authorities [here](https://edpb.europa.eu/about-edpb/about-edpb/members).",
        ],
      },
      {
        heading: "International transfers",
        body: [
          "Please note that we may transfer, store and process your personal information outside the country you live in.",
          "If we transfer your personal information out of the European Economic Area or the United Kingdom, we will rely on recognized transfer mechanisms like the European Commission's Standard Contractual Clauses, or any equivalent contracts issued by the relevant competent authority of the UK, as relevant, unless the data transfer is to a country that has been determined to provide an adequate level of protection.",
        ],
      },
      {
        heading: "Changes to this privacy policy",
        body: [
          "We may update this Privacy Policy from time to time, including to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on this website, update the \"Last updated\" date and provide notice as required by applicable law.",
        ],
      },
      {
        heading: "Contact",
        body: [
          `Should you have any questions about our privacy practices or this Privacy Policy, or if you would like to exercise any of the rights available to you, please call [+91 910 847 3217](tel:+919108473217) or email us at ${EMAIL} or contact us at Jiyo Fragrances, 45 7th Cross Road Jayachamarajendra Industrial Estate Kumaraswamy Layout, 560111 Bengaluru KA, India.`,
          "For the purpose of applicable data protection laws, we are the data controller of your personal information.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms and conditions",
    lede:
      "These Terms and Conditions, along with privacy policy or other terms (“Terms”) constitute a binding agreement by and between JIYO FRAGRANCES, (“Website Owner” or “we” or “us” or “our”) and you (“you” or “your”) and relate to your use of our website, goods (as applicable) or services (as applicable) (collectively, “Services”).",
    updated: "10-11-2025",
    sections: [
      {
        heading: "Your agreement",
        body: [
          "By using our website and availing the Services, you agree that you have read and accepted these Terms (including the Privacy Policy). We reserve the right to modify these Terms at any time and without assigning any reason. It is your responsibility to periodically review these Terms to stay informed of updates.",
        ],
      },
      {
        heading: "Terms of use",
        body: [
          "The use of this website or availing of our Services is subject to the following terms of use:",
          [
            "To access and use the Services, you agree to provide true, accurate and complete information to us during and after registration, and you shall be responsible for all acts done through the use of your registered account.",
            "Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials offered on this website or through the Services, for any specific purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.",
            "Your use of our Services and the website is solely at your own risk and discretion. You are required to independently assess and ensure that the Services meet your requirements.",
            "The contents of the Website and the Services are proprietary to Us and you will not have any authority to claim any intellectual property rights, title, or interest in its contents.",
            "You acknowledge that unauthorized use of the Website or the Services may lead to action against you as per these Terms or applicable laws.",
            "You agree to pay us the charges associated with availing the Services.",
            "You agree not to use the website and/or Services for any purpose that is unlawful, illegal or forbidden by these Terms, or Indian or local laws that might apply to you.",
            "You agree and acknowledge that website and the Services may contain links to other third party websites. On accessing these links, you will be governed by the terms of use, privacy policy and such other policies of such third party websites.",
            "You understand that upon initiating a transaction for availing the Services you are entering into a legally binding and enforceable contract with the us for the Services.",
            "You shall be entitled to claim a refund of the payment made by you in case we are not able to provide the Service. The timelines for such return and refund will be according to the specific Service you have availed or within the time period provided in our policies (as applicable). In case you do not raise a refund claim within the stipulated time, then this would make you ineligible for a refund.",
            "Notwithstanding anything contained in these Terms, the parties shall not be liable for any failure to perform an obligation under these Terms if performance is prevented or delayed by a force majeure event.",
          ],
        ],
      },
      {
        heading: "Governing law",
        body: [
          "These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and construed in accordance with the laws of India.",
          "All disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in BANGALORE SOUTH, KARNATAKA.",
        ],
      },
      {
        heading: "Contact",
        body: ["All concerns or communications relating to these Terms must be communicated to us using the contact information provided on this website."],
      },
    ],
  },
  {
    slug: "help-centre",
    title: "Help centre",
    eyebrow: "Help",
    label: "Help",
    lede: null,
    updated: null,
    sections: [
      {
        heading: "Product information",
        body: [
          { q: "What makes Caviar Bakhoor unique?", a: "Caviar Bakhoor is crafted with rare ingredients, artisanal techniques, and inspired by stories from around the globe. Each scent represents a fusion of luxury, creativity, and tradition." },
          { q: "Are your fragrances unisex?", a: "Yes, our range is designed for all, with sophisticated profiles that suit unique tastes and personalities." },
        ],
      },
      {
        heading: "Orders and payments",
        body: [
          { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, UPI, NetBanking, and secure wallet payments." },
          { q: "Is my payment information safe?", a: "Yes, all transactions are processed securely through top-tier payment providers and protected via SSL encryption." },
        ],
      },
      {
        heading: "Shipping and delivery",
        body: [
          { q: "Where do you ship?", a: "We ship across India and select international destinations." },
          { q: "How long is delivery?", a: "Orders are typically shipped within 2 business days, with standard delivery times of 3 to 7 days within India." },
        ],
      },
      {
        heading: "Returns and exchanges",
        body: [
          { q: "What is your return policy?", a: "Unopened bottles can be returned within 7 days of delivery. For detailed returns/exchange eligibility and process, visit our [Returns policy](/returns)." },
          { q: "What should I do if I receive a damaged item?", a: "Contact us within 24 hours of delivery with photos, and our team will assist promptly." },
        ],
      },
      {
        heading: "Account and order tracking",
        body: [
          { q: "Do I need an account to order?", a: "Accounts are optional, but recommended for faster checkout and order tracking." },
          { q: "How do I track my order?", a: "Login to your account or use the tracking link sent via email upon dispatch." },
        ],
      },
      {
        heading: "Contact support",
        body: [`We are here to help! For any other inquiries, feel free to reach out via email or use the contact form on our website: ${EMAIL}.`],
      },
    ],
  },
];

/** True once at least one section has text. */
export const isPublished = (p: Policy) => p.sections.some((s) => s.body && s.body.length > 0);

export const PUBLISHED_POLICIES = POLICIES.filter(isPublished);

export const getPolicy = (slug: string): Policy | undefined => PUBLISHED_POLICIES.find((p) => p.slug === slug);
