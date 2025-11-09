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
    
    // Cron
    CRON_SECRET?: string;
    
    // Snowflake
    SNOWFLAKE_ACCOUNT?: string;
    SNOWFLAKE_USERNAME?: string;
    SNOWFLAKE_PASSWORD?: string;
    SNOWFLAKE_WAREHOUSE?: string;
    SNOWFLAKE_DATABASE?: string;
    SNOWFLAKE_SCHEMA?: string;
    SNOWFLAKE_ROLE?: string;
    SNOWFLAKE_REGION?: string;
    
    // Node Environment
    NODE_ENV: 'development' | 'production' | 'test';
  }
}

