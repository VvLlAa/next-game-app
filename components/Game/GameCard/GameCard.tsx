import { GameType } from '@/type/type';
import styles from './GameCard.module.scss';
import Image from 'next/image';
import {
  dateConversion,
  normalizeRatingMetacritic,
} from '@/utins/generalUtils';

export const GameCard = ({ game }: { game: GameType }) => {
  const openCard = () => {
    localStorage.setItem('gameCard', JSON.stringify(game));
    window.location.href = `/game/${game.id}`;
  };

  return (
    <div className={styles['game-card']} onClick={() => openCard()}>
      <Image
        src={game.background_image}
        alt="img_game"
        width={500}
        height={300}
        priority
        style={{ maxHeight: '240px', maxWidth: '400px' }}
      />
      <div className={styles['game-card__rating']}>
        {normalizeRatingMetacritic(game.metacritic)}
      </div>
      <div className={styles['game-card__content']}>
        <h2>{game.name}</h2>
        <div>Дата выхода: {dateConversion(game.released)}</div>
      </div>
    </div>
  );
};
