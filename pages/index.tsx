import { AppState, wrapper } from '@/store';
import { dataList } from '@/store/gamesSlice';
import { useSelector } from 'react-redux';

import axios from 'axios';

export default function Home() {
  const { gameList } = useSelector(
    (state: AppState) => state.games
  );

  return (
    <main style={{ padding: 40 }}>
      <h1>Games List (SSR)</h1>
      {gameList.map((game) =>
        <div key={game.id}>
          {game.id}
        </div>
      )}
    </main>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      const response = await axios.get(`${process.env.KEY_GAME}/api/games`, {
        params: {
          key: process.env.API_KEY,
          page_size: 15,
          page: 1,
        },
      });
      store.dispatch(dataList(response.data.results));

      return {
        props: {},
      };
    } catch (er) {
      console.log(er);
      return {
        props: {},
      };
    }
  }
);
