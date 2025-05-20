export async function fetchSteamDeck() {
  try {
    const res = await fetch(
      `${process.env.KEY_GAME}/api/featuredcategories?cc=us&l=en`,
      {
        next: { revalidate: 0 },
      }
    );
    const data = await res.json();

    const newReleases =
      data.new_releases.items.map(
        (item: { id: number; header_image: string; name: string }) => ({
          id: item.id,
          img: item.header_image,
          name: item.name,
        })
      ) || [];

    const t =
      data.specials.items.map(
        (item: { id: number; header_image: string; name: string }) => ({
          id: item.id,
          img: item.header_image,
          name: item.name,
        })
      ) || [];

    return [...newReleases, ...t];
  } catch (error) {
    console.error(error);
    return  [];
  }
}
