'use client';

import React, { useEffect, useState } from 'react';
import { Container, Text, Loader, Center, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { api } from '@/lib/api';
import { Job, JobFilter } from '@/lib/types';
import FilterBar from '../components/jobs/FilterBar';
import JobList from '../components/jobs/JobList';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<JobFilter>({
    title: '',
    location: '',
    jobType: undefined,
    salaryMin: 0,
    salaryMax: 500000,
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const data = await api.getJobs(filters);
        setJobs(data);
      } catch {
        notifications.show({
          title: 'Error',
          message: 'Failed to fetch jobs. Please try again.',
          color: 'red',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters]);

  const handleFilterChange = (newFilters: JobFilter) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <Container
      px="lg"
      style={{
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        maxWidth: '100%',
        marginTop: rem(100),
        gap: rem(20),
      }}
    >
    <Container
  fluid
  px="lg"
  style={{
    width: '100%',
    marginTop: rem(-80),
    position: "fixed",
    zIndex:60,
    paddingTop: "20px",
    paddingBottom: "20px",
     boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    backgroundColor: "white"
  }}
>
  <FilterBar onFilterChange={handleFilterChange} />
</Container>


      {loading ? (
        <Center h={200}>
          <Loader size="lg" />
        </Center>
      ) : jobs.length > 0 ? (
        <JobList
          jobs={jobs}
          onUpdate={async () => {
            const updatedJobs = await api.getJobs(filters);
            setJobs(updatedJobs);
          }}
        />
      ) : (
        <Center h={200}>
          <Text c="dimmed" fz="lg">
            No jobs found. Try adjusting your filters.
          </Text>
        </Center>
      )}
    </Container>
  );
}
