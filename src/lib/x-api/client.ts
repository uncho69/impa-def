/**
 * X API Client for fetching tweets and metrics
 * Handles OAuth authentication, rate limiting, and error handling
 */

export interface XAPIConfig {
  bearerToken?: string; // App-level bearer token (for public metrics)
  userAccessToken?: string; // User OAuth token (for user-specific endpoints and impressions)
}

export interface TweetMetrics {
  tweetId: string;
  likes: number;
  replies: number;
  retweets: number;
  quotes: number;
  impressions?: number; // Only available with user OAuth token for owned posts
}

export interface TweetData {
  id: string;
  text: string;
  created_at: string;
  author_id: string;
  public_metrics?: {
    like_count: number;
    reply_count: number;
    retweet_count: number;
    quote_count: number;
  };
  non_public_metrics?: {
    impression_count: number;
  };
}

export interface UserTweet {
  id: string;
  text: string;
  created_at: string;
  public_metrics?: {
    like_count: number;
    reply_count: number;
    retweet_count: number;
    quote_count: number;
  };
}

class XAPIClient {
  private baseUrl = 'https://api.x.com/2';
  private rateLimitRetries = 3;
  private rateLimitDelay = 60000; // 1 minute default delay

  /**
   * Fetch user's tweets using their OAuth token
   * Requires user authentication
   */
  async getUserTweets(
    userId: string,
    accessToken: string,
    options?: {
      maxResults?: number;
      startTime?: Date;
      endTime?: Date;
      paginationToken?: string;
    }
  ): Promise<{ tweets: UserTweet[]; nextToken?: string }> {
    const url = new URL(`${this.baseUrl}/users/${userId}/tweets`);
    
    url.searchParams.set('max_results', String(options?.maxResults || 100));
    url.searchParams.set('tweet.fields', 'created_at,public_metrics,author_id');
    
    if (options?.startTime) {
      url.searchParams.set('start_time', options.startTime.toISOString());
    }
    if (options?.endTime) {
      url.searchParams.set('end_time', options.endTime.toISOString());
    }
    if (options?.paginationToken) {
      url.searchParams.set('pagination_token', options.paginationToken);
    }

    const response = await this.makeRequest(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.data) {
      return { tweets: [] };
    }

    return {
      tweets: response.data as UserTweet[],
      nextToken: response.meta?.next_token,
    };
  }

  /**
   * Fetch tweet metrics in batch (up to 100 tweets)
   * Uses bearer token for public metrics
   */
  async getTweetMetrics(
    tweetIds: string[],
    config: XAPIConfig
  ): Promise<TweetMetrics[]> {
    if (tweetIds.length === 0) {
      return [];
    }

    // X API supports up to 100 tweets per request
    const batchSize = 100;
    const batches: string[][] = [];
    
    for (let i = 0; i < tweetIds.length; i += batchSize) {
      batches.push(tweetIds.slice(i, i + batchSize));
    }

    const allMetrics: TweetMetrics[] = [];

    for (const batch of batches) {
      const metrics = await this.getTweetMetricsBatch(batch, config);
      allMetrics.push(...metrics);
      
      // Rate limit: wait between batches if needed
      if (batches.length > 1) {
        await this.delay(100); // Small delay between batches
      }
    }

    return allMetrics;
  }

  /**
   * Fetch metrics for a single batch of tweets
   */
  private async getTweetMetricsBatch(
    tweetIds: string[],
    config: XAPIConfig
  ): Promise<TweetMetrics[]> {
    const url = new URL(`${this.baseUrl}/tweets`);
    url.searchParams.set('ids', tweetIds.join(','));
    url.searchParams.set('tweet.fields', 'public_metrics');

    const token = config.bearerToken || config.userAccessToken;
    if (!token) {
      throw new Error('Bearer token or user access token required');
    }

    const response = await this.makeRequest(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data || !Array.isArray(response.data)) {
      return [];
    }

    return (response.data as TweetData[]).map((tweet) => ({
      tweetId: tweet.id,
      likes: tweet.public_metrics?.like_count || 0,
      replies: tweet.public_metrics?.reply_count || 0,
      retweets: tweet.public_metrics?.retweet_count || 0,
      quotes: tweet.public_metrics?.quote_count || 0,
    }));
  }

  /**
   * Fetch tweet with impressions (requires user OAuth token for owned posts)
   */
  async getTweetWithImpressions(
    tweetId: string,
    userAccessToken: string
  ): Promise<TweetMetrics | null> {
    const url = new URL(`${this.baseUrl}/tweets/${tweetId}`);
    url.searchParams.set('tweet.fields', 'public_metrics,non_public_metrics');

    const response = await this.makeRequest(url.toString(), {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    });

    if (!response.data) {
      return null;
    }

    const tweet = response.data as TweetData;

    return {
      tweetId: tweet.id,
      likes: tweet.public_metrics?.like_count || 0,
      replies: tweet.public_metrics?.reply_count || 0,
      retweets: tweet.public_metrics?.retweet_count || 0,
      quotes: tweet.public_metrics?.quote_count || 0,
      impressions: tweet.non_public_metrics?.impression_count || 0,
    };
  }

  /**
   * Make HTTP request with rate limit handling and retries
   */
  private async makeRequest(
    url: string,
    options: {
      headers: Record<string, string>;
      method?: string;
      body?: unknown;
    }
  ): Promise<{ data?: unknown; meta?: { next_token?: string } }> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < this.rateLimitRetries; attempt++) {
      try {
        const response = await fetch(url, {
          method: options.method || 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
          body: options.body ? JSON.stringify(options.body) : undefined,
        });

        // Handle rate limiting (429)
        if (response.status === 429) {
          const retryAfter = response.headers.get('x-rate-limit-reset');
          const waitTime = retryAfter
            ? Math.max(0, parseInt(retryAfter) * 1000 - Date.now())
            : this.rateLimitDelay * (attempt + 1);

          console.warn(
            `Rate limit hit, waiting ${waitTime}ms before retry ${attempt + 1}/${this.rateLimitRetries}`
          );
          await this.delay(waitTime);
          continue;
        }

        // Handle unauthorized (401) - token expired
        if (response.status === 401) {
          throw new Error('UNAUTHORIZED_TOKEN_EXPIRED');
        }

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `X API request failed: ${response.status} ${response.statusText} - ${errorText}`
          );
        }

        return await response.json();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        // If it's a token expiration error, don't retry
        if (lastError.message === 'UNAUTHORIZED_TOKEN_EXPIRED') {
          throw lastError;
        }

        // For other errors, retry with exponential backoff
        if (attempt < this.rateLimitRetries - 1) {
          const waitTime = this.rateLimitDelay * Math.pow(2, attempt);
          console.warn(
            `Request failed, retrying in ${waitTime}ms (attempt ${attempt + 1}/${this.rateLimitRetries})`
          );
          await this.delay(waitTime);
        }
      }
    }

    throw lastError || new Error('Request failed after retries');
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Singleton instance
let xApiClient: XAPIClient | null = null;

export function getXAPIClient(): XAPIClient {
  if (!xApiClient) {
    xApiClient = new XAPIClient();
  }
  return xApiClient;
}

