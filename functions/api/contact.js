/**
 * Cloudflare Pages Function — POST /api/contact
 * Runtime : Cloudflare Workers (edge)
 * Email   : Resend API (fetch natif, pas de SDK à bundler)
 * Destinataires : cblniv15@gmail.com · infotoolubay@gmail.com
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  // --- Parse body ---
  let body;
  try {
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      body = await request.json();
    } else {
      const fd = await request.formData();
      body = Object.fromEntries(
        Array.from(fd.entries()).map(([k, v]) => [k, v.toString()])
      );
    }
  } catch {
    return Response.json(
      { success: false, error: "Requête invalide." },
      { status: 400 }
    );
  }

  const { firstName, lastName, email, subject, message } = body ?? {};

  // --- Validation ---
  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    !email?.trim() ||
    !message?.trim()
  ) {
    return Response.json(
      { success: false, error: "Tous les champs obligatoires doivent être remplis." },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Response.json(
      { success: false, error: "Adresse email invalide." },
      { status: 400 }
    );
  }

  // --- Clé API ---
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey || apiKey.startsWith("PLACEHOLDER")) {
    return Response.json(
      { success: false, error: "Configuration email manquante." },
      { status: 500 }
    );
  }

  // --- Construction email ---
  const emailSubject = subject?.trim()
    ? `[Toolubaay] ${subject.trim()} — ${firstName} ${lastName}`
    : `[Toolubaay] Message de ${firstName} ${lastName}`;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background-color: #f8f8f8; border-radius: 8px;">
      <div style="background: #1a1a1a; padding: 20px 32px; border-radius: 6px 6px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600;">
          Nouveau message — toolubaay.com
        </h1>
      </div>
      <div style="background: #ffffff; padding: 32px; border-radius: 0 0 6px 6px; border: 1px solid #e5e5e5; border-top: none;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 14px; width: 130px; font-weight: 600;">Prénom</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #1a1a1a; font-size: 14px;">${firstName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 14px; font-weight: 600;">Nom</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #1a1a1a; font-size: 14px;">${lastName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 14px; font-weight: 600;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px;">
              <a href="mailto:${email}" style="color: #2563eb;">${email}</a>
            </td>
          </tr>
          ${subject?.trim() ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 14px; font-weight: 600;">Sujet</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #1a1a1a; font-size: 14px;">${subject}</td>
          </tr>` : ""}
        </table>
        <div style="background: #f9f9f9; border-left: 4px solid #1a1a1a; padding: 20px; border-radius: 0 4px 4px 0;">
          <p style="color: #666; font-size: 13px; font-weight: 600; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
          <p style="color: #1a1a1a; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="margin-top: 24px; font-size: 12px; color: #999; text-align: center;">
          Répondre à cet email → réponse directe à ${email}
        </p>
      </div>
    </div>
  `;

  // --- Envoi via Resend API (fetch natif Workers) ---
  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Contact Toolubaay <onboarding@resend.dev>",
        to: ["cblniv15@gmail.com"],
        reply_to: email,
        subject: emailSubject,
        html: htmlBody,
      }),
    });

    if (!resendResponse.ok) {
      const err = await resendResponse.text();
      console.error("[Resend Error]", resendResponse.status, err);
      return Response.json(
        { success: false, error: "Erreur lors de l'envoi. Veuillez réessayer." },
        { status: 500 }
      );
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error("[Contact Function Error]", e);
    return Response.json(
      { success: false, error: "Erreur serveur. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
