<<<<<<< HEAD
import { http } from '../../../shared/api/http';

export interface TransactionUser {
  tgId: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  photoUrl: string | null;
  points: number;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: string;
  currency: string;
  metadata: string | null;
  createdAt: string;
  updatedAt: string;
  user: TransactionUser | null;
}

export const transactionApi = {
  getAll: (limit?: number): Promise<Transaction[]> =>
    http
      .get<Transaction[]>('/transaction-history', {
        params: limit ? { limit } : undefined,
      })
      .then((r) => r.data),
};
=======
import { http } from '../../../shared/api/http';

export interface TransactionUser {
  tgId: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  photoUrl: string | null;
  points: number;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: string;
  currency: string;
  metadata: string | null;
  createdAt: string;
  updatedAt: string;
  user: TransactionUser | null;
}

export const transactionApi = {
  getAll: (limit?: number): Promise<Transaction[]> =>
    http
      .get<Transaction[]>('/transaction-history', {
        params: limit ? { limit } : undefined,
      })
      .then((r) => r.data),
};
>>>>>>> d86c7279da28f6721dc1e5a5d6a696b2d080f758
