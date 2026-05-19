import { CustomerPortal } from '@dodopayments/nextjs';
import { NextRequest, NextResponse } from 'next/server';

const handler = CustomerPortal({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY || 'dummy_api_key_build_placeholder',
  environment: (process.env.DODO_PAYMENTS_ENVIRONMENT as 'live_mode' | 'test_mode') || 'live_mode'
});

export const GET = async (req: NextRequest) => {
  if (!process.env.DODO_PAYMENTS_API_KEY) {
    return NextResponse.json(
      { error: 'DODO_PAYMENTS_API_KEY is not configured in the environment variables.' },
      { status: 500 }
    );
  }
  return handler(req);
};


