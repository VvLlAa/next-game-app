import { GameType } from '@/src/type/type';

export const shuffle = (array: GameType[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};
