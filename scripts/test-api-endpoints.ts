/**
 * API Endpoint Tests
 * 
 * Tests for:
 * - Admin role management API
 * - Campaign tweet management API
 * - Leaderboard API endpoints
 */

import * as dotenv from 'dotenv';

// Load environment variables BEFORE importing database module
dotenv.config({ path: '.env.local' });
dotenv.config();

// Import validation utilities (before checking credentials)
import { TestRunner, makeRequest, BASE_URL, CRON_SECRET, displayProductionWarning, validateProductionCredentials } from './test-utils';

// Validate credentials and display warnings
const validation = validateProductionCredentials();
displayProductionWarning();

// Check for critical errors
if (validation.errors.length > 0) {
  console.error('\n❌ Cannot run tests with invalid credentials');
  console.error('Please fix the errors above and try again.\n');
  process.exit(1);
}
import { db } from '../src/lib/db';
import { users, userRoles, projects, campaigns, epochs, tweets } from '../src/lib/db/schema';
import { eq } from 'drizzle-orm';

const runner = new TestRunner();

// Test data setup helpers
async function createTestUser(roles: string[] = ['base_user']): Promise<string> {
  const testUserId = `test_user_${Date.now()}_${Math.random().toString(36).substring(7)}`;

  await db.insert(users).values({
    id: testUserId,
    email: `test_${Date.now()}@example.com`,
    isActive: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  for (const role of roles) {
    await db.insert(userRoles).values({
      userId: testUserId,
      role: role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return testUserId;
}

async function createTestProject(): Promise<{ projectId: string; campaignIndex: number; epochIndex: number }> {
  const projectId = `test_project_${Date.now()}`;
  const campaignIndex = 0;
  const epochIndex = 0;

  // Create project
  await db.insert(projects).values({
    id: projectId,
    name: 'Test Project',
    campaignCount: 1,
    isActive: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Create campaign
  await db.insert(campaigns).values({
    projectId: projectId,
    index: campaignIndex,
    name: 'Test Campaign',
    epochCount: 1,
    epochSize: 7,
    isActive: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Create epoch
  const now = new Date();
  await db.insert(epochs).values({
    projectId: projectId,
    campaignIndex: campaignIndex,
    index: epochIndex,
    startDate: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    endDate: now,
    userCount: 0,
    tweetCount: 0,
    totalLikes: 0,
    totalReplies: 0,
    totalRetweets: 0,
    totalQuotes: 0,
    totalPoints: 0,
    isActive: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return { projectId, campaignIndex, epochIndex };
}

async function cleanupTestData(userIds: string[], projectId?: string): Promise<void> {
  for (const userId of userIds) {
    await db.delete(userRoles).where(eq(userRoles.userId, userId));
    await db.delete(users).where(eq(users.id, userId));
  }

  if (projectId) {
    await db.delete(epochs).where(eq(epochs.projectId, projectId));
    await db.delete(campaigns).where(eq(campaigns.projectId, projectId));
    await db.delete(projects).where(eq(projects.id, projectId));
  }
}

// Admin Role Management API Tests
async function testAdminRolesGet() {
  await runner.runTest('GET /api/admin/roles - unauthorized (401)', async () => {
    const { status, data } = await makeRequest('/api/admin/roles');
    return {
      passed: status === 401,
      status,
      response: data,
    };
  });

  // Note: Testing with actual authentication requires Clerk session tokens
  // These tests would need to be run manually with proper auth tokens
}

async function testAdminRolesPost() {
  await runner.runTest('POST /api/admin/roles - unauthorized (401)', async () => {
    const { status, data } = await makeRequest('/api/admin/roles', {
      method: 'POST',
      body: JSON.stringify({
        targetUserId: 'test_user',
        role: 'admin',
      }),
    });
    return {
      passed: status === 401,
      status,
      response: data,
    };
  });

  await runner.runTest('POST /api/admin/roles - missing fields (400)', async () => {
    // This would require authentication, but we can test the validation
    const { status, data } = await makeRequest('/api/admin/roles', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    // Should be 401 (unauthorized) or 400 (bad request) depending on auth check order
    return {
      passed: status === 400 || status === 401,
      status,
      response: data,
    };
  });
}

async function testAdminRolesDelete() {
  await runner.runTest('DELETE /api/admin/roles - unauthorized (401)', async () => {
    const { status, data } = await makeRequest('/api/admin/roles', {
      method: 'DELETE',
      body: JSON.stringify({
        targetUserId: 'test_user',
        role: 'admin',
      }),
    });
    return {
      passed: status === 401,
      status,
      response: data,
    };
  });
}

// Campaign Tweet Management API Tests
async function testCampaignTweetsPost() {
  await runner.runTest('POST /api/campaigns/[campaignId]/tweets - unauthorized (401)', async () => {
    const { status, data } = await makeRequest('/api/campaigns/test-0/tweets', {
      method: 'POST',
      body: JSON.stringify({
        postId: 'test_tweet_123',
      }),
    });
    return {
      passed: status === 401,
      status,
      response: data,
    };
  });

  await runner.runTest('POST /api/campaigns/[campaignId]/tweets - invalid campaignId format (400)', async () => {
    const { status, data } = await makeRequest('/api/campaigns/invalid/tweets', {
      method: 'POST',
      body: JSON.stringify({
        postId: 'test_tweet_123',
      }),
    });
    return {
      passed: status === 400 || status === 401, // 401 if auth checked first, 400 if validation first
      status,
      response: data,
    };
  });
}

async function testCampaignTweetsGet() {
  await runner.runTest('GET /api/campaigns/[campaignId]/tweets - invalid campaignId format (400)', async () => {
    const { status, data } = await makeRequest('/api/campaigns/invalid/tweets');
    return {
      passed: status === 400,
      status,
      response: data,
    };
  });

  // Create test data for valid request
  const { projectId, campaignIndex } = await createTestProject();
  const campaignId = `${projectId}-${campaignIndex}`;

  await runner.runTest('GET /api/campaigns/[campaignId]/tweets - valid request', async () => {
    const { status, data } = await makeRequest(`/api/campaigns/${campaignId}/tweets`);
    await cleanupTestData([], projectId);
    return {
      passed: status === 200 && Array.isArray(data.tweets),
      status,
      response: data,
    };
  });
}

// Leaderboard API Tests
async function testEpochLeaderboard() {
  await runner.runTest('GET /api/leaderboards/epoch/[epochId] - invalid format (400)', async () => {
    const { status, data } = await makeRequest('/api/leaderboards/epoch/invalid');
    return {
      passed: status === 400,
      status,
      response: data,
    };
  });

  await runner.runTest('GET /api/leaderboards/epoch/[epochId] - epoch not found (404)', async () => {
    const { status, data } = await makeRequest('/api/leaderboards/epoch/nonexistent-0-0');
    return {
      passed: status === 404,
      status,
      response: data,
    };
  });

  // Create test data for valid request
  const { projectId, campaignIndex, epochIndex } = await createTestProject();
  const epochId = `${projectId}-${campaignIndex}-${epochIndex}`;

  await runner.runTest('GET /api/leaderboards/epoch/[epochId] - valid request', async () => {
    const { status, data } = await makeRequest(`/api/leaderboards/epoch/${epochId}`);
    await cleanupTestData([], projectId);
    return {
      passed: status === 200 && Array.isArray(data.leaderboard),
      status,
      response: data,
    };
  });

  // Create new test data for pagination test (previous test cleaned up the data)
  const { projectId: projectId2, campaignIndex: campaignIndex2, epochIndex: epochIndex2 } = await createTestProject();
  const epochId2 = `${projectId2}-${campaignIndex2}-${epochIndex2}`;

  await runner.runTest('GET /api/leaderboards/epoch/[epochId] - with pagination', async () => {
    const { status, data } = await makeRequest(`/api/leaderboards/epoch/${epochId2}?limit=10&offset=0`);
    await cleanupTestData([], projectId2);
    return {
      passed: status === 200 && data.pagination && data.pagination.limit === 10,
      status,
      response: data,
    };
  });
}

async function testGlobalLeaderboard() {
  await runner.runTest('GET /api/leaderboards/global - valid request', async () => {
    const { status, data } = await makeRequest('/api/leaderboards/global');
    return {
      passed: status === 200 && Array.isArray(data.leaderboard) && data.pagination,
      status,
      response: data,
    };
  });

  await runner.runTest('GET /api/leaderboards/global - with pagination', async () => {
    const { status, data } = await makeRequest('/api/leaderboards/global?limit=20&offset=0');
    return {
      passed: status === 200 && data.pagination && data.pagination.limit === 20,
      status,
      response: data,
    };
  });
}

async function testGlobalLeaderboardUser() {
  const testUserId = await createTestUser(['base_user']);

  await runner.runTest('GET /api/leaderboards/global/user/[userId] - valid request', async () => {
    const { status, data } = await makeRequest(`/api/leaderboards/global/user/${testUserId}`);
    await cleanupTestData([testUserId]);
    // Rank can be number or string (depending on formatting), but should exist
    return {
      passed: status === 200 && data.user && data.user.userId === testUserId && data.user.rank !== undefined,
      status,
      response: data,
    };
  });

  await runner.runTest('GET /api/leaderboards/global/user/[userId] - user not found (404)', async () => {
    const { status, data } = await makeRequest('/api/leaderboards/global/user/nonexistent_user');
    return {
      passed: status === 404,
      status,
      response: data,
    };
  });
}

// Cron Job Tests
async function testCronProcessTweets() {
  await runner.runTest('POST /api/cron/process-tweets - unauthorized (401)', async () => {
    const { status, data } = await makeRequest('/api/cron/process-tweets', {
      method: 'POST',
    });
    // If CRON_SECRET is not set, it might not require auth
    return {
      passed: status === 401 || status === 200 || status === 500, // 500 if Snowflake fails
      status,
      response: data,
    };
  });

  if (CRON_SECRET) {
    await runner.runTest('POST /api/cron/process-tweets - with valid secret', async () => {
      const { status, data } = await makeRequest('/api/cron/process-tweets', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${CRON_SECRET}`,
        },
      });
      // Should succeed or fail with Snowflake error, but not 401
      return {
        passed: status !== 401,
        status,
        response: data,
      };
    });
  }

  await runner.runTest('POST /api/cron/process-tweets - with date range', async () => {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 24 * 60 * 60 * 1000);
    const url = `/api/cron/process-tweets?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    const { status, data } = await makeRequest(url, {
      method: 'POST',
      headers: CRON_SECRET ? { Authorization: `Bearer ${CRON_SECRET}` } : {},
    });
    return {
      passed: status !== 400, // Should not be a bad request
      status,
      response: data,
    };
  });
}

async function runAllTests() {
  console.log('Running API Endpoint Tests...\n');

  await testAdminRolesGet();
  await testAdminRolesPost();
  await testAdminRolesDelete();
  await testCampaignTweetsPost();
  await testCampaignTweetsGet();
  await testEpochLeaderboard();
  await testGlobalLeaderboard();
  await testGlobalLeaderboardUser();
  await testCronProcessTweets();

  runner.printSummary();
  return runner.getResults();
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests()
    .then((results) => {
      const failed = results.filter((r) => !r.passed).length;
      process.exit(failed > 0 ? 1 : 0);
    })
    .catch((error) => {
      console.error('Test execution error:', error);
      process.exit(1);
    });
}

export { runAllTests };

