export type InquiryKind = "contact" | "talent" | "consultation";

export type InquiryResult = { ok: true } | { ok: false; message: string };

/**
 * Sends a website inquiry to /api/inquiry. `fields` must include `name` and `email`;
 * pass the hidden honeypot value as `website`.
 */
export async function submitInquiry(kind: InquiryKind, fields: Record<string, string | boolean>): Promise<InquiryResult> {
  try {
    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, fields }),
    });
    if (res.ok) return { ok: true };
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    return { ok: false, message: data.error || "Something went wrong. Please email us at contact@qubryon.com." };
  } catch {
    return { ok: false, message: "We couldn't reach the server. Check your connection, or email contact@qubryon.com." };
  }
}
