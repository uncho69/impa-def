/**
 * Authentication & Authorization Tests
 * 
 * Tests for:
 * - Role-based permissions functions
 * - Auth middleware functions
 */

import * as dotenv from 'dotenv';

// Load environment variables BEFORE importing database module
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

import { db } from '../src/lib/db';
import { users, userRoles, authAccounts } from '../src/lib/db/schema';
import { eq } from 'drizzle-orm';
import {
  hasRole,
  hasAnyRole,
  getUserRoles,
  canAddTweetsToCampaign,
  isAdmin,
  isModeratorOrAdmin,
  UserRole,
} from '../src/lib/auth/permissions';
import { TestRunner } from './test-utils';

const runner = new TestRunner();

async function createTestUser(roles: UserRole[] = ['base_user']): Promise<string> {
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

async function cleanupTestUser(userId: string): Promise<void> {
  await db.delete(userRoles).where(eq(userRoles.userId, userId));
  await db.delete(users).where(eq(users.id, userId));
}

async function testHasRole() {
  await runner.runTest('hasRole() function - user has role', async () => {
    const userId = await createTestUser(['admin']);
    try {
      const result = await hasRole(userId, 'admin');
      await cleanupTestUser(userId);
      return { passed: result === true, response: { hasRole: result } };
    } catch (error) {
      await cleanupTestUser(userId);
      return {
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });

  await runner.runTest('hasRole() function - user does not have role', async () => {
    const userId = await createTestUser(['base_user']);
    try {
      const result = await hasRole(userId, 'admin');
      await cleanupTestUser(userId);
      return { passed: result === false, response: { hasRole: result } };
    } catch (error) {
      await cleanupTestUser(userId);
      return {
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });
}

async function testHasAnyRole() {
  await runner.runTest('hasAnyRole() function - user has one of the roles', async () => {
    const userId = await createTestUser(['moderator']);
    try {
      const result = await hasAnyRole(userId, ['admin', 'moderator', 'participant']);
      await cleanupTestUser(userId);
      return { passed: result === true, response: { hasAnyRole: result } };
    } catch (error) {
      await cleanupTestUser(userId);
      return {
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });

  await runner.runTest('hasAnyRole() function - user does not have any of the roles', async () => {
    const userId = await createTestUser(['base_user']);
    try {
      const result = await hasAnyRole(userId, ['admin', 'moderator', 'participant']);
      await cleanupTestUser(userId);
      return { passed: result === false, response: { hasAnyRole: result } };
    } catch (error) {
      await cleanupTestUser(userId);
      return {
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });
}

async function testGetUserRoles() {
  await runner.runTest('getUserRoles() function - returns all user roles', async () => {
    const userId = await createTestUser(['admin', 'moderator']);
    try {
      const roles = await getUserRoles(userId);
      await cleanupTestUser(userId);
      const hasAdmin = roles.includes('admin');
      const hasModerator = roles.includes('moderator');
      return {
        passed: hasAdmin && hasModerator && roles.length === 2,
        response: { roles },
      };
    } catch (error) {
      await cleanupTestUser(userId);
      return {
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });
}

async function testCanAddTweetsToCampaign() {
  await runner.runTest('canAddTweetsToCampaign() - admin can add tweets', async () => {
    const userId = await createTestUser(['admin']);
    try {
      const result = await canAddTweetsToCampaign(userId);
      await cleanupTestUser(userId);
      return { passed: result === true, response: { canAdd: result } };
    } catch (error) {
      await cleanupTestUser(userId);
      return {
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });

  await runner.runTest('canAddTweetsToCampaign() - moderator can add tweets', async () => {
    const userId = await createTestUser(['moderator']);
    try {
      const result = await canAddTweetsToCampaign(userId);
      await cleanupTestUser(userId);
      return { passed: result === true, response: { canAdd: result } };
    } catch (error) {
      await cleanupTestUser(userId);
      return {
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });

  await runner.runTest('canAddTweetsToCampaign() - participant can add tweets', async () => {
    const userId = await createTestUser(['participant']);
    try {
      const result = await canAddTweetsToCampaign(userId);
      await cleanupTestUser(userId);
      return { passed: result === true, response: { canAdd: result } };
    } catch (error) {
      await cleanupTestUser(userId);
      return {
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });

  await runner.runTest('canAddTweetsToCampaign() - base_user cannot add tweets', async () => {
    const userId = await createTestUser(['base_user']);
    try {
      const result = await canAddTweetsToCampaign(userId);
      await cleanupTestUser(userId);
      return { passed: result === false, response: { canAdd: result } };
    } catch (error) {
      await cleanupTestUser(userId);
      return {
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });
}

async function testIsAdmin() {
  await runner.runTest('isAdmin() function - admin user', async () => {
    const userId = await createTestUser(['admin']);
    try {
      const result = await isAdmin(userId);
      await cleanupTestUser(userId);
      return { passed: result === true, response: { isAdmin: result } };
    } catch (error) {
      await cleanupTestUser(userId);
      return {
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });

  await runner.runTest('isAdmin() function - non-admin user', async () => {
    const userId = await createTestUser(['base_user']);
    try {
      const result = await isAdmin(userId);
      await cleanupTestUser(userId);
      return { passed: result === false, response: { isAdmin: result } };
    } catch (error) {
      await cleanupTestUser(userId);
      return {
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });
}

async function testIsModeratorOrAdmin() {
  await runner.runTest('isModeratorOrAdmin() function - admin user', async () => {
    const userId = await createTestUser(['admin']);
    try {
      const result = await isModeratorOrAdmin(userId);
      await cleanupTestUser(userId);
      return { passed: result === true, response: { isModeratorOrAdmin: result } };
    } catch (error) {
      await cleanupTestUser(userId);
      return {
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });

  await runner.runTest('isModeratorOrAdmin() function - moderator user', async () => {
    const userId = await createTestUser(['moderator']);
    try {
      const result = await isModeratorOrAdmin(userId);
      await cleanupTestUser(userId);
      return { passed: result === true, response: { isModeratorOrAdmin: result } };
    } catch (error) {
      await cleanupTestUser(userId);
      return {
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });

  await runner.runTest('isModeratorOrAdmin() function - base_user', async () => {
    const userId = await createTestUser(['base_user']);
    try {
      const result = await isModeratorOrAdmin(userId);
      await cleanupTestUser(userId);
      return { passed: result === false, response: { isModeratorOrAdmin: result } };
    } catch (error) {
      await cleanupTestUser(userId);
      return {
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });
}

async function runAllTests() {
  console.log('Running Authentication & Authorization Tests...\n');

  await testHasRole();
  await testHasAnyRole();
  await testGetUserRoles();
  await testCanAddTweetsToCampaign();
  await testIsAdmin();
  await testIsModeratorOrAdmin();

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

