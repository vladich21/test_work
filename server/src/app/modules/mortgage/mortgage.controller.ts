import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  Headers,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MortgageService } from './mortgage.service';
import { CreateMortgageProfileDto } from './dto/create-mortgage-profile.dto';
import { MortgageCalculationResponseDto } from './dto/mortgage-calculation-response.dto';

const DEFAULT_USER_ID = '00000000-0000-4000-8000-000000000001';

@Controller('mortgage-profiles')
export class MortgageController {
  constructor(private readonly mortgageService: MortgageService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() dto: CreateMortgageProfileDto,
    @Headers('x-user-id') userId?: string,
  ): Promise<{ id: string }> {
    return this.mortgageService.create(userId?.trim() || DEFAULT_USER_ID, dto);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MortgageCalculationResponseDto> {
    return this.mortgageService.findByProfileId(id);
  }
}
