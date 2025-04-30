export async function fetchSteamDeck() {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/steamDeck`, {
            next: { revalidate: 0 },
        })

        if(!res.ok) return null;

        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}