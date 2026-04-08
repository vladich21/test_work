import {
  Injectable,
  Inject,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { eq } from 'drizzle-orm';
import { createHash } from 'crypto';
import Redis from 'ioredis';

import { Database } from '../../../database/schema';
import { CreateMortgageProfileDto } from './dto/create-mortgage-profile.dto';
import { MortgageCalculationResponseDto } from './dto/mortgage-calculation-response.dto';
import { calculateMortgage } from './domain/mortgage-calculator';
import { mortgageProfiles } from './schemas/mortgage-profiles';
import { mortgageCalculations } from './schemas/mortgage-calculations';
import {
  PAYMENT_SCHEDULE_QUEUE,
  PAYMENT_SCHEDULE_JOB,
  PaymentScheduleJobData,
} from './workers/payment-schedule.processor';

export const REDIS_CLIENT = Symbol('REDIS_CLIENT');

const CACHE_TTL_SECONDS = 3600;

@Injectable()
export class MortgageService {
  private readonly logger = new Logger(MortgageService.name);

  constructor(
    @Inject('DATABASE') private readonly db: Database,
    @InjectQueue(PAYMENT_SCHEDULE_QUEUE) private readonly scheduleQueue: Queue,
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
  ) {}

  async create(
    userId: string,
    dto: CreateMortgageProfileDto,
  ): Promise<{ id: string }> {
    const cacheKey = this.buildCacheKey(userId, dto);

    const cachedId = await this.redis.get(cacheKey);
    if (cachedId) {
      this.logger.log(`Cache HIT: ${cacheKey.slice(0, 16)}…`);
      return { id: cachedId };
    }

    const calc = calculateMortgage(dto);

    let profileId!: number;
    let calculationId!: number;

    await this.db.transaction(async (tx) => {
      const [profileResult] = await tx.insert(mortgageProfiles).values({
        userId,
        propertyPrice: String(dto.propertyPrice),
        propertyType: dto.propertyType,
        downPaymentAmount: String(dto.downPaymentAmount),
        matCapitalAmount: dto.matCapitalAmount != null ? String(dto.matCapitalAmount) : null,
        matCapitalIncluded: dto.matCapitalIncluded,
        mortgageTermYears: dto.mortgageTermYears,
        interestRate: String(dto.interestRate),
      });
      profileId = (profileResult as any).insertId as number;

      const [calcResult] = await tx.insert(mortgageCalculations).values({
        userId,
        mortgageProfileId: profileId,
        monthlyPayment: String(calc.monthlyPayment),
        totalPayment: String(calc.totalPayment),
        totalOverpaymentAmount: String(calc.totalOverpaymentAmount),
        possibleTaxDeduction: String(calc.possibleTaxDeduction),
        savingsDueMotherCapital: String(calc.savingsDueMotherCapital),
        recommendedIncome: String(calc.recommendedIncome),
        paymentSchedule: null,
      });
      calculationId = (calcResult as any).insertId as number;
    });

    const jobData: PaymentScheduleJobData = {
      mortgageCalculationId: calculationId,
      scheduleParams: {
        loanAmount: calc.loanAmount,
        monthlyPayment: calc.monthlyPayment,
        monthlyRate: calc.monthlyRate,
        totalMonths: calc.totalMonths,
      },
    };

    await this.scheduleQueue.add(PAYMENT_SCHEDULE_JOB, jobData, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 2000 },
      removeOnComplete: true,
    });

    await this.redis.setex(cacheKey, CACHE_TTL_SECONDS, String(profileId));

    this.logger.log(`Created profile #${profileId}, schedule queued (calc #${calculationId})`);

    return { id: String(profileId) };
  }

  async findByProfileId(profileId: number): Promise<MortgageCalculationResponseDto> {
    const [row] = await this.db
      .select()
      .from(mortgageCalculations)
      .where(eq(mortgageCalculations.mortgageProfileId, profileId))
      .limit(1);

    if (!row) {
      throw new NotFoundException(`No calculation found for profile id: ${profileId}`);
    }

    return {
      monthlyPayment: row.monthlyPayment,
      totalPayment: row.totalPayment,
      totalOverpaymentAmount: row.totalOverpaymentAmount,
      possibleTaxDeduction: row.possibleTaxDeduction,
      savingsDueMotherCapital: row.savingsDueMotherCapital,
      recommendedIncome: row.recommendedIncome,
      mortgagePaymentSchedule: row.paymentSchedule ? JSON.parse(row.paymentSchedule) : null,
    };
  }

  private buildCacheKey(userId: string, dto: CreateMortgageProfileDto): string {
    const payload = JSON.stringify({
      userId,
      propertyPrice: dto.propertyPrice,
      propertyType: dto.propertyType,
      downPaymentAmount: dto.downPaymentAmount,
      matCapitalAmount: dto.matCapitalAmount,
      matCapitalIncluded: dto.matCapitalIncluded,
      mortgageTermYears: dto.mortgageTermYears,
      interestRate: dto.interestRate,
    });
    return `mortgage:cache:${createHash('sha256').update(payload).digest('hex')}`;
  }
}
