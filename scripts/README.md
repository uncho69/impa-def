# Scripts

One test script per app functionality. Run all via `npm run test`, or run a single suite with `npm run test:<name>`.

## Test scripts

| Script | Functionality | Deps |
|--------|---------------|-----|
| **test-middleware** | `isStaticFile`, `matchesPublicRoute` (middleware utils) | None |
| **test-unit** | `cn`, `isAdminEmail`, `calculatePoints`, `POINT_WEIGHTS` (lib utils) | None |
| **test-db** | DB connectivity, schema (users, projects, user_roles, news, query) | `DATABASE_URL`, migrated schema |
| **test-auth** | `hasRole`, `hasAnyRole`, `getUserRoles`, `isAdmin`, `isModeratorOrAdmin`, `canAddTweetsToCampaign` | `DATABASE_URL`, migrated schema |
| **test-points** | Points calculation, `userEpochScores`, `users.totalPoints`, `epochs.totalPoints` | `DATABASE_URL`, migrated schema |
| **test-api** | Leaderboards, news, whatsnew, epochs, admin roles, campaigns, cron | App running at `TEST_BASE_URL` (default `localhost:3000`), DB for some routes |
| **test-webhooks** | Clerk webhook (`/api/webhooks/clerk`) – missing headers, invalid signature | App running |
| **test-snowflake** | Snowflake client init, `fetchTweetsFromSnowflake` | Optional `SNOWFLAKE_*` env |

## Usage

```bash
npm run test              # run all suites (skips DB/HTTP suites if not ready)
npm run test:middleware   # middleware only
npm run test:unit         # unit only
npm run test:db           # database only (requires DB)
npm run test:auth         # auth only (requires DB)
npm run test:points       # points only (requires DB)
npm run test:api          # API only (requires app + DB)
npm run test:webhooks     # webhooks only (requires app)
npm run test:snowflake    # Snowflake only
```

## Env

- **`.env.local`** (or `.env`): `DATABASE_URL`, optionally `TEST_BASE_URL`, `CRON_SECRET`, `SNOWFLAKE_*`.
- For **test-api** and **test-webhooks**, start the app (`npm run dev`) and use `TEST_BASE_URL` if it’s not `http://localhost:3000`.
