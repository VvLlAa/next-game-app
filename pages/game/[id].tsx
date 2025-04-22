import { CarouselComponent } from '@/components/Carousel/CarouselComponent';
import styles from './[id].module.scss';
import Spinner from 'react-bootstrap/Spinner';
import { GameType } from '@/type/type';
import axios from 'axios';
import parse from 'html-react-parser';
import { GameDetailsContent } from '@/components/Game/GameDetails/GameDetailsContent';
import { GetStaticPropsContext } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/store';
import { useEffect } from 'react';
import { fetchGamesSuccessSpinner } from '@/store/gamesSlice';

interface GameDetails {
  game: GameType;
}

const GamePage = ({ game }: GameDetails) => {
  const { loading } = useSelector((state: AppState) => state.games);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) {
      dispatch(fetchGamesSuccessSpinner());
    }
  }, [loading, dispatch]);

  const GameDescription = () => {
    const description = game?.description;
    return (
      <div>{description ? parse(description) : 'Описание недоступно'}</div>
    );
  };

  if (!game || !game?.short_screenshots.length)
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
        <GameDetailsContent game={game} currentGame={game} />
      </div>
      {GameDescription()}
    </div>
  );
};

export default GamePage;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { id } = context.params || {};
  try {
    const [gameResponse, screenshotsResponse] = await Promise.all([
      axios.get(`${process.env.KEY_GAME}/api/games/${id}`, {
        params: { key: process.env.API_KEY },
      }),
      axios.get(`${process.env.KEY_GAME}/api/games/${id}/screenshots`, {
        params: { key: process.env.API_KEY },
      }),
    ]);

    const fullGame = {
      ...gameResponse.data,
      short_screenshots: screenshotsResponse.data.results,
    };

    return {
      props: {
        game: fullGame,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.log(error);
    return {
      props: { game: null },
    };
  }
};

export const getStaticPaths = async () => {
  try {
    const response = await axios.get(`${process.env.KEY_GAME}/api/games`);
    const games = response.data;

    const paths = games.map((game: GameType) => ({
      params: { id: game.id.toString() },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.log(error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};
