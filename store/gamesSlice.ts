import { createSlice } from '@reduxjs/toolkit';
import { GameType } from '@/type/type';

interface GamesState {
  gameList: GameType[];
  currentGame: GameType | null;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: GamesState = {
  gameList: [],
  currentGame: null,
  currentPage: 1,
  loading: false,
  error: null,
};

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    fetchGamesStartSpinner: (state) => {
      state.loading = true;
    },
    fetchGamesSuccessSpinner(state) {
      state.loading = false;
    },
  },
});

export const { fetchGamesStartSpinner, fetchGamesSuccessSpinner } =
  gamesSlice.actions;
export default gamesSlice.reducer;
