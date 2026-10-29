/**
 * src/data/career.ts
 *
 * The application form on /career. Labels and messages only, as typed
 * data (CLAUDE.md); the form posts through submitEnquiry like every other.
 */

export const CAREER_FORM = {
  heading: "Apply",
  intro: "Tell us about yourself and the work you would like to do.",
  /** Largest CV accepted, in megabytes. */
  cvMaxMb: 5,
  cvAccept: ".pdf,.doc,.docx",
  submitLabel: "Send application",
  success: "Thank you. Your application has been sent.",
  tooLarge: "Your CV is larger than 5 MB. Please attach a smaller file.",
};
