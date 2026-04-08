<<<<<<< HEAD
import { http } from '../../../shared/api/http';

export interface FundStats {
  totalRaised: number;
  goal: number;
  progress: number;
  membersCount: number;
  purchasedCount: number;
  wallet: {
    tonToPointsRate: number;
  };
}

export const fundApi = {
  getStats: (): Promise<FundStats> =>
    http.get<FundStats>('/fund/stats').then((r) => r.data),
};
=======
import { http } from '../../../shared/api/http';

export interface FundStats {
  totalRaised: number;
  goal: number;
  progress: number;
  membersCount: number;
  purchasedCount: number;
  wallet: {
    tonToPointsRate: number;
  };
}

export const fundApi = {
  getStats: (): Promise<FundStats> =>
    http.get<FundStats>('/fund/stats').then((r) => r.data),
};
>>>>>>> d86c7279da28f6721dc1e5a5d6a696b2d080f758
