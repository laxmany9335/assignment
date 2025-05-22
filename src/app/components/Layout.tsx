// src/components/Layout.tsx

'use client';

import { ReactNode } from 'react';
import {
  AppShell,
  MantineProvider,
  createTheme,
  ColorSchemeScript
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import NavBar from './NavBar';
import FilterBar from './jobs/FilterBar';

interface LayoutProps {
  children: ReactNode;
}

// Create a custom Mantine theme (optional customization)
const theme = createTheme({
  primaryColor: 'blue',
  defaultRadius: 'md',
});

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* Optional: if using <ColorSchemeScript /> directly in layout.tsx, remove from here */}
      <ColorSchemeScript />
      <MantineProvider theme={theme} defaultColorScheme="light">
        <Notifications position="top-right" />
        <AppShell
          header={{ height: 50 }}
          navbar={{
            width: 0,
            breakpoint: 'sm',
            collapsed: { mobile: true }
          }}
        >
          <AppShell.Header>
            {/* White background to avoid transparency */}
            <div style={{ backgroundColor: 'white' }}>
              <NavBar />
            </div>
          </AppShell.Header>

          <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
      </MantineProvider>
    </>
  );
}
