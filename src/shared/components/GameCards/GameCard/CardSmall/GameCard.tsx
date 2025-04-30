'use client';

import { GameType } from '@/src/type/type';
import styles from './GameCard.module.scss';
import { useDispatch } from 'react-redux';
import { fetchGamesStartSpinner } from '@/src/store/gamesSlice';
import Image from 'next/image';
import {useRouter} from "next/navigation";
import {useCallback} from "react";

export const GameCard = ({ game }: { game: GameType }) => {
    const router = useRouter();
  const dispatch = useDispatch();

    const openCard = useCallback(
        (game: GameType) => {
            dispatch(fetchGamesStartSpinner());
            router.push(`/game/${game.id}`);
        },
        [dispatch, router]
    );

  return (
    <div className={styles['game-card']} onClick={() => openCard(game)}>
     <div className={styles['game-card__image-wrapper']}>
        <Image
          src={game.img}
          alt={`Обложка игры ${game.name}`}
          width={250}
          height={98}
          className={styles['game-card__image']}
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy"
        />
      </div>
      <div className={styles['game-card__info']}>
        <div>{game.finalPrice}</div>
        <h2 className={styles['game-card__title']}>{game.name}</h2>
      </div>
    </div>
  );
};
