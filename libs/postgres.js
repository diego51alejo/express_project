const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    host: 'localhost',
    post: 5432,
    user: 'diego',
    password: 'admin123',
    database: 'my_store',
  });
  await client.connect();
  return client
}

module.exports = getConnection
