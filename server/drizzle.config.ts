<<<<<<< HEAD
import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  schema: [
    './src/app/modules/user/schemas/*.ts',
    './src/app/modules/mortgage/schemas/*.ts',
  ],
  out: './database/migrations',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT || '3306'),
    user: process.env.USERNAME,
    password: process.env.PASSWORD || undefined,
    database: process.env.DATABASE || 'DatabaseName',
  },
  verbose: true,
  strict: true,
=======
import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  schema: [
    './src/app/modules/user/schemas/*.ts',
    './src/app/modules/mortgage/schemas/*.ts',
  ],
  out: './database/migrations',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT || '3306'),
    user: process.env.USERNAME,
    password: process.env.PASSWORD || undefined,
    database: process.env.DATABASE || 'DatabaseName',
  },
  verbose: true,
  strict: true,
>>>>>>> d86c7279da28f6721dc1e5a5d6a696b2d080f758
}); 