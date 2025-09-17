import { NextResponse } from "next/server";
import snowflake from 'snowflake-sdk';
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  
  return new Promise((resolve, reject) => {
    // Create a connection object
    const connection = snowflake.createConnection({
      // Account identifier 
      account: 'JXLVOQE-TLB06923',
      username: 'francis',
      // TODO for Imparo
      password: 'aRCoLtZwJDtIAiCN',
      warehouse: 'francis',
      database: 'data_collector_iceberg',
      schema: 'public'
    });
    
    // Connect to Snowflake
    connection.connect((err, conn) => {
      if (err) {
        console.error('Unable to connect: ' + err.message);
        reject(NextResponse.json({ error: 'Database connection failed' }, { status: 500 }));
        return;
      }
    
      console.log('Successfully connected to Snowflake.');
      console.log(`Searching for coin with slug: ${slug}`);

      // Execute a parameterized query
      conn.execute({
        sqlText: `SELECT * FROM REALTIME_MARKET_DATA WHERE COINGECKO_ID = '${slug}';`,
        complete: (err, stmt, rows) => {
          if (err) {
            console.error('Failed to execute statement: ' + err.message);
            reject(NextResponse.json({ error: 'Query failed' }, { status: 500 }));
            return;
          } else {
            const data = rows?.[0];
            console.log('Query result:', data);
            
            // Close the connection
            conn.destroy((err, conn) => {
              if (err) {
                console.error('Failed to close the connection: ' + err.message);
              } else {
                console.log('Connection closed.');
              }
            });
            
            resolve(NextResponse.json({price: data?.PRICE, volume_24h: data?.VOLUME_24H, price_change_percentage_24h: data?.PRICE_CHANGE_PERCENTAGE_24H, market_cap: data?.MARKET_CAP, image: data?.IMAGE_URL}));
          }
        }
      });
    });
  });
}