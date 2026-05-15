export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type BrevoAttachment = { name: string; content: string };

export type BrevoEmailInput = {
  to: { email: string; name?: string };
  replyTo?: { email: string; name?: string };
  senderName?: string;
  subject: string;
  htmlContent: string;
  attachments?: BrevoAttachment[];
  headers?: Record<string, string>;
};

export async function sendBrevoEmail(
  input: BrevoEmailInput,
): Promise<{ ok: boolean }> {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  if (!apiKey || !senderEmail) {
    console.error("[brevo] faltan BREVO_API_KEY o BREVO_SENDER_EMAIL");
    return { ok: false };
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { name: input.senderName ?? "Kodi", email: senderEmail },
        to: [input.to],
        ...(input.replyTo ? { replyTo: input.replyTo } : {}),
        subject: input.subject,
        htmlContent: input.htmlContent,
        ...(input.attachments && input.attachments.length
          ? { attachment: input.attachments }
          : {}),
        ...(input.headers ? { headers: input.headers } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[brevo] HTTP ${res.status}:`, body.slice(0, 500));
    }
    return { ok: res.ok };
  } catch (e) {
    console.error("[brevo] fetch falló (red/timeout):", e);
    return { ok: false };
  }
}
