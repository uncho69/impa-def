# Testing Quick Start Guide

This guide provides a quick overview of how to run the test suite for the leaderboard features.

## Prerequisites

1. **Database Setup**
   - Ensure PostgreSQL is running
   - Set `DATABASE_URL` in `.env.local`
   - Run database migrations: `npm run db:push`

2. **Environment Variables**
   Create a `.env.local` file with:
   ```env
   DATABASE_URL=postgresql://user:password@host:port/database
   CLERK_SECRET_KEY=sk_... (optional, for webhook tests)
   CLERK_WEBHOOK_SECRET=whsec_... (optional, for webhook tests)
   CRON_SECRET=your_cron_secret (optional, for cron job tests)
   TEST_BASE_URL=http://localhost:3000 (optional, defaults to localhost:3000)
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

## Running Tests

### Run All Tests
```bash
npm run test
```

### Run Individual Test Suites
```bash
# Database schema tests
npm run test:db

# Authentication & permissions tests
npm run test:auth

# API endpoint tests (requires running server)
npm run test:api

# Points calculation tests
npm run test:points

# Webhook tests
npm run test:webhooks

# SIWE tests
npm run test:siwe

# Snowflake integration tests
npm run test:snowflake
```

## For API Endpoint Tests

API endpoint tests require the Next.js development server to be running:

1. Start the server in one terminal:
   ```bash
   npm run dev
   ```

2. Run the API tests in another terminal:
   ```bash
   npm run test:api
   ```

## Test Output

Tests output results in real-time:
- ✅ Green checkmark = Test passed
- ❌ Red X = Test failed (with error message)

At the end of each test suite, a summary is displayed showing:
- Total tests
- Passed tests
- Failed tests
- List of failed tests (if any)

## Common Issues

### Database Connection Errors
- Verify `DATABASE_URL` is correct
- Ensure PostgreSQL is running
- Check database permissions

### API Endpoint Tests Failing
- Ensure the dev server is running (`npm run dev`)
- Check that `TEST_BASE_URL` matches your server URL
- Verify the server is accessible

### Webhook Tests Failing
- Ensure `CLERK_WEBHOOK_SECRET` is set
- Verify the webhook endpoint is accessible
- Check webhook signature generation

### Permission Tests Failing
- Ensure test users are created with correct roles
- Verify the `user_roles` table exists
- Check database constraints

## Next Steps

For detailed information about each test suite, see [scripts/README.md](./README.md).

For information about the leaderboard implementation, see [LEADERBOARD_IMPLEMENTATION.md](../LEADERBOARD_IMPLEMENTATION.md).

