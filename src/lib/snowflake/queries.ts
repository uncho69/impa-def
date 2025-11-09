import { getSnowflakeClient, type SnowflakeBinds } from './client';

export interface TweetData {
  tweet_id: string;
  user_id: string;
  content?: string;
  posted_at?: string;
  likes?: number;
  replies?: number;
  retweets?: number;
  quotes?: number;
  hashtags?: string[];
  tagged_users?: string[];
  has_image?: boolean;
  has_video?: boolean;
}

function normalizeRow(row: Record<string, unknown>): Record<string, unknown> {
  const normalized: Record<string, unknown> = {};
  for (const key in row) {
    const lowerKey = key.toLowerCase();
    normalized[lowerKey] = row[key];
    if (key !== lowerKey) {
      normalized[key] = row[key];
    }
  }
  return normalized;
}

function parseJsonField(value: unknown): string[] {
  if (value === null || value === undefined) {
    return [];
  }
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item));
      }
      return [];
    } catch {
      return value.split(',').map((item: string) => item.trim()).filter(Boolean);
    }
  }
  if (Array.isArray(value)) {
    return value.map((item) => String(item));
  }
  return [];
}

function toBoolean(value: unknown): boolean {
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'number') {
    return value !== 0;
  }
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value === '1';
  }
  return false;
}

function transformRowToTweetData(row: Record<string, unknown>): TweetData {
  const normalized = normalizeRow(row);
  
  const getString = (key: string): string => {
    const value = normalized[key] || normalized[key.toUpperCase()];
    return value ? String(value) : '';
  };
  
  const getOptionalString = (key: string): string | undefined => {
    const value = normalized[key] || normalized[key.toUpperCase()];
    return value ? String(value) : undefined;
  };
  
  const getNumber = (key: string, defaultValue = 0): number => {
    const value = normalized[key] || normalized[key.toUpperCase()];
    if (typeof value === 'number') {
      return value;
    }
    if (typeof value === 'string') {
      const num = Number(value);
      return isNaN(num) ? defaultValue : num;
    }
    return defaultValue;
  };
  
  return {
    tweet_id: getString('tweet_id'),
    user_id: getString('user_id'),
    content: getOptionalString('content'),
    posted_at: getOptionalString('posted_at'),
    likes: getNumber('likes'),
    replies: getNumber('replies'),
    retweets: getNumber('retweets'),
    quotes: getNumber('quotes'),
    hashtags: parseJsonField(normalized.hashtags || normalized.HASHTAGS),
    tagged_users: parseJsonField(normalized.tagged_users || normalized.TAGGED_USERS),
    has_image: toBoolean(normalized.has_image || normalized.HAS_IMAGE),
    has_video: toBoolean(normalized.has_video || normalized.HAS_VIDEO),
  };
}

function getTableName(): string {
  const tableName = process.env.SNOWFLAKE_TABLE_NAME || 'tweets_table';
  
  const parts = tableName.split('.');
  for (const part of parts) {
    if (!/^[a-zA-Z0-9_]+$/.test(part)) {
      throw new Error(`Invalid table name: ${tableName}. Only alphanumeric characters and underscores are allowed in each part.`);
    }
  }
  
  return tableName;
}

function validateLimit(limit?: number): number | undefined {
  if (limit === undefined || limit === null) {
    return undefined;
  }
  
  const numLimit = Number(limit);
  if (isNaN(numLimit) || numLimit < 0 || !Number.isInteger(numLimit)) {
    throw new Error(`Invalid limit value: ${limit}. Must be a positive integer.`);
  }
  
  const maxLimit = 100000;
  return Math.min(numLimit, maxLimit);
}

export async function fetchTweetsFromSnowflake(
  startDate: Date,
  endDate: Date,
  limit?: number
): Promise<TweetData[]> {
  const client = getSnowflakeClient();
  const tableName = getTableName();
  const validatedLimit = validateLimit(limit);

  const query = `
    SELECT 
      TWEET_ID,
      USER_ID,
      CONTENT,
      POSTED_AT,
      COALESCE(LIKES, 0) AS LIKES,
      COALESCE(REPLIES, 0) AS REPLIES,
      COALESCE(RETWEETS, 0) AS RETWEETS,
      COALESCE(QUOTES, 0) AS QUOTES,
      HASHTAGS,
      TAGGED_USERS,
      COALESCE(HAS_IMAGE, FALSE) AS HAS_IMAGE,
      COALESCE(HAS_VIDEO, FALSE) AS HAS_VIDEO
    FROM ${tableName}
    WHERE POSTED_AT >= ? AND POSTED_AT <= ?
    ORDER BY POSTED_AT ASC
    ${validatedLimit ? `LIMIT ${validatedLimit}` : ''}
  `;

  try {
    const startDateStr = startDate.toISOString();
    const endDateStr = endDate.toISOString();

    const results = await client.executeQuery(query, [startDateStr, endDateStr]);

    return results.map(transformRowToTweetData);
  } catch (error) {
    console.error('Error fetching tweets from Snowflake:', error);
    console.error('Query:', query);
    console.error('Parameters:', [startDate.toISOString(), endDate.toISOString()]);
    throw error;
  }
}

export async function fetchTweetIdsFromSnowflake(
  startDate: Date,
  endDate: Date,
  limit?: number
): Promise<string[]> {
  const client = getSnowflakeClient();
  const tableName = getTableName();
  const validatedLimit = validateLimit(limit);

  const query = `
    SELECT TWEET_ID
    FROM ${tableName}
    WHERE POSTED_AT >= ? AND POSTED_AT <= ?
    ORDER BY POSTED_AT ASC
    ${validatedLimit ? `LIMIT ${validatedLimit}` : ''}
  `;

  try {
    const startDateStr = startDate.toISOString();
    const endDateStr = endDate.toISOString();

    const results = await client.executeQuery(query, [startDateStr, endDateStr]);

    return results.map((row: Record<string, unknown>) => {
      const normalized = normalizeRow(row);
      const tweetId = normalized.tweet_id || normalized.TWEET_ID;
      return tweetId ? String(tweetId) : '';
    }).filter((id: string) => id.length > 0);
  } catch (error) {
    console.error('Error fetching tweet IDs from Snowflake:', error);
    throw error;
  }
}

export async function fetchTweetsByIds(tweetIds: string[]): Promise<TweetData[]> {
  if (tweetIds.length === 0) {
    return [];
  }

  const client = getSnowflakeClient();
  const tableName = getTableName();

  const BATCH_SIZE = 1000;
  
  if (tweetIds.length <= BATCH_SIZE) {
    return await fetchTweetsByIdsBatch(client, tableName, tweetIds);
  }

  const results: TweetData[] = [];
  for (let i = 0; i < tweetIds.length; i += BATCH_SIZE) {
    const batch = tweetIds.slice(i, i + BATCH_SIZE);
    const batchResults = await fetchTweetsByIdsBatch(client, tableName, batch);
    results.push(...batchResults);
  }

  return results;
}

async function fetchTweetsByIdsBatch(
  client: ReturnType<typeof getSnowflakeClient>,
  tableName: string,
  tweetIds: string[]
): Promise<TweetData[]> {
  const placeholders = tweetIds.map(() => '?').join(',');
  const query = `
    SELECT 
      TWEET_ID,
      USER_ID,
      CONTENT,
      POSTED_AT,
      COALESCE(LIKES, 0) AS LIKES,
      COALESCE(REPLIES, 0) AS REPLIES,
      COALESCE(RETWEETS, 0) AS RETWEETS,
      COALESCE(QUOTES, 0) AS QUOTES,
      HASHTAGS,
      TAGGED_USERS,
      COALESCE(HAS_IMAGE, FALSE) AS HAS_IMAGE,
      COALESCE(HAS_VIDEO, FALSE) AS HAS_VIDEO
    FROM ${tableName}
    WHERE TWEET_ID IN (${placeholders})
  `;

  try {
    const results = await client.executeQuery(query, tweetIds);
    return results.map(transformRowToTweetData);
  } catch (error) {
    console.error('Error fetching tweets by IDs from Snowflake:', error);
    console.error('Query:', query);
    console.error('Batch size:', tweetIds.length);
    throw error;
  }
}

export async function fetchTweetsByUserIds(
  userIds: string[],
  startDate?: Date,
  endDate?: Date
): Promise<TweetData[]> {
  if (userIds.length === 0) {
    return [];
  }

  const client = getSnowflakeClient();
  const tableName = getTableName();

  const placeholders = userIds.map(() => '?').join(',');
  let query = `
    SELECT 
      TWEET_ID,
      USER_ID,
      CONTENT,
      POSTED_AT,
      COALESCE(LIKES, 0) AS LIKES,
      COALESCE(REPLIES, 0) AS REPLIES,
      COALESCE(RETWEETS, 0) AS RETWEETS,
      COALESCE(QUOTES, 0) AS QUOTES,
      HASHTAGS,
      TAGGED_USERS,
      COALESCE(HAS_IMAGE, FALSE) AS HAS_IMAGE,
      COALESCE(HAS_VIDEO, FALSE) AS HAS_VIDEO
    FROM ${tableName}
    WHERE USER_ID IN (${placeholders})
  `;

  const params: SnowflakeBinds = [...userIds];

  if (startDate && endDate) {
    query += ` AND POSTED_AT >= ? AND POSTED_AT <= ?`;
    params.push(startDate.toISOString(), endDate.toISOString());
  }

  query += ` ORDER BY POSTED_AT DESC`;

  try {
    const results = await client.executeQuery(query, params);
    return results.map(transformRowToTweetData);
  } catch (error) {
    console.error('Error fetching tweets by user IDs from Snowflake:', error);
    throw error;
  }
}

