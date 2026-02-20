# X API Migration - Implementation Complete ✅

## What Was Implemented

### 1. Database Schema Updates ✅
**File**: `src/lib/db/schema.ts`

Added to `tweets` table:
- `impressions`: bigint - Stores impression count from X API
- `isVerified`: smallint - null = not checked, 1 = verified, -1 = rejected  
- `verifiedAt`: timestamp - When keyword check happened
- `verifiedBy`: varchar - Who/what verified the tweet ('system', 'manual', etc.)

**Next Step**: Run database migration:
```bash
npm run db:generate
npm run db:push
```

### 2. X API Client ✅
**File**: `src/lib/x-api/client.ts`

Features:
- OAuth token support for user-specific endpoints
- Bearer token support for public metrics
- Rate limit handling with automatic retries
- Token expiration detection
- Batch fetching (up to 100 tweets per request)

### 3. Tweet Discovery Service ✅
**File**: `src/lib/x-api/discover-tweets.ts`

**How it works**:
1. Fetches all authenticated users with Twitter OAuth tokens
2. For each user, fetches their recent tweets (last 30 days by default)
3. Checks tweet content against project names (case-insensitive)
4. Marks tweets as verified (1) if keywords found, rejected (-1) if not
5. Skips users with expired tokens

**Keyword Matching**:
- Uses project names from `projects` table (where `isActive = 1`)
- Case-insensitive matching
- If tweet contains any project name → verified

### 4. Metrics Update Service ✅
**File**: `src/lib/x-api/update-metrics.ts`

**How it works**:
1. Fetches all verified tweets from PostgreSQL
2. Batch fetches public metrics (likes, replies, retweets, quotes) using bearer token
3. For each user, fetches impressions using their OAuth token (only for owned posts, last 30 days)
4. Updates PostgreSQL with latest metrics
5. Skips users with expired tokens

### 5. Cron Jobs ✅

#### Tweet Discovery Cron
**File**: `src/app/api/cron/discover-tweets/route.ts`

**Purpose**: Discover and verify new tweets from authenticated users

**Usage**:
```bash
POST /api/cron/discover-tweets?daysBack=30&maxTweetsPerUser=1000
```

**Recommended Schedule**: Daily or weekly

#### Metrics Update Cron
**File**: `src/app/api/cron/update-tweet-metrics/route.ts`

**Purpose**: Update metrics for verified tweets

**Usage**:
```bash
POST /api/cron/update-tweet-metrics?batchSize=100&maxTweets=10000
```

**Recommended Schedule**: Multiple times per day (e.g., every 4-6 hours)

### 6. Token Management ✅
**File**: `src/lib/x-api/token-management.ts`

**Features**:
- Check token expiration status
- Identify users needing re-authentication
- API endpoint to check current user's token status

**API Endpoint**: `GET /api/users/check-twitter-auth`

## Environment Variables Required

Add these to your `.env` file:

```env
# X API Bearer Token (for public metrics)
X_API_BEARER_TOKEN=your_bearer_token_here

# Optional: Cron secret for securing cron endpoints
CRON_SECRET=your_cron_secret_here
```

## How to Get X API Credentials

1. Go to [X Developer Portal](https://developer.x.com)
2. Create a new app or use existing app
3. Get your Bearer Token from the "Keys and tokens" section
4. For user OAuth tokens, users need to authenticate via Clerk (already implemented)

## Next Steps

### Step 1: Database Migration
```bash
# Generate migration for new schema fields
npm run db:generate

# Apply migration
npm run db:push
```

### Step 2: Set Environment Variables
Add `X_API_BEARER_TOKEN` to your environment variables.

### Step 3: Test Discovery
Run the discovery cron job manually:
```bash
curl -X POST http://localhost:3000/api/cron/discover-tweets \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

### Step 4: Test Metrics Update
Run the metrics update cron job:
```bash
curl -X POST http://localhost:3000/api/cron/update-tweet-metrics \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

### Step 5: Set Up Scheduled Jobs
Configure your cron scheduler (e.g., Vercel Cron, GitHub Actions, etc.):

**Discovery Job** (Daily):
```
0 2 * * * - Run at 2 AM daily
```

**Metrics Update Job** (Every 4 hours):
```
0 */4 * * * - Run every 4 hours
```

## How It Works

### Tweet Discovery Flow
1. Cron job runs → `/api/cron/discover-tweets`
2. Gets all authenticated users with Twitter OAuth tokens
3. For each user:
   - Fetches their tweets from last 30 days
   - Checks if tweet contains any project name
   - If yes → marks as verified (isVerified = 1)
   - If no → marks as rejected (isVerified = -1)
4. Stores tweets in PostgreSQL

### Metrics Update Flow
1. Cron job runs → `/api/cron/update-tweet-metrics`
2. Gets all verified tweets from PostgreSQL
3. Batch fetches public metrics (likes, replies, retweets, quotes) from X API
4. For each user, fetches impressions using their OAuth token
5. Updates PostgreSQL with new metrics
6. Recalculates leaderboard stats

## OAuth Token Expiration Handling

**Current Behavior**:
- Users with expired tokens are automatically skipped during discovery and metrics updates
- No automatic re-authentication (users must manually re-authenticate via Clerk)

**To Check Token Status**:
- Frontend can call `GET /api/users/check-twitter-auth` to check if current user needs re-auth
- Show UI prompt to re-authenticate if `needsReauth: true`

## Cost Considerations

### X API Pay-Per-Use Model
- Pay only for API calls you make
- 24-hour deduplication: requesting same tweet multiple times in a day = 1 charge
- Check [X API Pricing](https://docs.x.com/x-api/getting-started/pricing) for current rates

### Cost Optimization Tips
1. **Batch requests**: Fetch up to 100 tweets per API call
2. **Leverage deduplication**: Update all tweets once per day, subsequent updates are free
3. **Set spending limits**: Configure in X Developer Console
4. **Monitor usage**: Use X API Usage endpoint to track consumption

## Troubleshooting

### "UNAUTHORIZED_TOKEN_EXPIRED" errors
- User's OAuth token has expired
- User needs to re-authenticate via Clerk
- System will automatically skip them until re-authenticated

### Rate limit errors (429)
- Client automatically retries with exponential backoff
- If persistent, reduce batch sizes or increase delays between requests

### No tweets discovered
- Check that users have authenticated with Twitter
- Verify OAuth tokens are stored in `auth_accounts` table
- Check that project names exist in `projects` table
- Verify tweets actually contain project keywords

### Impressions not updating
- Impressions only available for posts owned by authenticated user
- Only available for posts from last 30 days
- Requires user OAuth token (not bearer token)

## Files Created/Modified

### New Files:
- `src/lib/x-api/client.ts` - X API client
- `src/lib/x-api/discover-tweets.ts` - Tweet discovery service
- `src/lib/x-api/update-metrics.ts` - Metrics update service
- `src/lib/x-api/token-management.ts` - Token management utilities
- `src/app/api/cron/discover-tweets/route.ts` - Discovery cron job
- `src/app/api/cron/update-tweet-metrics/route.ts` - Metrics update cron job
- `src/app/api/cron/update-tweet-metrics/recalculate-stats.ts` - Stats recalculation
- `src/app/api/users/check-twitter-auth/route.ts` - Token status API

### Modified Files:
- `src/lib/db/schema.ts` - Added new fields to tweets table

## Support

For issues or questions:
- Check X API documentation: https://docs.x.com/x-api
- Review error logs in cron job responses
- Check token expiration status via `/api/users/check-twitter-auth`

