import { Controller, Get, Logger } from '@nestjs/common';
import { FundService } from './fund.service';

export interface FundStatsResponse {
  totalRaised: number;
  goal: number;
  progress: number;
  membersCount: number;
  purchasedCount: number;
  wallet: {
    tonToPointsRate: number;
  };
}

@Controller('fund')
export class FundController {
  private readonly logger = new Logger(FundController.name);

  constructor(private readonly fundService: FundService) {}

  @Get('stats')
  async getStats(): Promise<FundStatsResponse> {
    const stats = await this.fundService.getFundStats();
    this.logger.log(
      `GET /fund/stats → raised: ${stats.totalRaised} TON, members: ${stats.membersCount}, progress: ${stats.progress}%`,
    );
    return stats;
  }
}
