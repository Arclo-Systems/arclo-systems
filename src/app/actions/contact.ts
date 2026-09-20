"use server";

import { z } from "zod";

const contactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { error: "required" })
    .max(100, { error: "max" }),
  email: z.string().trim().email({ error: "invalid_email" }),
  message: z
    .string()
    .trim()
    .min(1, { error: "required" })
    .max(5000, { error: "max" }),
});

type ContactData = z.input<typeof contactSchema>;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactEmail(data: ContactData) {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: "missing_fields" };
  }

  const { firstName, email, message } = parsed.data;

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const recipient = process.env.CONTACT_RECIPIENT;

  if (!apiKey || !senderEmail || !recipient) {
    return { success: false, error: "server_config" };
  }

  const safeNombre = escapeHtml(firstName);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { name: safeNombre, email: senderEmail },
      to: [{ email: recipient }],
      replyTo: { email, name: firstName },
      subject: `Nuevo contacto: ${safeNombre}`,
      htmlContent: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${safeNombre}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <hr />
        <p>${safeMessage}</p>
      `,
    }),
  });

  if (!res.ok) {
    return { success: false, error: "send_failed" };
  }

  return { success: true };
}
