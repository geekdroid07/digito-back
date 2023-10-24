import * as dotenv from 'dotenv';
import { join } from 'path';
import { setEnvironment } from './infrastructure/environments';

dotenv.config({ path: join(__dirname, '..', setEnvironment()) });

// Mapper for environment variables
export const environment = process.env.NODE_ENV;
export const port = process.env.PORT || 8080;

export const logDirectory = process.env.LOG_DIR;
export const corsUrl = process.env.CORS_URL;

export const db = {
  name: process.env.DB_NAME || 'BonumProducts',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.PASSWORD || '17821782'
};
