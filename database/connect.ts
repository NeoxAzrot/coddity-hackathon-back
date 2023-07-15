import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { Pool } from 'pg';

interface QueryDatabaseParams {
  query: string;
  params?: Array<string | number>;
}

dotenvExpand.expand(dotenv.config());

const POSTGRES_USER = process.env.POSTGRES_USER || 'root';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'root';
const POSTGRES_DB = process.env.POSTGRES_DB || '';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '5432';

export const pool = new Pool({
  connectionString:
    `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}`,
  ssl: true,
});

export const connectDatabase = async () => {
  pool
    .connect()
    .then(() => console.log('📚 Database connected\n'))
    .catch((err) => console.log(err));
};

export const queryDatabase = async ({ query, params }: QueryDatabaseParams) => {
  const result = await pool.query(query, params);
  return result.rows;
};
