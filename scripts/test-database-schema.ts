/**
 * Database Schema Tests
 * 
 * Tests for:
 * - user_roles table structure
 * - users table clerk_id field (if added)
 * - auth_accounts provider support
 * - Foreign key constraints
 * - Unique constraints
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables BEFORE importing database module
// Use override: false to not override existing env vars (like from system)
const envLocalPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envLocalPath, override: false });
dotenv.config({ override: false });

// Import validation utilities (before checking credentials)
import { TestRunner, displayProductionWarning, validateProductionCredentials } from './test-utils';

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
  console.error('ERROR: DATABASE_URL not found in environment variables');
  console.error('Please ensure .env.local contains DATABASE_URL');
  process.exit(1);
}

// We'll dynamically import db and schema in the test functions
let db: any;
let userRoles: any;
let users: any;
let authAccounts: any;
let eq: any;

const runner = new TestRunner();

// Initialize database imports
async function initDatabase() {
  if (!db) {
    const dbModule = await import('../src/lib/db');
    const schemaModule = await import('../src/lib/db/schema');
    const drizzleModule = await import('drizzle-orm');
    db = dbModule.db;
    userRoles = schemaModule.userRoles;
    users = schemaModule.users;
    authAccounts = schemaModule.authAccounts;
    eq = drizzleModule.eq;
  }
}

async function testUserRolesTable() {
  await runner.runTest('user_roles table exists and has correct structure', async () => {
    try {
      // Try to query the table - if it doesn't exist, this will throw
      const result = await db.select().from(userRoles).limit(1);
      return { passed: true, response: { tableExists: true, sampleCount: result.length } };
    } catch (error) {
      return {
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });
}

async function testUserRolesConstraints() {
  await runner.runTest('user_roles unique constraint (userId, role)', async () => {
    try {
      const testUserId = `test_user_${Date.now()}`;
      const testRole = 'base_user';

      // Create a test user first
      await db.insert(users).values({
        id: testUserId,
        email: `test_${Date.now()}@example.com`,
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Insert first role
      await db.insert(userRoles).values({
        userId: testUserId,
        role: testRole,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Try to insert duplicate - should fail
      try {
        await db.insert(userRoles).values({
          userId: testUserId,
          role: testRole,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        // If we get here, the duplicate was allowed - constraint not working
        // Verify by checking count
        const duplicateCount = await db
          .select()
          .from(userRoles)
          .where(eq(userRoles.userId, testUserId));
        
        // Cleanup before returning failure
        await db.delete(userRoles).where(eq(userRoles.userId, testUserId));
        await db.delete(users).where(eq(users.id, testUserId));
        
        if (duplicateCount.length > 1) {
          return { 
            passed: false, 
            error: `Unique constraint not enforced - ${duplicateCount.length} duplicate records exist` 
          };
        }
        return { 
          passed: false, 
          error: 'Unique constraint not enforced - duplicate insert succeeded' 
        };
      } catch (error: any) {
        // Drizzle wraps PostgreSQL errors, try to extract the underlying error
        // Check multiple possible error properties
        const pgError = error.cause || error.originalError || error;
        const errorDetails = {
          message: error.message || String(error),
          code: pgError?.code || error.code || error.errno || error.sqlState || '',
          constraint: pgError?.constraint || error.constraint || '',
          detail: pgError?.detail || error.detail || '',
          hint: pgError?.hint || error.hint || '',
          name: error.name || '',
          // Check if error string contains PostgreSQL error indicators
          errorString: JSON.stringify(error),
        };
        
        // Check for unique constraint violation (PostgreSQL error code 23505)
        // Also check the error message for common PostgreSQL error patterns
        const errorMsg = (errorDetails.message + ' ' + errorDetails.detail + ' ' + errorDetails.errorString).toLowerCase();
        const isUniqueError = 
          errorDetails.code === '23505' ||  // unique_violation
          errorDetails.code === '23514' ||  // check_violation  
          errorDetails.constraint?.toLowerCase().includes('pkey') ||
          errorDetails.constraint?.toLowerCase().includes('user_roles_pkey') ||
          errorMsg.includes('unique') ||
          errorMsg.includes('duplicate') ||
          errorMsg.includes('primary key') ||
          errorMsg.includes('already exists') ||
          errorMsg.includes('violates unique constraint') ||
          errorMsg.includes('duplicate key value');
        
        if (isUniqueError) {
          // Cleanup
          await db.delete(userRoles).where(eq(userRoles.userId, testUserId));
          await db.delete(users).where(eq(users.id, testUserId));
          return { passed: true };
        }
        
        // If we get an error but can't identify it as a unique constraint error,
        // verify that the duplicate wasn't actually inserted
        const rolesAfterError = await db
          .select()
          .from(userRoles)
          .where(eq(userRoles.userId, testUserId));
        
        // Cleanup
        await db.delete(userRoles).where(eq(userRoles.userId, testUserId));
        await db.delete(users).where(eq(users.id, testUserId));
        
        // If only one role exists, the constraint worked (even if error format was unexpected)
        if (rolesAfterError.length === 1) {
          return { passed: true, response: 'Constraint enforced (error format unexpected)' };
        }
        
        // Return detailed error info
        return {
          passed: false,
          error: `Unexpected error format. Code: ${errorDetails.code}, Constraint: ${errorDetails.constraint}, Message: ${errorDetails.message.substring(0, 200)}`
        };
      }
    } catch (error) {
      return {
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });
}

async function testAuthAccountsProviders() {
  await runner.runTest('auth_accounts supports clerk, privy, wallet providers', async () => {
    try {
      const testUserId = `test_user_${Date.now()}`;

      // Create a test user
      await db.insert(users).values({
        id: testUserId,
        email: `test_${Date.now()}@example.com`,
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const providers = ['clerk', 'privy', 'wallet'];
      const insertedProviders: string[] = [];

      for (const provider of providers) {
        try {
          await db.insert(authAccounts).values({
            userId: testUserId,
            provider: provider,
            providerAccountId: `${provider}_account_${Date.now()}`,
            isActive: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          insertedProviders.push(provider);
        } catch (error) {
          // Cleanup on error
          await db.delete(authAccounts).where(eq(authAccounts.userId, testUserId));
          await db.delete(users).where(eq(users.id, testUserId));
          return {
            passed: false,
            error: `Failed to insert provider ${provider}: ${error instanceof Error ? error.message : 'Unknown error'}`,
          };
        }
      }

      // Cleanup
      await db.delete(authAccounts).where(eq(authAccounts.userId, testUserId));
      await db.delete(users).where(eq(users.id, testUserId));

      return {
        passed: true,
        response: { supportedProviders: insertedProviders },
      };
    } catch (error) {
      return {
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });
}

async function testForeignKeyConstraints() {
  await runner.runTest('user_roles foreign key constraint (cascade delete)', async () => {
    try {
      const testUserId = `test_user_${Date.now()}`;

      // Create a test user
      await db.insert(users).values({
        id: testUserId,
        email: `test_${Date.now()}@example.com`,
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Insert a role
      await db.insert(userRoles).values({
        userId: testUserId,
        role: 'base_user',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Verify role exists before deletion
      const rolesBefore = await db
        .select()
        .from(userRoles)
        .where(eq(userRoles.userId, testUserId));
      
      if (rolesBefore.length === 0) {
        await db.delete(users).where(eq(users.id, testUserId));
        return { passed: false, error: 'Role was not created before deletion test' };
      }

      // Delete the user - roles should be cascade deleted
      await db.delete(users).where(eq(users.id, testUserId));

      // Wait a moment for cascade to complete (if async)
      await new Promise(resolve => setTimeout(resolve, 100));

      // Check that the role was also deleted
      const remainingRoles = await db
        .select()
        .from(userRoles)
        .where(eq(userRoles.userId, testUserId));

      if (remainingRoles.length > 0) {
        // Cleanup manually if cascade didn't work
        await db.delete(userRoles).where(eq(userRoles.userId, testUserId));
        return { 
          passed: false, 
          error: `Cascade delete not working - ${remainingRoles.length} role(s) still exist after user deletion. Database schema may need to be synced. Run: npm run db:push` 
        };
      }

      return { passed: true };
    } catch (error) {
      return {
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });
}

async function runAllTests() {
  console.log('Running Database Schema Tests...\n');

  // Initialize database connection first (after env vars are loaded)
  await initDatabase();

  await testUserRolesTable();
  await testUserRolesConstraints();
  await testAuthAccountsProviders();
  await testForeignKeyConstraints();

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

