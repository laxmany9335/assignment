'use client';

import { useState } from 'react';
import {
  Card,
  Text,
  Badge,
  Group,
  Button,
  Modal,
  LoadingOverlay,
  Image,
  Stack,
  Divider
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Job, JobType } from '@/lib/types';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface JobCardProps {
  job: Omit<Job, 'companyLogo'> & { companyLogo: string, postedTime?: string, bulletPoints?: string[] };
  onUpdate: () => void;
}

export default function JobCard({ job, onUpdate }: JobCardProps) {
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await api.deleteJob(job.id);
      notifications.show({
        title: 'Success',
        message: 'Job deleted successfully',
        color: 'green',
      });
      onUpdate();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to delete job',
        color: 'red',
      });
    } finally {
      setLoading(false);
      setDeleteModalOpen(false);
    }
  };

  const formatSalary = (min: number, max: number) => {
    return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <Card
        shadow="md"
        radius="lg"
        padding="lg"
        withBorder
        style={{
          position: 'relative',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          transform: 'translateY(0)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLElement).style.boxShadow = '';
        }}
      >
        <LoadingOverlay visible={loading} />

        <Group justify="space-between" mb="sm">
          <Image
            src={job.companyLogo || './next.svg'}
            alt="Company Logo"
            width={40}
            height={40}
            radius="sm"
            fallbackSrc="https://placehold.co/40"
          />
          <Text size="xs" c="blue" fw={500}>
            {job.postedTime || '24h Ago'}
          </Text>
        </Group>

        <Text fw={700} size="lg" mb={4}>
          {job.title}
        </Text>

             <Group gap="xs" mb="sm" wrap="wrap">
          <Badge color="gray" variant="light">{'1-3 yr Exp'}</Badge>
          <Badge color="gray" variant="light">{ 'Onsite'}</Badge>
          <Badge color="gray" variant="light">{ '12LPA'}</Badge>
        </Group>

        <Text size="sm" c="dimmed" mb="xs">
          {job.companyName} • {job.location}
        </Text>

        <Group gap="xs" mb="sm" wrap="wrap">
          <Badge color="blue" variant="light">
            {job.jobType}
          </Badge>
          <Badge color="teal" variant="light">
            {formatSalary(job.salaryMin, job.salaryMax)}
          </Badge>
        </Group>

        <Text size="xs" c="dimmed" mb="sm">
          Deadline: {formatDate(job.applicationDeadline)}
        </Text>

        <Stack gap={4} mb="sm">
          {(job.bulletPoints || []).map((point: string, idx: number) => (
            <Text key={idx} size="sm" c="gray.7">
              • {point}
            </Text>
          ))}
        </Stack>

        <Divider my="sm" />

        <Button
          fullWidth
          radius="md"
          color="blue"
          size="sm"
          onClick={() => router.push(`/jobs/${job.id}`)}
          style={{ transition: 'background 0.2s ease' }}
        >
          Apply Now
        </Button>
      </Card>

      <Modal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Job"
        centered
      >
        <Text mb="xl">
          Are you sure you want to delete this job posting? This action cannot be undone.
        </Text>

        <Group justify="flex-end">
          <Button variant="outline" onClick={() => setDeleteModalOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete} loading={loading}>
            Delete
          </Button>
        </Group>
      </Modal>
    </>
  );
}
