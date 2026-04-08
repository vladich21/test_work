<<<<<<< HEAD
import { mysqlTable, int, char, varchar, decimal, boolean, timestamp } from 'drizzle-orm/mysql-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { users } from '../../user/schemas/users';

export const PropertyTypeValues = [
  'apartment_in_new_building',
  'apartment_in_secondary_building',
  'house',
  'house_with_land_plot',
  'land_plot',
  'other',
] as const;

export type PropertyType = (typeof PropertyTypeValues)[number];

export const mortgageProfiles = mysqlTable('MortgageProfiles', {
  id: int('id').autoincrement().primaryKey(),
  userId: char('userId', { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  propertyPrice: decimal('propertyPrice', { precision: 15, scale: 2 }).notNull(),
  propertyType: varchar('propertyType', { length: 50 }).notNull(),
  downPaymentAmount: decimal('downPaymentAmount', { precision: 15, scale: 2 }).notNull(),
  matCapitalAmount: decimal('matCapitalAmount', { precision: 15, scale: 2 }),
  matCapitalIncluded: boolean('matCapitalIncluded').notNull().default(false),
  mortgageTermYears: int('mortgageTermYears').notNull(),
  interestRate: decimal('interestRate', { precision: 7, scale: 4 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
});

export type MortgageProfile = InferSelectModel<typeof mortgageProfiles>;
export type NewMortgageProfile = InferInsertModel<typeof mortgageProfiles>;
=======
import { mysqlTable, int, char, varchar, decimal, boolean, timestamp } from 'drizzle-orm/mysql-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export const PropertyTypeValues = [
  'apartment_in_new_building',
  'apartment_in_secondary_building',
  'house',
  'house_with_land_plot',
  'land_plot',
  'other',
] as const;

export type PropertyType = (typeof PropertyTypeValues)[number];

export const mortgageProfiles = mysqlTable('MortgageProfiles', {
  id: int('id').autoincrement().primaryKey(),
  userId: char('userId', { length: 36 }).notNull(),
  propertyPrice: decimal('propertyPrice', { precision: 15, scale: 2 }).notNull(),
  propertyType: varchar('propertyType', { length: 50 }).notNull(),
  downPaymentAmount: decimal('downPaymentAmount', { precision: 15, scale: 2 }).notNull(),
  matCapitalAmount: decimal('matCapitalAmount', { precision: 15, scale: 2 }),
  matCapitalIncluded: boolean('matCapitalIncluded').notNull().default(false),
  mortgageTermYears: int('mortgageTermYears').notNull(),
  interestRate: decimal('interestRate', { precision: 7, scale: 4 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
});

export type MortgageProfile = InferSelectModel<typeof mortgageProfiles>;
export type NewMortgageProfile = InferInsertModel<typeof mortgageProfiles>;
>>>>>>> d86c7279da28f6721dc1e5a5d6a696b2d080f758
