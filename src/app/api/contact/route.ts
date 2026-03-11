import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 503 }
    );
  }
  const resend = new Resend(apiKey);

  try {
    const { name, email, company, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitize = (str: string) =>
      str.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safeCompany = company ? sanitize(company) : "";
    const safeMessage = sanitize(message).replace(/\n/g, "<br />");

    // Send notification email to nPlus1 team
    await resend.emails.send({
      from: "nPlus1 Website <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "hello@nplus1ventures.com",
      replyTo: email,
      subject: `New inquiry from ${safeName}${safeCompany ? ` at ${safeCompany}` : ""}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0B1221; margin-bottom: 24px;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 16px 8px 0; font-weight: 600; color: #555; vertical-align: top;">Name</td>
              <td style="padding: 8px 0;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 16px 8px 0; font-weight: 600; color: #555; vertical-align: top;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
            </tr>
            ${safeCompany ? `<tr><td style="padding: 8px 16px 8px 0; font-weight: 600; color: #555; vertical-align: top;">Company</td><td style="padding: 8px 0;">${safeCompany}</td></tr>` : ""}
            <tr>
              <td style="padding: 8px 16px 8px 0; font-weight: 600; color: #555; vertical-align: top;">Message</td>
              <td style="padding: 8px 0;">${safeMessage}</td>
            </tr>
          </table>
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
          <p style="color: #888; font-size: 12px;">Sent from the nPlus1 Ventures website contact form</p>
        </div>
      `,
    });

    // Send auto-reply confirmation to the user
    await resend.emails.send({
      from: "nPlus1 Ventures <onboarding@resend.dev>",
      to: email,
      subject: "We received your message — nPlus1 Ventures",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0B1221;">Thanks for reaching out, ${safeName}!</h2>
          <p style="color: #333; line-height: 1.6;">
            We've received your message and will get back to you within 24 hours.
          </p>
          <p style="color: #333; line-height: 1.6;">
            In the meantime, feel free to reply to this email if you have any additional details to share.
          </p>
          <p style="color: #333; line-height: 1.6; margin-top: 24px;">
            Best,<br />
            <strong>The nPlus1 Ventures Team</strong>
          </p>
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
          <p style="color: #888; font-size: 12px;">
            nPlus1 Ventures &middot; Go-To-Market Consulting<br />
            <a href="https://nplus1ventures.com" style="color: #2ECC71;">nplus1ventures.com</a>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
