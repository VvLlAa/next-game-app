import { createSlice } from '@reduxjs/toolkit';
import {GameType} from "@/type/type";

interface GamesState {
  gameList: GameType[];
  loading: boolean;
  error: string | null;
}

const initialState: GamesState = {
  gameList: [],
  loading: false,
  error: null,
};

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    dataList: (state, action) => {
      state.gameList = action.payload;
    },
  },
});

export const { dataList } = gamesSlice.actions;
export default gamesSlice.reducer;
