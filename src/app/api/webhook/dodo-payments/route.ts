import { Webhooks } from '@dodopayments/nextjs';

export const POST = Webhooks({
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_SECRET || 'whsec_placeholder123456789012',
  onSubscriptionActive: async (payload) => {
    console.log('Subscription Active Webhook:', payload);
  },
  onPaymentSucceeded: async (payload) => {
    console.log('Payment Succeeded Webhook:', payload);
  }
});

