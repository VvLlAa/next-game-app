import React from 'react';
import styles from './Spinner.module.scss';
import { useSelector } from 'react-redux';
import { AppState } from '@/src/store';

const Spinner = () => {
  const loading = useSelector((state: AppState) => state.games.loading);

  if (!loading) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;
