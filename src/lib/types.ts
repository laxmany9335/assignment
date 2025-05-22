export interface Job {
  id: number;
  title: string;
  companyName: string;
  companyLogo?: string;
  postedTime?: string;
  location: string;
  jobType: JobType;
  salaryMin: number;
  salaryMax: number;
  description: string;
  requirements: string;
  responsibilities: string;
 applicationDeadline: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum JobType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRACT = 'Contract',
  INTERNSHIP = 'Internship',
}

export interface JobFilter {
  title?: string;
  location?: string;
  jobType?: JobType;
  salaryMin?: number;
  salaryMax?: number;
  applicationDeadlineBefore?: Date;
  applicationDeadlineAfter?: Date;
}

export interface CreateJobDto {
  title: string;
  companyName: string;
  companyLogo?: string;
  postedTime?: string;
  location: string;
  jobType: JobType;
  salaryMin: number;
  salaryMax: number;
  description: string;
  requirements: string;
  responsibilities: string;
  applicationDeadline: Date;
}
