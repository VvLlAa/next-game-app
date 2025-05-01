import {getBaseUrl} from "@/src/utils/getBaseUrl";

export async function fetchGamesHome() {
    const baseUrl = getBaseUrl();
    try {
        const res = await fetch(`${baseUrl}/api/home`, {
            next: { revalidate: 0 },
        });

        if (!res.ok) return null;

        return await res.json();
    } catch (e) {
        console.error(e);
        return null;
    }
}