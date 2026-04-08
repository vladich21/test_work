<<<<<<< HEAD
import { users } from '../app/modules/user/schemas/users';
import { mortgageProfiles } from '../app/modules/mortgage/schemas/mortgage-profiles';
import { mortgageCalculations } from '../app/modules/mortgage/schemas/mortgage-calculations';
import { MySql2Database } from 'drizzle-orm/mysql2';

export const databaseSchema = {
  users,
  mortgageProfiles,
  mortgageCalculations,
} as const;

export type Database = MySql2Database<typeof databaseSchema>;
=======
import { users } from '../app/modules/user/schemas/users';
import { mortgageProfiles } from '../app/modules/mortgage/schemas/mortgage-profiles';
import { mortgageCalculations } from '../app/modules/mortgage/schemas/mortgage-calculations';
import { MySql2Database } from 'drizzle-orm/mysql2';

export const databaseSchema = {
  users,
  mortgageProfiles,
  mortgageCalculations,
} as const;

export type Database = MySql2Database<typeof databaseSchema>;
>>>>>>> d86c7279da28f6721dc1e5a5d6a696b2d080f758
