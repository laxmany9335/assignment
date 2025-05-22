// app/components/jobs/SalaryRangeSlider.tsx

'use client';

import { RangeSlider, Group, Text, Box } from '@mantine/core';

interface SalaryRangeSliderProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export default function SalaryRangeSlider({ value, onChange }: SalaryRangeSliderProps) {
  const formatSalary = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <Box>
      <RangeSlider
        value={value}
        onChange={onChange}
        min={0}
        max={500000}
        step={5000}
        minRange={10000}
        label={formatSalary}
        styles={{ 
          label: { 
            backgroundColor: 'var(--mantine-color-blue-6)',
            color: 'white',
          } 
        }}
        mb={20}
      />
      <Group justify="space-between">
        <Text fz="sm" c="dimmed">{formatSalary(value[0])}</Text>
        <Text fz="sm" c="dimmed">{formatSalary(value[1])}</Text>
      </Group>
    </Box>
  );
}