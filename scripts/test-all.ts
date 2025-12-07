/**
 * Main Test Runner
 * 
 * Runs all test suites for the leaderboard features
 */

import * as dotenv from 'dotenv';

// Load environment variables FIRST - must be before ANY other imports
dotenv.config({ path: '.env.local' });
dotenv.config();

// Import validation utilities (before checking credentials)
import { displayProductionWarning, validateProductionCredentials } from './test-utils';

// Validate credentials and display warnings
const validation = validateProductionCredentials();
displayProductionWarning();

// Check for critical errors
if (validation.errors.length > 0) {
  console.error('\n❌ Cannot run tests with invalid credentials');
  console.error('Please fix the errors above and try again.\n');
  process.exit(1);
}

// Verify DATABASE_URL is loaded (after validation)
if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL environment variable is not set!');
  console.error('Please ensure .env.local exists and contains DATABASE_URL');
  process.exit(1);
}

// Import TestResult type (doesn't import db)
import type { TestResult } from './test-utils';

interface TestSuiteResult {
  suite: string;
  results: TestResult[];
  passed: number;
  failed: number;
  total: number;
}

async function runAllTestSuites(): Promise<TestSuiteResult[]> {
  const suites: TestSuiteResult[] = [];

  console.log('='.repeat(70));
  console.log('LEADERBOARD FEATURES - COMPREHENSIVE TEST SUITE');
  console.log('='.repeat(70));
  console.log('');

  // Dynamically import test modules after env vars are loaded
  // Test Database Schema
  try {
    console.log('\n📊 Testing Database Schema...');
    const { runAllTests: testDatabaseSchema } = await import('./test-database-schema');
    const dbResults = await testDatabaseSchema();
    const dbPassed = dbResults.filter((r) => r.passed).length;
    const dbFailed = dbResults.filter((r) => !r.passed).length;
    suites.push({
      suite: 'Database Schema',
      results: dbResults,
      passed: dbPassed,
      failed: dbFailed,
      total: dbResults.length,
    });
  } catch (error) {
    console.error('❌ Database Schema tests failed:', error);
    suites.push({
      suite: 'Database Schema',
      results: [],
      passed: 0,
      failed: 1,
      total: 1,
    });
  }

  // Test Authentication & Permissions
  try {
    console.log('\n🔐 Testing Authentication & Permissions...');
    const { runAllTests: testAuthPermissions } = await import('./test-auth-permissions');
    const authResults = await testAuthPermissions();
    const authPassed = authResults.filter((r) => r.passed).length;
    const authFailed = authResults.filter((r) => !r.passed).length;
    suites.push({
      suite: 'Authentication & Permissions',
      results: authResults,
      passed: authPassed,
      failed: authFailed,
      total: authResults.length,
    });
  } catch (error) {
    console.error('❌ Authentication & Permissions tests failed:', error);
    suites.push({
      suite: 'Authentication & Permissions',
      results: [],
      passed: 0,
      failed: 1,
      total: 1,
    });
  }

  // Test API Endpoints
  try {
    console.log('\n🌐 Testing API Endpoints...');
    const { runAllTests: testApiEndpoints } = await import('./test-api-endpoints');
    const apiResults = await testApiEndpoints();
    const apiPassed = apiResults.filter((r) => r.passed).length;
    const apiFailed = apiResults.filter((r) => !r.passed).length;
    suites.push({
      suite: 'API Endpoints',
      results: apiResults,
      passed: apiPassed,
      failed: apiFailed,
      total: apiResults.length,
    });
  } catch (error) {
    console.error('❌ API Endpoints tests failed:', error);
    suites.push({
      suite: 'API Endpoints',
      results: [],
      passed: 0,
      failed: 1,
      total: 1,
    });
  }

  // Test Points Calculation
  try {
    console.log('\n📈 Testing Points Calculation...');
    const { runAllTests: testPointsCalculation } = await import('./test-points-calculation');
    const pointsResults = await testPointsCalculation();
    const pointsPassed = pointsResults.filter((r) => r.passed).length;
    const pointsFailed = pointsResults.filter((r) => !r.passed).length;
    suites.push({
      suite: 'Points Calculation',
      results: pointsResults,
      passed: pointsPassed,
      failed: pointsFailed,
      total: pointsResults.length,
    });
  } catch (error) {
    console.error('❌ Points Calculation tests failed:', error);
    suites.push({
      suite: 'Points Calculation',
      results: [],
      passed: 0,
      failed: 1,
      total: 1,
    });
  }

  // Test Webhooks
  try {
    console.log('\n🔔 Testing Webhooks...');
    const { runAllTests: testWebhooks } = await import('./test-webhooks');
    const webhookResults = await testWebhooks();
    const webhookPassed = webhookResults.filter((r) => r.passed).length;
    const webhookFailed = webhookResults.filter((r) => !r.passed).length;
    suites.push({
      suite: 'Webhooks',
      results: webhookResults,
      passed: webhookPassed,
      failed: webhookFailed,
      total: webhookResults.length,
    });
  } catch (error) {
    console.error('❌ Webhooks tests failed:', error);
    suites.push({
      suite: 'Webhooks',
      results: [],
      passed: 0,
      failed: 1,
      total: 1,
    });
  }

  // Test SIWE
  try {
    console.log('\n🔗 Testing SIWE...');
    const { runAllTests: testSIWE } = await import('./test-siwe');
    const siweResults = await testSIWE();
    const siwePassed = siweResults.filter((r) => r.passed).length;
    const siweFailed = siweResults.filter((r) => !r.passed).length;
    suites.push({
      suite: 'SIWE',
      results: siweResults,
      passed: siwePassed,
      failed: siweFailed,
      total: siweResults.length,
    });
  } catch (error) {
    console.error('❌ SIWE tests failed:', error);
    suites.push({
      suite: 'SIWE',
      results: [],
      passed: 0,
      failed: 1,
      total: 1,
    });
  }

  // Test Snowflake
  try {
    console.log('\n❄️  Testing Snowflake Integration...');
    const { runAllTests: testSnowflake } = await import('./test-snowflake');
    const snowflakeResults = await testSnowflake();
    const snowflakePassed = snowflakeResults.filter((r) => r.passed).length;
    const snowflakeFailed = snowflakeResults.filter((r) => !r.passed).length;
    suites.push({
      suite: 'Snowflake Integration',
      results: snowflakeResults,
      passed: snowflakePassed,
      failed: snowflakeFailed,
      total: snowflakeResults.length,
    });
  } catch (error) {
    console.error('❌ Snowflake tests failed:', error);
    suites.push({
      suite: 'Snowflake Integration',
      results: [],
      passed: 0,
      failed: 1,
      total: 1,
    });
  }

  return suites;
}

function printFinalSummary(suites: TestSuiteResult[]): void {
  console.log('\n' + '='.repeat(70));
  console.log('FINAL TEST SUMMARY');
  console.log('='.repeat(70));
  console.log('');

  let totalPassed = 0;
  let totalFailed = 0;
  let totalTests = 0;

  suites.forEach((suite) => {
    totalPassed += suite.passed;
    totalFailed += suite.failed;
    totalTests += suite.total;

    const status = suite.failed === 0 ? '✅' : '❌';
    const percentage = suite.total > 0 ? ((suite.passed / suite.total) * 100).toFixed(1) : '0.0';

    console.log(
      `${status} ${suite.suite.padEnd(35)} ${suite.passed}/${suite.total} passed (${percentage}%)`
    );
  });

  console.log('');
  console.log('='.repeat(70));
  console.log(`Total: ${totalPassed + totalFailed} tests`);
  console.log(`Passed: ${totalPassed}`);
  console.log(`Failed: ${totalFailed}`);
  console.log(`Success Rate: ${totalTests > 0 ? ((totalPassed / totalTests) * 100).toFixed(1) : '0.0'}%`);
  console.log('='.repeat(70));

  if (totalFailed > 0) {
    console.log('\nFailed Tests by Suite:');
    suites.forEach((suite) => {
      if (suite.failed > 0) {
        console.log(`\n${suite.suite}:`);
        suite.results
          .filter((r) => !r.passed)
          .forEach((r) => {
            console.log(`  - ${r.name}: ${r.error || 'Unknown error'}`);
          });
      }
    });
  }
}

async function main() {
  try {
    const suites = await runAllTestSuites();
    printFinalSummary(suites);

    const totalFailed = suites.reduce((sum, suite) => sum + suite.failed, 0);
    process.exit(totalFailed > 0 ? 1 : 0);
  } catch (error) {
    console.error('Fatal error running tests:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

export { runAllTestSuites, printFinalSummary };

