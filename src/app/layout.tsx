// app/layout.tsx

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { ReactNode } from 'react';
import Layout from './components/Layout';

export const metadata = {
  title: 'Job Management Admin',
  description: 'Admin interface for managing job postings',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}