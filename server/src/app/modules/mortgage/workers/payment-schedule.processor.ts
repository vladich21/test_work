import { Processor, Process } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { eq } from 'drizzle-orm';
import { calculatePaymentSchedule, ScheduleParams } from '../domain/mortgage-calculator';
import { mortgageCalculations } from '../schemas/mortgage-calculations';
import { Database } from '../../../../database/schema';

export const PAYMENT_SCHEDULE_QUEUE = 'payment-schedule';
export const PAYMENT_SCHEDULE_JOB = 'calculate';

export interface PaymentScheduleJobData {
  mortgageCalculationId: number;
  scheduleParams: ScheduleParams;
}

@Processor(PAYMENT_SCHEDULE_QUEUE)
export class PaymentScheduleProcessor {
  private readonly logger = new Logger(PaymentScheduleProcessor.name);

  constructor(@Inject('DATABASE') private readonly db: Database) {}

  @Process(PAYMENT_SCHEDULE_JOB)
  async handleCalculation(job: Job<PaymentScheduleJobData>): Promise<void> {
    const { mortgageCalculationId, scheduleParams } = job.data;

    this.logger.log(`Processing schedule for calculation #${mortgageCalculationId}`);

    try {
      const schedule = calculatePaymentSchedule(scheduleParams);

      await this.db
        .update(mortgageCalculations)
        .set({ paymentSchedule: JSON.stringify(schedule), updatedAt: new Date() })
        .where(eq(mortgageCalculations.id, mortgageCalculationId));

      this.logger.log(`Schedule saved for calculation #${mortgageCalculationId}`);
    } catch (error) {
      this.logger.error(`Failed to process schedule #${mortgageCalculationId}: ${error.message}`);
      throw error;
    }
  }
}
