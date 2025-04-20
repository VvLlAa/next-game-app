import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

    getDataPage: (state) => {
      state.loading = true;
    },

    openCardPage: (state, action: PayloadAction<GameType>) => {
      state.currentGame = action.payload;
    },
  },
});

export const {
  fetchGamesStart,
  fetchGamesSuccess,
  fetchGamesFailure,
  getDataPage,
  openCardPage,
} = gamesSlice.actions;
export default gamesSlice.reducer;
