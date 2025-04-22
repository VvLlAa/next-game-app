import Image from 'next/image';
import styles from './GameCardFullWidth.module.scss';
import { GameType } from '@/type/type';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { fetchGamesStartSpinner } from '@/store/gamesSlice';

interface GameCardFullWidth {
  games: GameType[];
}

export const GameCardFullWidth = ({ games }: GameCardFullWidth) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const openCard = (game: GameType) => {
    dispatch(fetchGamesStartSpinner());
    setTimeout(() => {
      router.push(`/game/${game.id}`);
    }, 50);
  };
  return (
    <div className={styles['game-card']}>
      {games.map((game: GameType) => (
        <div
          key={game.id}
          onClick={() => openCard(game)}
          className={styles['game-card__main']}
        >
          <Image
            src={game.background_image}
            alt={game.name}
            className={styles['game-card__image-full-screen']}
            fill
            loading="lazy"
          />
          <Image
            src={game.background_image}
            alt={game.name}
            className={styles['game-card__image']}
            width={250}
            height={140}
            loading="lazy"
          />
          <div className={styles['game-card__content']}>
            <h2 className={styles['game-card__h2']}>{game.name}</h2>
            <div className={styles['game-card__description']}>
              {game.description}
            </div>
            <div>
              <span className={styles['game-card__platform']}>
                {game.parent_platforms[0]?.platform.name}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
