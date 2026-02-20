# Deployment Verification & Database Migration Guide

## Current Status

✅ **Code pushed to GitHub** - All X API migration code is on `feat/leaderboards` branch  
✅ **Environment variable added** - `X_API_BEARER_TOKEN` is set in Vercel  
⏳ **Deployment in progress** - New endpoints returning 404 (may need time to deploy)  
⏳ **Database migrations pending** - Need to run locally

## Step 1: Run Database Migrations

**Run these commands in your terminal** (Node.js required):

```bash
# Navigate to project
cd ~/Downloads/impa-def-feat-leaderboards

# Load Node.js (if using nvm)
source ~/.nvm/nvm.sh
nvm use 20

# Run migrations
npm run db:generate
npm run db:push
```

**Expected output:**
- Migration files generated in `drizzle/` directory
- Database schema updated with new columns:
  - `tweets.impressions`
  - `tweets.is_verified`
  - `tweets.verified_at`
  - `tweets.verified_by`

## Step 2: Verify Deployment

### Check Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Find your `impa-def` project
3. Check the latest deployment status
4. Look for any build errors

### Check if Routes are Live
Once deployment completes, test these endpoints:

```bash
# Test discovery endpoint (should return 401 without auth, or 200 with auth)
curl -X POST https://imparodefi.xyz/api/cron/discover-tweets \
  -H "Authorization: Bearer YOUR_CRON_SECRET"

# Test metrics update endpoint
curl -X POST https://imparodefi.xyz/api/cron/update-tweet-metrics \
  -H "Authorization: Bearer YOUR_CRON_SECRET"

# Test token check endpoint (should work without auth for authenticated users)
curl https://imparodefi.xyz/api/users/check-twitter-auth
```

### Expected Responses

**If deployment is complete:**
- `/api/cron/discover-tweets` - Returns JSON with discovery results (or 401 if no auth)
- `/api/cron/update-tweet-metrics` - Returns JSON with metrics update results
- `/api/users/check-twitter-auth` - Returns token status (401 if not authenticated)

**If still deploying:**
- All endpoints return 404

## Step 3: Verify Database Schema

After running migrations, verify the schema changes:

```sql
-- Check if new columns exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'tweets' 
AND column_name IN ('impressions', 'is_verified', 'verified_at', 'verified_by');
```

You should see all 4 columns listed.

## Step 4: Test the System

### Test Tweet Discovery
```bash
curl -X POST https://imparodefi.xyz/api/cron/discover-tweets?daysBack=7 \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

**Expected:** JSON response with:
- `totalUsers` - Number of users processed
- `totalTweetsVerified` - Tweets found with project keywords
- `summary` - Overall statistics

### Test Metrics Update
```bash
curl -X POST https://imparodefi.xyz/api/cron/update-tweet-metrics \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

**Expected:** JSON response with:
- `tweetsUpdated` - Number of tweets updated
- `tweetsWithImpressions` - Number with impressions fetched
- `usersSkipped` - Users with expired tokens

## Troubleshooting

### Endpoints Still 404
- **Wait 2-5 minutes** - Vercel deployments can take time
- **Check Vercel dashboard** - Look for build/deployment errors
- **Verify branch** - Ensure `feat/leaderboards` is the deployed branch
- **Check Vercel project settings** - Ensure correct branch is connected

### Migration Fails
- **Check DATABASE_URL** - Must be set in `.env.local` or environment
- **Verify database access** - Ensure connection string is correct
- **Check permissions** - Database user needs ALTER TABLE permissions

### No Tweets Discovered
- **Check user authentication** - Users must have Twitter OAuth tokens
- **Verify project names** - Ensure projects exist in `projects` table
- **Check token expiration** - Users with expired tokens are skipped

## Next Steps After Verification

1. ✅ Database migrations complete
2. ✅ Endpoints responding (not 404)
3. ✅ Test discovery cron job
4. ✅ Test metrics update cron job
5. ✅ Monitor X API usage in Developer Console
6. ✅ Verify cron jobs are scheduled (check Vercel dashboard)

## Cron Job Schedule

Once deployed, Vercel will automatically run:
- **Discovery**: Daily at 2 AM UTC (`/api/cron/discover-tweets`)
- **Metrics Update**: Every 4 hours (`/api/cron/update-tweet-metrics`)

You can verify cron jobs in Vercel dashboard under "Cron Jobs" section.

