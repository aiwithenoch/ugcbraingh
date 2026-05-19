import { Checkout } from '@dodopayments/nextjs';

export const GET = Checkout({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  returnUrl: process.env.RETURN_URL!,
  environment: "live_mode",
  type: "static"
});
