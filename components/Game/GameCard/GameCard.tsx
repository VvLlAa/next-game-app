import { GameType } from '@/type/type';
import styles from './GameCard.module.scss';
import Image from 'next/image';
import {
  dateConversion,
  normalizeRatingMetacritic,
} from '@/utils/generalUtils';
import { router } from 'next/client';

export const GameCard = ({ game }: { game: GameType }) => {
  const openCard = () => {
    router.push(`/game/${game.id}`);
  };

  return (
    <div className={styles['game-card']} onClick={openCard}>
      <div className={styles['game-card__image-wrapper']}>
        <Image
          src={game.background_image}
          alt={`Обложка игры ${game.name}`}
          fill
          className={styles['game-card__image']}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className={styles['game-card__rating']}>
          {normalizeRatingMetacritic(game.metacritic)}
        </div>
      </div>
      <div className={styles['game-card__info']}>
        <h2 className={styles['game-card__title']}>{game.name}</h2>
        <p className={styles['game-card__release']}>
          Дата выхода: {dateConversion(game.released)}
        </p>
      </div>
    </div>
  );
};
