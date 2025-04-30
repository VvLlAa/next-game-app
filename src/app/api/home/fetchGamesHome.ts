export async function fetchGamesHome() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/home`, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) return null;

        return await res.json();
    } catch (e) {
        console.error(e);
        return null;
    }
}