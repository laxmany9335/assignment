// src/job/dto/create-job.dto.ts

import { IsString, IsEnum, IsNumber, IsDateString, IsNotEmpty, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { JobType } from '../entities/job.entity';

export class CreateJobDto {
  @ApiProperty({ example: 'Software Engineer' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Acme Inc.' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ example: 'New York, NY' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ enum: JobType, example: JobType.FULL_TIME })
  @IsEnum(JobType)
  jobType: JobType;

  @ApiProperty({ example: 80000 })
  @IsNumber()
  @Min(0)
  salaryMin: number;

  @ApiProperty({ example: 120000 })
  @IsNumber()
  @Min(0)
  salaryMax: number;

  @ApiProperty({ example: 'We are looking for an experienced software engineer...' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '5+ years of experience with React...' })
  @IsString()
  @IsNotEmpty()
  requirements: string;

  @ApiProperty({ example: 'Develop and maintain web applications...' })
  @IsString()
  @IsNotEmpty()
  responsibilities: string;

  @ApiProperty({ example: '2025-06-30T00:00:00.000Z' })
  @IsDateString()
  applicationDeadline: Date;
}