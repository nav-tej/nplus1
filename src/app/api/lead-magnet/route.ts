import { NextResponse } from "next/server";
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
    const { error } = await supabase
      .from("lead_magnet_submissions")
      .insert([
        {
          email,
          magnet_type: magnetType,
          payload_data: payloadData || null,
        },
      ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to store lead magnet submission." },
        { status: 500 }
      );
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
