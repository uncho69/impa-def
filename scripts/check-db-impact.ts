/**
 * Script to check the impact of pushing schema to production database
 * This will show what tables exist, what will be created, and any potential conflicts
 */

import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { sql } from 'drizzle-orm';
import pg from 'pg';

dotenv.config({ path: '.env.local' });
dotenv.config();

const { Pool } = pg;

async function checkDatabaseImpact() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in environment variables');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(pool);

  try {
    console.log('🔍 Analyzing Production Database Impact...\n');
    console.log('='.repeat(70));

    // Get all existing tables
    console.log('\n📊 Checking existing tables in database...\n');
    const existingTables = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    const tableNames = existingTables.rows.map((row: any) => row.table_name);
    
    if (tableNames.length === 0) {
      console.log('  ⚠️  No tables found in database - this is a fresh database');
    } else {
      console.log(`  Found ${tableNames.length} existing table(s):`);
      tableNames.forEach((name: string) => {
        console.log(`    - ${name}`);
      });
    }

    // Expected tables from migration
    const expectedTables = [
      'api_keys',
      'auth_accounts',
      'campaigns',
      'epochs',
      'otp_codes',
      'projects',
      'refresh_tokens',
      'rewards',
      'sessions',
      'tweets',
      'user_epoch_scores',
      'user_roles',
      'users',
      'verification_tokens',
    ];

    console.log('\n📋 Expected tables from schema (14 tables):');
    expectedTables.forEach((name) => {
      const exists = tableNames.includes(name);
      const status = exists ? '✅ EXISTS' : '❌ MISSING';
      console.log(`    ${status} - ${name}`);
    });

    // Check for conflicts
    console.log('\n⚠️  Impact Analysis:\n');
    
    const missingTables = expectedTables.filter((t) => !tableNames.includes(t));
    const existingExpectedTables = expectedTables.filter((t) => tableNames.includes(t));
    const unexpectedTables = tableNames.filter((t) => !expectedTables.includes(t));

    if (missingTables.length > 0) {
      console.log(`  📦 Will CREATE ${missingTables.length} new table(s):`);
      missingTables.forEach((name) => {
        console.log(`    - ${name}`);
      });
    }

    if (existingExpectedTables.length > 0) {
      console.log(`\n  ⚠️  ${existingExpectedTables.length} table(s) already exist:`);
      existingExpectedTables.forEach((name) => {
        console.log(`    - ${name}`);
      });
      console.log('\n  ⚠️  WARNING: Drizzle push may attempt to modify existing tables!');
      console.log('     This could cause data loss if schema differs significantly.');
    }

    if (unexpectedTables.length > 0) {
      console.log(`\n  ℹ️  ${unexpectedTables.length} table(s) exist that are not in the schema:`);
      unexpectedTables.forEach((name) => {
        console.log(`    - ${name}`);
      });
      console.log('\n  ✅ These tables will NOT be affected by the migration.');
    }

    // Check for data in existing tables
    if (existingExpectedTables.length > 0) {
      console.log('\n📊 Checking for existing data in tables that will be modified:\n');
      for (const tableName of existingExpectedTables) {
        try {
          const countResult = await db.execute(sql.raw(
            `SELECT COUNT(*) as count FROM "${tableName}";`
          ));
          const count = countResult.rows[0]?.count || 0;
          console.log(`  ${tableName}: ${count} row(s)`);
        } catch (error) {
          console.log(`  ${tableName}: Error checking - ${error instanceof Error ? error.message : 'Unknown'}`);
        }
      }
    }

    // Check structure of existing user_roles table
    if (tableNames.includes('user_roles')) {
      console.log('\n🔍 Analyzing existing user_roles table structure:\n');
      try {
        const columns = await db.execute(sql`
          SELECT column_name, data_type, is_nullable, column_default
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'user_roles'
          ORDER BY ordinal_position;
        `);
        
        console.log('  Current columns:');
        columns.rows.forEach((col: any) => {
          console.log(`    - ${col.column_name}: ${col.data_type} ${col.is_nullable === 'YES' ? '(nullable)' : '(not null)'} ${col.column_default ? `default: ${col.column_default}` : ''}`);
        });

        const constraints = await db.execute(sql`
          SELECT constraint_name, constraint_type
          FROM information_schema.table_constraints
          WHERE table_schema = 'public' AND table_name = 'user_roles';
        `);
        
        console.log('\n  Current constraints:');
        constraints.rows.forEach((constraint: any) => {
          console.log(`    - ${constraint.constraint_name}: ${constraint.constraint_type}`);
        });

        // Check if it has an id column
        const hasIdColumn = columns.rows.some((col: any) => col.column_name === 'id');
        if (hasIdColumn) {
          console.log('\n  ⚠️  CONFLICT: Table has "id" column that will be DROPPED!');
          console.log('     This will cause data loss if there are existing rows.');
        }
      } catch (error) {
        console.log(`  Error analyzing structure: ${error instanceof Error ? error.message : 'Unknown'}`);
      }
    }

    // Migration 0001 analysis
    console.log('\n\n📝 Migration 0001 Analysis (serious_rictor.sql):\n');
    console.log('  This migration will:');
    console.log('    1. Modify verification_tokens unique constraint');
    console.log('    2. DROP users.clerk_id column (if it exists)');
    console.log('    3. DROP users.clerk_id_idx index (if it exists)');
    console.log('    4. Modify user_roles table structure:');
    console.log('       - Remove id column (serial)');
    console.log('       - Change primary key to composite (user_id, role)');
    
    if (tableNames.includes('users')) {
      console.log('\n  ⚠️  WARNING: users table exists - clerk_id column will be DROPPED!');
      console.log('     If you have data in clerk_id, it will be lost.');
    }
    
    if (tableNames.includes('user_roles')) {
      console.log('\n  ⚠️  WARNING: user_roles table exists - structure will be modified!');
      console.log('     The id column will be removed and primary key changed.');
    }

    // Summary
    console.log('\n' + '='.repeat(70));
    console.log('📊 SUMMARY');
    console.log('='.repeat(70));
    console.log(`\n  Total tables to create: ${missingTables.length}`);
    console.log(`  Tables that already exist: ${existingExpectedTables.length}`);
    console.log(`  Tables that won't be affected: ${unexpectedTables.length}`);
    
    if (missingTables.length === expectedTables.length) {
      console.log('\n  ✅ SAFE: This appears to be a fresh database.');
      console.log('     All tables will be created from scratch.');
      console.log('     No existing data will be affected.');
    } else if (existingExpectedTables.length > 0) {
      console.log('\n  ⚠️  CAUTION: Some tables already exist.');
      console.log('     Drizzle push will attempt to sync the schema, which may:');
      console.log('     - Add missing columns');
      console.log('     - Modify constraints');
      console.log('     - Drop columns (if they exist in DB but not in schema)');
      console.log('     - Modify indexes');
      console.log('\n  💡 Recommendation:');
      console.log('     1. Backup your database first');
      console.log('     2. Review the migration files carefully');
      console.log('     3. Test on a staging environment if possible');
      console.log('     4. Consider using migrations instead of push for production');
    }

    console.log('\n');

  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : 'Unknown error');
    if (error instanceof Error && error.stack) {
      console.error(error.stack);
    }
  } finally {
    await pool.end();
  }
}

checkDatabaseImpact()
  .then(() => {
    console.log('✅ Analysis complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });

