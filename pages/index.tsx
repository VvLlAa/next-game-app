import axios from 'axios';
import { FeaturedGame } from '@/components/Home/FeaturedGame/FeaturedGame';
import { GameType } from '@/type/type';
import { GameCardFullWidth } from '@/components/Game/GameCard/GameCardFullWidth';
import styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import { SortFilter } from '@/components/Filter/Home/SortFilter';
import { shuffle } from '@/utils/shuffle';
import { useDispatch } from 'react-redux';
import { fetchGamesSuccessSpinner } from '@/store/gamesSlice';

interface PropsGames {
  newestGameData: GameType;
  shuffledGames: GameType[];
}

interface ratingKeyType {
  added: string;
  rating: string;
  metacritic: string;
}

export default function Home({ newestGameData, shuffledGames }: PropsGames) {
  const [sortGames, setSortGames] = useState<string>('Популярные');
  const dispatch = useDispatch();

  const ratingKey = (): keyof ratingKeyType | null => {
    if (sortGames === 'Высоко оцененные') return 'rating';
    if (sortGames === 'Популярные') return 'metacritic';
    if (sortGames === 'Самые желанные') return 'added';
    return null;
  };

  const sortedGames = () => {
    const key = ratingKey();
    if (key) {
      const sort = shuffledGames.sort((a, b) => {
        return b[key] - a[key];
      });
      return sort.slice(0, 10);
    } else {
      return shuffledGames.slice(0, 10);
    }
  };

  useEffect(() => {
    dispatch(fetchGamesSuccessSpinner());
  }, [dispatch]);

  return (
    <main className={styles['main-page']}>
      <FeaturedGame game={newestGameData} />
      <section className={styles['main-page__content']}>
        <div className={styles['main-page__games-content']}>
          <GameCardFullWidth games={sortedGames()} />
          <SortFilter setSortGames={setSortGames} sortGames={sortGames} />
        </div>
      </section>
    </main>
  );
}

export const getServerSideProps = async () => {
  const today = new Date().toISOString().split('T')[0];
  const randomPage = Math.floor(Math.random() * 4) + 1;

  try {
    const [newestGame, recentGames] = await Promise.all([
      axios.get(`${process.env.KEY_GAME}/api/games`, {
        params: {
          key: process.env.API_KEY,
          ordering: '-released',
          dates: `2000-01-01,${today}`,
          page_size: 1,
          page: randomPage,
        },
      }),
      axios.get(`${process.env.KEY_GAME}/api/games`, {
        params: {
          key: process.env.API_KEY,
          metacritic: `80, 100`,
          page_size: 100,
        },
      }),
    ]);

    const newestGameData = newestGame.data.results[0];
    const gamesWithDescription = await Promise.all(
      recentGames.data.results.map(async (game: GameType) => {
        const gameDetailsResponse = await axios.get(
          `${process.env.KEY_GAME}/api/games/${game.id}`,
          {
            params: {
              key: process.env.API_KEY,
            },
          }
        );
        const gameDetails = gameDetailsResponse.data.description_raw;
        return {
          ...game,
          description: gameDetails || 'Описание не доступно',
        };
      })
    );

    const shuffledGames = shuffle(gamesWithDescription);

    return {
      props: { newestGameData, shuffledGames },
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
