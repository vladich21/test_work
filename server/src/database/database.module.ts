<<<<<<< HEAD
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { databaseSchema, Database } from './schema';
import { DB_TIMEZONE } from './constants';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DATABASE',
      useFactory: async (configService: ConfigService): Promise<Database> => {
        const pool = mysql.createPool({
          host: configService.get('HOST'),
          port: parseInt(configService.get('PORT') || '3306'),
          user: configService.get('USERNAME'),
          password: configService.get('PASSWORD') || undefined,
          database: configService.get('DATABASE'),
          timezone: DB_TIMEZONE,
          dateStrings: true,
        });

        return drizzle(pool, { schema: databaseSchema, mode: 'default' }) as Database;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['DATABASE'],
})
export class DatabaseModule {}
=======
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { databaseSchema, Database } from './schema';
import { DB_TIMEZONE } from './constants';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DATABASE',
      useFactory: async (configService: ConfigService): Promise<Database> => {
        const pool = mysql.createPool({
          host: configService.get('HOST'),
          port: parseInt(configService.get('PORT') || '3306'),
          user: configService.get('USERNAME'),
          password: configService.get('PASSWORD') || undefined,
          database: configService.get('DATABASE'),
          timezone: DB_TIMEZONE,
          dateStrings: true,
        });

        return drizzle(pool, { schema: databaseSchema, mode: 'default' }) as Database;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['DATABASE'],
})
export class DatabaseModule {}
>>>>>>> d86c7279da28f6721dc1e5a5d6a696b2d080f758
