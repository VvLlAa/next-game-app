'use client';

import React from 'react';
import '../styles/global.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReduxProvider } from '@/src/store/provider';
import Spinner from '@/src/shared/components/UI/Spinner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Spinner />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
