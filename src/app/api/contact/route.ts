import { NextResponse } from "next/server";
import { Resend } from "resend";
import { checkBotId } from "botid/server";
import { getSupabase } from "@/lib/supabase";
import { clean, escapeHtml, isEmail, isTrapped } from "@/lib/form-guard";

export async function POST(request: Request) {
  try {
    // Vercel BotID: rejects scripted requests before anything is stored or sent.
    const verification = await checkBotId();
    if (verification.isBot) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const body = (await request.json()) as Record<string, unknown>;

    // Honeypot or too-fast submit: answer like a success so the bot learns nothing,
    // but store and send nothing.
    if (isTrapped(body)) {
      return NextResponse.json({ success: true, emailSent: false });
    }

    const firstName = clean(body.firstName, 100);
    const lastName = clean(body.lastName, 100);
    const email = clean(body.email, 254);
    const company = clean(body.company, 200);
    const message = clean(body.message, 5000, true);

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!isEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    // Log to Supabase
    try {
      const supabase = getSupabase();
      const { error: dbError } = await supabase.from("contact_submissions").insert({
        first_name: firstName,
        last_name: lastName,
        email,
        company: company || null,
        message,
      });

      if (dbError) {
        console.error("Supabase error:", dbError);
      }
    } catch (e) {
      console.error("Supabase not configured:", e);
    }

    // Send email notification via Resend. Every visitor field is escaped.
    let emailSent = false;
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const e = { firstName: escapeHtml(firstName), lastName: escapeHtml(lastName), email: escapeHtml(email), company: escapeHtml(company), message: escapeHtml(message) };
        const { data, error: emailError } = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL?.trim() ?? "n+α Ventures <hello@n+αventures.com>",
          to: process.env.CONTACT_EMAIL?.trim() ?? "hello@n+αventures.com",
          subject: `New Contact: ${firstName} ${lastName}${company ? ` from ${company}` : ""}`,
          replyTo: email,
          html: `
            <div style="font-family: sans-serif; max-width: 600px;">
              <h2 style="color: #131F2E;">New Contact Form Submission</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 12px; font-weight: bold; color: #555;">Name</td>
                  <td style="padding: 8px 12px;">${e.firstName} ${e.lastName}</td>
                </tr>
                <tr style="background: #f9f9f9;">
                  <td style="padding: 8px 12px; font-weight: bold; color: #555;">Email</td>
                  <td style="padding: 8px 12px;"><a href="mailto:${e.email}">${e.email}</a></td>
                </tr>
                ${company ? `<tr><td style="padding: 8px 12px; font-weight: bold; color: #555;">Company</td><td style="padding: 8px 12px;">${e.company}</td></tr>` : ""}
                <tr style="background: #f9f9f9;">
                  <td style="padding: 8px 12px; font-weight: bold; color: #555; vertical-align: top;">Message</td>
                  <td style="padding: 8px 12px; white-space: pre-wrap;">${e.message}</td>
                </tr>
              </table>
              <p style="margin-top: 24px; font-size: 12px; color: #999;">
                Sent from nplusalpha.com contact form
              </p>
            </div>
          `,
        });

        if (emailError) {
          console.error("Resend error:", JSON.stringify(emailError));
        } else {
          emailSent = true;
          console.log("Email sent successfully, id:", data?.id);
        }
      } catch (err) {
        console.error("Resend email failed:", err);
      }
    } else {
      console.warn("RESEND_API_KEY not set, skipping email notification");
    }

    return NextResponse.json({ success: true, emailSent });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
