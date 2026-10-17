// ─────────────────────────────────────────────────────────────────────────────
// Legal details for the Impressum (/impressum) and the privacy page (/datenschutz).
// Edit the details ONCE here; both pages read them from this file.
// A field that contains "[" is shown on the page as a red placeholder.
// ─────────────────────────────────────────────────────────────────────────────

export const LEGAL = {
  /** Full legal name of the person running the business (Freiberufler). */
  name: "Kareem Abdelwahab",
  /** Business name as used on the website and in e-mails. */
  businessName: "K4-Engineering",
  /** Short description of the activity (shown under the name). */
  activity: "Freiberuflicher Ingenieur – Entwicklung interaktiver 3D-Prototypen (Hardware und Software)",
  activityEn: "Freelance engineer – development of interactive 3D prototypes, hardware and software",

  /** Street and house number of the address that can receive post (ladungsfähige Anschrift). */
  street: "Ebereschenstraße 13",
  /** Postcode. */
  zip: "86179",
  city: "Augsburg",
  country: "Deutschland",
  countryEn: "Germany",

  email: "kareem@k4-engineering.eu",
  phone: "+49 155 10316332",

  /** VAT ID (USt-IdNr.). Leave "" if you have none. */
  vatId: "DE363351250",

  /** Date shown as "Stand" on both pages. */
  updated: "Oktober 2026",
  updatedEn: "October 2026",
} as const;

/** true while a value still contains a "[…]" placeholder. */
export function isPlaceholder(value: string): boolean {
  return value.includes("[");
}
