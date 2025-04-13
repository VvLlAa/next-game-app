import {
  fetchGamesFailure,
  fetchGamesStart,
  fetchGamesSuccess,
} from '@/store/gamesSlice';
import { AppState, wrapper } from '@/store';

import styles from './index.module.scss';

import axios from 'axios';
import { GameList } from '@/components/Game/GameList/GameList';
import { Pagination } from '@/components/Pagination/Pagination';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { FilterTop } from '@/components/Filter/FilterTop';

export default function Home() {
  const { loading } = useSelector((state: AppState) => state.games);
  const router = useRouter();

  useEffect(() => {
    if (!router.query.page) {
      router.push(
        {
          pathname: router.pathname,
          query: { page: 1, min: 1, max: 5 },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [router]);

  return (
    <main style={{ padding: 40 }} className={styles['main-page']}>
      {loading && (
        <div className={styles['main-page__spinner']}>
          <Spinner animation="border" variant="danger" />
        </div>
      )}
      <FilterTop />

      <GameList />
      <Pagination totalItems={500} pageSize={14} />
    </main>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const page = context.query.page || 1;
    const { min = '1', max = '5' } = context.query;

    const minRating = Number(min) * 20;
    const maxRating = Number(max) * 20;

    try {
      store.dispatch(fetchGamesStart());
      console.log('Вызов getServerSideProps111111111111', { page, min, max });
      const response = await axios.get(`${process.env.KEY_GAME}/api/games`, {
        params: {
          key: process.env.API_KEY,
          metacritic: `${String(minRating)}, ${String(maxRating)}`,
          page_size: 14,
          page: page,
        },
      });

      if (response.data.results.length > 0) {
        store.dispatch(fetchGamesSuccess(response.data.results));
      }
      return {
        props: {},
      };
    } catch (error) {
      if (error instanceof Error) {
        store.dispatch(fetchGamesFailure(error.message));
      } else {
        store.dispatch(fetchGamesFailure('Что-то пошло не так'));
      }
      return {
        props: {},
      };
    }
  }
);
