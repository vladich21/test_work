<<<<<<< HEAD
import { mysqlTable, int, char, decimal, text, timestamp } from 'drizzle-orm/mysql-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { mortgageProfiles } from './mortgage-profiles';
import { users } from '../../user/schemas/users';

export const mortgageCalculations = mysqlTable('MortgageCalculations', {
  id: int('id').autoincrement().primaryKey(),
  userId: char('userId', { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  mortgageProfileId: int('mortgageProfileId')
    .notNull()
    .references(() => mortgageProfiles.id, { onDelete: 'cascade' }),
  monthlyPayment: decimal('monthlyPayment', { precision: 15, scale: 2 }).notNull(),
  totalPayment: decimal('totalPayment', { precision: 15, scale: 2 }).notNull(),
  totalOverpaymentAmount: decimal('totalOverpaymentAmount', { precision: 15, scale: 2 }).notNull(),
  possibleTaxDeduction: decimal('possibleTaxDeduction', { precision: 15, scale: 2 }).notNull(),
  savingsDueMotherCapital: decimal('savingsDueMotherCapital', { precision: 15, scale: 2 }).notNull(),
  recommendedIncome: decimal('recommendedIncome', { precision: 15, scale: 2 }).notNull(),
  paymentSchedule: text('paymentSchedule'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
});

export type MortgageCalculation = InferSelectModel<typeof mortgageCalculations>;
export type NewMortgageCalculation = InferInsertModel<typeof mortgageCalculations>;
=======
import { mysqlTable, int, char, decimal, text, timestamp } from 'drizzle-orm/mysql-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { mortgageProfiles } from './mortgage-profiles';

export const mortgageCalculations = mysqlTable('MortgageCalculations', {
  id: int('id').autoincrement().primaryKey(),
  userId: char('userId', { length: 36 }).notNull(),
  mortgageProfileId: int('mortgageProfileId')
    .notNull()
    .references(() => mortgageProfiles.id, { onDelete: 'cascade' }),
  monthlyPayment: decimal('monthlyPayment', { precision: 15, scale: 2 }).notNull(),
  totalPayment: decimal('totalPayment', { precision: 15, scale: 2 }).notNull(),
  totalOverpaymentAmount: decimal('totalOverpaymentAmount', { precision: 15, scale: 2 }).notNull(),
  possibleTaxDeduction: decimal('possibleTaxDeduction', { precision: 15, scale: 2 }).notNull(),
  savingsDueMotherCapital: decimal('savingsDueMotherCapital', { precision: 15, scale: 2 }).notNull(),
  recommendedIncome: decimal('recommendedIncome', { precision: 15, scale: 2 }).notNull(),
  paymentSchedule: text('paymentSchedule'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
});

export type MortgageCalculation = InferSelectModel<typeof mortgageCalculations>;
export type NewMortgageCalculation = InferInsertModel<typeof mortgageCalculations>;
>>>>>>> d86c7279da28f6721dc1e5a5d6a696b2d080f758
