import { GameType } from '@/type/type';
import styles from './GameCard.module.scss';
import Image from 'next/image';
import { dateConversion } from '@/utins/dateConversion';

export const GameCard = ({ game }: { game: GameType }) => {
  const openCard = () => {
    localStorage.setItem('gameCard', JSON.stringify(game));
    window.location.href = `/game/${game.id}`
  };

  return (
    <div className={styles['game-card']} onClick={() => openCard()}>
      <Image
        src={game.background_image}
        alt="img_game"
        width={500}
        height={300}
        priority
      />
      <div className={styles['game-card__rating']}>{game.rating}</div>
      <div className={styles['game-card__content']}>
        <h2>{game.name}</h2>
        <div>Дата выхода: {dateConversion(game.released)}</div>
      </div>
    </div>
  );
};


