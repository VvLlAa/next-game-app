import Image from 'next/image';
import styles from './FeaturedGame.module.scss';
import Link from 'next/link';
import { GameType } from '@/type/type';

interface Props {
  game: GameType;
}

export const FeaturedGame = ({ game }: Props) => {
  const imageSrc = game?.background_image || null;

  return (
    <section className={styles['featured']}>
      <div className={styles['featured__imageWrapper']}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="Featured game background"
            fill
            className={styles['featured__image']}
            priority
          />
        ) : (
          <div className={styles['featured__no-image']}>
            Изображение отсутствует
          </div>
        )}
      </div>
      <div className={styles['featured__content']}>
        <div className={styles['featured__badge']}>Новинка</div>
        <h1 className={styles['featured__title']}>{game?.name}</h1>
        <p className={styles['featured__description']}>
          Погрузитесь в мир будущего с открытым миром и захватывающим сюжетом
        </p>
        <div className={styles['featured__buttons']}>
          <Link
            href={`/game/${game?.id || 1}`}
            className={styles['featured__link-details']}
          >
            Подробнее
          </Link>
          <Link
            href={{
              pathname: '/games',
              query: { page: 1, min: 1, max: 5 },
            }}
            className={styles['featured__link-all-game']}
          >
            Все игры
          </Link>
          <button></button>
        </div>
      </div>
    </section>
  );
};
