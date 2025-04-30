export async function fetchSteamDeck() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/steamDeck`, {
            next: { revalidate: 3600 },
        })

        if(!res.ok) return { games: [] }

        const data = await res.json();

        if (!data || !Array.isArray(data.games)) {
            console.error('Invalid API response structure', data);
            return { games: [] };
        }
    } catch (error) {
        console.error(error);
        return {games: []};
    }
}