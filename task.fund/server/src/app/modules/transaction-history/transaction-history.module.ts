<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionHistoryService } from './transaction-history.service';
import { TransactionHistoryController } from './transaction-history.controller';
import { TransactionHistory } from './entities/transaction-history.entity';

@Module({
  imports: [SequelizeModule.forFeature([TransactionHistory])],
  controllers: [TransactionHistoryController],
  providers: [TransactionHistoryService],
  exports: [TransactionHistoryService],
})
=======
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionHistoryService } from './transaction-history.service';
import { TransactionHistoryController } from './transaction-history.controller';
import { TransactionHistory } from './entities/transaction-history.entity';

@Module({
  imports: [SequelizeModule.forFeature([TransactionHistory])],
  controllers: [TransactionHistoryController],
  providers: [TransactionHistoryService],
  exports: [TransactionHistoryService],
})
>>>>>>> d86c7279da28f6721dc1e5a5d6a696b2d080f758
export class TransactionHistoryModule {} 