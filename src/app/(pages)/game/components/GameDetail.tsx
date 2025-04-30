import {GameCard} from "@/src/type/type";
import {Gallery} from "@/src/shared/components/UI/Gallery";
import {Description} from "@/src/app/(pages)/game/components/Description"
import styles from "./GameDetail.module.scss"

interface GameDetail {
    gameCard: GameCard;
}

export const GameDetail = ({gameCard} : GameDetail) => {
    if(!gameCard.name) {
        return (
            <div className={styles['game-error']}>
                Внимание: игра может содержать контент, не подходящий
                для всех возрастов или для просмотра на работе.
                Насилие.
                <h1>!Контент недоступен!</h1>
            </div>
        )
    }

    return (
        <>
            <div className={styles['game-detail']}>
                <Gallery screenshots={gameCard.screenshots}/>
                <Description gameCard={gameCard}/>
            </div>
        </>
    );
};