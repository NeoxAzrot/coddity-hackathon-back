import { readFileSync, readdirSync } from 'fs';

import { pool } from 'database/connect';

const migrateDatabase = async () => {
  const migrations = readdirSync('database/migrations');

  for (const migration of migrations) {
    const migrationFile = readFileSync(`database/migrations/${migration}`).toString();
    await pool
      .query(migrationFile)
      .then(() => console.log(`\u001b[1;33m${migration}\u001b[0m successfully migrated`))
      .catch((err) => console.log(err));
  }

  pool.end();
};

migrateDatabase();
