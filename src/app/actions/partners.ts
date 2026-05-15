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
  if (typeof raw !== "string") {
    console.error("[partners] payload ausente en FormData");
    return { success: false, error: "validation" };
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(raw);
  } catch {
    console.error("[partners] payload no es JSON válido");
    return { success: false, error: "validation" };
  }

  const parsed = partnerSchema.safeParse(parsedJson);
  if (!parsed.success) {
    console.error(
      "[partners] validación Zod falló:",
      JSON.stringify(parsed.error.flatten(), null, 2),
    );
    return { success: false, error: "validation" };
  }

  const honeypotOk = parsed.data.honeypot === "";
  if (!honeypotOk) return { success: true };

  const logo = formData.get("logo");
  const photo = formData.get("photo");

  const logoCheck = validateUpload(logo instanceof File ? logo : null, {
    accept: ["image/png", "image/svg+xml"],
    maxBytes: MAX_LOGO_BYTES,
    required: true,
  });
  if (!logoCheck.ok) {
    console.error("[partners] logo inválido:", logoCheck.error);
    return { success: false, error: "validation" };
  }

  const photoCheck = validateUpload(photo instanceof File ? photo : null, {
    accept: ["image/jpeg", "image/png"],
    maxBytes: MAX_PHOTO_BYTES,
    required: false,
  });
  if (!photoCheck.ok) {
    console.error("[partners] foto inválida:", photoCheck.error);
    return { success: false, error: "validation" };
  }

  // PARTNER_RECIPIENT es opcional: si no está, cae a CONTACT_RECIPIENT
  // (que ya usa el form de contacto), así funciona sin env nueva.
  const recipient =
    process.env.PARTNER_RECIPIENT ?? process.env.CONTACT_RECIPIENT;
  if (!recipient || !process.env.BREVO_API_KEY || !process.env.BREVO_SENDER_EMAIL) {
    console.error("[partners] env faltante:", {
      recipient: !!recipient,
      BREVO_API_KEY: !!process.env.BREVO_API_KEY,
      BREVO_SENDER_EMAIL: !!process.env.BREVO_SENDER_EMAIL,
    });
    return { success: false, error: "server_config" };
  }

  const d = parsed.data;
  const localeRaw = formData.get("locale");
  const locale = localeRaw === "en" ? "en" : "es";

  let attachments: BrevoAttachment[];
  try {
    const tasks: Promise<BrevoAttachment>[] = [];
    if (logo instanceof File && logo.size > 0) {
      tasks.push(fileToAttachment(logo, "logo"));
    }
    if (photo instanceof File && photo.size > 0) {
      tasks.push(fileToAttachment(photo, "foto"));
    }
    attachments = await Promise.all(tasks);
  } catch (e) {
    console.error("[partners] error leyendo archivos adjuntos:", e);
    return { success: false, error: "validation" };
  }

  const FORMAT_LABEL: Record<string, string> = {
    cupon: "Cupón de descuento",
    video: "Video patrocinado",
    banner: "Banner",
  };
  const DISCOUNT_LABEL: Record<string, string> = {
    percentage: "Porcentaje (%)",
    fixed: "Monto fijo (₡)",
  };
  const wantsCoupon = d.coupon.formats.includes("cupon");

  const row = (label: string, value: string) =>
    `<tr><td style="padding:9px 16px;border-bottom:1px solid #eaf0f1;font-size:13px;color:#5b6b6e;width:36%;vertical-align:top;">${escapeHtml(
      label,
    )}</td><td style="padding:9px 16px;border-bottom:1px solid #eaf0f1;font-size:14px;color:#202b2d;font-weight:600;vertical-align:top;">${value}</td></tr>`;
  const sectionHead = (title: string) =>
    `<tr><td colspan="2" style="padding:20px 16px 6px;font-size:11px;letter-spacing:.09em;text-transform:uppercase;color:#3a7d88;font-weight:700;background:#f3f8f9;">${escapeHtml(
      title,
    )}</td></tr>`;

  const branchesValue =
    d.business.hasMultipleBranches === "yes"
      ? d.branches
          .map(
            (b) =>
              `${escapeHtml(b.name)} — ${escapeHtml(b.canton)}${
                b.address ? ` (${escapeHtml(b.address)})` : ""
              }`,
          )
          .join("<br>")
      : "Una sola ubicación";

  const formatsValue = d.coupon.formats
    .map((f) => FORMAT_LABEL[f] ?? f)
    .join(", ");

  const couponRows = wantsCoupon
    ? row(
        "Tipo de descuento",
        escapeHtml(
          DISCOUNT_LABEL[d.coupon.discountType] ?? d.coupon.discountType,
        ),
      ) +
      row(
        "Valor",
        escapeHtml(
          d.coupon.discountType === "percentage"
            ? `${d.coupon.discountValue} %`
            : `₡ ${d.coupon.discountValue}`,
        ),
      ) +
      row("Descripción del cupón", escapeHtml(d.coupon.description || "—")) +
      row("Cantidad", escapeHtml(String(d.coupon.quantity))) +
      row(
        "Aplica en",
        escapeHtml(
          d.coupon.branchesScope.length
            ? d.coupon.branchesScope.join(", ")
            : "Todas / única",
        ),
      ) +
      row("Condiciones", escapeHtml(d.coupon.conditions || "—"))
    : "";

  const teamHtml = `
  <div style="background:#eef4f5;padding:24px 0;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" align="center" style="width:600px;max-width:100%;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e3eced;">
      <tr><td style="background:#408D99;padding:20px 24px;">
        <div style="color:#ffffff;font-size:18px;font-weight:700;">Kodi · Nuevo partner</div>
        <div style="color:#d6ebee;font-size:13px;margin-top:2px;">${escapeHtml(
          d.business.name,
        )}</div>
      </td></tr>
      <tr><td style="padding:8px 8px 20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${sectionHead("Negocio")}
          ${row("Nombre comercial", escapeHtml(d.business.name))}
          ${row("Categoría", escapeHtml(d.business.category))}
          ${row("Zona / cantón", escapeHtml(d.business.canton))}
          ${row("Sitio web", escapeHtml(d.business.website || "—"))}
          ${row(
            "Instagram",
            escapeHtml(
              d.business.instagram ? `@${d.business.instagram}` : "—",
            ),
          )}
          ${row("Facebook", escapeHtml(d.business.facebook || "—"))}
          ${row(
            "TikTok",
            escapeHtml(d.business.tiktok ? `@${d.business.tiktok}` : "—"),
          )}
          ${row("Descripción", escapeHtml(d.business.description))}
          ${sectionHead("Sucursales")}
          ${row("Ubicaciones", branchesValue)}
          ${sectionHead("Contacto")}
          ${row("Nombre", escapeHtml(d.contact.fullName))}
          ${row("Cargo", escapeHtml(d.contact.role))}
          ${row("Email", escapeHtml(d.contact.email))}
          ${row("WhatsApp", escapeHtml(`+506 ${d.contact.whatsapp}`))}
          ${sectionHead("Publicidad")}
          ${row("Formatos", escapeHtml(formatsValue))}
          ${couponRows}
        </table>
      </td></tr>
      <tr><td style="background:#f3f8f9;padding:14px 24px;color:#7a8a8d;font-size:11px;">Registro automático del formulario de partners de Kodi.</td></tr>
    </table>
  </div>`;

  const teamRes = await sendBrevoEmail({
    to: { email: recipient },
    replyTo: { email: d.contact.email, name: d.contact.fullName },
    senderName: "Kodi Partners",
    subject: `Nuevo partner: ${d.business.name}`,
    htmlContent: teamHtml,
    attachments,
    headers: { "X-Priority": "1", Importance: "high" },
  });
  if (!teamRes.ok) {
    console.error("[partners] Brevo no aceptó el email al equipo");
    return { success: false, error: "send_failed" };
  }

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

  const confirmRes = await sendBrevoEmail({
    to: { email: d.contact.email, name: d.contact.fullName },
    subject:
      locale === "en"
        ? "Kodi — registration received"
        : "Kodi — registro recibido",
    htmlContent: locale === "en" ? confirmEn : confirmEs,
  });
  if (!confirmRes.ok) {
    console.error(
      "[partners] email de confirmación al partner falló (no fatal, el equipo sí recibió)",
    );
  }

  return { success: true };
}
