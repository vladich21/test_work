<<<<<<< HEAD
import { Controller, Get, Query, Logger } from '@nestjs/common';
import { TransactionHistoryService } from './transaction-history.service';
import { TransactionHistory } from './entities/transaction-history.entity';

@Controller('transaction-history')
export class TransactionHistoryController {
  private readonly logger = new Logger(TransactionHistoryController.name);

  constructor(private readonly service: TransactionHistoryService) {}

  @Get()
  async findAll(@Query('limit') limit?: string): Promise<TransactionHistory[]> {
    const limitNumber = limit ? parseInt(limit, 10) : undefined;
    const result = await this.service.findAll(limitNumber);
    this.logger.log(`GET /transaction-history → ${result.length} records`);
    return result;
  }
}
=======
import { Controller, Get, Query, Logger } from '@nestjs/common';
import { TransactionHistoryService } from './transaction-history.service';
import { TransactionHistory } from './entities/transaction-history.entity';

@Controller('transaction-history')
export class TransactionHistoryController {
  private readonly logger = new Logger(TransactionHistoryController.name);

  constructor(private readonly service: TransactionHistoryService) {}

  @Get()
  async findAll(@Query('limit') limit?: string): Promise<TransactionHistory[]> {
    const limitNumber = limit ? parseInt(limit, 10) : undefined;
    const result = await this.service.findAll(limitNumber);
    this.logger.log(`GET /transaction-history → ${result.length} records`);
    return result;
  }
}
>>>>>>> d86c7279da28f6721dc1e5a5d6a696b2d080f758
