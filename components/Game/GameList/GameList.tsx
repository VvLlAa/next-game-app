import styles from './GameList.module.scss';
import { GameCard } from '@/components/Game/GameCard/GameCard';
import React from 'react';
import { GameType } from '@/type/type';

interface GameListState {
  games: GameType[];
}

export const GameList = ({ games }: GameListState) => {
  return (
    <div className={styles['game-card-list']}>
      {games.map((game) => (
        <div key={game.id}>
          <GameCard game={game} />
        </div>
      ))}
    </div>
  );
};
