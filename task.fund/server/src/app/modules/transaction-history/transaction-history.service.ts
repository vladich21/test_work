import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionHistory } from './entities/transaction-history.entity';
import { CreateTransactionHistoryDto } from './dto/create-transaction-history.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TransactionHistoryService {
  constructor(
    @InjectModel(TransactionHistory)
    private readonly repository: typeof TransactionHistory,
  ) {}

  async create(userId: string, dto: CreateTransactionHistoryDto): Promise<TransactionHistory> {
    return this.repository.create({ ...dto, userId });
  }

  async findAll(limit?: number): Promise<TransactionHistory[]> {
    return this.repository.findAll({
      include: [User],
      order: [['createdAt', 'DESC']],
      ...(limit && limit > 0 ? { limit: Math.min(limit, 1000) } : {}),
    });
  }

  async sum(field: keyof TransactionHistory, options: any): Promise<number> {
    const result = await this.repository.sum(field, options);
    return result || 0;
  }

  async count(options?: any): Promise<number> {
    return this.repository.count(options);
  }
}
