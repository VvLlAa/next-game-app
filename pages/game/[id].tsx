import { CarouselComponent } from '@/components/Carousel/CarouselComponent';
import styles from './[id].module.scss';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { GameType } from '@/type/type';
import { AppState, wrapper } from '@/store';
import axios from 'axios';
import { openCardPage } from '@/store/gamesSlice';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { GameDetailsContent } from '@/components/GameDetails/GameDetailsContent';

const GamePage = () => {
  const { currentGame } = useSelector((state: AppState) => state.games);

  const [game, setCurrentGame] = useState<GameType | null>(null);

  useEffect(() => {
    const local = localStorage.getItem('gameCard');
    const localScreenshot = local ? JSON.parse(local) : null;

    if (localScreenshot) {
      setCurrentGame(localScreenshot);
    }

    return () => {
      localStorage.removeItem('gameCard');
    };
  }, [currentGame, setCurrentGame]);

  const GameDescription = () => {
    const description = currentGame?.description;
    return (
      <div>{description ? parse(description) : 'Описание недоступно'}</div>
    );
  };

  if (!game)
    return (
      <div>
        <div className={styles['main-page__spinner']}>
          <Spinner animation="border" variant="danger" />
        </div>
      </div>
    );

  return (
    <div className={styles['game-page']}>
      <div
        style={{
          backgroundImage: `url(${game?.background_image})`,
        }}
        className={styles['game-page__background']}
      />
      <div className={styles['game-page__content']}>
        <CarouselComponent gameScreenshots={game?.short_screenshots || []} />
        <GameDetailsContent game={game} currentGame={currentGame} />
      </div>
      {GameDescription()}
    </div>
  );
};

export default GamePage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.query.id;
    try {
      const response = await axios.get(
        `${process.env.KEY_GAME}/api/games/${id}`,
        {
          params: {
            key: process.env.API_KEY,
          },
        }
      );

      store.dispatch(openCardPage(response.data));
      return {
        props: {},
      };
    } catch (error) {
      console.log(error);
      return {
        props: {},
      };
    }
  }
);
