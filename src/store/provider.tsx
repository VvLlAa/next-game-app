'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/src/store';
import { Navbar } from '@/src/shared/components/UI/Navbar';
import Spinner from '@/src/shared/components/UI/Spinner';
import { SpinnerHandler } from '@/src/shared/components/UI/SpinnerHandler';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Spinner />
      <SpinnerHandler />
      <Navbar />
      {children}
    </Provider>
  );
}
