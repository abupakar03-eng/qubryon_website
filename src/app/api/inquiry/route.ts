import nodemailer from "nodemailer";

/**
 * Receives every website inquiry (contact form, talent requests, consultation
 * bookings) and emails it to the team over SMTP.
 *
 * Configure with environment variables (never commit them):
 *   SMTP_HOST, SMTP_PORT (465 = SSL, 587 = STARTTLS), SMTP_USER, SMTP_PASS,
 *   INQUIRY_TO   – where inquiries are delivered (e.g. contact@qubryon.com)
 *   INQUIRY_FROM – optional sender, defaults to SMTP_USER
 */

const KINDS = {
  contact: "Project inquiry",
  talent: "Talent request",
  consultation: "Consultation request",
} as const;
type Kind = keyof typeof KINDS;

const MAX_FIELDS = 20;
const MAX_LEN = 5000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FALLBACK = "Please email us directly at contact@qubryon.com.";

function bad(status: number, error: string) {
  return Response.json({ error }, { status });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return bad(400, "Invalid request.");
  }

  const { kind, fields } = (body ?? {}) as { kind?: string; fields?: Record<string, unknown> };
  if (!kind || !(kind in KINDS) || !fields || typeof fields !== "object") {
    return bad(400, "Invalid request.");
  }

  // Honeypot: real visitors never fill the hidden "website" field
  if (typeof fields.website === "string" && fields.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const entries = Object.entries(fields)
    .filter(([key]) => key !== "website")
    .slice(0, MAX_FIELDS)
    .map(([key, value]) => [key, String(value ?? "").slice(0, MAX_LEN).trim()] as const);
  const data = Object.fromEntries(entries);

  const name = data.name ?? "";
  const email = data.email ?? "";
  if (!name) return bad(422, "Please enter your name.");
  if (!EMAIL_RE.test(email)) return bad(422, "Please enter a valid email address.");

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, INQUIRY_TO, INQUIRY_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !INQUIRY_TO) {
    console.error("[inquiry] SMTP is not configured; set SMTP_HOST, SMTP_USER, SMTP_PASS and INQUIRY_TO.");
    return bad(503, `Our form isn't connected yet. ${FALLBACK}`);
  }

  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const label = KINDS[kind as Kind];
  const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").slice(0, 120);
  const text = [
    `${label} from the Qubryon website`,
    "",
    ...entries.map(([key, value]) => `${key}: ${value || "—"}`),
    "",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: INQUIRY_FROM || SMTP_USER,
      to: INQUIRY_TO,
      replyTo: email,
      subject: `[Qubryon] ${label} — ${oneLine(name)}`,
      text,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[inquiry] send failed:", err);
    return bad(502, `We couldn't send your message right now. ${FALLBACK}`);
  }
}
