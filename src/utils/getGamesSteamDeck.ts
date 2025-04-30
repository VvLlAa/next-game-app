import { Page } from 'puppeteer';

export async function getGamesSteamDeck(page: Page) {
    return await page.$$eval('tr', (rows) => {
        return rows.map((row) => {
            const cells = row.querySelectorAll('td');
            if (cells.length < 5) return null;

            const name = cells[2]?.querySelector('div')?.textContent?.trim() || '';
            const href = cells[2]?.querySelector('a')?.getAttribute('href') || '';
            const img = (cells[2]?.querySelector('td img') as HTMLImageElement)?.src || '';

            const originalPrice = null;
            const finalPrice = cells[3]?.querySelector('div')?.textContent?.trim() || '';

            const match = href.match(/\/app\/(\d+)\//);
            const appId = match ? match[1] : null;
            const id = appId
            const description = null;
            const tags = null;
            const discount = null;

            if(!finalPrice) return

            return {
                name,
                href,
                img,
                originalPrice,
                finalPrice,
                discount,
                id,
                tags,
                description
            };
        }).filter(Boolean);
    });
}