import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, magnetType, payloadData } = body;

    // Basic validation
    if (!email || !magnetType) {
      return NextResponse.json(
        { error: "Missing required fields: email and magnetType are mandatory." },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    // Insert into lead_magnet_submissions
    const { error: dbError } = await supabase
      .from("lead_magnet_submissions")
      .insert([
        {
          email,
          magnet_type: magnetType,
          payload_data: payloadData || null,
        },
      ]);

    if (dbError) {
      console.error("Supabase insert error:", dbError);
    }

    // Send email notification via Resend
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const magnetName = magnetType.replace(/_/g, " ").toUpperCase();
        
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL?.trim() ?? "n+α Ventures <hello@nplus1ventures.com>",
          to: process.env.CONTACT_EMAIL?.trim() ?? "hello@nplus1ventures.com",
          subject: `Lead Magnet: ${magnetName} - ${email}`,
          replyTo: email,
          html: `
            <div style="font-family: sans-serif; max-width: 600px;">
              <h2 style="color: #0B1221;">New Lead Magnet Submission</h2>
              <p><strong>Type:</strong> ${magnetName}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <pre style="background: #f4f4f4; padding: 15px; border-radius: 8px;">${JSON.stringify(payloadData, null, 2)}</pre>
              <p style="margin-top: 20px; font-size: 12px; color: #999;">Sent from nplusalpha.com</p>
            </div>
          `,
        });
      } catch (e) {
        console.error("Resend notification failed:", e);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("API Route error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
