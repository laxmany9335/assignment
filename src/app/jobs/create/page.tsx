// app/jobs/create/page.tsx

'use client';

import { Container, Breadcrumbs, Anchor, Title, Space } from '@mantine/core';
import Link from 'next/link';
import CreateJobForm from '@/app/components/jobs/CreateJobForm';

export default function CreateJobPage() {
  const items = [
    { title: 'Jobs', href: '/jobs' },
    { title: 'Create New Job', href: '/jobs/create' },
  ].map((item, index) => (
    <Anchor component={Link} href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <Container size="xl" py="xl">
      <Breadcrumbs mb="lg">{items}</Breadcrumbs>
      <CreateJobForm />
    </Container>
  );
}