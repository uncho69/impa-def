# Run Database Migrations - Quick Guide

## ✅ Node.js is Ready
Node.js v20.20.0 is installed and ready to use.

## 🔑 Get DATABASE_URL

You need to provide your `DATABASE_URL`. Here are the options:

### Option 1: From Vercel Dashboard (Recommended)
1. Go to https://vercel.com/dashboard
2. Select your `impa-def` project
3. Go to Settings → Environment Variables
4. Find `DATABASE_URL`
5. Copy the value

### Option 2: From Your Local Setup
If you have it locally, you can:
```bash
# If you have .env.local somewhere, copy it:
cp /path/to/your/.env.local ~/Downloads/impa-def-feat-leaderboards/.env.local
```

### Option 3: Export Directly
```bash
export DATABASE_URL='your_postgresql_connection_string_here'
```

## 🚀 Run Migrations

Once DATABASE_URL is set, run:

```bash
cd ~/Downloads/impa-def-feat-leaderboards
export PATH="$HOME/.local/node/node-v20.20.0-darwin-x64/bin:$PATH"

# If you exported DATABASE_URL:
npm run db:generate
npm run db:push

# OR use the script (it will check for .env.local):
./run-migrations-final.sh
```

## ✅ Verify Success

After migrations complete, you should see:
- Migration files generated in `drizzle/` directory
- Success message confirming columns were added

## New schema (campaign participation + multi-campaign tweets)

- **campaign_participation_requests**: table for users requesting access to campaigns; admins/moderators approve or deny.
- **tweets** unique constraint changed from `(post_id)` to `(post_id, project_id, campaign_index, epoch_index)` so the same tweet can count in multiple campaigns (e.g. Extended and Hyperliquid).

Run `npm run db:generate` then `npm run db:push` (or your migration flow) after pulling these changes.

## Admin panel: participation requests

To see and manage participation requests, the API checks (1) `user_roles` for admin/moderator, or (2) env **ADMIN_EMAILS**. Set in Vercel (Settings → Environment Variables):

- **ADMIN_EMAILS** = same emails as in admin layout, comma-separated, e.g. `jeffben69zos@gmail.com,admin@imparodefi.com`

If you use only the layout allowlist and don’t have admin/moderator in the DB, set this so the API allows the same users.

