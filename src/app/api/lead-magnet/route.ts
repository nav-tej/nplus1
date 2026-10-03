import { NextResponse } from "next/server";
import { Resend } from "resend";
import { checkBotId } from "botid/server";
import { getSupabase } from "@/lib/supabase";
import { MAIL_FROM, MAIL_TO } from "@/lib/mail";
import { clean, escapeHtml, isEmail, isTrapped } from "@/lib/form-guard";

// Only these forms may post here. The calculator one emails the visitor, so an
// unknown type must never reach the send path.
const MAGNET_TYPES = new Set(["velocity_calculator", "outbound_playbook"]);

export async function POST(request: Request) {
  try {
    // Vercel BotID: this route can email any address a visitor types, so scripted
    // requests are rejected before anything is stored or sent.
    const verification = await checkBotId();
    if (verification.isBot) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const body = (await request.json()) as Record<string, unknown>;

    // Honeypot or too-fast submit: look like a success, store and send nothing.
    if (isTrapped(body)) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const email = clean(body.email, 254);
    const magnetType = clean(body.magnetType, 64);
    const rawPayload = body.payloadData;
    const payloadData =
      rawPayload && typeof rawPayload === "object" && JSON.stringify(rawPayload).length <= 4000
        ? (rawPayload as Record<string, unknown>)
        : null;

    if (!email || !magnetType) {
      return NextResponse.json(
        { error: "Missing required fields: email and magnetType are mandatory." },
        { status: 400 }
      );
    }
    if (!isEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!MAGNET_TYPES.has(magnetType)) {
      return NextResponse.json({ error: "Unknown form." }, { status: 400 });
    }

    const supabase = getSupabase();

    // Insert into lead_magnet_submissions
    const { error: dbError } = await supabase
      .from("lead_magnet_submissions")
      .insert([
        {
          email,
          magnet_type: magnetType,
          payload_data: payloadData,
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
          from: MAIL_FROM,
          to: MAIL_TO,
          subject: `Lead Magnet: ${magnetName} - ${email}`,
          replyTo: email,
          html: `
            <div style="font-family: sans-serif; max-width: 600px;">
              <h2 style="color: #131F2E;">New Lead Magnet Submission</h2>
              <p><strong>Type:</strong> ${escapeHtml(magnetName)}</p>
              <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
              <pre style="background: #f4f4f4; padding: 15px; border-radius: 8px;">${escapeHtml(JSON.stringify(payloadData, null, 2))}</pre>
              <p style="margin-top: 20px; font-size: 12px; color: #999;">Sent from nplusalpha.com</p>
            </div>
          `,
        });
      } catch (e) {
        console.error("Resend notification failed:", e);
      }

      // The calculator promises "Email me this breakdown", so send the visitor
      // their numbers. Only coerced numbers and a whitelisted stage reach the HTML.
      if (magnetType === "velocity_calculator" && payloadData) {
        try {
          const resend = new Resend(resendApiKey);
          const n = (v: unknown) => (Number.isFinite(Number(v)) ? Number(v) : 0);
          const usd = (v: number) => "$" + Math.round(v).toLocaleString("en-US");
          const stages = ["Seed", "Series A", "Series B", "Series C+"];
          const stage = stages.find((st) => st === payloadData.stage) ?? "your stage";
          const levers: Record<string, string> = { "win rate": "win rate", "sales cycle length": "sales cycle length" };
          const lever = levers[payloadData.lever as string];
          const row = (k: string, v: string) =>
            `<tr><td style="padding:6px 16px 6px 0;color:#4F5B69;">${k}</td><td style="padding:6px 0;font-weight:600;">${v}</td></tr>`;
          await resend.emails.send({
            from: MAIL_FROM,
            to: email,
            replyTo: MAIL_TO,
            subject: `Your funnel velocity: ${usd(n(payloadData.velocityPerDay))} per day`,
            html: `
              <div style="font-family: Georgia, serif; max-width: 560px; color: #131F2E;">
                <p style="font-size:15px;">Here are the numbers you ran on nplusalpha.com.</p>
                <table style="font-family: sans-serif; font-size:14px; border-collapse:collapse;">
                  ${row("Stage", stage)}
                  ${row("Qualified opps per quarter", String(n(payloadData.opps)))}
                  ${row("Win rate", n(payloadData.winRate) + "%")}
                  ${row("Average contract value", usd(n(payloadData.acv)))}
                  ${row("Sales cycle", n(payloadData.cycle) + " days")}
                  ${row("Funnel velocity", usd(n(payloadData.velocityPerDay)) + " per day")}
                  ${row("New ARR per quarter at this pace", usd(n(payloadData.newArrPerQuarter)))}
                </table>
                ${
                  lever
                    ? `<p style="font-size:15px;">Your biggest lever: bring ${lever} to the ${stage} median. That is worth about ${usd(n(payloadData.leverGainPerQuarter))} more new ARR per quarter.</p>`
                    : `<p style="font-size:15px;">Your win rate and sales cycle are at or better than the ${stage} median.</p>`
                }
                <p style="font-size:15px;">If you want a second opinion on the plan to close the gap, reply to this email or book a 15-minute GTM audit at <a href="https://nplusalpha.com/book">nplusalpha.com/book</a>.</p>
                <p style="font-size:15px;">Nav Singh<br/>n+α Ventures</p>
              </div>
            `,
          });
        } catch (e) {
          console.error("Resend visitor email failed:", e);
        }
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
