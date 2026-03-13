import { pool } from '@/lib/db';

/**
 * Crea la tabella campaign_participation_requests se non esiste.
 * Niente DO block: solo CREATE TABLE IF NOT EXISTS + indici, così funziona ovunque.
 */
export async function ensureCampaignParticipationRequestsTable(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS campaign_participation_requests (
        id serial PRIMARY KEY,
        user_id varchar(50) NOT NULL,
        project_id varchar(50) NOT NULL,
        campaign_index integer NOT NULL,
        status varchar(50) DEFAULT 'pending' NOT NULL,
        requested_at timestamp DEFAULT now() NOT NULL,
        reviewed_at timestamp,
        reviewed_by varchar(50),
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL,
        CONSTRAINT campaign_participation_requests_user_campaign_unique UNIQUE (user_id, project_id, campaign_index),
        CONSTRAINT campaign_participation_requests_status_check CHECK (status IN ('pending', 'approved', 'rejected'))
      )
    `);
    await client.query(`CREATE INDEX IF NOT EXISTS campaign_participation_requests_user_idx ON campaign_participation_requests (user_id)`);
    await client.query(`CREATE INDEX IF NOT EXISTS campaign_participation_requests_campaign_idx ON campaign_participation_requests (project_id, campaign_index)`);
    await client.query(`CREATE INDEX IF NOT EXISTS campaign_participation_requests_status_idx ON campaign_participation_requests (status)`);
  } finally {
    client.release();
  }
}
