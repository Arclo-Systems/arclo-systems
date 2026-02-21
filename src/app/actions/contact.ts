"use server";

interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactEmail(data: ContactData) {
  const { firstName, lastName, email, company, message } = data;

  if (!firstName || !lastName || !email || !message) {
    return { success: false, error: "missing_fields" };
  }

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const recipient = process.env.CONTACT_RECIPIENT;

  if (!apiKey || !senderEmail || !recipient) {
    return { success: false, error: "server_config" };
  }

  const safeFirst = escapeHtml(firstName);
  const safeLast = escapeHtml(lastName);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { name: `${safeFirst} ${safeLast}`, email: senderEmail },
      to: [{ email: recipient }],
      replyTo: { email, name: `${firstName} ${lastName}` },
      subject: `Nuevo contacto: ${safeFirst} ${safeLast}${safeCompany ? ` — ${safeCompany}` : ""}`,
      htmlContent: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${safeFirst} ${safeLast}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        ${safeCompany ? `<p><strong>Empresa:</strong> ${safeCompany}</p>` : ""}
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
