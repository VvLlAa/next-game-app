'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import styles from './GameCardLarge.module.scss';
import { GameType } from '@/src/type/type';
import { fetchGamesStartSpinner } from '@/src/store/gamesSlice';
import { AppState } from '@/src/store';
import { BigCard } from '@/src/shared/components/GameCards/GameCard/BigCard/BigCard';
import {SORT_OPTIONS} from "@/src/shared/constants/sort";

interface GameCardFullWidthProps {
  initialGames: {
    popularNewProducts: GameType[] | null;
    bestsellerProducts: GameType[] | null;
  };
}

export const GameCardLarge = ({ initialGames }: GameCardFullWidthProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const sortOption = useSelector((state: AppState) => state.games.sortOption);

  const handleCardClick = useCallback(
    (game: GameType) => {
      dispatch(fetchGamesStartSpinner());
      router.push(`/game/${game.id}`);
    },
    [dispatch, router]
  );

  const games = SORT_OPTIONS.POPULAR === sortOption
      ? initialGames.popularNewProducts || []
      : initialGames.bestsellerProducts || [];

  return (
    <div className={styles['game-card']}>
      {games.map((game, index) => (
        <BigCard
          key={`${game.name} + ${index}`}
          game={game}
          onClick={handleCardClick}
        />
      ))}
    </div>
  );
};
