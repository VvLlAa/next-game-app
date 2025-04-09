import { CarouselComponent } from '@/components/Carousel/CarouselComponent';
import { dateConversion } from '@/utins/dateConversion';
import styles from './[id].module.scss';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { GameType } from '@/type/type';
import {AppState, wrapper} from "@/store";
import axios from "axios";
import {openCardPage} from "@/store/gamesSlice";
import {useSelector} from "react-redux";
import parse from 'html-react-parser';

const GamePage = () => {
  const { currentGame } = useSelector((state: AppState) => state.games);

  const [game, setCurrentGame] = useState<GameType | null>(null);

  useEffect(() => {
      const local = localStorage.getItem('gameCard');
      const localScreenshot = local ? JSON.parse(local) : null;

      if(localScreenshot) {
          setCurrentGame(localScreenshot)
      }

    return () => {
      localStorage.removeItem('gameCard');
    };
  }, [currentGame, setCurrentGame]);


    const GameDescription = () => {
        const description = currentGame?.description;
        return (
            <div>
                {description ? parse(description) : 'Описание недоступно'}
            </div>
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
      <div className={styles['game-page__body']}>
          <CarouselComponent
              gameScreenshots={game?.short_screenshots || []}
          />
          <div className={styles['game-page__content']}>
              <h1>{game?.name}</h1>
              <div className={styles['game-page__context']}>
                  <span className={styles['game-page__title']}>Платформа:</span>{' '}
                  {game?.parent_platforms.map((item, index) => (
                      <div key={item.platform.id} className={styles['platform']}>
                          {index !== 0 && <>, </>}
                          {item.platform.name}
                      </div>
                  ))}
              </div>
              <div className={styles['game-page__context']}>
                  <span>Дата выхода:</span>
                  <div>{dateConversion(game?.released || '')}</div>
              </div>
              <div className={styles['game-page__context']}>
                  <span>Рейтинг:</span>
                  <div className={styles['game-page__rating']}>
                      {game?.rating}
                  </div>
              </div>
              <div className={styles['game-page__context']}>
                  <span>Теги:</span>
                  <div className={styles['game-page__tags']}>
                      {game?.tags.map((item) => (
                          <div key={item.id} className={styles['platform']}>
                              {item.name}
                          </div>
                      ))}
                  </div>
              </div>
              <div className={styles['game-page__context']}>
                  <span>Сайт:</span>
                  <a href={currentGame?.website} target="_blank" rel="noopener noreferrer">
                      {currentGame?.website || '-------'}
                  </a>
              </div>
          </div>
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
       const response = await axios.get(`${process.env.KEY_GAME}/api/games/${id}`, {
            params: {
                key: process.env.API_KEY,
            }
        })

        store.dispatch(openCardPage(response.data));
        return {
          props: {}
        }
      } catch (error) {
        console.log(error)
        return {
          props: {}
        }
      }
    }
)
