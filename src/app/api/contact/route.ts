import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, message } = body;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Log to Supabase
    try {
      const supabase = getSupabase();
      const { error: dbError } = await supabase
        .from("contact_submissions")
        .insert({
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

    // Send email notification via Resend
    let emailSent = false;
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const { data, error: emailError } = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL?.trim() ?? "nPlus1 Ventures <onboarding@resend.dev>",
          to: process.env.CONTACT_EMAIL?.trim() ?? "hello@nplus1ventures.com",
          subject: `New Contact: ${firstName} ${lastName}${company ? ` from ${company}` : ""}`,
          replyTo: email,
          html: `
            <div style="font-family: sans-serif; max-width: 600px;">
              <h2 style="color: #0B1221;">New Contact Form Submission</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 12px; font-weight: bold; color: #555;">Name</td>
                  <td style="padding: 8px 12px;">${firstName} ${lastName}</td>
                </tr>
                <tr style="background: #f9f9f9;">
                  <td style="padding: 8px 12px; font-weight: bold; color: #555;">Email</td>
                  <td style="padding: 8px 12px;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                ${company ? `<tr><td style="padding: 8px 12px; font-weight: bold; color: #555;">Company</td><td style="padding: 8px 12px;">${company}</td></tr>` : ""}
                <tr style="background: #f9f9f9;">
                  <td style="padding: 8px 12px; font-weight: bold; color: #555; vertical-align: top;">Message</td>
                  <td style="padding: 8px 12px; white-space: pre-wrap;">${message}</td>
                </tr>
              </table>
              <p style="margin-top: 24px; font-size: 12px; color: #999;">
                Sent from nplus1ventures.com contact form
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
      } catch (e) {
        console.error("Resend email failed:", e);
      }
    } else {
      console.warn("RESEND_API_KEY not set, skipping email notification");
    }

    return NextResponse.json({ success: true, emailSent });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
