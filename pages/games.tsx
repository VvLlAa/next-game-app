import styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GameList } from '@/components/Game/GameList/GameList';
import { Pagination } from '@/components/Pagination/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import { FilterTop } from '@/components/Filter/FilterTop';
import { GameType } from '@/type/type';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

interface Games {
  games: GameType[];
}

export default function Games({ games }: Games) {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (games.length > 0) {
      setLoading(false);
    }
  }, [games]);

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
      <GameList games={games} />
      <Pagination totalItems={500} pageSize={14} setLoading={setLoading} />
    </main>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const page = context.query.page || 1;
  const { min = '1', max = '5' } = context.query;
  const minRating = Number(min) * 20;
  const maxRating = Number(max) * 20;

  try {
    const response = await axios.get(`${process.env.KEY_GAME}/api/games`, {
      params: {
        key: process.env.API_KEY,
        metacritic: `${String(minRating)}, ${String(maxRating)}`,
        page_size: 20,
        page: page,
      },
    });

    return {
      props: {
        games: response.data.results,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        games: [],
      },
    };
  }
};
