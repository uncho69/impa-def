import * as snowflake from 'snowflake-sdk';

export interface SnowflakeConfig {
  account: string;
  username: string;
  password: string;
  warehouse: string;
  database: string;
  schema: string;
  role?: string;
  region?: string;
}

// Type for Snowflake bind parameters - the SDK accepts various primitive types
export type SnowflakeBind = string | number | boolean | Date | null | undefined;
export type SnowflakeBinds = SnowflakeBind[];

class SnowflakeClient {
  private config: SnowflakeConfig | null = null;
  private connection: snowflake.Connection | null = null;
  private isConnecting: boolean = false;
  private connectionPromise: Promise<void> | null = null;

  async initialize(): Promise<void> {
    const config: SnowflakeConfig = {
      account: process.env.SNOWFLAKE_ACCOUNT || '',
      username: process.env.SNOWFLAKE_USERNAME || '',
      password: process.env.SNOWFLAKE_PASSWORD || '',
      warehouse: process.env.SNOWFLAKE_WAREHOUSE || '',
      database: process.env.SNOWFLAKE_DATABASE || '',
      schema: process.env.SNOWFLAKE_SCHEMA || '',
      role: process.env.SNOWFLAKE_ROLE,
      region: process.env.SNOWFLAKE_REGION,
    };

    if (!config.account || !config.username || !config.password) {
      throw new Error('Snowflake configuration is incomplete. Please set SNOWFLAKE_ACCOUNT, SNOWFLAKE_USERNAME, and SNOWFLAKE_PASSWORD environment variables.');
    }

    if (!config.warehouse || !config.database || !config.schema) {
      throw new Error('Snowflake configuration is incomplete. Please set SNOWFLAKE_WAREHOUSE, SNOWFLAKE_DATABASE, and SNOWFLAKE_SCHEMA environment variables.');
    }

    this.config = config;
    console.log('Snowflake client configuration loaded');
  }

  async getConnection(): Promise<snowflake.Connection> {
    if (!this.config) {
      await this.initialize();
    }

    if (this.connection && this.isConnectionValid()) {
      return this.connection;
    }

    if (this.isConnecting && this.connectionPromise) {
      await this.connectionPromise;
      if (this.connection) {
        return this.connection;
      }
    }

    this.isConnecting = true;
    this.connectionPromise = this.createConnection();
    
    try {
      await this.connectionPromise;
      this.isConnecting = false;
      
      if (!this.connection) {
        throw new Error('Failed to create Snowflake connection');
      }
      
      return this.connection;
    } catch (error) {
      this.isConnecting = false;
      this.connectionPromise = null;
      throw error;
    }
  }

  private createConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.config) {
        reject(new Error('Snowflake configuration not initialized'));
        return;
      }

      const connectionConfig: snowflake.ConnectionOptions = {
        account: this.config.account,
        username: this.config.username,
        password: this.config.password,
        warehouse: this.config.warehouse,
        database: this.config.database,
        schema: this.config.schema,
        ...(this.config.role && { role: this.config.role }),
        ...(this.config.region && { region: this.config.region }),
      };

      this.connection = snowflake.createConnection(connectionConfig);

      this.connection.connect((err) => {
        if (err) {
          console.error('Failed to connect to Snowflake:', err);
          this.connection = null;
          reject(err);
          return;
        }

        console.log('Successfully connected to Snowflake');
        resolve();
      });
    });
  }

  private isConnectionValid(): boolean {
    if (!this.connection) {
      return false;
    }

    try {
      return typeof (this.connection as unknown as { execute?: unknown }).execute === 'function';
    } catch {
      return false;
    }
  }

  async executeQuery(query: string, binds?: SnowflakeBinds): Promise<Record<string, unknown>[]> {
    const connection = await this.getConnection();

    return new Promise((resolve, reject) => {
      connection.execute({
        sqlText: query,
        binds: (binds || []) as snowflake.Binds,
        complete: (err, _stmt, rows) => {
          if (err) {
            console.error('Snowflake query error:', err);
            reject(err);
            return;
          }

          resolve((rows as Record<string, unknown>[]) || []);
        },
      });
    });
  }

  async executeQueryStream(
    query: string,
    binds?: SnowflakeBinds,
    onRow?: (row: Record<string, unknown>) => void
  ): Promise<void> {
    const connection = await this.getConnection();

    return new Promise((resolve, reject) => {
      connection.execute({
        sqlText: query,
        binds: (binds || []) as snowflake.Binds,
        streamResult: true,
        complete: (err, stmt) => {
          if (err) {
            console.error('Snowflake query error:', err);
            reject(err);
            return;
          }

          if (onRow && stmt) {
            stmt.streamRows({
              start: 0,
              end: 1000000,
            })
              .on('data', (row) => {
                onRow(row as Record<string, unknown>);
              })
              .on('error', (err) => {
                reject(err);
              })
              .on('end', () => {
                resolve();
              });
          } else {
            resolve();
          }
        },
      });
    });
  }

  async close(): Promise<void> {
    return new Promise((resolve) => {
      if (this.connection) {
        this.connection.destroy((err) => {
          if (err) {
            console.error('Error closing Snowflake connection:', err);
          } else {
            console.log('Snowflake connection closed');
          }
          this.connection = null;
          this.isConnecting = false;
          this.connectionPromise = null;
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.getConnection();
      const results = await this.executeQuery('SELECT 1 as test');
      return results.length > 0 && results[0].TEST === 1;
    } catch (error) {
      console.error('Snowflake connection test failed:', error);
      return false;
    }
  }
}

let snowflakeClient: SnowflakeClient | null = null;

export function getSnowflakeClient(): SnowflakeClient {
  if (!snowflakeClient) {
    snowflakeClient = new SnowflakeClient();
  }
  return snowflakeClient;
}

export async function initializeSnowflake(): Promise<void> {
  const client = getSnowflakeClient();
  await client.initialize();
  
  if (process.env.NODE_ENV !== 'production') {
    const isConnected = await client.testConnection();
    if (isConnected) {
      console.log('Snowflake connection test passed');
    } else {
      console.warn('Snowflake connection test failed');
    }
  }
}

export async function closeSnowflake(): Promise<void> {
  if (snowflakeClient) {
    await snowflakeClient.close();
    snowflakeClient = null;
  }
}

