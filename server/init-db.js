const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_83EWAhNfreQF@ep-empty-dawn-aq9f9zq6.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require'
});

async function createTables() {
  try {
    await client.connect();
    console.log('Connected to Neon PostgreSQL');

    // Create articles table
    await client.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT DEFAULT '未分类',
        date TEXT NOT NULL,
        summary TEXT,
        content TEXT NOT NULL,
        source TEXT DEFAULT '',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ articles table created');

    // Create contacts table
    await client.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT DEFAULT '',
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ contacts table created');

    // Create subscribers table
    await client.query(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ subscribers table created');

    // Verify tables
    const result = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('\nTables created:', result.rows.map(r => r.table_name).join(', '));

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.end();
  }
}

createTables();
