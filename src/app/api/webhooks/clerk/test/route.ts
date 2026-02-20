import { NextResponse } from 'next/server';

// Simple test endpoint to verify webhook route is accessible
export async function GET() {
  return NextResponse.json({
    message: 'Webhook endpoint is accessible',
    timestamp: new Date().toISOString(),
    path: '/api/webhooks/clerk',
  });
}

export async function POST() {
  return NextResponse.json({
    message: 'Webhook endpoint accepts POST requests',
    timestamp: new Date().toISOString(),
  });
}

