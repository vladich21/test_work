import { MortgagePaymentSchedule } from '../domain/mortgage-calculator';

export class MortgageCalculationResponseDto {
  monthlyPayment: string;
  totalPayment: string;
  totalOverpaymentAmount: string;
  possibleTaxDeduction: string;
  savingsDueMotherCapital: string;
  recommendedIncome: string;
  mortgagePaymentSchedule: MortgagePaymentSchedule | null;
}
