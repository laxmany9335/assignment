// app/components/jobs/JobList.tsx

'use client';

import { Stack } from '@mantine/core';
import { Job as BaseJob } from '@/lib/types';
import JobCard from './JobCard';

interface Job extends BaseJob {
  companyLogo?: string;
}

interface JobWithLogo extends Job{
  companyLogo?: string;
}

interface JobListProps {
  jobs: Job[];
  onUpdate: () => void;
}

export default function JobList({ jobs, onUpdate }: JobListProps) {
  return (
  <Stack gap="md" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: "center", marginTop: 70}}>
    {jobs.map((job) => (
      <JobCard key={job.id} job={{...job, companyLogo: job.companyLogo || ''}} onUpdate={onUpdate} />
    ))}
   </Stack>

  );
}