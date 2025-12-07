/**
 * Script to list Snowflake tables and their schemas
 * This helps identify the correct table name and column structure
 */

import * as dotenv from 'dotenv';
import { getSnowflakeClient, initializeSnowflake, closeSnowflake } from '../src/lib/snowflake/client';

dotenv.config({ path: '.env.local' });
dotenv.config();

async function listTables() {
  try {
    await initializeSnowflake();
    const client = getSnowflakeClient();

    console.log('🔍 Searching for tables in Snowflake...\n');

    // Get current database and schema
    const dbInfo = await client.executeQuery(`
      SELECT CURRENT_DATABASE() as database, CURRENT_SCHEMA() as schema
    `);
    console.log('📊 Current Database:', dbInfo[0]?.DATABASE || 'N/A');
    console.log('📋 Current Schema:', dbInfo[0]?.SCHEMA || 'N/A');
    console.log('');

    // List all schemas first
    console.log('📂 Available schemas in database:');
    try {
      const schemas = await client.executeQuery(`
        SHOW SCHEMAS IN DATABASE ${process.env.SNOWFLAKE_DATABASE || 'CURRENT_DATABASE()'}
      `);
      schemas.forEach((schema: any) => {
        const name = schema.name || schema.NAME || schema['schema_name'] || schema['SCHEMA_NAME'];
        console.log(`    - ${name}`);
      });
      console.log('');
    } catch (error) {
      console.log('   Could not list schemas:', error instanceof Error ? error.message : 'Unknown error');
    }

    // List all tables in current schema
    console.log('📑 Tables in current schema:');
    let tables: any[] = [];
    try {
      tables = await client.executeQuery(`
        SHOW TABLES IN SCHEMA ${process.env.SNOWFLAKE_DATABASE || 'CURRENT_DATABASE()'}.${process.env.SNOWFLAKE_SCHEMA || 'CURRENT_SCHEMA()'}
      `);
    } catch (error) {
      console.log('   Error listing tables:', error instanceof Error ? error.message : 'Unknown error');
    }

    if (tables.length === 0) {
      console.log('  No tables found in current schema.');
    } else {
      tables.forEach((table: any) => {
        const name = table.name || table.NAME || table['name'] || table['NAME'];
        const schema = table.schema_name || table.SCHEMA_NAME || table['schema_name'] || table['SCHEMA_NAME'] || table['schema name'] || table['SCHEMA NAME'] || process.env.SNOWFLAKE_SCHEMA || 'PUBLIC';
        console.log(`    - ${schema}.${name}`);
      });
    }

    console.log('\n💡 Trying to list all tables in database...\n');
    
    try {
      const allTables = await client.executeQuery(`
        SHOW TABLES IN DATABASE ${process.env.SNOWFLAKE_DATABASE || 'CURRENT_DATABASE()'}
      `);
      
      if (allTables.length > 0) {
        console.log('  All tables in database:');
        allTables.forEach((table: any) => {
          const name = table.name || table.NAME || table['name'] || table['NAME'];
          const schema = table.schema_name || table.SCHEMA_NAME || table['schema_name'] || table['SCHEMA_NAME'] || table['schema name'] || table['SCHEMA NAME'];
          console.log(`    - ${schema || 'UNKNOWN'}.${name}`);
        });
      } else {
        console.log('  No tables found in database.');
      }
    } catch (error) {
      console.log('  Error listing all tables:', error instanceof Error ? error.message : 'Unknown error');
    }

    console.log('\n📊 Listing views in database...\n');
    
    try {
      const views = await client.executeQuery(`
        SHOW VIEWS IN DATABASE ${process.env.SNOWFLAKE_DATABASE || 'CURRENT_DATABASE()'}
      `);
      
      if (views.length > 0) {
        console.log('  All views in database:');
        views.forEach((view: any) => {
          const name = view.name || view.NAME || view['name'] || view['NAME'];
          const schema = view.schema_name || view.SCHEMA_NAME || view['schema_name'] || view['SCHEMA_NAME'] || view['schema name'] || view['SCHEMA NAME'];
          console.log(`    - ${schema || 'UNKNOWN'}.${name}`);
        });
      } else {
        console.log('  No views found in database.');
      }
    } catch (error) {
      console.log('  Error listing views:', error instanceof Error ? error.message : 'Unknown error');
    }

    console.log('\n');

    // Get all tables and views for analysis
    let allTablesForAnalysis: any[] = [];
    let allViewsForAnalysis: any[] = [];
    try {
      allTablesForAnalysis = await client.executeQuery(`
        SHOW TABLES IN DATABASE ${process.env.SNOWFLAKE_DATABASE || 'CURRENT_DATABASE()'}
      `);
      allViewsForAnalysis = await client.executeQuery(`
        SHOW VIEWS IN DATABASE ${process.env.SNOWFLAKE_DATABASE || 'CURRENT_DATABASE()'}
      `);
    } catch (error) {
      allTablesForAnalysis = tables; // Fall back to current schema tables
    }

    // Combine tables and views for analysis
    const allObjects = [...allTablesForAnalysis, ...allViewsForAnalysis];

    // If we can find a table/view that might be the tweets table, show its structure
    const possibleTables = allObjects.filter((obj: any) => {
      const name = (obj.name || obj.NAME || obj['name'] || obj['NAME'] || '').toLowerCase();
      return name.includes('tweet') || name.includes('twitter') || name.includes('social') || name.includes('post') || name.includes('message');
    });

    if (possibleTables.length > 0) {
      console.log('🎯 Found potential tweet tables/views. Analyzing structure...\n');
      
      for (const obj of possibleTables) {
        const objName = obj.name || obj.NAME;
        const schemaName = obj.schema_name || obj.SCHEMA_NAME || obj['schema name'] || obj['SCHEMA NAME'];
        const fullObjName = `${schemaName}.${objName}`;
        const isView = allViewsForAnalysis.some((v: any) => (v.name || v.NAME) === objName);
        const objType = isView ? 'View' : 'Table';
        
        console.log(`\n📋 ${objType}: ${fullObjName}`);
        console.log('   Columns:');
        
        try {
          const columns = await client.executeQuery(`
            DESCRIBE ${isView ? 'VIEW' : 'TABLE'} ${fullObjName}
          `);
          
          columns.forEach((col: any) => {
            const colName = col.name || col.NAME;
            const colType = col.type || col.TYPE;
            const nullable = col.nullable || col.NULLABLE || col['null?'] || col['NULL?'];
            console.log(`     - ${colName}: ${colType} ${nullable === 'Y' ? '(nullable)' : '(not null)'}`);
          });
        } catch (error) {
          console.log(`     Error describing ${objType.toLowerCase()}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    } else {
      console.log('💡 No tables/views with "tweet", "twitter", or "social" in the name found.');
      console.log('   Listing all views for manual inspection...\n');
      
      // Show all views for manual inspection
      if (allViewsForAnalysis.length > 0) {
        console.log('📊 All available views:');
        for (const view of allViewsForAnalysis) {
          const viewName = view.name || view.NAME;
          const schemaName = view.schema_name || view.SCHEMA_NAME || view['schema name'] || view['SCHEMA NAME'];
          const fullViewName = `${schemaName}.${viewName}`;
          console.log(`\n   View: ${fullViewName}`);
          
          try {
            const columns = await client.executeQuery(`
              DESCRIBE VIEW ${fullViewName}
            `);
            console.log('   Columns:');
            columns.slice(0, 10).forEach((col: any) => {
              const colName = col.name || col.NAME;
              const colType = col.type || col.TYPE;
              console.log(`     - ${colName}: ${colType}`);
            });
            if (columns.length > 10) {
              console.log(`     ... and ${columns.length - 10} more columns`);
            }
          } catch (error) {
            console.log(`     Error describing view: ${error instanceof Error ? error.message : 'Unknown error'}`);
          }
        }
      }
    }

    // Show sample data if we find a relevant table/view
    if (possibleTables.length > 0) {
      const firstObj = possibleTables[0];
      const objName = firstObj.name || firstObj.NAME;
      const schemaName = firstObj.schema_name || firstObj.SCHEMA_NAME || firstObj['schema name'] || firstObj['SCHEMA NAME'];
      const fullObjName = `${schemaName}.${objName}`;
      const isView = allViewsForAnalysis.some((v: any) => (v.name || v.NAME) === objName);
      const objType = isView ? 'view' : 'table';
      
      console.log(`\n📊 Sample data from ${fullObjName} (first 3 rows):`);
      try {
        const sample = await client.executeQuery(`
          SELECT * FROM ${fullObjName} LIMIT 3
        `);
        
        if (sample.length > 0) {
          console.log(JSON.stringify(sample, null, 2));
        } else {
          console.log(`   No data found in ${objType}.`);
        }
      } catch (error) {
        console.log(`   Error querying ${objType}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : 'Unknown error');
    if (error instanceof Error && error.stack) {
      console.error(error.stack);
    }
  } finally {
    await closeSnowflake();
  }
}

listTables()
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });

