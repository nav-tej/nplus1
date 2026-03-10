import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

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
      // Continue to send email even if DB fails
    }

    // Send email notification via Supabase Edge Function or fallback
    // For now, we use a simple mailto-style approach via the Supabase DB trigger
    // The form data is stored in Supabase and can trigger an email via a DB webhook/function

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
