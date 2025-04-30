'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { fetchGamesSuccessSpinner } from '@/src/store/gamesSlice';

export const SpinnerHandler = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(fetchGamesSuccessSpinner());
    }, 100);
    return () => clearTimeout(timeout);
  }, [pathname, dispatch]);

  return null;
};
