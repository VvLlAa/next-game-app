export async function fetchGamesHome() {
    try {
        const res = await fetch(`http://localhost:3000/api/home`, {
            next: { revalidate: 0 },
        });

        if (!res.ok) return null;

        return await res.json();
    } catch (e) {
        console.error(e);
        return null;
    }
}