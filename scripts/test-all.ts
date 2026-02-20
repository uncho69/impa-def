/**
 * Runs all functionality test suites.
 * Skips DB-dependent suites if DB not ready; skips HTTP-dependent if app not running.
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}
dotenv.config();

import type { TestResult } from './test-utils';
import { isServerReachable, isDatabaseReady, BASE_URL } from './test-utils';

interface SuiteOut {
  suite: string;
  results: TestResult[];
  passed: number;
  failed: number;
  total: number;
  skipped?: boolean;
  skipReason?: string;
}

async function run(): Promise<SuiteOut[]> {
  const out: SuiteOut[] = [];

  console.log('='.repeat(60));
  console.log('App functionality tests');
  console.log('='.repeat(60));

  const runSuite = async (
    name: string,
    fn: () => Promise<TestResult[]>
  ): Promise<SuiteOut> => {
    const results = await fn();
    const passed = results.filter((r) => r.passed).length;
    const failed = results.filter((r) => !r.passed).length;
    return { suite: name, results, passed, failed, total: results.length };
  };

  console.log('\n--- Middleware ---');
  out.push(await runSuite('Middleware', () => import('./test-middleware').then((m) => m.runAllTests())));

  console.log('\n--- Unit (lib) ---');
  out.push(await runSuite('Unit', () => import('./test-unit').then((m) => m.runAllTests())));

  const dbReady = await isDatabaseReady();
  const serverReady = await isServerReachable();

  if (!dbReady) {
    console.log('\n--- Database (skipped: no users table) ---');
    out.push({
      suite: 'Database',
      results: [],
      passed: 0,
      failed: 0,
      total: 0,
      skipped: true,
      skipReason: 'users table not found; run migrations',
    });
  } else {
    console.log('\n--- Database ---');
    try {
      out.push(await runSuite('Database', () => import('./test-db').then((m) => m.runAllTests())));
    } catch (e) {
      console.error('Database suite error:', e);
      out.push({
        suite: 'Database',
        results: [],
        passed: 0,
        failed: 1,
        total: 1,
      });
    }
  }

  if (!dbReady) {
    console.log('\n--- Auth (skipped: no DB) ---');
    out.push({
      suite: 'Auth',
      results: [],
      passed: 0,
      failed: 0,
      total: 0,
      skipped: true,
      skipReason: 'database not ready',
    });
  } else {
    console.log('\n--- Auth ---');
    try {
      out.push(await runSuite('Auth', () => import('./test-auth').then((m) => m.runAllTests())));
    } catch (e) {
      console.error('Auth suite error:', e);
      out.push({ suite: 'Auth', results: [], passed: 0, failed: 1, total: 1 });
    }
  }

  if (!dbReady) {
    console.log('\n--- Points (skipped: no DB) ---');
    out.push({
      suite: 'Points',
      results: [],
      passed: 0,
      failed: 0,
      total: 0,
      skipped: true,
      skipReason: 'database not ready',
    });
  } else {
    console.log('\n--- Points ---');
    try {
      out.push(await runSuite('Points', () => import('./test-points').then((m) => m.runAllTests())));
    } catch (e) {
      console.error('Points suite error:', e);
      out.push({ suite: 'Points', results: [], passed: 0, failed: 1, total: 1 });
    }
  }

  if (!serverReady) {
    console.log(`\n--- API (skipped: app not running at ${BASE_URL}) ---`);
    out.push({
      suite: 'API',
      results: [],
      passed: 0,
      failed: 0,
      total: 0,
      skipped: true,
      skipReason: 'app not running',
    });
  } else {
    console.log('\n--- API ---');
    try {
      out.push(await runSuite('API', () => import('./test-api').then((m) => m.runAllTests())));
    } catch (e) {
      console.error('API suite error:', e);
      out.push({ suite: 'API', results: [], passed: 0, failed: 1, total: 1 });
    }
  }

  if (!serverReady) {
    console.log('\n--- Webhooks (skipped: app not running) ---');
    out.push({
      suite: 'Webhooks',
      results: [],
      passed: 0,
      failed: 0,
      total: 0,
      skipped: true,
      skipReason: 'app not running',
    });
  } else {
    console.log('\n--- Webhooks ---');
    try {
      out.push(await runSuite('Webhooks', () => import('./test-webhooks').then((m) => m.runAllTests())));
    } catch (e) {
      console.error('Webhooks suite error:', e);
      out.push({ suite: 'Webhooks', results: [], passed: 0, failed: 1, total: 1 });
    }
  }

  console.log('\n--- Snowflake ---');
  try {
    out.push(await runSuite('Snowflake', () => import('./test-snowflake').then((m) => m.runAllTests())));
  } catch (e) {
    console.error('Snowflake suite error:', e);
    out.push({ suite: 'Snowflake', results: [], passed: 0, failed: 1, total: 1 });
  }

  return out;
}

function printSummary(suites: SuiteOut[]): void {
  console.log('\n' + '='.repeat(60));
  console.log('Summary');
  console.log('='.repeat(60));

  let totalPassed = 0;
  let totalFailed = 0;

  for (const s of suites) {
    if (s.skipped) {
      console.log(`  ${s.suite}: skipped (${s.skipReason})`);
      continue;
    }
    totalPassed += s.passed;
    totalFailed += s.failed;
    const icon = s.failed > 0 ? '❌' : '✅';
    console.log(`  ${icon} ${s.suite}: ${s.passed}/${s.total} passed`);
  }

  console.log('='.repeat(60));
  console.log(`  Total: ${totalPassed} passed, ${totalFailed} failed`);
  console.log('='.repeat(60));
}

run()
  .then((suites) => {
    printSummary(suites);
    const failed = suites.reduce((a, s) => a + (s.skipped ? 0 : s.failed), 0);
    process.exit(failed > 0 ? 1 : 0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
