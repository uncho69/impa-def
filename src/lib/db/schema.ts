import { pgTable, serial, varchar, timestamp, integer, bigint, smallint, text, primaryKey, index, foreignKey, check, unique } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';


// Projects table
export const projects = pgTable('projects', {
    id: varchar('id', { length: 50 }).primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    campaignCount: integer('campaign_count').notNull().default(0),
    isActive: smallint('is_active').notNull().default(0),
    deletedAt: timestamp('deleted_at'),
    createdBy: varchar('created_by', { length: 50 }),
    updatedBy: varchar('updated_by', { length: 50 }),
    version: integer('version').default(1),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => [
    index('projects_campaign_count_idx').on(table.campaignCount),
    check('projects_campaign_count_check', sql`${table.campaignCount} >= 0`),
    check('projects_is_active_check', sql`${table.isActive} IN (0, 1)`),
]);

// Campaigns table
export const campaigns = pgTable('campaigns', {
    projectId: varchar('project_id', { length: 50 }).notNull().references(() => projects.id, { onDelete: 'cascade' }),
    index: integer('index').notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    epochCount: integer('epoch_count').notNull().default(0),
    epochSize: integer('epoch_size').notNull().default(0),
    isActive: smallint('is_active').notNull().default(0),
    deletedAt: timestamp('deleted_at'),
    createdBy: varchar('created_by', { length: 50 }),
    updatedBy: varchar('updated_by', { length: 50 }),
    version: integer('version').default(1),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => [
    primaryKey({ name: 'campaigns_pkey', columns: [table.projectId, table.index] }),
    index('campaigns_project_id_idx').on(table.projectId),
    index('campaigns_created_at_idx').on(table.createdAt),
    index('campaigns_epoch_count_idx').on(table.epochCount),
    index('campaigns_active_filter_idx').on(table.isActive, table.deletedAt),
    check('campaigns_epoch_count_check', sql`${table.epochCount} >= 0`),
    check('campaigns_epoch_size_check', sql`${table.epochSize} >= 0`),
    check('campaigns_is_active_check', sql`${table.isActive} IN (0, 1)`),
]);

// Rewards table
export const rewards = pgTable('rewards', {
    projectId: varchar('project_id', { length: 50 }).notNull(),
    campaignIndex: integer('campaign_index').notNull(),
    amount: bigint('amount', { mode: 'number' }).notNull(),
    token: varchar('token', { length: 50 }).notNull(),
    perEpoch: smallint('per_epoch').notNull().default(0),
    isActive: smallint('is_active').notNull().default(0),
    deletedAt: timestamp('deleted_at'),
    createdBy: varchar('created_by', { length: 50 }),
    updatedBy: varchar('updated_by', { length: 50 }),
    version: integer('version').default(1),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => [
    primaryKey({ name: 'rewards_pkey', columns: [table.projectId, table.campaignIndex, table.amount, table.token] }),
    index('rewards_campaign_idx').on(table.projectId, table.campaignIndex),
    index('rewards_token_idx').on(table.token),
    index('rewards_amount_idx').on(table.amount),
    index('rewards_active_filter_idx').on(table.isActive, table.deletedAt),
    foreignKey({
        columns: [table.projectId, table.campaignIndex],
        foreignColumns: [campaigns.projectId, campaigns.index],
    }).onDelete('cascade'),
    check('rewards_amount_check', sql`${table.amount} > 0`),
    check('rewards_per_epoch_check', sql`${table.perEpoch} IN (0, 1)`),
    check('rewards_is_active_check', sql`${table.isActive} IN (0, 1)`),
]);

// Epochs table
export const epochs = pgTable('epochs', {
    projectId: varchar('project_id', { length: 50 }).notNull(),
    campaignIndex: integer('campaign_index').notNull(),
    index: integer('index').notNull(),
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date').notNull(),
    userCount: integer('user_count').notNull().default(0),
    tweetCount: bigint('tweet_count', { mode: 'number' }).notNull().default(0),
    totalLikes: bigint('total_likes', { mode: 'number' }).notNull().default(0),
    totalReplies: bigint('total_replies', { mode: 'number' }).notNull().default(0),
    totalRetweets: bigint('total_retweets', { mode: 'number' }).notNull().default(0),
    totalQuotes: bigint('total_quotes', { mode: 'number' }).notNull().default(0),
    totalPoints: bigint('total_points', { mode: 'number' }).notNull().default(0),
    isActive: smallint('is_active').notNull().default(0),
    deletedAt: timestamp('deleted_at'),
    createdBy: varchar('created_by', { length: 50 }),
    updatedBy: varchar('updated_by', { length: 50 }),
    version: integer('version').default(1),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => [
    primaryKey({ name: 'epochs_pkey', columns: [table.projectId, table.campaignIndex, table.index] }),
    index('epochs_project_id_idx').on(table.projectId),
    index('epochs_campaign_idx').on(table.projectId, table.campaignIndex),
    index('epochs_start_date_idx').on(table.startDate),
    index('epochs_end_date_idx').on(table.endDate),
    index('epochs_created_at_idx').on(table.createdAt),
    index('epochs_active_filter_idx').on(table.isActive, table.deletedAt),
    foreignKey({
        columns: [table.projectId, table.campaignIndex],
        foreignColumns: [campaigns.projectId, campaigns.index],
    }).onDelete('cascade'),
    check('epochs_date_check', sql`${table.endDate} > ${table.startDate}`),
    check('epochs_user_count_check', sql`${table.userCount} >= 0`),
    check('epochs_tweet_count_check', sql`${table.tweetCount} >= 0`),
    check('epochs_total_likes_check', sql`${table.totalLikes} >= 0`),
    check('epochs_total_replies_check', sql`${table.totalReplies} >= 0`),
    check('epochs_total_retweets_check', sql`${table.totalRetweets} >= 0`),
    check('epochs_total_quotes_check', sql`${table.totalQuotes} >= 0`),
    check('epochs_total_points_check', sql`${table.totalPoints} >= 0`),
    check('epochs_is_active_check', sql`${table.isActive} IN (0, 1)`),
]);

// Users table
export const users = pgTable('users', {
    id: varchar('id', { length: 50 }).primaryKey(),
    email: varchar('email', { length: 255 }),
    emailVerified: smallint('email_verified').notNull().default(0),
    twitterId: varchar('twitter_id', { length: 50 }),
    username: varchar('username', { length: 50 }),
    walletAddress: varchar('wallet_address', { length: 255 }), // Primary wallet address
    privyId: varchar('privy_id', { length: 255 }), // DEPRECATED: Privy user ID - no longer used, kept for database compatibility
    totalPoints: bigint('total_points', { mode: 'number' }).notNull().default(0),
    totalLikes: bigint('total_likes', { mode: 'number' }).notNull().default(0),
    totalReplies: bigint('total_replies', { mode: 'number' }).notNull().default(0),
    totalRetweets: bigint('total_retweets', { mode: 'number' }).notNull().default(0),
    totalQuotes: bigint('total_quotes', { mode: 'number' }).notNull().default(0),
    isActive: smallint('is_active').notNull().default(1),
    deletedAt: timestamp('deleted_at'),
    createdBy: varchar('created_by', { length: 50 }),
    updatedBy: varchar('updated_by', { length: 50 }),
    version: integer('version').default(1),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => [
    index('users_email_idx').on(table.email),
    index('users_twitter_id_idx').on(table.twitterId),
    index('users_username_idx').on(table.username),
    index('users_wallet_address_idx').on(table.walletAddress),
    index('users_privy_id_idx').on(table.privyId),
    index('users_total_points_idx').on(table.totalPoints),
    index('users_created_at_idx').on(table.createdAt),
    index('users_active_filter_idx').on(table.isActive, table.deletedAt),
    unique('users_email_unique').on(table.email),
    unique('users_twitter_id_unique').on(table.twitterId),
    unique('users_username_unique').on(table.username),
    unique('users_privy_id_unique').on(table.privyId),
    check('users_email_verified_check', sql`${table.emailVerified} IN (0, 1)`),
    check('users_total_points_check', sql`${table.totalPoints} >= 0`),
    check('users_total_likes_check', sql`${table.totalLikes} >= 0`),
    check('users_total_replies_check', sql`${table.totalReplies} >= 0`),
    check('users_total_retweets_check', sql`${table.totalRetweets} >= 0`),
    check('users_total_quotes_check', sql`${table.totalQuotes} >= 0`),
    check('users_is_active_check', sql`${table.isActive} IN (0, 1)`),
]);

// Authentication accounts table - links external auth providers to users
export const authAccounts = pgTable('auth_accounts', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 50 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
    provider: varchar('provider', { length: 50 }).notNull(), // 'privy', 'wallet', 'email', 'twitter', 'google', 'github', etc.
    providerAccountId: varchar('provider_account_id', { length: 255 }).notNull(), // Provider-specific account ID
    providerUserId: varchar('provider_user_id', { length: 255 }), // Provider user ID (e.g., Privy ID, Twitter ID)
    walletAddress: varchar('wallet_address', { length: 255 }), // For wallet-based auth
    email: varchar('email', { length: 255 }), // For email-based auth
    accessToken: text('access_token'), // Encrypted access token
    refreshToken: text('refresh_token'), // Encrypted refresh token
    expiresAt: timestamp('expires_at'), // Token expiration
    tokenType: varchar('token_type', { length: 50 }),
    scope: text('scope'), // OAuth scope
    idToken: text('id_token'), // OpenID Connect ID token
    providerData: text('provider_data'), // JSON string with additional provider-specific data
    isActive: smallint('is_active').notNull().default(1),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => [
    index('auth_accounts_user_id_idx').on(table.userId),
    index('auth_accounts_provider_idx').on(table.provider),
    index('auth_accounts_provider_account_id_idx').on(table.providerAccountId),
    index('auth_accounts_wallet_address_idx').on(table.walletAddress),
    index('auth_accounts_email_idx').on(table.email),
    index('auth_accounts_lookup_idx').on(table.provider, table.providerAccountId),
    unique('auth_accounts_provider_unique').on(table.provider, table.providerAccountId),
    check('auth_accounts_is_active_check', sql`${table.isActive} IN (0, 1)`),
]);

// Sessions table - for storing user sessions
export const sessions = pgTable('sessions', {
    id: varchar('id', { length: 255 }).primaryKey(),
    userId: varchar('user_id', { length: 50 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
    sessionToken: varchar('session_token', { length: 255 }).notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    ipAddress: varchar('ip_address', { length: 45 }),
    userAgent: text('user_agent'),
    deviceId: varchar('device_id', { length: 255 }), // For device tracking
    isActive: smallint('is_active').notNull().default(1),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => [
    index('sessions_user_id_idx').on(table.userId),
    index('sessions_session_token_idx').on(table.sessionToken),
    index('sessions_expires_at_idx').on(table.expiresAt),
    index('sessions_device_id_idx').on(table.deviceId),
    unique('sessions_session_token_unique').on(table.sessionToken),
    check('sessions_is_active_check', sql`${table.isActive} IN (0, 1)`),
]);

// Verification tokens table - for email verification, password reset, etc.
export const verificationTokens = pgTable('verification_tokens', {
    id: serial('id').primaryKey(),
    identifier: varchar('identifier', { length: 255 }).notNull(), // Email or other identifier
    token: varchar('token', { length: 255 }).notNull(),
    type: varchar('type', { length: 50 }).notNull(), // 'email_verification', 'password_reset', 'magic_link', etc.
    expiresAt: timestamp('expires_at').notNull(),
    userId: varchar('user_id', { length: 50 }).references(() => users.id, { onDelete: 'cascade' }),
    used: smallint('used').notNull().default(0),
    createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => [
    index('verification_tokens_identifier_idx').on(table.identifier),
    index('verification_tokens_token_idx').on(table.token),
    index('verification_tokens_type_idx').on(table.type),
    index('verification_tokens_user_id_idx').on(table.userId),
    index('verification_tokens_expires_at_idx').on(table.expiresAt),
    unique('verification_tokens_token_unique').on(table.token),
    unique('verification_tokens_identifier_type_unique').on(table.identifier, table.token, table.type),
    check('verification_tokens_used_check', sql`${table.used} IN (0, 1)`),
]);

// Refresh tokens table - for JWT refresh token management
export const refreshTokens = pgTable('refresh_tokens', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 50 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
    token: varchar('token', { length: 500 }).notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    deviceId: varchar('device_id', { length: 255 }),
    ipAddress: varchar('ip_address', { length: 45 }),
    userAgent: text('user_agent'),
    isRevoked: smallint('is_revoked').notNull().default(0),
    revokedAt: timestamp('revoked_at'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => [
    index('refresh_tokens_user_id_idx').on(table.userId),
    index('refresh_tokens_token_idx').on(table.token),
    index('refresh_tokens_expires_at_idx').on(table.expiresAt),
    index('refresh_tokens_device_id_idx').on(table.deviceId),
    unique('refresh_tokens_token_unique').on(table.token),
    check('refresh_tokens_is_revoked_check', sql`${table.isRevoked} IN (0, 1)`),
]);

// OTP codes table - for one-time password/verification codes
export const otpCodes = pgTable('otp_codes', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 50 }).references(() => users.id, { onDelete: 'cascade' }),
    identifier: varchar('identifier', { length: 255 }).notNull(), // Email or phone number
    code: varchar('code', { length: 10 }).notNull(), // OTP code
    type: varchar('type', { length: 50 }).notNull(), // 'email_verification', 'phone_verification', '2fa', 'login', etc.
    expiresAt: timestamp('expires_at').notNull(),
    attempts: integer('attempts').notNull().default(0),
    maxAttempts: integer('max_attempts').notNull().default(3),
    used: smallint('used').notNull().default(0),
    usedAt: timestamp('used_at'),
    ipAddress: varchar('ip_address', { length: 45 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => [
    index('otp_codes_user_id_idx').on(table.userId),
    index('otp_codes_identifier_idx').on(table.identifier),
    index('otp_codes_code_idx').on(table.code),
    index('otp_codes_type_idx').on(table.type),
    index('otp_codes_expires_at_idx').on(table.expiresAt),
    check('otp_codes_attempts_check', sql`${table.attempts} >= 0`),
    check('otp_codes_max_attempts_check', sql`${table.maxAttempts} > 0`),
    check('otp_codes_used_check', sql`${table.used} IN (0, 1)`),
]);

// API keys table - for service authentication and API access
export const apiKeys = pgTable('api_keys', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 50 }).references(() => users.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 255 }), // Human-readable name for the API key
    keyHash: varchar('key_hash', { length: 255 }).notNull(), // Hashed API key
    keyPrefix: varchar('key_prefix', { length: 20 }), // First few chars for identification
    scopes: text('scopes'), // JSON array of allowed scopes/permissions
    lastUsedAt: timestamp('last_used_at'),
    expiresAt: timestamp('expires_at'),
    isActive: smallint('is_active').notNull().default(1),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => [
    index('api_keys_user_id_idx').on(table.userId),
    index('api_keys_key_hash_idx').on(table.keyHash),
    index('api_keys_key_prefix_idx').on(table.keyPrefix),
    index('api_keys_expires_at_idx').on(table.expiresAt),
    unique('api_keys_key_hash_unique').on(table.keyHash),
    check('api_keys_is_active_check', sql`${table.isActive} IN (0, 1)`),
]);

// Tweets table
export const tweets = pgTable('tweets', {
    id: serial('id').primaryKey(),
    projectId: varchar('project_id', { length: 50 }),
    campaignIndex: integer('campaign_index'),
    epochIndex: integer('epoch_index'),
    userId: varchar('user_id', { length: 50 }).references(() => users.id, { onDelete: 'set null' }),
    twitterUserId: varchar('twitter_user_id', { length: 50 }),
    postId: varchar('post_id', { length: 50 }),
    content: text('content'),
    postedAt: timestamp('posted_at'),
    hasImage: smallint('has_image').default(0),
    hasVideo: smallint('has_video').default(0),
    hashtags: text('hashtags'), // JSON array stored as text
    taggedUsers: text('tagged_users'), // JSON array stored as text
    likes: bigint('likes', { mode: 'number' }).default(0),
    replies: bigint('replies', { mode: 'number' }).default(0),
    retweets: bigint('retweets', { mode: 'number' }).default(0),
    quotes: bigint('quotes', { mode: 'number' }).default(0),
    isActive: smallint('is_active').notNull().default(0),
    deletedAt: timestamp('deleted_at'),
    createdBy: varchar('created_by', { length: 50 }),
    updatedBy: varchar('updated_by', { length: 50 }),
    version: integer('version').default(1),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => [
    index('tweets_epoch_idx').on(table.projectId, table.campaignIndex, table.epochIndex),
    index('tweets_user_id_idx').on(table.userId),
    index('tweets_user_epoch_idx').on(table.userId, table.projectId, table.campaignIndex, table.epochIndex),
    index('tweets_twitter_user_id_idx').on(table.twitterUserId),
    index('tweets_post_id_idx').on(table.postId),
    index('tweets_posted_at_idx').on(table.postedAt),
    index('tweets_created_at_idx').on(table.createdAt),
    index('tweets_likes_idx').on(table.likes),
    index('tweets_retweets_idx').on(table.retweets),
    index('tweets_active_filter_idx').on(table.isActive, table.deletedAt),
    unique('tweets_post_id_unique').on(table.postId),
    foreignKey({
        columns: [table.projectId, table.campaignIndex, table.epochIndex],
        foreignColumns: [epochs.projectId, epochs.campaignIndex, epochs.index],
    }).onDelete('set null'),
    check('tweets_likes_check', sql`${table.likes} >= 0`),
    check('tweets_replies_check', sql`${table.replies} >= 0`),
    check('tweets_retweets_check', sql`${table.retweets} >= 0`),
    check('tweets_quotes_check', sql`${table.quotes} >= 0`),
    check('tweets_is_active_check', sql`${table.isActive} IN (0, 1)`),
]);

// User epoch scores table
export const userEpochScores = pgTable('user_epoch_scores', {
    projectId: varchar('project_id', { length: 50 }).notNull(),
    campaignIndex: integer('campaign_index').notNull(),
    epochIndex: integer('epoch_index').notNull(),
    userId: varchar('user_id', { length: 50 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
    points: bigint('points', { mode: 'number' }).notNull().default(0),
    tweetCount: integer('tweet_count').notNull().default(0),
    totalLikes: bigint('total_likes', { mode: 'number' }).notNull().default(0),
    totalReplies: bigint('total_replies', { mode: 'number' }).notNull().default(0),
    totalRetweets: bigint('total_retweets', { mode: 'number' }).notNull().default(0),
    totalQuotes: bigint('total_quotes', { mode: 'number' }).notNull().default(0),
    isActive: smallint('is_active').notNull().default(0),
    deletedAt: timestamp('deleted_at'),
    createdBy: varchar('created_by', { length: 50 }),
    updatedBy: varchar('updated_by', { length: 50 }),
    version: integer('version').default(1),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => [
    primaryKey({ name: 'user_epoch_scores_pkey', columns: [table.projectId, table.campaignIndex, table.epochIndex, table.userId] }),
    index('user_epoch_scores_epoch_idx').on(table.projectId, table.campaignIndex, table.epochIndex),
    index('user_epoch_scores_user_id_idx').on(table.userId),
    index('user_epoch_scores_points_idx').on(table.points),
    index('user_epoch_scores_epoch_points_idx').on(table.projectId, table.campaignIndex, table.epochIndex, table.points),
    index('user_epoch_scores_created_at_idx').on(table.createdAt),
    index('user_epoch_scores_active_filter_idx').on(table.isActive, table.deletedAt),
    foreignKey({
        columns: [table.projectId, table.campaignIndex, table.epochIndex],
        foreignColumns: [epochs.projectId, epochs.campaignIndex, epochs.index],
    }).onDelete('cascade'),
    check('user_epoch_scores_points_check', sql`${table.points} >= 0`),
    check('user_epoch_scores_tweet_count_check', sql`${table.tweetCount} >= 0`),
    check('user_epoch_scores_total_likes_check', sql`${table.totalLikes} >= 0`),
    check('user_epoch_scores_total_replies_check', sql`${table.totalReplies} >= 0`),
    check('user_epoch_scores_total_retweets_check', sql`${table.totalRetweets} >= 0`),
    check('user_epoch_scores_total_quotes_check', sql`${table.totalQuotes} >= 0`),
    check('user_epoch_scores_is_active_check', sql`${table.isActive} IN (0, 1)`),
]);

// User roles table
export const userRoles = pgTable('user_roles', {
    userId: varchar('user_id', { length: 50 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
    role: varchar('role', { length: 50 }).notNull(), // 'admin', 'moderator', 'participant', 'base_user'
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => [
    primaryKey({ name: 'user_roles_pkey', columns: [table.userId, table.role] }),
    index('user_roles_user_id_idx').on(table.userId),
    index('user_roles_role_idx').on(table.role),
    check('user_roles_role_check', sql`${table.role} IN ('admin', 'moderator', 'participant', 'base_user')`),
]);

// News table
export const news = pgTable('news', {
    id: varchar('id', { length: 255 }).primaryKey(),
    title: varchar('title', { length: 500 }).notNull(),
    summary: text('summary').notNull(),
    content: text('content').notNull(),
    category: varchar('category', { length: 50 }).notNull(), // GENERAL, DEFI, AIRDROPS, etc.
    author: varchar('author', { length: 255 }).notNull(),
    authorEmail: varchar('author_email', { length: 255 }).notNull(),
    imageUrl: varchar('image_url', { length: 500 }),
    featured: smallint('featured').notNull().default(0),
    status: varchar('status', { length: 50 }).notNull().default('DRAFT'), // DRAFT, PUBLISHED, ARCHIVED
    readTime: varchar('read_time', { length: 50 }).notNull(),
    tags: text('tags'), // JSON array stored as text
    publishedAt: timestamp('published_at'),
    views: integer('views').notNull().default(0),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => [
    index('news_category_idx').on(table.category),
    index('news_status_idx').on(table.status),
    index('news_featured_idx').on(table.featured),
    index('news_published_at_idx').on(table.publishedAt),
    index('news_created_at_idx').on(table.createdAt),
    check('news_featured_check', sql`${table.featured} IN (0, 1)`),
    check('news_status_check', sql`${table.status} IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')`),
    check('news_views_check', sql`${table.views} >= 0`),
]);

// WhatsNewCard table
export const whatsNewCard = pgTable('whats_new_card', {
    id: varchar('id', { length: 255 }).primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    category: varchar('category', { length: 50 }).notNull().default('feature'),
    imageUrl: varchar('image_url', { length: 500 }),
    link: varchar('link', { length: 500 }),
    isActive: smallint('is_active').notNull().default(1),
    showInLanding: smallint('show_in_landing').notNull().default(0),
    order: integer('order').notNull().default(0),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => [
    index('whats_new_card_is_active_idx').on(table.isActive),
    index('whats_new_card_show_in_landing_idx').on(table.showInLanding),
    index('whats_new_card_order_idx').on(table.order),
    index('whats_new_card_created_at_idx').on(table.createdAt),
    check('whats_new_card_is_active_check', sql`${table.isActive} IN (0, 1)`),
    check('whats_new_card_show_in_landing_check', sql`${table.showInLanding} IN (0, 1)`),
]);

// Relations
export const projectsRelations = relations(projects, ({ many }) => ({
    campaigns: many(campaigns),
}));

export const campaignsRelations = relations(campaigns, ({ one, many }) => ({
    project: one(projects, {
        fields: [campaigns.projectId],
        references: [projects.id],
    }),
    epochs: many(epochs),
    rewards: many(rewards),
}));

export const rewardsRelations = relations(rewards, ({ one }) => ({
    campaign: one(campaigns, {
        fields: [rewards.projectId, rewards.campaignIndex],
        references: [campaigns.projectId, campaigns.index],
    }),
}));

export const epochsRelations = relations(epochs, ({ one, many }) => ({
    campaign: one(campaigns, {
        fields: [epochs.projectId, epochs.campaignIndex],
        references: [campaigns.projectId, campaigns.index],
    }),
    tweets: many(tweets),
    userEpochScores: many(userEpochScores),
}));

export const usersRelations = relations(users, ({ many }) => ({
    tweets: many(tweets),
    userEpochScores: many(userEpochScores),
    authAccounts: many(authAccounts),
    sessions: many(sessions),
    verificationTokens: many(verificationTokens),
    refreshTokens: many(refreshTokens),
    otpCodes: many(otpCodes),
    apiKeys: many(apiKeys),
    userRoles: many(userRoles),
}));

export const authAccountsRelations = relations(authAccounts, ({ one }) => ({
    user: one(users, {
        fields: [authAccounts.userId],
        references: [users.id],
    }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    }),
}));

export const verificationTokensRelations = relations(verificationTokens, ({ one }) => ({
    user: one(users, {
        fields: [verificationTokens.userId],
        references: [users.id],
    }),
}));

export const refreshTokensRelations = relations(refreshTokens, ({ one }) => ({
    user: one(users, {
        fields: [refreshTokens.userId],
        references: [users.id],
    }),
}));

export const otpCodesRelations = relations(otpCodes, ({ one }) => ({
    user: one(users, {
        fields: [otpCodes.userId],
        references: [users.id],
    }),
}));

export const apiKeysRelations = relations(apiKeys, ({ one }) => ({
    user: one(users, {
        fields: [apiKeys.userId],
        references: [users.id],
    }),
}));

export const tweetsRelations = relations(tweets, ({ one }) => ({
    epoch: one(epochs, {
        fields: [tweets.projectId, tweets.campaignIndex, tweets.epochIndex],
        references: [epochs.projectId, epochs.campaignIndex, epochs.index],
    }),
    user: one(users, {
        fields: [tweets.userId],
        references: [users.id],
    }),
}));

export const userEpochScoresRelations = relations(userEpochScores, ({ one }) => ({
    epoch: one(epochs, {
        fields: [userEpochScores.projectId, userEpochScores.campaignIndex, userEpochScores.epochIndex],
        references: [epochs.projectId, epochs.campaignIndex, epochs.index],
    }),
    user: one(users, {
        fields: [userEpochScores.userId],
        references: [users.id],
    }),
}));

export const userRolesRelations = relations(userRoles, ({ one }) => ({
    user: one(users, {
        fields: [userRoles.userId],
        references: [users.id],
    }),
}));
