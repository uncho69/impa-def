# Database Migrations

This directory contains the database migration files for the application.

## Current Migration

- **`0000_initial_schema.sql`** - Initial database schema migration
  - Contains all 16 tables with their complete structure
  - Includes all indexes, foreign keys, constraints, and checks
  - Represents the current state of the database schema
  - Creates an empty database (no data, only schema)

## Migration History

This is a fresh migration that consolidates all previous migrations into a single file. The old migrations have been backed up to `drizzle_backup/` directory.

## Applying Migrations

To apply the migration to a fresh database:

```bash
npm run db:push
```

Or to use Drizzle's migrate command:

```bash
npm run db:migrate
```

## Generating New Migrations

When the schema changes, generate a new migration:

```bash
npm run db:generate
```

## Notes

- The migration creates an **empty database** with only the schema structure
- All tables, indexes, foreign keys, and constraints are included
- No data is inserted by this migration
- Use the `scripts/add-test-campaign.ts` script to populate test data if needed

