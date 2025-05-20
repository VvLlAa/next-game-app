import { GameType } from '@/src/type/type';
import styles from '@/src/shared/components/GameCards/GameCard/BigCard/BigCard.module.scss'
import Image from 'next/image';

export const BigCard = ({
  game,
  onClick,
}: {
  game: GameType;
  onClick: (game: GameType) => void;
}) => {
  return (
    <div
      onClick={() => onClick(game)}
      className={styles['big-card']}
      aria-label={`Открыть ${game.name}`}
      role="button"
      tabIndex={0}
    >
      <Image
        src={game.img}
        alt={game.name}
        className={styles['big-card__image-full-screen']}
        width={184}
        height={69}
        loading="lazy"
        priority={false}
      />
      <Image
        src={game?.img}
        alt={game.name}
        className={styles['big-card__image']}
        width={184}
        height={69}
        loading="lazy"
        priority={false}
      />
      <div className={styles['big-card__content']}>
        <h5 className={styles['big-card__h5']}>{game.name}</h5>
        <div className={styles['big-card__platform-wrapper']}>
          <div className={styles['big-card__price']}>
            {game.discount && (
              <div className={styles['big-card__discount']}>
                {game.discount}%
              </div>
            )}
            <div className={styles['big-card__price-block']}>
              {game.discount ? (
                <>
                  <div className={styles['big-card__originalPrice']}>
                    {game.originalPrice}р
                  </div>
                  <div className={styles['big-card__finalPrice']}>
                    {game.finalPrice}р
                  </div>
                </>
              ) : (
                <div className={styles['big-card__finalPrice_1']}>
                  {game.finalPrice ? game.finalPrice + 'р' : 'Бесплатно'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
