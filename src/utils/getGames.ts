import { Page } from 'puppeteer';

export const getGames = async (page: Page, selector: string) => {
    return await page.evaluate((selector) => {
        const games = Array.from(
            document.querySelectorAll(`${selector} .tab_content_items .tab_item`)
        ).slice(0, 10);

        return  games.map((game) => {
            const name = game.querySelector('.tab_item_name')?.textContent?.trim() || null;
            const description = game.querySelector('.description')?.textContent?.trim() || null;
            const id = game.getAttribute('data-ds-appid') || null;

            const img = (game.querySelector('.tab_item_cap img') as HTMLImageElement)?.src || null;

            const link = game.querySelector('a')?.href  || null;
            const originalPrice = game.querySelector('.discount_original_price')
                ?.textContent?.trim()
                .replace(/\s?руб.?$/, '')  || null;
            const finalPrice = game.querySelector('.discount_final_price')
                ?.textContent?.trim()
                .replace(/\s?руб.?$/, '')  || null;
            const discount = game.querySelector('.discount_pct')?.textContent?.trim() || null;
            const tags = Array.from(game.querySelectorAll('.top_tag')).map((tag) =>
                tag.textContent?.trim()
            ) || null;
            const releaseDate = game.querySelector('.release_date')?.textContent?.trim() || null;

            return {
                name,
                description,
                img,
                link,
                tags,
                originalPrice,
                finalPrice,
                discount,
                releaseDate,
                id,
            };
        });
    }, selector);
};
