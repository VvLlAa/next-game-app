export async function fetchSteamDeck() {

    const baseUrl =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : process.env.BASE_URL;

    try {
        const res = await fetch(`${baseUrl}/api/steamDeck`, {
            next: { revalidate: 3600 },
        })

        if(!res.ok) return { games: [] }

        const data = await res.json();

        if (!data || !Array.isArray(data.games)) {
            return { games: [] };
        }
    } catch (error) {
        console.error(error);
        return {games: []};
    }
}