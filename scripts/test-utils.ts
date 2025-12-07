/**
 * Test utilities for leaderboard feature testing
 * 
 * NOTE: These tests are configured to work with PRODUCTION secrets:
 * - DATABASE_URL: Production PostgreSQL database
 * - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: Production Clerk publishable key (pk_live_*)
 * - CLERK_SECRET_KEY: Production Clerk secret key (sk_live_*)
 * - CLERK_WEBHOOK_SECRET: Production Clerk webhook secret (whsec_*)
 */

import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config();

export const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
export const DATABASE_URL = process.env.DATABASE_URL || '';
export const NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
export const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY || '';
export const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || '';
export const CRON_SECRET = process.env.CRON_SECRET || '';

/**
 * Validate production credentials and display warnings
 */
export function validateProductionCredentials(): {
  isProduction: boolean;
  warnings: string[];
  errors: string[];
} {
  const warnings: string[] = [];
  const errors: string[] = [];

  // Check DATABASE_URL
  if (!DATABASE_URL) {
    errors.push('DATABASE_URL is not set');
  } else {
    // Check if it's a production database (Neon typically uses neon.tech)
    if (DATABASE_URL.includes('neon.tech') || DATABASE_URL.includes('neondb')) {
      warnings.push('⚠️  Using PRODUCTION database (Neon) - tests will run against production data');
    }
  }

  // Check Clerk Publishable Key
  if (!NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    errors.push('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is not set');
  } else {
    if (NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith('pk_live_')) {
      warnings.push('⚠️  Using PRODUCTION Clerk publishable key (pk_live_*)');
    } else if (NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith('pk_test_')) {
      warnings.push('ℹ️  Using TEST Clerk publishable key (pk_test_*)');
    } else {
      errors.push(`Invalid Clerk publishable key format: expected pk_live_* or pk_test_*, got: ${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.substring(0, 10)}...`);
    }
  }

  // Check Clerk Secret Key
  if (!CLERK_SECRET_KEY) {
    errors.push('CLERK_SECRET_KEY is not set');
  } else {
    if (CLERK_SECRET_KEY.startsWith('sk_live_')) {
      warnings.push('⚠️  Using PRODUCTION Clerk secret key (sk_live_*)');
    } else if (CLERK_SECRET_KEY.startsWith('sk_test_')) {
      warnings.push('ℹ️  Using TEST Clerk secret key (sk_test_*)');
    } else {
      errors.push(`Invalid Clerk secret key format: expected sk_live_* or sk_test_*, got: ${CLERK_SECRET_KEY.substring(0, 10)}...`);
    }
  }

  // Check Clerk Webhook Secret
  if (CLERK_WEBHOOK_SECRET && !CLERK_WEBHOOK_SECRET.startsWith('whsec_')) {
    errors.push(`Invalid Clerk webhook secret format: expected whsec_*, got: ${CLERK_WEBHOOK_SECRET.substring(0, 10)}...`);
  }

  const isProduction = 
    DATABASE_URL.includes('neon.tech') || DATABASE_URL.includes('neondb') ||
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith('pk_live_') ||
    CLERK_SECRET_KEY.startsWith('sk_live_');

  return { isProduction, warnings, errors };
}

/**
 * Display production credentials warning banner
 */
export function displayProductionWarning(): void {
  const validation = validateProductionCredentials();
  
  if (validation.errors.length > 0) {
    console.error('\n' + '='.repeat(70));
    console.error('❌ CREDENTIAL VALIDATION ERRORS');
    console.error('='.repeat(70));
    validation.errors.forEach(error => {
      console.error(`  - ${error}`);
    });
    console.error('='.repeat(70) + '\n');
    return;
  }

  if (validation.isProduction && validation.warnings.length > 0) {
    console.log('\n' + '='.repeat(70));
    console.log('⚠️  PRODUCTION CREDENTIALS DETECTED');
    console.log('='.repeat(70));
    validation.warnings.forEach(warning => {
      console.log(`  ${warning}`);
    });
    console.log('='.repeat(70));
    console.log('ℹ️  Tests will run against PRODUCTION database and services');
    console.log('⚠️  Be careful: test data will be created in production');
    console.log('='.repeat(70) + '\n');
  }
}

export interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
  response?: any;
  status?: number;
}

export class TestRunner {
  private results: TestResult[] = [];

  async runTest(
    name: string,
    testFn: () => Promise<{ passed: boolean; error?: string; response?: any; status?: number }>
  ): Promise<void> {
    try {
      const result = await testFn();
      this.results.push({
        name,
        passed: result.passed,
        error: result.error,
        response: result.response,
        status: result.status,
      });
      if (result.passed) {
        console.log(`✅ ${name}`);
      } else {
        console.log(`❌ ${name}: ${result.error}`);
        if (result.response) {
          console.log(`   Response:`, JSON.stringify(result.response, null, 2));
        }
      }
    } catch (error) {
      this.results.push({
        name,
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      console.log(`❌ ${name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  getResults(): TestResult[] {
    return this.results;
  }

  printSummary(): void {
    const passed = this.results.filter((r) => r.passed).length;
    const failed = this.results.filter((r) => !r.passed).length;
    const total = this.results.length;

    console.log('\n' + '='.repeat(50));
    console.log('Test Summary');
    console.log('='.repeat(50));
    console.log(`Total: ${total}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log('='.repeat(50));

    if (failed > 0) {
      console.log('\nFailed Tests:');
      this.results
        .filter((r) => !r.passed)
        .forEach((r) => {
          console.log(`  - ${r.name}: ${r.error}`);
        });
    }
  }
}

export async function makeRequest(
  url: string,
  options: RequestInit = {}
): Promise<{ status: number; data: any; headers: Headers }> {
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));
  return {
    status: response.status,
    data,
    headers: response.headers,
  };
}

export async function makeAuthenticatedRequest(
  url: string,
  clerkUserId: string,
  options: RequestInit = {}
): Promise<{ status: number; data: any; headers: Headers }> {
  // Note: In a real test, you'd need to generate a valid Clerk session token
  // For now, we'll use a mock approach or require the user to provide a token
  const authToken = process.env.TEST_CLERK_SESSION_TOKEN || '';

  return makeRequest(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${authToken}`,
      'x-clerk-user-id': clerkUserId, // This is a workaround for testing
      ...options.headers,
    },
  });
}

export function createClerkWebhookPayload(
  eventType: string,
  data: any,
  timestamp?: string
): string {
  const payload = {
    type: eventType,
    data,
  };

  // In a real test, you'd sign this with the webhook secret using svix
  // For now, we'll return the JSON payload
  return JSON.stringify(payload);
}

export function generateTestUserId(): string {
  return `test_user_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}

export function generateTestWalletAddress(): string {
  return `0x${Math.random().toString(16).substring(2).padStart(40, '0')}`;
}

export function generateTestTweetId(): string {
  return `tweet_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}

