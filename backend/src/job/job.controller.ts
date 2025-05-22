// src/job/job.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { FilterJobDto } from './dto/filter-job.dto';
import { Job } from './entities/job.entity';

@ApiTags('jobs')
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new job posting' })
  @ApiResponse({ status: 201, description: 'The job has been successfully created', type: Job })
  create(@Body() createJobDto: CreateJobDto): Promise<Job> {
    return this.jobService.create(createJobDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all job postings with optional filters' })
  @ApiResponse({ status: 200, description: 'Return all jobs', type: [Job] })
  findAll(@Query() filterJobDto: FilterJobDto): Promise<Job[]> {
    return this.jobService.findAll(filterJobDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific job posting by ID' })
  @ApiResponse({ status: 200, description: 'Return the job', type: Job })
  @ApiResponse({ status: 404, description: 'Job not found' })
  findOne(@Param('id') id: string): Promise<Job> {
    return this.jobService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a job posting' })
  @ApiResponse({ status: 200, description: 'The job has been successfully updated', type: Job })
  @ApiResponse({ status: 404, description: 'Job not found' })
  update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
  ): Promise<Job> {
    return this.jobService.update(+id, updateJobDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a job posting' })
  @ApiResponse({ status: 204, description: 'The job has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.jobService.remove(+id);
  }
}