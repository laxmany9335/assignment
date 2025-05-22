'use client';

import { Container, Group, Button, Image, rem } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Find Jobs', href: '/jobs' },
    { label: 'Find Talents', href: '/talents' },
    { label: 'About us', href: '/about' },
    { label: 'Testimonials', href: '/testimonials' },
  ];

  return (
    <Container
      fluid
      h={50}
      px="lg"
      style={{
        backgroundColor: 'white',
        borderRadius: rem(50),
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '60%',
        marginTop: rem(20),
      }}
    >
      {/* Logo */}
      <Group>
        <svg width="40" height="46" viewBox="0 0 40 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24.33 5.41968L24.8852 23.3961L39.6353 13.9324L24.33 5.41968Z" fill="#333333" />
          <path d="M39.5308 32.7551V13.8619L18.395 27.4678V45.3387H19.1064" fill="#494949" />
          <path d="M1.18878 32.0419L14.7153 23.3629L15.2245 39.8485L1.18878 32.0419Z" fill="url(#paint0_linear_2_114)" />
          <path d="M1.18878 32.0419L14.7153 23.3629L15.2245 39.8485L1.18878 32.0419Z" fill="url(#paint1_linear_2_114)" />
          <path d="M1.18878 32.0419L14.7153 23.3629L15.2245 39.8485L1.18878 32.0419Z" stroke="url(#paint2_linear_2_114)" stroke-width="0.846154" />
          <path d="M1.18878 32.0419L14.7153 23.3629L15.2245 39.8485L1.18878 32.0419Z" stroke="url(#paint3_linear_2_114)" stroke-width="0.846154" />
          <path d="M0.469055 13.2451V32.1381L21.6051 18.5501V0.661621H20.8936" fill="url(#paint4_linear_2_114)" />
          <path d="M0.469055 13.2451V32.1381L21.6051 18.5501V0.661621H20.8936" fill="url(#paint5_linear_2_114)" />
          <defs>
            <linearGradient id="paint0_linear_2_114" x1="0.36496" y1="31.5921" x2="15.6704" y2="31.5921" gradientUnits="userSpaceOnUse">
              <stop stop-color="#00AAFF" />
              <stop offset="1" stop-color="#8636F8" />
            </linearGradient>
            <linearGradient id="paint1_linear_2_114" x1="8.01768" y1="40.5806" x2="8.01768" y2="22.6037" gradientUnits="userSpaceOnUse">
              <stop stop-color="white" stop-opacity="0.6" />
              <stop offset="0.1085" stop-color="white" stop-opacity="0.455" />
              <stop offset="0.4332" stop-color="white" stop-opacity="0.216" />
              <stop offset="0.6639" stop-color="white" stop-opacity="0.06" />
              <stop offset="0.775" stop-color="white" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="paint2_linear_2_114" x1="0.36496" y1="31.5921" x2="15.6704" y2="31.5921" gradientUnits="userSpaceOnUse">
              <stop stop-color="#00AAFF" />
              <stop offset="1" stop-color="#8636F8" />
            </linearGradient>
            <linearGradient id="paint3_linear_2_114" x1="8.01768" y1="40.5806" x2="8.01768" y2="22.6037" gradientUnits="userSpaceOnUse">
              <stop stop-color="white" stop-opacity="0.6" />
              <stop offset="0.1085" stop-color="white" stop-opacity="0.455" />
              <stop offset="0.4332" stop-color="white" stop-opacity="0.216" />
              <stop offset="0.6639" stop-color="white" stop-opacity="0.06" />
              <stop offset="0.775" stop-color="white" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="paint4_linear_2_114" x1="-0.407398" y1="20.0785" x2="22.8932" y2="18.3851" gradientUnits="userSpaceOnUse">
              <stop offset="0.0226" stop-color="#8636F8" />
              <stop offset="0.3484" stop-color="#F020B3" />
              <stop offset="0.6742" stop-color="#F8475E" />
              <stop offset="1" stop-color="#FF9421" />
            </linearGradient>
            <linearGradient id="paint5_linear_2_114" x1="11.0371" y1="32.1381" x2="11.0371" y2="0.661621" gradientUnits="userSpaceOnUse">
              <stop stop-color="white" stop-opacity="0.6" />
              <stop offset="0.0842" stop-color="white" stop-opacity="0.455" />
              <stop offset="0.367" stop-color="white" stop-opacity="0.216" />
              <stop offset="0.568" stop-color="white" stop-opacity="0.06" />
              <stop offset="0.6648" stop-color="white" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>

      </Group>

      {/* Navigation Links */}
      <Group gap="xl">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              textDecoration: 'none',
              fontWeight: 500,
              color: pathname === item.href ? '#4B0082' : '#303030',
              padding: '0.5rem',
              border: '2px solid transparent',
              borderRadius: 10,
              transition: 'border 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = '1px solid #dbd9d9';
              e.currentTarget.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = '1px solid transparent';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {item.label}
          </Link>

        ))}
      </Group>

      {/* Create Job Button */}
      <Button
        component={Link}
        href="/jobs/create"
        radius="xl"
        size="md"
        style={{
          background: 'linear-gradient(to right, #8E2DE2, #4A00E0)',
          padding: '10px 24px',
        }}
      >
        Create Jobs
      </Button>
    </Container>
  );
}
