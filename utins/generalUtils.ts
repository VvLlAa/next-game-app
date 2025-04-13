export const dateConversion = (date: string): string => {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

export const normalizeRatingMetacritic = (metacritic: number) => {
  return ((metacritic - 20) / (100 - 20)) * 4 + 1;
};
