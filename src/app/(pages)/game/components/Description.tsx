import styles from "./Description.module.scss"
import {GameCard} from "@/src/type/type";
import Image from "next/image";

interface GameDetail {
    gameCard: GameCard
}

export const Description = ({gameCard} : GameDetail) => {
    return (
        <div className={styles['description']}>
            <Image
                src={gameCard.mainImg}
                alt={'картинка'}
                className={styles['description__main-img']}
                width={220}
                height={150}
            />
            <div className={styles['description__description']}>
                {gameCard.description}
            </div>
            <div>
                <span className={styles['description__span-name']}>Дата выхода:</span>
                <span>{gameCard.releaseDate}</span>
            </div>
            <div className={styles['description__span-name']}>
                <span className={styles['description__span-name']}>Разработчик:</span>
                <span>{gameCard.developer[0]}</span>
            </div>
        </div>
    );
};