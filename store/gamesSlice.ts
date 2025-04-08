import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameType } from '@/type/type';
import { router } from 'next/client';

interface GamesState {
  gameList: GameType[];
  currentPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: GamesState = {
  gameList: [],
  currentPage: 1,
  loading: false,
  error: null,
};

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    fetchGamesStart: (state) => {
      state.loading = true;
      console.log(state.loading);
    },
    fetchGamesSuccess(state, action: PayloadAction<GameType[]>) {
      state.gameList = action.payload;
      state.loading = false;
    },
    fetchGamesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    getDataPage: (state, action: PayloadAction<number>) => {
      router.push({ query: { page: action.payload } });
      state.loading = true;
    },
  },
});

export const {
  fetchGamesStart,
  fetchGamesSuccess,
  fetchGamesFailure,
  getDataPage,
} = gamesSlice.actions;
export default gamesSlice.reducer;
