import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { CurrencyList } from '../../constants/enums';
import { FundStatsResponse } from './fund.controller';
import { TransactionHistoryService } from '../transaction-history/transaction-history.service';
import { UsersService } from '../user/users.service';

@Injectable()
export class FundService {
  private readonly GOAL = 1000;
  private readonly TON_TO_POINTS_RATE = 289.86;

  constructor(
    private readonly transactionHistoryService: TransactionHistoryService,
    private readonly userService: UsersService,
  ) {}

  async getFundStats(): Promise<FundStatsResponse> {
    const [totalRaised, membersCount, purchasedCount] = await Promise.all([
      this.transactionHistoryService.sum('amount', { where: { currency: CurrencyList.TON } }),
      this.userService.count(),
      this.transactionHistoryService.count({ where: { currency: { [Op.eq]: CurrencyList.TON } } }),
    ]);

    const progress = this.GOAL > 0 ? Math.round((totalRaised / this.GOAL) * 10000) / 100 : 0;

    return {
      totalRaised: Math.round(totalRaised * 100) / 100,
      goal: this.GOAL,
      progress,
      membersCount,
      purchasedCount,
      wallet: {
        tonToPointsRate: this.TON_TO_POINTS_RATE,
      },
    };
  }
}
