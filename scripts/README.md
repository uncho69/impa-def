# Leaderboard Features Test Suite

This directory contains comprehensive tests for all leaderboard features added in the `feat/leaderboards` branch.

## Overview

The test suite covers:
- Database schema (user_roles, auth_accounts, etc.)
- Authentication & authorization (role-based permissions)
- API endpoints (admin roles, campaign tweets, leaderboards)
- Points calculation system
- Webhooks (Clerk integration)
- SIWE (Sign-In With Ethereum)
- Snowflake integration (placeholder)

## Prerequisites

1. **Database**: PostgreSQL database with connection string in `DATABASE_URL`
2. **Environment Variables**: Create a `.env.local` file with:
   ```env
   DATABASE_URL=postgresql://user:password@host:port/database
   CLERK_SECRET_KEY=sk_...
   CLERK_WEBHOOK_SECRET=whsec_...
   CRON_SECRET=your_cron_secret
   TEST_BASE_URL=http://localhost:3000
   ```

3. **Dependencies**: Install dependencies:
   ```bash
   npm install
   ```

4. **Database Setup**: Ensure database migrations are applied:
   ```bash
   npm run db:push
   ```

5. **Development Server**: For API endpoint tests, start the development server:
   ```bash
   npm run dev
   ```

## Installation

The tests use `tsx` to run TypeScript files directly. Install it if not already available:

```bash
npm install --save-dev tsx
```

## Running Tests

### Run All Tests

```bash
npm run test
```

This will run all test suites and provide a comprehensive summary.

### Run Individual Test Suites

```bash
# Database schema tests
npm run test:db

# Authentication & permissions tests
npm run test:auth

# API endpoint tests
npm run test:api

# Points calculation tests
npm run test:points

# Webhook tests
npm run test:webhooks

# SIWE tests
npm run test:siwe

# Snowflake integration tests (placeholder)
npm run test:snowflake
```

## Test Structure

### Test Files

- `test-utils.ts`: Common utilities and test runner class
- `test-database-schema.ts`: Database schema and constraint tests
- `test-auth-permissions.ts`: Authentication and permission function tests
- `test-api-endpoints.ts`: API endpoint tests (requires running server)
- `test-points-calculation.ts`: Points calculation and aggregation tests
- `test-webhooks.ts`: Clerk webhook handler tests
- `test-siwe.ts`: SIWE wallet linking tests
- `test-snowflake.ts`: Snowflake integration tests (placeholder)
- `test-all.ts`: Main test runner that executes all test suites

### Test Categories

#### 1. Database Schema Tests
- Verify `user_roles` table exists and has correct structure
- Test unique constraints on user_roles (userId, role)
- Test foreign key constraints and cascading deletes
- Test auth_accounts provider support (clerk, privy, wallet)

#### 2. Authentication & Authorization Tests
- Test role-based permission functions (`hasRole`, `hasAnyRole`, etc.)
- Test permission checks (`canAddTweetsToCampaign`, `isAdmin`, etc.)
- Test user role retrieval

#### 3. API Endpoint Tests
- Admin role management API (GET, POST, DELETE `/api/admin/roles`)
- Campaign tweet management API (POST, GET `/api/campaigns/[campaignId]/tweets`)
- Leaderboard API endpoints:
  - Epoch leaderboard (`/api/leaderboards/epoch/[epochId]`)
  - Global leaderboard (`/api/leaderboards/global`)
  - User-specific global leaderboard (`/api/leaderboards/global/user/[userId]`)
- Cron job endpoint (`/api/cron/process-tweets`)

#### 4. Points Calculation Tests
- Test points calculation logic (1 like = 1 point, etc.)
- Test points aggregation in `userEpochScores`
- Test points aggregation in `users.totalPoints`
- Test points aggregation in `epochs.totalPoints`
- Test points update when tweet engagement changes

#### 5. Webhook Tests
- Test Clerk webhook handler (`/api/webhooks/clerk`)
- Test user.created event
- Test user.updated event
- Test user.deleted event
- Test webhook signature verification
- Test duplicate user creation (idempotent)

#### 6. SIWE Tests
- Test SIWE wallet linking
- Test invalid signature rejection
- Test unauthenticated user rejection
- Test wallet already linked to another user
- Test invalid wallet address format

#### 7. Snowflake Integration Tests
- Test Snowflake client initialization (placeholder)
- Test placeholder query execution
- Test error handling for missing credentials
- Test query function interfaces

## Manual Testing

Some tests require manual setup:

### API Endpoint Tests with Authentication

To test authenticated endpoints, you need to:

1. Create a Clerk session token for a test user
2. Set `TEST_CLERK_SESSION_TOKEN` in your `.env.local`:
   ```env
   TEST_CLERK_SESSION_TOKEN=your_clerk_session_token
   ```

### Webhook Tests

Webhook tests use the `svix` library to sign webhook payloads. Ensure `CLERK_WEBHOOK_SECRET` is set in your `.env.local`.

### SIWE Tests

SIWE tests require actual wallet signatures. For full testing:
1. Create a test user in Clerk
2. Generate a valid SIWE message and signature
3. Use the test user's session token to authenticate the request

## Test Results

Tests output results in the following format:

```
✅ Test name
❌ Test name: Error message
```

At the end of each test suite, a summary is printed:

```
==================================================
Test Summary
==================================================
Total: 10
Passed: 8
Failed: 2
==================================================
```

The main test runner (`test-all.ts`) provides a comprehensive summary of all test suites.

## Troubleshooting

### Database Connection Errors

Ensure `DATABASE_URL` is correctly set in `.env.local` and the database is running.

### API Endpoint Tests Failing

1. Ensure the development server is running (`npm run dev`)
2. Check that `TEST_BASE_URL` is set correctly (default: `http://localhost:3000`)
3. For authenticated endpoints, ensure you have valid session tokens

### Webhook Tests Failing

1. Ensure `CLERK_WEBHOOK_SECRET` is set correctly
2. Check that the webhook handler is accessible at `/api/webhooks/clerk`
3. Verify webhook signature generation is working

### Permission Tests Failing

1. Ensure test users are created with correct roles
2. Check that the `user_roles` table exists and is properly populated
3. Verify foreign key constraints are working

## Notes

- Some tests create test data in the database. They clean up after themselves, but if tests are interrupted, you may need to manually clean up test data.
- API endpoint tests require the Next.js server to be running.
- Snowflake integration tests are placeholders and will always pass in placeholder mode.
- Some SIWE tests require manual setup with actual wallet signatures.

## Future Improvements

- Add unit tests for individual functions
- Add integration tests for full workflows
- Add E2E tests for complete user journeys
- Add performance tests for leaderboard queries
- Add load tests for concurrent requests
- Set up CI/CD pipeline for automated testing

