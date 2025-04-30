export async function fetchSteamDeck() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/steamDeck`, {
            next: { revalidate: 3600 },
        })

        if(!res.ok) return null;

        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}