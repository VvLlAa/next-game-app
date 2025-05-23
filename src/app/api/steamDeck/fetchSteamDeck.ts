export async function fetchSteamDeck() {
  try {
    const res = await fetch(
      `${process.env.KEY_GAME}/api/featuredcategories?cc=us&l=en`,
      {
        next: { revalidate: 0 },
      }
    );

    if(!res) return null;

    const data = await res.json();

    const newReleases = (data.new_releases?.items ?? []).map(transformApiItem);
    const specials = (data.specials?.items ?? []).map(transformApiItem);

    return [...newReleases, ...specials];
  } catch (error) {
    console.error(error);
    return  [];
  }
}


function transformApiItem(item : { id: number; header_image: string; name: string }) {
    return {
        id: item.id,
        img: item.header_image,
        name: item.name,
    }
}

