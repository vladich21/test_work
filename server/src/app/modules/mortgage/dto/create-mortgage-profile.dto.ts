import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PropertyTypeValues } from '../schemas/mortgage-profiles';

// Re-export for convenience
export type PropertyType = (typeof PropertyTypeValues)[number];

export class CreateMortgageProfileDto {
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  propertyPrice: number;

  @IsEnum(PropertyTypeValues)
  propertyType: PropertyType;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  downPaymentAmount: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  matCapitalAmount: number | null;

  @IsBoolean()
  matCapitalIncluded: boolean;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  mortgageTermYears: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  interestRate: number;
}
