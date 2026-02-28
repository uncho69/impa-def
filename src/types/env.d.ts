// Environment variable type definitions
declare namespace NodeJS {
  interface ProcessEnv {
    // Database
    DATABASE_URL: string;
    
    // Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?: string;
    CLERK_SECRET_KEY?: string;
    CLERK_WEBHOOK_SECRET?: string;
    SKIP_CLERK?: string;
    // Optional: Custom sign-in/sign-up URLs (defaults to /sign-in and /sign-up)
    CLERK_SIGN_IN_URL?: string;
    CLERK_SIGN_UP_URL?: string;
    // Optional: Redirect URLs after authentication
    NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL?: string;
    NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL?: string;
    
    // Cron
    CRON_SECRET?: string;

    // Admin: comma-separated emails allowed to manage participation requests (if not using user_roles admin/moderator)
    ADMIN_EMAILS?: string;
    
    // Snowflake
    SNOWFLAKE_ACCOUNT?: string;
    SNOWFLAKE_USERNAME?: string;
    SNOWFLAKE_PASSWORD?: string;
    SNOWFLAKE_WAREHOUSE?: string;
    SNOWFLAKE_DATABASE?: string;
    SNOWFLAKE_SCHEMA?: string;
    SNOWFLAKE_ROLE?: string;
    SNOWFLAKE_REGION?: string;
    
    // X API
    X_API_BEARER_TOKEN?: string;
    
    // Node Environment
    NODE_ENV: 'development' | 'production' | 'test';
  }
}

