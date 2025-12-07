/**
 * Points Calculation Tests
 * 
 * Tests for:
 * - Points calculation logic using calculatePoints function
 * - Points aggregation in userEpochScores
 * - Points aggregation in users.totalPoints
 * - Points aggregation in epochs.totalPoints
 * - Points update when tweet engagement changes
 * - calculatePoints function edge cases (null, undefined, zero values)
 */

import * as dotenv from 'dotenv';

// Load environment variables BEFORE importing database module
dotenv.config({ path: '.env.local' });
dotenv.config();

// Import validation utilities (before checking credentials)
import { TestRunner, displayProductionWarning, validateProductionCredentials } from './test-utils';

// Validate credentials and display warnings
const validation = validateProductionCredentials();
displayProductionWarning();

// Check for critical errors (only for database tests)
async function validateForDbTests(): Promise<void> {
  if (validation.errors.length > 0) {
    console.error('\n❌ Cannot run database tests with invalid credentials');
    console.error('Please fix the errors above and try again.\n');
    throw new Error('Invalid credentials');
  }
  
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set. Database tests require a database connection.');
  }
}
import { calculatePoints, POINT_WEIGHTS } from '../src/lib/points-config';

const runner = new TestRunner();

// Lazy load database dependencies only when needed
let db: any;
let users: any, userRoles: any, projects: any, campaigns: any, epochs: any, tweets: any, userEpochScores: any;
let eq: any, and: any;

async function loadDatabaseDependencies() {
  await validateForDbTests();
  
  if (!db) {
    const dbModule = await import('../src/lib/db');
    const schemaModule = await import('../src/lib/db/schema');
    const drizzleOrm = await import('drizzle-orm');
    
    db = dbModule.db;
    users = schemaModule.users;
    userRoles = schemaModule.userRoles;
    projects = schemaModule.projects;
    campaigns = schemaModule.campaigns;
    epochs = schemaModule.epochs;
    tweets = schemaModule.tweets;
    userEpochScores = schemaModule.userEpochScores;
    eq = drizzleOrm.eq;
    and = drizzleOrm.and;
  }
  
  return { db, users, userRoles, projects, campaigns, epochs, tweets, userEpochScores, eq, and };
}

async function createTestUser(): Promise<string> {
  const { db, users } = await loadDatabaseDependencies();
  const testUserId = `test_user_${Date.now()}_${Math.random().toString(36).substring(7)}`;

  await db.insert(users).values({
    id: testUserId,
    email: `test_${Date.now()}@example.com`,
    isActive: 1,
    totalPoints: 0,
    totalLikes: 0,
    totalReplies: 0,
    totalRetweets: 0,
    totalQuotes: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return testUserId;
}

async function createTestEpoch(): Promise<{ projectId: string; campaignIndex: number; epochIndex: number }> {
  const { db, projects, campaigns, epochs } = await loadDatabaseDependencies();
  const projectId = `test_project_${Date.now()}`;
  const campaignIndex = 0;
  const epochIndex = 0;

  await db.insert(projects).values({
    id: projectId,
    name: 'Test Project',
    campaignCount: 1,
    isActive: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

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

async function cleanupTestData(userId: string, projectId: string): Promise<void> {
  const { db, tweets, userEpochScores, userRoles, users, epochs, campaigns, projects, eq } = await loadDatabaseDependencies();
  await db.delete(tweets).where(eq(tweets.userId, userId));
  await db.delete(userEpochScores).where(eq(userEpochScores.userId, userId));
  await db.delete(userRoles).where(eq(userRoles.userId, userId));
  await db.delete(users).where(eq(users.id, userId));
  await db.delete(epochs).where(eq(epochs.projectId, projectId));
  await db.delete(campaigns).where(eq(campaigns.projectId, projectId));
  await db.delete(projects).where(eq(projects.id, projectId));
}

async function testCalculatePointsFunction() {
  await runner.runTest('calculatePoints: handles null values', async () => {
    const result = calculatePoints(null, undefined, 0, null);
    return {
      passed: result === 0,
      response: { result, expected: 0 },
    };
  });

  await runner.runTest('calculatePoints: handles undefined values', async () => {
    const result = calculatePoints(undefined, undefined, undefined, undefined);
    return {
      passed: result === 0,
      response: { result, expected: 0 },
    };
  });

  await runner.runTest('calculatePoints: handles zero values', async () => {
    const result = calculatePoints(0, 0, 0, 0);
    return {
      passed: result === 0,
      response: { result, expected: 0 },
    };
  });

  await runner.runTest('calculatePoints: uses POINT_WEIGHTS correctly with default weights', async () => {
    const likes = 2;
    const replies = 3;
    const retweets = 4;
    const quotes = 5;
    const result = calculatePoints(likes, replies, retweets, quotes);
    const expected = likes * POINT_WEIGHTS.likes + replies * POINT_WEIGHTS.replies + 
                     retweets * POINT_WEIGHTS.retweets + quotes * POINT_WEIGHTS.quotes;
    return {
      passed: result === expected,
      response: { result, expected, weights: POINT_WEIGHTS },
    };
  });

  await runner.runTest('calculatePoints: handles mixed null and number values', async () => {
    const result = calculatePoints(10, null, 5, undefined);
    const expected = 10 * POINT_WEIGHTS.likes + 0 + 5 * POINT_WEIGHTS.retweets + 0;
    return {
      passed: result === expected,
      response: { result, expected },
    };
  });

  await runner.runTest('calculatePoints: handles large numbers', async () => {
    const likes = 1000;
    const replies = 2000;
    const retweets = 3000;
    const quotes = 4000;
    const result = calculatePoints(likes, replies, retweets, quotes);
    const expected = likes * POINT_WEIGHTS.likes + replies * POINT_WEIGHTS.replies + 
                     retweets * POINT_WEIGHTS.retweets + quotes * POINT_WEIGHTS.quotes;
    return {
      passed: result === expected,
      response: { result, expected },
    };
  });
}

async function testPointsCalculation() {
  await runner.runTest('Points calculation: 1 like = 1 point', async () => {
    const likes = 5;
    const replies = 0;
    const retweets = 0;
    const quotes = 0;
    const calculated = calculatePoints(likes, replies, retweets, quotes);
    const expectedPoints = 5;

    return {
      passed: calculated === expectedPoints,
      response: { likes, expectedPoints, calculated },
    };
  });

  await runner.runTest('Points calculation: 1 reply = 1 point', async () => {
    const likes = 0;
    const replies = 3;
    const retweets = 0;
    const quotes = 0;
    const calculated = calculatePoints(likes, replies, retweets, quotes);
    const expectedPoints = 3;

    return {
      passed: calculated === expectedPoints,
      response: { replies, expectedPoints, calculated },
    };
  });

  await runner.runTest('Points calculation: 1 retweet = 1 point', async () => {
    const likes = 0;
    const replies = 0;
    const retweets = 2;
    const quotes = 0;
    const calculated = calculatePoints(likes, replies, retweets, quotes);
    const expectedPoints = 2;

    return {
      passed: calculated === expectedPoints,
      response: { retweets, expectedPoints, calculated },
    };
  });

  await runner.runTest('Points calculation: 1 quote = 1 point', async () => {
    const likes = 0;
    const replies = 0;
    const retweets = 0;
    const quotes = 4;
    const calculated = calculatePoints(likes, replies, retweets, quotes);
    const expectedPoints = 4;

    return {
      passed: calculated === expectedPoints,
      response: { quotes, expectedPoints, calculated },
    };
  });

  await runner.runTest('Points calculation: total points = sum of all engagements', async () => {
    const likes = 10;
    const replies = 5;
    const retweets = 3;
    const quotes = 2;
    const calculated = calculatePoints(likes, replies, retweets, quotes);
    const expectedPoints = 20;

    return {
      passed: calculated === expectedPoints,
      response: { likes, replies, retweets, quotes, expectedPoints, calculated },
    };
  });
}

async function testPointsAggregation() {
  await runner.runTest('Points aggregation in userEpochScores', async () => {
    const { db, userEpochScores, eq, and } = await loadDatabaseDependencies();
    const userId = await createTestUser();
    const { projectId, campaignIndex, epochIndex } = await createTestEpoch();
    try {
      // Create userEpochScores entry
      await db.insert(userEpochScores).values({
        projectId,
        campaignIndex,
        epochIndex,
        userId,
        points: 100,
        tweetCount: 5,
        totalLikes: 50,
        totalReplies: 30,
        totalRetweets: 15,
        totalQuotes: 5,
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Verify the points were stored
      const score = await db
        .select()
        .from(userEpochScores)
        .where(
          and(
            eq(userEpochScores.projectId, projectId),
            eq(userEpochScores.campaignIndex, campaignIndex),
            eq(userEpochScores.epochIndex, epochIndex),
            eq(userEpochScores.userId, userId)
          )
        )
        .limit(1);

      await cleanupTestData(userId, projectId);

      return {
        passed: score.length === 1 && score[0].points === 100,
        response: { score: score[0] },
      };
    } catch (error) {
      await cleanupTestData(userId, projectId);
      return {
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });

  await runner.runTest('Points aggregation in users.totalPoints', async () => {
    const { db, users, eq } = await loadDatabaseDependencies();
    const userId = await createTestUser();
    const { projectId, campaignIndex, epochIndex } = await createTestEpoch();
    try {
      // Verify user exists first
      const userBefore = await db.select().from(users).where(eq(users.id, userId)).limit(1);
      if (userBefore.length === 0) {
        await cleanupTestData(userId, projectId);
        return {
          passed: false,
          error: 'User does not exist before update test',
        };
      }

      // Update user totalPoints
      await db
        .update(users)
        .set({
          totalPoints: 250,
          totalLikes: 150,
          totalReplies: 60,
          totalRetweets: 30,
          totalQuotes: 10,
          updatedAt: new Date(),
        })
        .where(eq(users.id, userId));

      // Verify the points were stored
      const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);

      const passed = user.length === 1 && user[0].totalPoints === 250;
      
      await cleanupTestData(userId, projectId);

      return {
        passed,
        response: { user: user[0] },
        error: passed ? undefined : `Expected totalPoints to be 250, got ${user[0]?.totalPoints}`,
      };
    } catch (error) {
      await cleanupTestData(userId, projectId);
      return {
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });

  await runner.runTest('Points aggregation in epochs.totalPoints', async () => {
    const { db, epochs, eq, and } = await loadDatabaseDependencies();
    const userId = await createTestUser();
    const { projectId, campaignIndex, epochIndex } = await createTestEpoch();
    try {
      // Verify epoch exists first
      const epochBefore = await db
        .select()
        .from(epochs)
        .where(
          and(
            eq(epochs.projectId, projectId),
            eq(epochs.campaignIndex, campaignIndex),
            eq(epochs.index, epochIndex)
          )
        )
        .limit(1);
      
      if (epochBefore.length === 0) {
        await cleanupTestData(userId, projectId);
        return {
          passed: false,
          error: 'Epoch does not exist before update test',
        };
      }

      // Update epoch totalPoints
      await db
        .update(epochs)
        .set({
          totalPoints: 500,
          totalLikes: 300,
          totalReplies: 120,
          totalRetweets: 60,
          totalQuotes: 20,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(epochs.projectId, projectId),
            eq(epochs.campaignIndex, campaignIndex),
            eq(epochs.index, epochIndex)
          )
        );

      // Verify the points were stored
      const epoch = await db
        .select()
        .from(epochs)
        .where(
          and(
            eq(epochs.projectId, projectId),
            eq(epochs.campaignIndex, campaignIndex),
            eq(epochs.index, epochIndex)
          )
        )
        .limit(1);

      const passed = epoch.length === 1 && epoch[0].totalPoints === 500;
      
      await cleanupTestData(userId, projectId);

      return {
        passed,
        response: { epoch: epoch[0] },
        error: passed ? undefined : `Expected totalPoints to be 500, got ${epoch[0]?.totalPoints}`,
      };
    } catch (error) {
      await cleanupTestData(userId, projectId);
      return {
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });
}

async function testPointsUpdate() {
  await runner.runTest('Points update when tweet engagement changes', async () => {
    const { db, tweets, eq } = await loadDatabaseDependencies();
    const userId = await createTestUser();
    const { projectId, campaignIndex, epochIndex } = await createTestEpoch();
    const postId = `test_tweet_${Date.now()}`;
    
    try {
      // Create initial tweet
      await db.insert(tweets).values({
        postId,
        userId,
        twitterUserId: `twitter_${userId}`,
        projectId,
        campaignIndex,
        epochIndex,
        likes: 10,
        replies: 5,
        retweets: 3,
        quotes: 2,
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Calculate initial points using calculatePoints
      const initialPoints = calculatePoints(10, 5, 3, 2);

      // Update tweet engagement
      await db
        .update(tweets)
        .set({
          likes: 15,
          replies: 8,
          retweets: 5,
          quotes: 3,
          updatedAt: new Date(),
        })
        .where(eq(tweets.postId, postId));

      // Calculate new points using calculatePoints
      const newPoints = calculatePoints(15, 8, 5, 3);
      const pointsDiff = newPoints - initialPoints;

      // Verify the update
      const updatedTweet = await db.select().from(tweets).where(eq(tweets.postId, postId)).limit(1);

      await cleanupTestData(userId, projectId);

      return {
        passed:
          updatedTweet.length === 1 &&
          updatedTweet[0].likes === 15 &&
          updatedTweet[0].replies === 8 &&
          updatedTweet[0].retweets === 5 &&
          updatedTweet[0].quotes === 3 &&
          pointsDiff === 11,
        response: {
          initialPoints,
          newPoints,
          pointsDiff,
          tweet: updatedTweet[0],
        },
      };
    } catch (error) {
      await cleanupTestData(userId, projectId);
      return {
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });
}

async function runAllTests(includeDbTests: boolean = true) {
  console.log('Running Points Calculation Tests...\n');

  // These tests don't require a database
  await testCalculatePointsFunction();
  await testPointsCalculation();

  // These tests require a database connection
  if (includeDbTests) {
    try {
      await testPointsAggregation();
      await testPointsUpdate();
    } catch (error) {
      if (error instanceof Error && error.message.includes('DATABASE_URL')) {
        console.log('\n⚠️  Skipping database-dependent tests (DATABASE_URL not set)');
        console.log('   Run with DATABASE_URL set to test database integration.\n');
      } else {
        throw error;
      }
    }
  }

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

