import { AppState, wrapper } from '@/store';
import {
  fetchGamesSuccess,
  fetchGamesStart,
  fetchGamesFailure,
} from '@/store/gamesSlice';
import { useSelector } from 'react-redux';
import styles from './index.module.scss';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import { GameCardList } from '@/components/GameCardList/GameCardList';
import { Pagination } from '@/components/Pagination/Pagination';

export default function Home() {
  const { loading } = useSelector((state: AppState) => state.games);
  return (
    <main style={{ padding: 40 }} className={styles['main-page']}>
      {loading && (
        <div className={styles['main-page__spinner']}>
          <Spinner animation="border" variant="danger" />
        </div>
      )}
      <GameCardList />
      <Pagination totalItems={500} pageSize={14} />
    </main>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const page = context.query.page;
    try {
      store.dispatch(fetchGamesStart());
      const response = await axios.get(`${process.env.KEY_GAME}/api/games`, {
        params: {
          key: process.env.API_KEY,
          page_size: 14,
          page: page,
        },
      });
      store.dispatch(fetchGamesSuccess(response.data.results));

      return {
        props: {},
      };
    } catch (error) {
      if (error instanceof Error) {
        store.dispatch(fetchGamesFailure(error.message));
      } else {
        store.dispatch(fetchGamesFailure('Что-то пошло не так'));
      }
      return {
        props: {},
      };
    }
  }
);


