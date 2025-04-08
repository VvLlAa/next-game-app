import { configureStore, combineReducers, AnyAction } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import gamesReducer from './gamesSlice';

const combinedReducer = combineReducers({
  games: gamesReducer,
});

type RootState = ReturnType<typeof combinedReducer>;

const reducer = (
  state: RootState | undefined,
  action: AnyAction
): RootState => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combinedReducer(state, action);
};

const makeStore = () =>
  configureStore({
    reducer,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
