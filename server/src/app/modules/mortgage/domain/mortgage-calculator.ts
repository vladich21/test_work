<<<<<<< HEAD
export interface MortgageParams {
  propertyPrice: number;
  downPaymentAmount: number;
  matCapitalAmount: number | null;
  matCapitalIncluded: boolean;
  mortgageTermYears: number;
  interestRate: number;
}

export interface MortgageBaseResult {
  loanAmount: number;
  monthlyPayment: number;
  totalPayment: number;
  totalOverpaymentAmount: number;
  possibleTaxDeduction: number;
  savingsDueMotherCapital: number;
  recommendedIncome: number;
  totalMonths: number;
  monthlyRate: number;
}

export interface MortgagePayment {
  totalPayment: number;
  repaymentOfMortgageBody: number;
  repaymentOfMortgageInterest: number;
  mortgageBalance: number;
}

export type MonthlyMortgagePayments = Record<string, MortgagePayment>;
export type MortgagePaymentSchedule = Record<string, MonthlyMortgagePayments>;

export interface ScheduleParams {
  loanAmount: number;
  monthlyPayment: number;
  monthlyRate: number;
  totalMonths: number;
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function calcMonthlyPayment(loanAmount: number, monthlyRate: number, totalMonths: number): number {
  if (monthlyRate === 0) {
    return loanAmount / totalMonths;
  }
  const factor = Math.pow(1 + monthlyRate, totalMonths);
  return (loanAmount * monthlyRate * factor) / (factor - 1);
}

export function calculateMortgage(params: MortgageParams): MortgageBaseResult {
  const { propertyPrice, downPaymentAmount, matCapitalAmount, matCapitalIncluded, mortgageTermYears, interestRate } = params;

  const matCapital = matCapitalIncluded && matCapitalAmount != null && matCapitalAmount > 0 ? matCapitalAmount : 0;
  const loanAmount = propertyPrice - downPaymentAmount - matCapital;

  const totalMonths = mortgageTermYears * 12;
  const monthlyRate = interestRate / 12 / 100;
  const monthlyPayment = calcMonthlyPayment(loanAmount, monthlyRate, totalMonths);

  const totalPayment = monthlyPayment * totalMonths;
  const totalOverpaymentAmount = totalPayment - loanAmount;

  const purchaseDeduction = Math.min(propertyPrice, 2_000_000) * 0.13;
  const interestDeduction = Math.min(totalOverpaymentAmount, 3_000_000) * 0.13;
  const possibleTaxDeduction = purchaseDeduction + interestDeduction;

  const recommendedIncome = monthlyPayment / 0.4;

  let savingsDueMotherCapital = 0;
  if (matCapital > 0) {
    const loanWithout = propertyPrice - downPaymentAmount;
    const paymentWithout = calcMonthlyPayment(loanWithout, monthlyRate, totalMonths);
    savingsDueMotherCapital = paymentWithout * totalMonths - totalPayment;
  }

  return {
    loanAmount: round2(loanAmount),
    monthlyPayment: round2(monthlyPayment),
    totalPayment: round2(totalPayment),
    totalOverpaymentAmount: round2(totalOverpaymentAmount),
    possibleTaxDeduction: round2(possibleTaxDeduction),
    savingsDueMotherCapital: round2(savingsDueMotherCapital),
    recommendedIncome: round2(recommendedIncome),
    totalMonths,
    monthlyRate,
  };
}

export function calculatePaymentSchedule(params: ScheduleParams): MortgagePaymentSchedule {
  const { loanAmount, monthlyPayment, monthlyRate, totalMonths } = params;

  const schedule: MortgagePaymentSchedule = {};
  let balance = loanAmount;

  for (let month = 1; month <= totalMonths; month++) {
    const year = String(Math.ceil(month / 12));
    const monthInYear = String(((month - 1) % 12) + 1);

    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    const newBalance = Math.max(0, balance - principalPayment);

    if (!schedule[year]) schedule[year] = {};

    schedule[year][monthInYear] = {
      totalPayment: round2(monthlyPayment),
      repaymentOfMortgageBody: round2(principalPayment),
      repaymentOfMortgageInterest: round2(interestPayment),
      mortgageBalance: round2(newBalance),
    };

    balance = newBalance;
  }

  return schedule;
}
=======
export interface MortgageParams {
  propertyPrice: number;
  downPaymentAmount: number;
  matCapitalAmount: number | null;
  matCapitalIncluded: boolean;
  mortgageTermYears: number;
  interestRate: number;
}

export interface MortgageBaseResult {
  loanAmount: number;
  monthlyPayment: number;
  totalPayment: number;
  totalOverpaymentAmount: number;
  possibleTaxDeduction: number;
  savingsDueMotherCapital: number;
  recommendedIncome: number;
  totalMonths: number;
  monthlyRate: number;
}

export interface MortgagePayment {
  totalPayment: number;
  repaymentOfMortgageBody: number;
  repaymentOfMortgageInterest: number;
  mortgageBalance: number;
}

export type MonthlyMortgagePayments = Record<string, MortgagePayment>;
export type MortgagePaymentSchedule = Record<string, MonthlyMortgagePayments>;

export interface ScheduleParams {
  loanAmount: number;
  monthlyPayment: number;
  monthlyRate: number;
  totalMonths: number;
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function calcMonthlyPayment(loanAmount: number, monthlyRate: number, totalMonths: number): number {
  if (monthlyRate === 0) {
    return loanAmount / totalMonths;
  }
  const factor = Math.pow(1 + monthlyRate, totalMonths);
  return (loanAmount * monthlyRate * factor) / (factor - 1);
}

export function calculateMortgage(params: MortgageParams): MortgageBaseResult {
  const { propertyPrice, downPaymentAmount, matCapitalAmount, matCapitalIncluded, mortgageTermYears, interestRate } = params;

  const matCapital = matCapitalIncluded && matCapitalAmount != null && matCapitalAmount > 0 ? matCapitalAmount : 0;
  const loanAmount = propertyPrice - downPaymentAmount - matCapital;

  const totalMonths = mortgageTermYears * 12;
  const monthlyRate = interestRate / 12 / 100;
  const monthlyPayment = calcMonthlyPayment(loanAmount, monthlyRate, totalMonths);

  const totalPayment = monthlyPayment * totalMonths;
  const totalOverpaymentAmount = totalPayment - loanAmount;

  const purchaseDeduction = Math.min(propertyPrice, 2_000_000) * 0.13;
  const interestDeduction = Math.min(totalOverpaymentAmount, 3_000_000) * 0.13;
  const possibleTaxDeduction = purchaseDeduction + interestDeduction;

  const recommendedIncome = monthlyPayment / 0.4;

  let savingsDueMotherCapital = 0;
  if (matCapital > 0) {
    const loanWithout = propertyPrice - downPaymentAmount;
    const paymentWithout = calcMonthlyPayment(loanWithout, monthlyRate, totalMonths);
    savingsDueMotherCapital = paymentWithout * totalMonths - totalPayment;
  }

  return {
    loanAmount: round2(loanAmount),
    monthlyPayment: round2(monthlyPayment),
    totalPayment: round2(totalPayment),
    totalOverpaymentAmount: round2(totalOverpaymentAmount),
    possibleTaxDeduction: round2(possibleTaxDeduction),
    savingsDueMotherCapital: round2(savingsDueMotherCapital),
    recommendedIncome: round2(recommendedIncome),
    totalMonths,
    monthlyRate,
  };
}

export function calculatePaymentSchedule(params: ScheduleParams): MortgagePaymentSchedule {
  const { loanAmount, monthlyPayment, monthlyRate, totalMonths } = params;

  const schedule: MortgagePaymentSchedule = {};
  let balance = loanAmount;

  for (let month = 1; month <= totalMonths; month++) {
    const year = String(Math.ceil(month / 12));
    const monthInYear = String(((month - 1) % 12) + 1);

    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    const newBalance = Math.max(0, balance - principalPayment);

    if (!schedule[year]) schedule[year] = {};

    schedule[year][monthInYear] = {
      totalPayment: round2(monthlyPayment),
      repaymentOfMortgageBody: round2(principalPayment),
      repaymentOfMortgageInterest: round2(interestPayment),
      mortgageBalance: round2(newBalance),
    };

    balance = newBalance;
  }

  return schedule;
}
>>>>>>> d86c7279da28f6721dc1e5a5d6a696b2d080f758
