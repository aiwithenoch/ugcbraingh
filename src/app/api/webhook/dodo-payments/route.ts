import { Webhooks } from '@dodopayments/nextjs';
import { NextRequest, NextResponse } from 'next/server';

const handler = Webhooks({
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_SECRET || 'whsec_placeholder123456789012',
  onSubscriptionActive: async (payload) => {
    console.log('Subscription Active Webhook:', payload);
  },
  onPaymentSucceeded: async (payload) => {
    console.log('Payment Succeeded Webhook:', payload);
  }
});

export const POST = async (req: NextRequest) => {
  if (!process.env.DODO_PAYMENTS_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'DODO_PAYMENTS_WEBHOOK_SECRET is not configured in the environment variables.' },
      { status: 500 }
    );
  }
  return handler(req);
};



