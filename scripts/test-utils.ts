/**
 * Shared utilities for app functionality tests.
 */

import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { Pool } from 'pg';

const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}
dotenv.config();

export const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';

export interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
  response?: unknown;
  status?: number;
}

export class TestRunner {
  private results: TestResult[] = [];

  async runTest(
    name: string,
    fn: () => Promise<{ passed: boolean; error?: string; response?: unknown; status?: number }>
  ): Promise<void> {
    try {
      const out = await fn();
      this.results.push({
        name,
        passed: out.passed,
        error: out.error,
        response: out.response,
        status: out.status,
      });
      if (out.passed) {
        console.log(`  ✅ ${name}`);
      } else {
        console.log(`  ❌ ${name}${out.error ? `: ${out.error}` : ''}`);
        if (out.response != null) {
          console.log(`     ${JSON.stringify(out.response)}`);
        }
      }
    } catch (e) {
      const err = e instanceof Error ? e.message : 'Unknown error';
      this.results.push({ name, passed: false, error: err });
      console.log(`  ❌ ${name}: ${err}`);
    }
  }

  getResults(): TestResult[] {
    return this.results;
  }

  printSummary(): void {
    const passed = this.results.filter((r) => r.passed).length;
    const failed = this.results.filter((r) => !r.passed).length;
    const total = this.results.length;
    console.log('');
    console.log(`  Total: ${total} | Passed: ${passed} | Failed: ${failed}`);
    if (failed > 0) {
      this.results.filter((r) => !r.passed).forEach((r) => {
        console.log(`    - ${r.name}: ${r.error ?? 'failed'}`);
      });
    }
  }
}

export interface MakeRequestResult {
  status: number;
  data: unknown;
  headers: Headers;
  fetchError?: boolean;
}

export async function makeRequest(
  url: string,
  options: RequestInit = {}
): Promise<MakeRequestResult> {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(options.headers as Record<string, string>) },
    });
    const data = await res.json().catch(() => ({}));
    return { status: res.status, data, headers: res.headers };
  } catch {
    return { status: -1, data: {}, headers: new Headers(), fetchError: true };
  }
}

export async function isServerReachable(): Promise<boolean> {
  try {
    const r = await fetch(BASE_URL, { method: 'GET', signal: AbortSignal.timeout(5000) });
    return r.status < 500;
  } catch {
    return false;
  }
}

export async function isDatabaseReady(): Promise<boolean> {
  const url = process.env.DATABASE_URL;
  if (!url) return false;
  const useSsl =
    process.env.NODE_ENV === 'production' || /neon\.tech|neondb\.io/i.test(url);
  const pool = new Pool({
    connectionString: url,
    ssl: useSsl ? { rejectUnauthorized: false } : undefined,
  });
  try {
    const r = await pool.query(
      `SELECT EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'users'
      ) AS ok`
    );
    return (r.rows[0] as { ok: boolean })?.ok === true;
  } catch {
    return false;
  } finally {
    await pool.end();
  }
}
