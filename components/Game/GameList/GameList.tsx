import { shallowEqual, useSelector } from 'react-redux';
import styles from './GameList.module.scss';
import { AppState } from '@/store';
import { GameCard } from '@/components/Game/GameCard/GameCard';
import React from 'react';

export const GameList = () => {
  const { gameList } = useSelector(
    (state: AppState) => state.games,
    shallowEqual
  );

  return (
    <div className={styles['game-card-list']}>
      {gameList.map((game) => (
        <div key={game.id}>
          <GameCard game={game} />
        </div>
      ))}
    </div>
  );
};
