import styles from "@/components/GameCard/GameListContentCard.module.scss";
import {dateConversion} from "@/utins/dateConversion";
import {GameType} from "@/type/type";

interface GameListContentCardProps {
    game: GameType;
    currentGame: GameType | null;
}

export const GameListContentCard = ({game, currentGame} : GameListContentCardProps) => {
    return (
        <div className={styles['game-list-content']}>
            <div className={styles['game-list-content__content']}>
                <h1>{game?.name}</h1>
                <div className={styles['game-list-content__context']}>
                    <span className={styles['game-list-content__title']}>Платформа:</span>{' '}
                    <div className={styles['game-list-content__platform']}>
                        {game?.parent_platforms.map((item, index) => (
                            <div key={item.platform.id} >
                                {item.platform.name}
                                {index !== game?.parent_platforms.length - 1 && <>, </>}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles['game-list-content__context']}>
                    <span>Дата выхода:</span>
                    <div>{dateConversion(game?.released || '')}</div>
                </div>
                <div className={styles['game-list-content__context']}>
                    <span>Рейтинг:</span>
                    <div className={styles['game-list-content__rating']}>
                        {game?.rating}
                    </div>
                </div>
                <div className={styles['game-list-content__context']}>
                    <span>Теги:</span>
                    <div className={styles['game-list-content__tags']}>
                        {game?.tags.map((item) => (
                            <div key={item.id} className={styles['platform']}>
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles['game-list-content__context']}>
                    <span>Сайт:</span>
                    <a href={currentGame?.website} target="_blank" rel="noopener noreferrer">
                        {currentGame?.website || '-------'}
                    </a>
                </div>
            </div>
        </div>
    );
};