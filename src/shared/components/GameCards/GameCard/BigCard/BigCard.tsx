import { GameType } from '@/src/type/type';
import styles from '@/src/shared/components/GameCards/GameList/GameCardLarge.module.scss';
import Image from 'next/image';

export const BigCard = ({
  game,
  onClick,
}: {
  game: GameType;
  onClick: (game: GameType) => void;
}) => {
  const roundPrice = (price: string) => {
    if (!price || price === 'Бесплатно') {
      return price;
    }

    const formattedPrice = price.replace(',', '.');
    const roundedPrice = Math.round(parseFloat(formattedPrice));

    return `${roundedPrice}р`;
  };

  return (
    <div
      onClick={() => onClick(game)}
      className={styles['game-card__main']}
      aria-label={`Открыть ${game.name}`}
      role="button"
      tabIndex={0}
    >
      <Image
        src={game.img}
        alt={game.name}
        className={styles['game-card__image-full-screen']}
        width={184}
        height={69}
        loading="lazy"
        priority={false}
      />
      <Image
        src={game?.img}
        alt={game.name}
        className={styles['game-card__image']}
        width={184}
        height={69}
        loading="lazy"
        priority={false}
      />
      <div className={styles['game-card__content']}>
        <h5 className={styles['game-card__h5']}>{game.name}</h5>
        <div className={styles['game-card__platform-wrapper']}>
          {game.tags?.map((tag) => (
            <span className={styles['game-card__platform']} key={tag}>
              {tag}
            </span>
          ))}
          <div className={styles['game-card__price']}>
            {game.discount && (
              <div className={styles['game-card__discount']}>
                {game.discount}
              </div>
            )}
            <div className={styles['game-card__price-block']}>
              {game.discount ? (
                <>
                  <div className={styles['game-card__originalPrice']}>
                    {roundPrice(game.originalPrice)}
                  </div>
                  <div className={styles['game-card__finalPrice']}>
                    {roundPrice(game.finalPrice)}
                  </div>
                </>
              ) : (
                <div className={styles['game-card__finalPrice_1']}>
                  {roundPrice(game.finalPrice)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
