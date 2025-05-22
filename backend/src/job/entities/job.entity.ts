// src/job/entities/job.entity.ts

import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';

export enum JobType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRACT = 'Contract',
  INTERNSHIP = 'Internship',
}

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ name: 'company_name' })
  companyName: string;

  @Column()
  location: string;

  @Column({
    type: 'enum',
    enum: JobType,
    default: JobType.FULL_TIME,
  })
  jobType: JobType;

  @Column({ name: 'salary_min', type: 'integer' })
  salaryMin: number;

  @Column({ name: 'salary_max', type: 'integer' })
  salaryMax: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  requirements: string;

  @Column({ type: 'text' })
  responsibilities: string;

  @Column({ name: 'application_deadline', type: 'timestamp' })
  applicationDeadline: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}