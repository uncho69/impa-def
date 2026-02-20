# Database Migration Instructions

## Quick Migration Steps

Since Node.js needs to be run in your local terminal, here are the exact commands:

### Step 1: Ensure Node.js is installed
```bash
# If using nvm:
source ~/.nvm/nvm.sh
nvm use 20

# Verify:
node --version
npm --version
```

### Step 2: Navigate to project directory
```bash
cd ~/Downloads/impa-def-feat-leaderboards
```

### Step 3: Run migrations
```bash
# Option A: Use the migration script
./scripts/run-migrations.sh

# Option B: Run manually
npm run db:generate
npm run db:push
```

### Step 4: Verify migrations
The following columns should now exist in your `tweets` table:
- `impressions` (bigint)
- `is_verified` (smallint, nullable)
- `verified_at` (timestamp, nullable)
- `verified_by` (varchar(50), nullable)

## What the Migrations Do

1. **db:generate** - Creates migration files based on schema changes
2. **db:push** - Applies the migrations directly to your database

## Troubleshooting

### "DATABASE_URL not set"
Make sure your `.env.local` or `.env` file has:
```env
DATABASE_URL=your_postgresql_connection_string
```

### "Node.js not found"
Install Node.js:
- Visit https://nodejs.org/ and download LTS version
- Or use: `source ~/.nvm/nvm.sh && nvm install 20`

### Migration fails
- Check database connection
- Verify DATABASE_URL is correct
- Ensure you have write permissions on the database

