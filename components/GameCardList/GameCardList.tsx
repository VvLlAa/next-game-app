import { useSelector } from 'react-redux';
import styles from './GameCardList.module.scss';
import { AppState } from '@/store';
import { GameCard } from '@/components/GameCard/GameCard';

export const GameCardList = () => {
  const { gameList } = useSelector((state: AppState) => state.games);

  return (
    <div className={styles['game-card-list']}>
      {gameList.map((game) => (
        <div key={game.id}>
          <GameCard game={game} />
        </div>
      ))}
    </div>
  );
};
