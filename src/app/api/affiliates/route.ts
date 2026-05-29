import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  const { data, error } = await getSupabaseAdmin()
    .from("affiliates")
    .select("*, affiliate_referrals(*)")
    .eq("user_id", userId)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { userId, code } = await req.json();
  if (!userId || !code) {
    return NextResponse.json({ error: "userId and code required" }, { status: 400 });
  }

  const { data, error } = await getSupabaseAdmin()
    .from("affiliates")
    .insert({ user_id: userId, code, commission_rate: 0.3 })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
