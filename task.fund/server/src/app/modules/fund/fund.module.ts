<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { FundController } from './fund.controller';
import { FundService } from './fund.service';
import { TransactionHistoryModule } from '../transaction-history/transaction-history.module';
import { UsersModule } from '../user/users.module';

@Module({
  imports: [
    TransactionHistoryModule,
    UsersModule,
  ],
  controllers: [FundController],
  providers: [FundService],
  exports: [FundService],
})
=======
import { Module } from '@nestjs/common';
import { FundController } from './fund.controller';
import { FundService } from './fund.service';
import { TransactionHistoryModule } from '../transaction-history/transaction-history.module';
import { UsersModule } from '../user/users.module';

@Module({
  imports: [
    TransactionHistoryModule,
    UsersModule,
  ],
  controllers: [FundController],
  providers: [FundService],
  exports: [FundService],
})
>>>>>>> d86c7279da28f6721dc1e5a5d6a696b2d080f758
export class FundModule {} 