// src/job/dto/filter-job.dto.ts

import { IsString, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { JobType } from '../entities/job.entity';
import { Transform } from 'class-transformer';

export class FilterJobDto {
  @ApiPropertyOptional({ example: 'engineer' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'New York' })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({ enum: JobType })
  @IsEnum(JobType)
  @IsOptional()
  jobType?: JobType;

  @ApiPropertyOptional({ example: 50000 })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  salaryMin?: number;

  @ApiPropertyOptional({ example: 150000 })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  salaryMax?: number;
}