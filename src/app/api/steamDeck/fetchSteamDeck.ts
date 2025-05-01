import {getBaseUrl} from "@/src/utils/getBaseUrl";

export async function fetchSteamDeck() {
    const baseUrl = getBaseUrl();
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