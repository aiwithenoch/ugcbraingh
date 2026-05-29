import { Webhooks } from "@dodopayments/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";

const handler = Webhooks({
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_SECRET || "whsec_placeholder123456789012",
  onSubscriptionActive: async (payload) => {
    const { customer } = payload as { customer?: { email?: string; customer_id?: string } };
    if (!customer?.email) return;
    await getSupabaseAdmin()
      .from("profiles")
      .update({ subscription_status: "active", customer_id: customer.customer_id })
      .eq("email", customer.email);
  },
  onPaymentSucceeded: async (payload) => {
    const { customer } = payload as { customer?: { email?: string; customer_id?: string } };
    if (!customer?.email) return;
    await getSupabaseAdmin()
      .from("profiles")
      .update({ subscription_status: "active", customer_id: customer.customer_id })
      .eq("email", customer.email);
  },
});

export const POST = async (req: NextRequest) => {
  if (!process.env.DODO_PAYMENTS_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "DODO_PAYMENTS_WEBHOOK_SECRET is not configured." },
      { status: 500 }
    );
  }
  return handler(req);
};
