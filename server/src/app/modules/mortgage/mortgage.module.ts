import { Module, Provider } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { MortgageController } from './mortgage.controller';
import { MortgageService, REDIS_CLIENT } from './mortgage.service';
import { PaymentScheduleProcessor, PAYMENT_SCHEDULE_QUEUE } from './workers/payment-schedule.processor';

const RedisProvider: Provider = {
  provide: REDIS_CLIENT,
  useFactory: (config: ConfigService): Redis =>
    new Redis({
      host: config.get<string>('REDIS_HOST', 'localhost'),
      port: config.get<number>('REDIS_PORT', 6379),
      retryStrategy: (times) => Math.min(times * 100, 3000),
    }),
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule,
    BullModule.registerQueue({ name: PAYMENT_SCHEDULE_QUEUE }),
  ],
  controllers: [MortgageController],
  providers: [MortgageService, PaymentScheduleProcessor, RedisProvider],
})
export class MortgageModule {}
