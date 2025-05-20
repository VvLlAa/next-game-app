export async function fetchCardGame(id: string) {
  try {
    const res = await fetch(
      `${process.env.KEY_GAME}/api/appdetails?appids=${id}&key=${process.env.API_KEY}&l=russian`,
      {
        next: { revalidate: 0 },
      }
    );

    const data = await res.json();
    const gameData = data[id]?.data;
    if (!gameData) return null;

    return {
      gameData: gameData,
      id: gameData.steam_appid,
      name: gameData.name,
      screenshots: gameData.screenshots,
      mainImg: gameData.header_image,
      description: gameData.short_description,
      finalPrice: gameData.price_overview?.final || 'Бесплатно',
      releaseDate: gameData.release_date.date,
      developer: gameData.publishers,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}
