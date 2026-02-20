# Deployment Checklist for X API Migration

## ✅ Code Changes Complete
All code has been implemented and is ready for deployment:
- Database schema updated
- X API client created
- Tweet discovery service
- Metrics update service
- Cron jobs created
- Token management

## 🔧 Pre-Deployment Steps

### 1. Install Node.js (if not already installed)
```bash
# If using nvm (already set up in your .zshrc):
source ~/.nvm/nvm.sh
nvm install 20
nvm use 20

# Verify installation:
node --version
npm --version
```

### 2. Run Database Migrations
```bash
# Generate migration files
npm run db:generate

# Apply migrations to database
npm run db:push
```

### 3. Set Environment Variables

#### Local Development (.env.local)
```env
# X API Bearer Token (REQUIRED)
X_API_BEARER_TOKEN=your_bearer_token_from_x_developer_portal

# Optional: Cron secret for securing cron endpoints
CRON_SECRET=your_secure_random_string

# Existing variables (keep these):
DATABASE_URL=your_database_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret
CLERK_WEBHOOK_SECRET=your_webhook_secret
```

#### Production (Vercel/Deployment Platform)
Add these environment variables in your deployment platform:
- `X_API_BEARER_TOKEN` - **REQUIRED**
- `CRON_SECRET` - Optional but recommended

### 4. Get X API Bearer Token
1. Go to [X Developer Portal](https://developer.x.com)
2. Navigate to your app (or create one)
3. Go to "Keys and tokens"
4. Copy your "Bearer Token"
5. Add it to environment variables

## 🚀 Deployment Steps

### For Vercel Deployment:
1. **Push code to Git**:
   ```bash
   git add .
   git commit -m "Migrate from Chakra/Snowflake to X API"
   git push
   ```

2. **Vercel will auto-deploy** (if connected to Git)

3. **Add environment variables in Vercel Dashboard**:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `X_API_BEARER_TOKEN`
   - Add `CRON_SECRET` (optional)

4. **Run database migrations** (if not auto-run):
   - You may need to run migrations manually or set up a migration script
   - Or use Vercel's database integration if available

### For Other Platforms:
Follow your platform's standard deployment process, ensuring:
- Environment variables are set
- Database migrations are run
- Build completes successfully

## 📋 Post-Deployment Steps

### 1. Set Up Cron Jobs

#### Option A: Vercel Cron (Recommended)
Create `vercel.json` in project root:
```json
{
  "crons": [
    {
      "path": "/api/cron/discover-tweets",
      "schedule": "0 2 * * *"
    },
    {
      "path": "/api/cron/update-tweet-metrics",
      "schedule": "0 */4 * * *"
    }
  ]
}
```

#### Option B: External Cron Service
Use services like:
- GitHub Actions (scheduled workflows)
- EasyCron
- Cron-job.org

Configure to call:
- `POST https://your-domain.com/api/cron/discover-tweets` (daily)
- `POST https://your-domain.com/api/cron/update-tweet-metrics` (every 4 hours)

**Important**: Include `Authorization: Bearer YOUR_CRON_SECRET` header if `CRON_SECRET` is set.

### 2. Test the System

#### Test Discovery:
```bash
curl -X POST https://your-domain.com/api/cron/discover-tweets \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

#### Test Metrics Update:
```bash
curl -X POST https://your-domain.com/api/cron/update-tweet-metrics \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

### 3. Monitor
- Check X API usage in Developer Console
- Monitor cron job execution logs
- Verify tweets are being discovered and verified
- Check that metrics are updating correctly

## 🔍 Verification Checklist

- [ ] Database migrations completed successfully
- [ ] Environment variables set (especially `X_API_BEARER_TOKEN`)
- [ ] Code deployed to production
- [ ] Cron jobs configured and running
- [ ] Discovery cron job finds tweets with project keywords
- [ ] Metrics update cron job updates tweet metrics
- [ ] Impressions are being fetched for authenticated users
- [ ] Leaderboards are updating correctly

## 🐛 Troubleshooting

### Database Migration Issues
- Ensure `DATABASE_URL` is set correctly
- Check database connection permissions
- Verify schema changes are compatible

### X API Issues
- Verify `X_API_BEARER_TOKEN` is correct
- Check X API rate limits in Developer Console
- Ensure users have valid OAuth tokens stored

### Cron Job Issues
- Verify cron jobs are configured correctly
- Check authorization headers if `CRON_SECRET` is set
- Review logs for errors

## 📝 Notes

- The old Snowflake-based cron (`/api/cron/process-tweets`) can be deprecated once the new system is verified
- Users with expired OAuth tokens will be automatically skipped until re-authentication
- Impressions are only available for posts owned by authenticated users (last 30 days)
- X API has 24-hour deduplication, so updating tweets multiple times per day is cost-efficient

