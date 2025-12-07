import * as dotenv from 'dotenv';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { news, whatsNewCard } from '@/lib/db/schema';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config();

// Create database connection
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('ERROR: DATABASE_URL environment variable is not set!');
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

const db = drizzle(pool, { schema: { news, whatsNewCard } });

async function seedNewsData() {
  try {
    console.log('Seeding news and whats_new_card tables with dummy data...\n');

    // Insert dummy news articles
    const newsArticles = [
      {
        id: crypto.randomUUID(),
        title: 'Bitcoin raggiunge nuovo massimo storico',
        summary: 'Bitcoin ha superato i $100,000 per la prima volta nella storia, segnando un momento storico per le criptovalute.',
        content: 'Bitcoin ha raggiunto un nuovo massimo storico superando i $100,000. Questo traguardo rappresenta un momento significativo per l\'ecosistema delle criptovalute e dimostra la crescente adozione istituzionale.',
        category: 'GENERAL',
        author: 'ImparoDeFi Team',
        authorEmail: 'admin@imparodefi.com',
        imageUrl: null,
        featured: 1,
        status: 'PUBLISHED',
        readTime: '5 min',
        tags: JSON.stringify(['bitcoin', 'criptovalute', 'mercato']),
        publishedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        title: 'Ethereum 2.0: La transizione al Proof of Stake',
        summary: 'Ethereum completa con successo la migrazione al meccanismo di consenso Proof of Stake, riducendo il consumo energetico del 99%.',
        content: 'La transizione di Ethereum al Proof of Stake rappresenta uno dei momenti più importanti nella storia delle blockchain. Questo cambiamento riduce drasticamente il consumo energetico e apre nuove possibilità per lo sviluppo dell\'ecosistema DeFi.',
        category: 'DEFI',
        author: 'ImparoDeFi Team',
        authorEmail: 'admin@imparodefi.com',
        imageUrl: null,
        featured: 1,
        status: 'PUBLISHED',
        readTime: '8 min',
        tags: JSON.stringify(['ethereum', 'defi', 'proof-of-stake']),
        publishedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        title: 'Guida completa agli Airdrop 2025',
        summary: 'Scopri i migliori airdrop disponibili nel 2025 e come partecipare per ottenere token gratuiti.',
        content: 'Gli airdrop continuano ad essere un modo popolare per distribuire token e coinvolgere la community. Questa guida ti aiuterà a identificare le migliori opportunità e a partecipare in modo sicuro.',
        category: 'AIRDROPS',
        author: 'ImparoDeFi Team',
        authorEmail: 'admin@imparodefi.com',
        imageUrl: null,
        featured: 0,
        status: 'PUBLISHED',
        readTime: '10 min',
        tags: JSON.stringify(['airdrop', 'token', 'guida']),
        publishedAt: new Date(),
      },
    ];

    for (const article of newsArticles) {
      await db.insert(news).values(article);
      console.log(`✓ Inserted news: "${article.title}"`);
    }

    // Insert dummy whats_new_card entries
    const whatsNewCards = [
      {
        id: crypto.randomUUID(),
        title: 'Nuova sezione Leaderboards',
        description: 'Scopri le nuove classifiche globali e per epoca! Competi con altri utenti e scala le posizioni.',
        category: 'feature',
        imageUrl: null,
        link: '/leaderboards/global',
        isActive: 1,
        showInLanding: 1,
        order: 1,
      },
      {
        id: crypto.randomUUID(),
        title: 'Sistema di punti migliorato',
        description: 'Il nuovo sistema di punti premia la tua attività su Twitter con punti per likes, replies, retweets e quotes.',
        category: 'feature',
        imageUrl: null,
        link: '/leaderboards/global',
        isActive: 1,
        showInLanding: 1,
        order: 2,
      },
      {
        id: crypto.randomUUID(),
        title: 'Integrazione Clerk completata',
        description: 'Abbiamo completato la migrazione a Clerk per un\'autenticazione più sicura e affidabile.',
        category: 'update',
        imageUrl: null,
        link: null,
        isActive: 1,
        showInLanding: 0,
        order: 3,
      },
    ];

    for (const card of whatsNewCards) {
      await db.insert(whatsNewCard).values(card);
      console.log(`✓ Inserted whats_new_card: "${card.title}"`);
    }

    console.log('\n✅ Dummy data seeded successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`   - ${newsArticles.length} news articles inserted`);
    console.log(`   - ${whatsNewCards.length} whats_new_card entries inserted`);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

seedNewsData();

