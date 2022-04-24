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
const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';
const POSTGRES_PORT = process.env.POSTGRES_PORT || '5432';

export const pool = new Pool({
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT),
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
