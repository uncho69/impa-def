/**
 * Script to check the structure of existing tables to see if they contain tweet data
 */

import * as dotenv from 'dotenv';
import { getSnowflakeClient, initializeSnowflake, closeSnowflake } from '../src/lib/snowflake/client';

dotenv.config({ path: '.env.local' });
dotenv.config();

async function checkTables() {
  try {
    await initializeSnowflake();
    const client = getSnowflakeClient();

    const tables = ['DAILY_MARKET_DATA', 'REALTIME_MARKET_DATA'];

    for (const tableName of tables) {
      console.log(`\n📋 Checking table: PUBLIC.${tableName}\n`);
      
      try {
        // Describe table structure
        const columns = await client.executeQuery(`
          DESCRIBE TABLE PUBLIC.${tableName}
        `);
        
        console.log('   Columns:');
        columns.forEach((col: any) => {
          const colName = col.name || col.NAME || col['name'] || col['NAME'];
          const colType = col.type || col.TYPE || col['type'] || col['TYPE'];
          const nullable = col.nullable || col.NULLABLE || col['null?'] || col['NULL?'];
          console.log(`     - ${colName}: ${colType} ${nullable === 'Y' ? '(nullable)' : '(not null)'}`);
        });

        // Get sample data
        console.log('\n   Sample data (first row):');
        const sample = await client.executeQuery(`
          SELECT * FROM PUBLIC.${tableName} LIMIT 1
        `);
        
        if (sample.length > 0) {
          const row = sample[0];
          const keys = Object.keys(row);
          console.log(`     Found ${keys.length} columns with data`);
          // Show first 10 column values
          keys.slice(0, 10).forEach(key => {
            const value = row[key];
            const displayValue = typeof value === 'string' && value.length > 50 
              ? value.substring(0, 50) + '...' 
              : value;
            console.log(`     ${key}: ${displayValue}`);
          });
        } else {
          console.log('     No data found');
        }
      } catch (error) {
        console.log(`   Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : 'Unknown error');
  } finally {
    await closeSnowflake();
  }
}

checkTables()
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });

