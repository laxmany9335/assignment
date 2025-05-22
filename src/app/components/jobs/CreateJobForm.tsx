'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import {
  Modal,
  TextInput,
  Textarea,
  Select,
  Button,
  Group,
  Grid,
  Stack,
  NumberInput,
  rem,
  ActionIcon,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { IconChevronDown, IconChevronRight, IconCalendar } from '@tabler/icons-react';
import { CreateJobDto, JobType } from '@/lib/types';
import { api } from '@/lib/api';

const jobSchema = z
  .object({
    title: z.string().min(3),
    companyName: z.string().min(2),
    location: z.string().min(2),
    jobType: z.enum([
      JobType.FULL_TIME,
      JobType.PART_TIME,
      JobType.CONTRACT,
      JobType.INTERNSHIP,
    ]),
    salaryMin: z.number().min(0),
    salaryMax: z.number().min(0),
    description: z.string().min(10),
    requirements: z.string().min(1, 'Requirements is required'),
    responsibilities: z.string().min(1, 'Responsibilities is required'),
    applicationDeadline: z.date().refine((d) => d > new Date(), {
      message: 'Deadline must be in the future',
    }),
  })
  .refine((data) => data.salaryMax > data.salaryMin, {
    message: 'Max salary must be greater than min salary',
    path: ['salaryMax'],
  });

type JobFormData = z.infer<typeof jobSchema>;

export default function CreateJobForm() {
  const router = useRouter();
  const [opened, setOpened] = useState(true);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: '',
      companyName: '',
      location: '',
      jobType: JobType.FULL_TIME,
      salaryMin: 0,
      salaryMax: 1200000,
      description: '',
      requirements: '',
      responsibilities: '',
      applicationDeadline: new Date(Date.now() + 86400000 * 30), // 30 days from now
    },
  });

  const onSubmit = async (data: JobFormData) => {
    try {
      setLoading(true);

      // Convert Date to ISO string for backend
      const formattedData: CreateJobDto = {
        ...data,
        applicationDeadline: data.applicationDeadline.toISOString(),
      };

      await api.createJob(formattedData);

      notifications.show({
        title: 'Success',
        message: 'Job created!',
        color: 'green',
      });

      setOpened(false);
      router.push('/jobs');
    } catch (e: any) {
      notifications.show({
        title: 'Error',
        message: e.response?.data?.message || e.message || 'Something went wrong.',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={() => router.push('/jobs')}
      title="Create Job Opening"
      centered
      size="lg"
      radius="md"
      styles={{
        title: {
          fontWeight: 600,
          fontSize: rem(22),
          textAlign: 'center',
          width: '100%',
          marginBottom: rem(20),
        },
        header: {
          justifyContent: 'center',
          paddingTop: rem(20),
        },
        body: { paddingTop: 0 },
        close: { top: rem(16), right: rem(16) },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="md">
          <Grid gutter="md">
            <Grid.Col span={6}>
              <TextInput
                label="Job Title"
                placeholder="Full Stack Developer"
                radius="md"
                {...register('title')}
                error={errors.title?.message}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Company Name"
                placeholder="Amazon"
                radius="md"
                {...register('companyName')}
                error={errors.companyName?.message}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Location"
                placeholder="Chennai"
                radius="md"
                rightSection={
                  <IconChevronDown size={16} style={{ pointerEvents: 'none', color: '#aaa' }} />
                }
                {...register('location')}
                error={errors.location?.message}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Controller
                name="jobType"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Job Type"
                    placeholder="Select job type"
                    radius="md"
                    data={Object.values(JobType).map((jt) => ({
                      value: jt,
                      label: jt,
                    }))}
                    error={errors.jobType?.message}
                    {...field}
                  />
                )}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <div className="salary-range-label">Salary Range</div>
              <Grid gutter="md">
                <Grid.Col span={6}>
                  <Controller
                    name="salaryMin"
                    control={control}
                    render={({ field }) => (
                      <NumberInput
                        hideControls
                        placeholder="₹0"
                        radius="md"
                        error={errors.salaryMin?.message}
                        leftSection="₹"
                        leftSectionWidth={28}
                        value={field.value}
                        onChange={(v) => field.onChange(typeof v === 'number' ? v : 0)}
                      />
                    )}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Controller
                    name="salaryMax"
                    control={control}
                    render={({ field }) => (
                      <NumberInput
                        hideControls
                        placeholder="₹12,00,000"
                        radius="md"
                        error={errors.salaryMax?.message}
                        leftSection="₹"
                        leftSectionWidth={28}
                        value={field.value}
                        onChange={(v) => field.onChange(typeof v === 'number' ? v : 0)}
                      />
                    )}
                  />
                </Grid.Col>
              </Grid>
            </Grid.Col>

            <Grid.Col span={6}>
              <Controller
                name="applicationDeadline"
                control={control}
                render={({ field }) => (
                  <DatePickerInput
                    label="Application Deadline"
                    radius="md"
                    minDate={new Date()}
                    placeholder="Pick a date"
                    error={errors.applicationDeadline?.message}
                    value={field.value instanceof Date ? field.value : new Date(field.value)}
                    onChange={field.onChange}
                    rightSection={
                      <ActionIcon variant="transparent" color="gray">
                        <IconCalendar size={18} color="#aaa" />
                      </ActionIcon>
                    }
                    clearable={false}
                    popoverProps={{
                      withinPortal: true,
                      shadow: 'md',
                      radius: 'md',
                    }}
                  />
                )}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <Textarea
                label="Job Description"
                placeholder="Share a description about the job role"
                minRows={4}
                radius="md"
                {...register('description')}
                error={errors.description?.message}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <Textarea
                label="Requirements"
                placeholder="List the requirements for this job"
                minRows={3}
                radius="md"
                {...register('requirements')}
                error={errors.requirements?.message}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <Textarea
                label="Responsibilities"
                placeholder="List the responsibilities for this job"
                minRows={3}
                radius="md"
                {...register('responsibilities')}
                error={errors.responsibilities?.message}
              />
            </Grid.Col>
          </Grid>

          <Group justify="space-between" mt="xl">
            <Button
              variant="outline"
              color="dark"
              radius="md"
              rightSection={<IconChevronDown size={16} />}
              styles={{ root: { borderColor: '#e0e0e0' } }}
            >
              Save Draft
            </Button>
            <Button
              type="submit"
              loading={loading}
              radius="md"
              color="blue"
              rightSection={<IconChevronRight size={16} />}
              styles={{ root: { backgroundColor: '#0095ff' } }}
            >
              Publish
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
