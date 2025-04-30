import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameType } from '@/src/type/type';

interface GamesState {
  gameList: GameType[];
  currentGame: GameType | null;
  currentPage: number;
  loading: boolean;
  error: string | null;
  sortOption: string;
}

const initialState: GamesState = {
  gameList: [],
  currentGame: null,
  currentPage: 1,
  loading: false,
  error: null,
  sortOption: 'Популярные',
};

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setGames: (state, action: PayloadAction<GameType[]>) => {
      state.gameList = action.payload;
    },
    fetchGamesStartSpinner: (state) => {
      state.loading = true;
    },
    fetchGamesSuccessSpinner(state) {
      state.loading = false;
    },
    setSortOption: (state, action: PayloadAction<string>) => {
      state.sortOption = action.payload;
    },
  },
});

export const {
  fetchGamesStartSpinner,
  fetchGamesSuccessSpinner,
  setSortOption,
  setGames,
} = gamesSlice.actions;
export default gamesSlice.reducer;
