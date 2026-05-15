"use server";

import { partnerSchema } from "@/app/[locale]/(kodi)/partners/registro/schema";
import {
  MAX_LOGO_BYTES,
  MAX_PHOTO_BYTES,
} from "@/app/[locale]/(kodi)/partners/registro/data";
import { validateUpload } from "@/lib/file-validation";
import { escapeHtml, sendBrevoEmail, type BrevoAttachment } from "@/lib/email";

export type SubmitResult =
  | { success: true }
  | { success: false; error: "validation" | "server_config" | "send_failed" };

async function fileToAttachment(
  file: File,
  fallbackName: string,
): Promise<BrevoAttachment> {
  const buf = Buffer.from(await file.arrayBuffer());
  return { name: file.name || fallbackName, content: buf.toString("base64") };
}

export async function submitPartnerRegistration(
  formData: FormData,
): Promise<SubmitResult> {
  const raw = formData.get("payload");
  if (typeof raw !== "string") return { success: false, error: "validation" };

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(raw);
  } catch {
    return { success: false, error: "validation" };
  }

  const parsed = partnerSchema.safeParse(parsedJson);
  if (!parsed.success) return { success: false, error: "validation" };

  const honeypotOk = parsed.data.honeypot === "";
  if (!honeypotOk) return { success: true };

  const logo = formData.get("logo");
  const photo = formData.get("photo");

  const logoCheck = validateUpload(logo instanceof File ? logo : null, {
    accept: ["image/png", "image/svg+xml"],
    maxBytes: MAX_LOGO_BYTES,
    required: true,
  });
  if (!logoCheck.ok) return { success: false, error: "validation" };

  const photoCheck = validateUpload(photo instanceof File ? photo : null, {
    accept: ["image/jpeg", "image/png"],
    maxBytes: MAX_PHOTO_BYTES,
    required: false,
  });
  if (!photoCheck.ok) return { success: false, error: "validation" };

  const recipient = process.env.PARTNER_RECIPIENT;
  if (!recipient || !process.env.BREVO_API_KEY || !process.env.BREVO_SENDER_EMAIL) {
    return { success: false, error: "server_config" };
  }

  const d = parsed.data;
  const localeRaw = formData.get("locale");
  const locale = localeRaw === "en" ? "en" : "es";

  const attachments: BrevoAttachment[] = [];
  try {
    if (logo instanceof File && logo.size > 0) {
      attachments.push(await fileToAttachment(logo, "logo"));
    }
    if (photo instanceof File && photo.size > 0) {
      attachments.push(await fileToAttachment(photo, "foto"));
    }
  } catch {
    return { success: false, error: "validation" };
  }

  const branchesHtml =
    d.business.hasMultipleBranches === "yes"
      ? d.branches
          .map(
            (b) =>
              `<li>${escapeHtml(b.name)} — ${escapeHtml(b.canton)}${
                b.address ? ` (${escapeHtml(b.address)})` : ""
              }</li>`,
          )
          .join("")
      : "<li>Una sola ubicación</li>";

  const teamHtml = `
    <h2>Nuevo registro de partner</h2>
    <h3>Negocio</h3>
    <p><strong>Nombre:</strong> ${escapeHtml(d.business.name)}</p>
    <p><strong>Categoría:</strong> ${escapeHtml(d.business.category)}</p>
    <p><strong>Cantón:</strong> ${escapeHtml(d.business.canton)}</p>
    <p><strong>Sitio:</strong> ${escapeHtml(d.business.website || "-")}</p>
    <p><strong>Instagram:</strong> ${escapeHtml(d.business.instagram || "-")}</p>
    <p><strong>Facebook:</strong> ${escapeHtml(d.business.facebook || "-")}</p>
    <p><strong>TikTok:</strong> ${escapeHtml(d.business.tiktok || "-")}</p>
    <p><strong>Descripción:</strong> ${escapeHtml(d.business.description)}</p>
    <h3>Sucursales</h3><ul>${branchesHtml}</ul>
    <h3>Contacto</h3>
    <p><strong>Nombre:</strong> ${escapeHtml(d.contact.fullName)}</p>
    <p><strong>Cargo:</strong> ${escapeHtml(d.contact.role)}</p>
    <p><strong>Email:</strong> ${escapeHtml(d.contact.email)}</p>
    <p><strong>WhatsApp:</strong> ${escapeHtml(d.contact.whatsapp)}</p>
    <h3>Cupón</h3>
    <p><strong>Tipo:</strong> ${escapeHtml(d.coupon.discountType)}</p>
    <p><strong>Valor:</strong> ${escapeHtml(String(d.coupon.discountValue))}</p>
    <p><strong>Descripción:</strong> ${escapeHtml(d.coupon.description)}</p>
    <p><strong>Cantidad:</strong> ${escapeHtml(String(d.coupon.quantity))}</p>
    <p><strong>Fecha límite:</strong> ${escapeHtml(d.coupon.deadline)}</p>
    <p><strong>Aplica en:</strong> ${escapeHtml(
      d.coupon.branchesScope.length ? d.coupon.branchesScope.join(", ") : "Todas / única",
    )}</p>
    <p><strong>Condiciones:</strong> ${escapeHtml(d.coupon.conditions || "-")}</p>
  `;

  const teamRes = await sendBrevoEmail({
    to: { email: recipient },
    replyTo: { email: d.contact.email, name: d.contact.fullName },
    subject: `Nuevo partner: ${d.business.name}`,
    htmlContent: teamHtml,
    attachments,
  });
  if (!teamRes.ok) return { success: false, error: "send_failed" };

  const confirmEs = `
    <h2>¡Recibimos tu registro, ${escapeHtml(d.business.name)}!</h2>
    <p>Entendemos que el primer mes es completamente gratuito y sin compromiso posterior. Al finalizar recibirás un reporte de resultados.</p>
    <p>Nuestro equipo te contactará pronto al WhatsApp ${escapeHtml(d.contact.whatsapp)}.</p>
    <p>— Equipo Kodi</p>
  `;
  const confirmEn = `
    <h2>We got your registration, ${escapeHtml(d.business.name)}!</h2>
    <p>You understand the first month is completely free with no further commitment. At the end you will receive a results report.</p>
    <p>Our team will contact you soon at WhatsApp ${escapeHtml(d.contact.whatsapp)}.</p>
    <p>— Kodi Team</p>
  `;

  await sendBrevoEmail({
    to: { email: d.contact.email, name: d.contact.fullName },
    subject: locale === "en" ? "Kodi — registration received" : "Kodi — registro recibido",
    htmlContent: locale === "en" ? confirmEn : confirmEs,
  });

  return { success: true };
}
