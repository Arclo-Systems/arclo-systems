"use server";

export async function subscribeNewsletter(email: string) {
  if (!email || !email.includes("@")) {
    return { success: false, error: "invalid_email" };
  }

  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    return { success: false, error: "server_config" };
  }

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      email,
      updateEnabled: true,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    if (body?.code === "duplicate_parameter") {
      return { success: true };
    }
    return { success: false, error: "subscribe_failed" };
  }

  return { success: true };
}
