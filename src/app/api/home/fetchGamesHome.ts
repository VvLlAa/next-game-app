import { FeaturedGame } from '@/src/type/type';

export async function fetchGamesHome() {
  try {
    const res = await fetch(
      `${process.env.KEY_GAME}/api/featuredcategories/?cc=us&l=english`,
      {
        next: { revalidate: 600 },
      }
    );
    const data = await res.json();

    const newGames = data.new_releases.items || [];
    const topGames = data.coming_soon.items || [];

    if (newGames.length === 0 && topGames.length === 0) return null;

    const popularNewProducts = newGames.map((item: FeaturedGame) => ({
      id: item.id,
      name: item.name,
      img: item.header_image,
      originalPrice: item.original_price || null,
      finalPrice: item.final_price || null,
      discount: item.discount_percent || null,
    }));

    const bestsellerProducts = topGames.map((item: FeaturedGame) => ({
      id: item.id,
      name: item.name,
      img: item.header_image,
      originalPrice: item.original_price || null,
      finalPrice: item.final_price || null,
      discount: item.discount_percent || null,
    }));

    return { popularNewProducts, bestsellerProducts };
  } catch (error) {
    console.error('Ошибка получения данных:', error);
    return { popularNewProducts: [], bestsellerProducts: [] };
  }
}
