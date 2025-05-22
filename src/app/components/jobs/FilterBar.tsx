'use client';

import { useState, useEffect } from 'react';
import {
  TextInput,
  Select,
  Group,
  Container,
  RangeSlider,
  Text,
  rem
} from '@mantine/core';
import { IconSearch, IconMapPin, IconBriefcase } from '@tabler/icons-react';
import { JobFilter, JobType } from '@/lib/types';

interface FilterBarProps {
  onFilterChange: (filters: JobFilter) => void;
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState<string | null>(null);
  const [jobType, setJobType] = useState<string | null>(null);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([50, 80]);

  useEffect(() => {
    onFilterChange({
      title: searchTerm,
      location: location || '',
      jobType: (jobType as JobType) || undefined,
      salaryMin: salaryRange[0] * 1000,
      salaryMax: salaryRange[1] * 1000,
    });
  }, [searchTerm, location, jobType, salaryRange]);

  return (
    <Container
      size="xl"
     
    >
      <Group align="flex-end" grow>
        <TextInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
          leftSection={<IconSearch size={18} />}
          placeholder="Search by job title or role"
          radius="md"
          styles={{ input: { border: 'none' } }}
        />

        <Select
          value={location}
          onChange={setLocation}
          leftSection={<IconMapPin size={18} />}
          placeholder="Preferred Location"
          data={['Tamil Nadu', 'Noida', 'Goa', 'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad']}
          radius="md"
          clearable
          searchable
          styles={{ input: { border: 'none' } }}
        />

        <Select
          value={jobType}
          onChange={setJobType}
          leftSection={<IconBriefcase size={18} />}
          placeholder="Job Type"
          data={['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship']}
          radius="md"
          clearable
          searchable
          styles={{ input: { border: 'none' } }}
        />

        <div>
          <Group mb={8} justify="space-between">
            <Text size="sm" fw={500}>Salary Per Month</Text>
            <Group gap={4}>
              <Text size="sm" fw={500}>₹{salaryRange[0]}k</Text>
              <Text size="sm" fw={500}>-</Text>
              <Text size="sm" fw={500}>₹{salaryRange[1]}k</Text>
            </Group>
          </Group>

          <RangeSlider
            min={0}
            max={200}
            step={5}
            value={salaryRange}
            onChange={setSalaryRange}
            label={null}
          />
        </div>
      </Group>
    </Container>
  );
}
