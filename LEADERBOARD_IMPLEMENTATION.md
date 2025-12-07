# Leaderboard Feature Implementation Documentation

## Overview

This document provides a comprehensive guide to the leaderboard system implementation for the ImparoDeFi platform. The system includes user management, role-based permissions, tweet processing from Snowflake, and leaderboard endpoints.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Database Schema](#database-schema)
3. [Authentication Flow](#authentication-flow)
4. [Role-Based Permissions System](#role-based-permissions-system)
5. [SIWE Wallet Linking](#siwe-wallet-linking)
6. [Snowflake Integration](#snowflake-integration)
7. [Cron Job Workflow](#cron-job-workflow)
8. [Points Calculation System](#points-calculation-system)
9. [API Endpoints](#api-endpoints)
10. [Environment Variables](#environment-variables)
11. [Setup Instructions](#setup-instructions)
12. [Testing Guide](#testing-guide)
13. [Troubleshooting](#troubleshooting)
14. [Future Improvements](#future-improvements)

## Architecture Overview

The leaderboard system is built on Next.js 14 with the following key components:

- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Clerk and Privy support
- **Data Source**: Snowflake for tweet data
- **Permissions**: Role-based access control (RBAC)
- **Leaderboards**: Epoch-based and global rankings

### Data Flow

```
Snowflake → Cron Job → Database → Leaderboard Endpoints → Frontend
```

1. Tweets are stored in Snowflake
2. Cron job fetches tweets from Snowflake
3. Tweets are processed and stored in PostgreSQL
4. User stats are calculated and aggregated
5. Leaderboard endpoints serve ranked data

## Database Schema

### New Tables

#### `user_roles`
Stores user roles for permission management.

```sql
CREATE TABLE user_roles (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'moderator', 'participant', 'base_user')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);
```

**Roles:**
- `admin`: Full access to all features
- `moderator`: Can add tweets and manage content
- `participant`: Can add tweets to campaigns
- `base_user`: Default role for new users

### Updated Tables

#### `users`
Added `clerk_id` field for Clerk authentication support.

```sql
ALTER TABLE users ADD COLUMN clerk_id VARCHAR(255);
CREATE UNIQUE INDEX users_clerk_id_unique ON users(clerk_id);
CREATE INDEX users_clerk_id_idx ON users(clerk_id);
```

#### `auth_accounts`
Updated to support both Clerk and Privy providers.

The `provider` field now accepts: `'clerk'`, `'privy'`, `'wallet'`, `'email'`, etc.

### Existing Tables

The following tables are used but were already present:

- `projects`: Web3 projects
- `campaigns`: Marketing campaigns for projects
- `epochs`: Time periods for campaigns
- `tweets`: Twitter posts with engagement metrics
- `user_epoch_scores`: User scores per epoch
- `rewards`: Reward configurations

## Authentication Flow

### Clerk Integration

1. **User Creation**: When a user is created in Clerk, a webhook is sent to `/api/webhooks/clerk`
2. **Webhook Handler**: Creates a user record in the database with the same `clerkId`
3. **Default Role**: New users are assigned the `base_user` role
4. **Auth Account**: An `authAccounts` record is created with `provider='clerk'`

### Privy Integration

1. **User Creation**: Handled through existing Privy flow
2. **User Record**: Created with `privyId` field
3. **Auth Account**: An `authAccounts` record is created with `provider='privy'`

### Wallet Linking (SIWE)

1. **User Authentication**: User must be authenticated via Clerk or Privy
2. **SIWE Message**: User signs a message with their wallet
3. **Verification**: Message signature is verified
4. **Linking**: Wallet address is linked to the user's account
5. **Auth Account**: An `authAccounts` record is created with `provider='wallet'`

## Role-Based Permissions System

### Permission Utilities

Located in `src/lib/auth/permissions.ts`:

- `hasRole(userId, role)`: Check if user has a specific role
- `hasAnyRole(userId, roles[])`: Check if user has any of the specified roles
- `getUserRoles(userId)`: Get all roles for a user
- `canAddTweetsToCampaign(userId)`: Check if user can add tweets (admin, moderator, participant)
- `isAdmin(userId)`: Check if user is admin
- `isModeratorOrAdmin(userId)`: Check if user is moderator or admin

### Permission Middleware

Located in `src/lib/auth/middleware.ts`:

- `getUserIdFromRequest(request)`: Extract user ID from Clerk/Privy session
- `requireRole(role)`: Middleware to require a specific role
- `requireAnyRole(roles[])`: Middleware to require any of the specified roles
- `requireAuth()`: Middleware to require authentication only

### Usage Example

```typescript
import { requireRole } from '@/lib/auth/middleware';

export async function GET(request: NextRequest) {
  const authCheck = await requireRole('admin')(request);
  if (authCheck) return authCheck;
  
  // User is authenticated and has admin role
  // ... rest of handler
}
```

## SIWE Wallet Linking

### Endpoint

`POST /api/siwe`

### Request Body

```json
{
  "message": "SIWE message string",
  "signature": "0x..."
}
```

### Response

```json
{
  "message": "Wallet linked successfully",
  "walletAddress": "0x...",
  "userId": "user_id"
}
```

### Process

1. Verify SIWE message and signature
2. Extract wallet address
3. Check if user is authenticated
4. Verify wallet address is valid
5. Check if wallet is already linked to another user
6. Link wallet to user's account
7. Create/update `authAccounts` record

## Snowflake Integration

### Configuration

The Snowflake client is configured via environment variables:

**Required:**
- `SNOWFLAKE_ACCOUNT`: Snowflake account identifier
- `SNOWFLAKE_USERNAME`: Snowflake username
- `SNOWFLAKE_PASSWORD`: Snowflake password
- `SNOWFLAKE_WAREHOUSE`: Snowflake warehouse name
- `SNOWFLAKE_DATABASE`: Snowflake database name
- `SNOWFLAKE_SCHEMA`: Snowflake schema name

**Optional:**
- `SNOWFLAKE_ROLE`: Role to use (if not set, Snowflake will use user's default role)
- `SNOWFLAKE_REGION`: Region identifier (e.g., 'us-east-1')
- `SNOWFLAKE_TABLE_NAME`: Table name for tweets (defaults to 'tweets_table')

### Client Setup

Located in `src/lib/snowflake/client.ts`:

- **Singleton pattern** for connection management
- **Real Snowflake SDK integration** using `snowflake-sdk` package
- **Automatic connection handling** with lazy initialization
- **Connection validation** and error handling
- **Query execution** with parameterized queries
- **Streaming support** for large datasets
- **Connection cleanup** on app shutdown

### Query Functions

Located in `src/lib/snowflake/queries.ts`:

- `fetchTweetsFromSnowflake(startDate, endDate, limit?)`: Fetch tweets for date range
- `fetchTweetIdsFromSnowflake(startDate, endDate, limit?)`: Fetch only tweet IDs
- `fetchTweetsByIds(tweetIds[])`: Fetch tweets by specific IDs (with automatic batching for large arrays)
- `fetchTweetsByUserIds(userIds[], startDate?, endDate?)`: Fetch tweets by user IDs

### Implementation Details

The implementation includes:

1. **Real Snowflake SDK**: Uses `snowflake-sdk` package (v2.3.1+)
2. **Parameterized Queries**: All queries use parameterized statements to prevent SQL injection
3. **Data Transformation**: Automatically handles Snowflake's uppercase column names and converts to camelCase
4. **Batch Processing**: Large queries (>1000 IDs) are automatically batched
5. **Error Handling**: Comprehensive error handling with detailed logging
6. **Type Safety**: Full TypeScript support with proper types
7. **Security**: Table name validation to prevent SQL injection

### Table Schema

The Snowflake table should have the following columns (case-insensitive):
- `TWEET_ID` (VARCHAR/STRING): Unique tweet identifier
- `USER_ID` (VARCHAR/STRING): Twitter user ID
- `CONTENT` (TEXT/VARCHAR): Tweet content
- `POSTED_AT` (TIMESTAMP): When the tweet was posted
- `LIKES` (NUMBER/INTEGER): Number of likes
- `REPLIES` (NUMBER/INTEGER): Number of replies
- `RETWEETS` (NUMBER/INTEGER): Number of retweets
- `QUOTES` (NUMBER/INTEGER): Number of quotes
- `HASHTAGS` (ARRAY/VARIANT): Array of hashtags (can be JSON string or array)
- `TAGGED_USERS` (ARRAY/VARIANT): Array of tagged users (can be JSON string or array)
- `HAS_IMAGE` (BOOLEAN): Whether tweet has an image
- `HAS_VIDEO` (BOOLEAN): Whether tweet has a video

### Testing

Run the Snowflake tests with:
```bash
npm run test:snowflake
```

This will test:
- Client initialization
- Connection establishment
- Query execution
- Error handling
- Data transformation

## Cron Job Workflow

### Endpoint

`POST /api/cron/process-tweets`

### Protection

Protected by `CRON_SECRET` environment variable or Vercel Cron.

### Process

1. **Fetch Tweets**: Query Snowflake for tweets in date range
2. **Process Each Tweet**:
   - Check if tweet already exists (by `postId`)
   - If exists, update engagement metrics if changed
   - If new, create tweet record
   - Link tweet to user by `twitterUserId`
   - Determine project, campaign, and epoch
3. **Update Stats**:
   - Update `userEpochScores` (points, tweet count, engagement metrics)
   - Update `epochs` aggregate stats
   - Update `users` global stats
4. **Return Summary**: Processed count, skipped count, errors

### Query Parameters

- `startDate`: ISO date string (optional, defaults to 24 hours ago)
- `endDate`: ISO date string (optional, defaults to now)
- `projectId`: string (optional, filter by project)
- `campaignIndex`: number (optional, filter by campaign)
- `epochIndex`: number (optional, filter by epoch)

### Response

```json
{
  "message": "Tweet processing completed",
  "processed": 100,
  "skipped": 5,
  "errors": 0,
  "errorDetails": []
}
```

## Points Calculation System

### Current Implementation

**Simple 1:1 mapping**: Each engagement type equals 1 point.

- 1 like = 1 point
- 1 retweet = 1 point
- 1 reply = 1 point
- 1 quote = 1 point

**Total points** = likes + retweets + replies + quotes

### Future Improvements

The points calculation is designed to be easily updatable. To change the formula:

1. Update the calculation in `src/app/api/cron/process-tweets/route.ts`
2. Update the `updateStatsForTweet` function
3. Recalculate existing scores if needed

### Example Calculation

```typescript
const points = (tweet.likes || 0) + (tweet.replies || 0) + (tweet.retweets || 0) + (tweet.quotes || 0);
```

## API Endpoints

### User Management

#### Clerk Webhook
- **Endpoint**: `POST /api/webhooks/clerk`
- **Description**: Handles Clerk webhook events (user.created, user.updated, user.deleted)
- **Authentication**: Verified via Clerk webhook secret

#### SIWE Wallet Linking
- **Endpoint**: `POST /api/siwe`
- **Description**: Links wallet address to user account via SIWE
- **Authentication**: Requires authenticated user (Clerk or Privy)

### Role Management

#### Admin Role Management
- **Endpoint**: `GET /api/admin/roles`
- **Description**: List all users with their roles (admin only)
- **Query Parameters**: `limit`, `offset`, `userId`

- **Endpoint**: `POST /api/admin/roles`
- **Description**: Assign role to user (admin only)
- **Body**: `{ targetUserId: string, role: UserRole }`

- **Endpoint**: `DELETE /api/admin/roles`
- **Description**: Remove role from user (admin only)
- **Body**: `{ targetUserId: string, role: UserRole }`

### Campaign Tweet Management

#### Add Tweet to Campaign
- **Endpoint**: `POST /api/campaigns/[campaignId]/tweets`
- **Description**: Add tweet to campaign (requires admin, moderator, or participant role)
- **Authentication**: Requires authenticated user with appropriate role
- **Body**: See request schema below

#### Get Campaign Tweets
- **Endpoint**: `GET /api/campaigns/[campaignId]/tweets`
- **Description**: Get tweets for a campaign
- **Query Parameters**: `epochIndex`, `limit`, `offset`

### Leaderboards

#### Epoch Leaderboard
- **Endpoint**: `GET /api/leaderboards/epoch/[epochId]`
- **Description**: Fetch leaderboard for specific epoch
- **epochId Format**: `projectId-campaignIndex-epochIndex`
- **Query Parameters**: `limit`, `offset`
- **Response**: Ranked users with scores, tweet counts, engagement metrics

#### Global Leaderboard
- **Endpoint**: `GET /api/leaderboards/global`
- **Description**: Fetch global leaderboard across all epochs
- **Query Parameters**: `limit`, `offset`
- **Response**: Ranked users with total scores

#### User-Specific Global Leaderboard
- **Endpoint**: `GET /api/leaderboards/global/user/[userId]`
- **Description**: Fetch user's rank and stats in global leaderboard
- **Response**: User rank, stats, percentile

### Data Processing

#### Process Tweets Cron Job
- **Endpoint**: `POST /api/cron/process-tweets`
- **Description**: Process tweets from Snowflake and update stats
- **Authentication**: Protected by CRON_SECRET
- **Query Parameters**: `startDate`, `endDate`, `projectId`, `campaignIndex`, `epochIndex`

## Environment Variables

### Required

```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Clerk
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_WEBHOOK_SECRET=whsec_...

# Privy (optional)
PRIVY_APP_ID=...
PRIVY_APP_SECRET=...

# Cron
CRON_SECRET=...

# Snowflake
SNOWFLAKE_ACCOUNT=your_account
SNOWFLAKE_USERNAME=your_username
SNOWFLAKE_PASSWORD=your_password
SNOWFLAKE_WAREHOUSE=your_warehouse
SNOWFLAKE_DATABASE=your_database
SNOWFLAKE_SCHEMA=your_schema
# Optional - only set if you need a specific role
# SNOWFLAKE_ROLE=YOUR_ROLE
# SNOWFLAKE_REGION=us-east-1
# SNOWFLAKE_TABLE_NAME=tweets_table
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Environment Variables

Create a `.env.local` file with all required environment variables.

### 3. Generate Database Migrations

```bash
npm run db:generate
```

### 4. Run Database Migrations

```bash
npm run db:push
```

Or for production:

```bash
npm run db:migrate
```

### 5. Configure Clerk Webhook

1. Go to Clerk Dashboard → Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/clerk`
3. Select events: `user.created`, `user.updated`, `user.deleted`
4. Copy webhook secret to `CLERK_WEBHOOK_SECRET`

### 6. Configure Snowflake

1. Set Snowflake environment variables in `.env.local`
2. Ensure your Snowflake table matches the expected schema (see Snowflake Integration section)
3. Test connection: `npm run test:snowflake`
4. Verify table name matches `SNOWFLAKE_TABLE_NAME` or defaults to `tweets_table`

### 7. Set Up Cron Job

For Vercel, add to `vercel.json`:

```json
{
  "crons": [{
    "path": "/api/cron/process-tweets",
    "schedule": "0 * * * *"
  }]
}
```

Or use a third-party service like EasyCron.

## Testing Guide

### 1. Test User Creation

1. Create a user in Clerk
2. Verify webhook is received
3. Check database for user record
4. Verify default role is `base_user`

### 2. Test Role Management

1. Assign admin role to a user
2. Verify user can access admin endpoints
3. Test removing role
4. Verify user loses access

### 3. Test SIWE Wallet Linking

1. Authenticate as a user
2. Sign SIWE message with wallet
3. Call `/api/siwe` endpoint
4. Verify wallet is linked in database

### 4. Test Tweet Addition

1. Authenticate as user with participant role
2. Add tweet to campaign
3. Verify tweet is created in database
4. Verify stats are updated

### 5. Test Cron Job

1. Manually call `/api/cron/process-tweets`
2. Verify tweets are fetched from Snowflake
3. Verify tweets are stored in database
4. Verify stats are calculated correctly

### 6. Test Leaderboards

1. Call `/api/leaderboards/epoch/[epochId]`
2. Verify ranked users are returned
3. Call `/api/leaderboards/global`
4. Verify global rankings are returned
5. Call `/api/leaderboards/global/user/[userId]`
6. Verify user rank is calculated correctly

## Troubleshooting

### Common Issues

#### 1. Clerk Webhook Not Working

- Verify `CLERK_WEBHOOK_SECRET` is set correctly
- Check webhook URL is accessible
- Verify webhook events are selected in Clerk dashboard
- Check server logs for errors

#### 2. SIWE Verification Failing

- Verify message format is correct
- Check signature is valid
- Ensure user is authenticated
- Verify wallet address is valid Ethereum address

#### 3. Snowflake Connection Failing

- Verify all required environment variables are set
- Check Snowflake credentials are correct
- Verify network access to Snowflake
- Check that the table exists and has the correct schema
- Verify warehouse, database, and schema names are correct
- Check Snowflake SDK is installed: `npm list snowflake-sdk`
- Run connection test: `npm run test:snowflake`
- Check logs for detailed error messages

#### 4. Leaderboard Not Updating

- Verify cron job is running
- Check tweets are being processed
- Verify stats are being calculated
- Check database for updated records

#### 5. Permission Denied Errors

- Verify user has correct role
- Check role is assigned in database
- Verify middleware is checking roles correctly
- Check user is authenticated

## Future Improvements

### 1. Points Calculation

- Implement weighted points system
- Add time-based decay for older tweets
- Add bonus points for certain engagement types

### 2. Snowflake Integration (Completed)

- ✅ Implemented actual Snowflake SDK integration
- ✅ Added connection management with singleton pattern
- ✅ Implemented query optimization with batching
- ✅ Added comprehensive error handling
- 🔄 Future: Add connection pooling for high-concurrency scenarios
- 🔄 Future: Add retry logic for transient failures
- 🔄 Future: Add query result caching

### 3. Leaderboard Features

- Add filtering options (by project, campaign, date range)
- Add sorting options (by points, tweets, engagement)
- Add user search functionality
- Add export functionality

### 4. Performance Optimization

- Add caching for leaderboard queries
- Implement pagination optimization
- Add database indexes for common queries
- Implement query result caching

### 5. Analytics

- Add analytics dashboard
- Track leaderboard views
- Track user engagement
- Add reporting features

### 6. Security

- Add rate limiting
- Add input validation
- Add SQL injection protection
- Add XSS protection

## Conclusion

This implementation provides a solid foundation for the leaderboard system. The architecture is designed to be scalable and maintainable, with clear separation of concerns and well-defined APIs.

For questions or issues, please refer to the troubleshooting section or contact the development team.

