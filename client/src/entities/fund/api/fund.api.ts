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
