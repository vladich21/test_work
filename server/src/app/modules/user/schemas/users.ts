import { mysqlTable, varchar, char, boolean, timestamp } from 'drizzle-orm/mysql-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { randomUUID } from 'crypto';

export const users = mysqlTable('Users', {
  tgId: varchar('tgId', { length: 255 }).primaryKey(),
  id: char('id', { length: 36 }).notNull().$default(() => randomUUID()).unique(),
  username: varchar('username', { length: 255 }),
  firstName: varchar('firstName', { length: 255 }),
  lastName: varchar('lastName', { length: 255 }),
  langCode: varchar('langCode', { length: 10 }),
  invitedBy: varchar('invitedBy', { length: 255 }),
  isActive: boolean('isActive').default(true).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
