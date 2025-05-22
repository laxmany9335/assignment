// app/page.tsx

'use client';

import { Container, Title, Text, Button, Group, Stack, Card, rem } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  
  return (
    <Container size="md"   style={{marginTop: rem(140)}} >
      <Card shadow="sm" p="xl" radius="md" withBorder>
        <Stack align="center" gap="lg">
          <Title order={1}>Job Management Admin</Title>
          
          <Text size="lg" c="dimmed">
            A powerful admin interface for creating and managing job postings
          </Text>
          
          <Group mt="md">
            <Button 
              size="lg" 
              onClick={() => router.push('/jobs')}
            >
              View Jobs
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => router.push('/jobs/create')}
            >
              Create New Job
            </Button>
          </Group>
        </Stack>
      </Card>
    </Container>
  );
}