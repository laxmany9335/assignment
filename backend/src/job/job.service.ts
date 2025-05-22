// src/job/job.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Like, ILike } from 'typeorm';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { FilterJobDto } from './dto/filter-job.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const job = this.jobRepository.create(createJobDto);
    return this.jobRepository.save(job);
  }

  async findAll(filterJobDto: FilterJobDto): Promise<Job[]> {
    const { title, location, jobType, salaryMin, salaryMax } = filterJobDto;
    
    // Build query with filters
    const queryBuilder = this.jobRepository.createQueryBuilder('job');
    
    if (title) {
      queryBuilder.andWhere('job.title ILIKE :title', { title: `%${title}%` });
    }
    
    if (location) {
      queryBuilder.andWhere('job.location ILIKE :location', { location: `%${location}%` });
    }
    
    if (jobType) {
      queryBuilder.andWhere('job.jobType = :jobType', { jobType });
    }
    
    // Salary filtering
    if (salaryMin && salaryMax) {
      // Jobs where the salary range overlaps with the filter range
      queryBuilder.andWhere(
        '(job.salaryMin <= :salaryMax AND job.salaryMax >= :salaryMin)',
        { salaryMin, salaryMax }
      );
    } else if (salaryMin) {
      queryBuilder.andWhere('job.salaryMax >= :salaryMin', { salaryMin });
    } else if (salaryMax) {
      queryBuilder.andWhere('job.salaryMin <= :salaryMax', { salaryMax });
    }
    
    // Order by most recent
    queryBuilder.orderBy('job.createdAt', 'DESC');
    
    return queryBuilder.getMany();
  }

  async findOne(id: number): Promise<Job> {
    const job = await this.jobRepository.findOne({ where: { id } });
    
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    
    return job;
  }

  async update(id: number, updateJobDto: UpdateJobDto): Promise<Job> {
    const job = await this.findOne(id);
    
    // Update the job
    Object.assign(job, updateJobDto);
    return this.jobRepository.save(job);
  }

  async remove(id: number): Promise<void> {
    const job = await this.findOne(id);
    await this.jobRepository.remove(job);
  }
}