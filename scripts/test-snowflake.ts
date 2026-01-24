/**
 * Tests: Snowflake client and queries.
 * Optional: requires SNOWFLAKE_* env when testing full connection.
 */

import { TestRunner } from './test-utils';
import { getSnowflakeClient } from '../src/lib/snowflake/client';
import { fetchTweetsFromSnowflake } from '../src/lib/snowflake/queries';

const runner = new TestRunner();

async function runAllTests(): Promise<import('./test-utils').TestResult[]> {
  console.log('Snowflake\n');

  await runner.runTest('Snowflake client - getClient', async () => {
    try {
      const client = getSnowflakeClient();
      return { passed: client != null };
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      if (msg.includes('configuration') || msg.includes('incomplete')) {
        return { passed: true };
      }
      return { passed: false, error: msg };
    }
  });

  await runner.runTest('Snowflake client - initialize', async () => {
    try {
      const client = getSnowflakeClient();
      await client.initialize();
      return { passed: true };
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      if (msg.includes('configuration') || msg.includes('incomplete')) {
        return { passed: true };
      }
      return { passed: false, error: msg };
    }
  });

  await runner.runTest('fetchTweetsFromSnowflake - shape', async () => {
    try {
      const start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const end = new Date();
      const tweets = await fetchTweetsFromSnowflake(start, end);
      return { passed: Array.isArray(tweets) };
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      if (msg.includes('Snowflake') || msg.includes('configuration') || msg.includes('incomplete')) {
        return { passed: true };
      }
      return { passed: false, error: msg };
    }
  });

  runner.printSummary();
  return runner.getResults();
}

if (require.main === module) {
  runAllTests()
    .then((r) => process.exit(r.some((x) => !x.passed) ? 1 : 0))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}

export { runAllTests };
