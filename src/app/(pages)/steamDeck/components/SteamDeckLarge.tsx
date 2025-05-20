'use client';

import { GameType } from '@/src/type/type';
import { GameCard } from '@/src/shared/components/GameCards/GameCard/CardSmall/GameCard';
import styles from './SteamDeckLarge.module.scss';
import { Pagination } from '@mui/material';
import { useState } from 'react';

interface ITeamDeckLarge {
  games: GameType[] | [];
}

export const SteamDeckLarge = ({ games }: ITeamDeckLarge) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const pagination = games.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div className="container">
      <h1 className={styles['h1']}>Самые популярные игры на Steam Deck</h1>
      <div className={styles['steam']}>
        {pagination?.map((game: GameType) => (
          <GameCard game={game} key={game.id} />
        ))}
      </div>
      <div className={styles['steam__pagination']}>
        <Pagination
          count={Math.ceil(games.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{
            '& .MuiPaginationItem-root': {
              color: 'white',
            },
            '& .Mui-selected': {
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              color: 'white',
            },
          }}
        />
      </div>
    </div>
  );
};
