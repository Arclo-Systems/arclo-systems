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
  subject: string;
  htmlContent: string;
  attachments?: BrevoAttachment[];
};

export async function sendBrevoEmail(
  input: BrevoEmailInput,
): Promise<{ ok: boolean }> {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  if (!apiKey || !senderEmail) return { ok: false };

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { name: "Kódi", email: senderEmail },
      to: [input.to],
      ...(input.replyTo ? { replyTo: input.replyTo } : {}),
      subject: input.subject,
      htmlContent: input.htmlContent,
      ...(input.attachments && input.attachments.length
        ? { attachment: input.attachments }
        : {}),
    }),
  });

  return { ok: res.ok };
}
