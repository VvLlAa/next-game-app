import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';
import {getGames} from "@/src/utils/getGames";

export async function GET() {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto('https://store.steampowered.com/', {
            waitUntil: 'networkidle2',
            timeout: 60000,
        });

        for (let i = 0; i < 3; i++) {
            await page.evaluate(() => {
                window.scrollBy(0, window.innerHeight);
            });
            await new Promise((resolve) => setTimeout(resolve, 300));
        }

        const popularNewProducts =
            (await getGames(page, '#tab_newreleases_content')) || [];
        const bestsellerProducts =
            (await getGames(page, '#tab_topsellers_content')) || [];

        await browser.close();

        return NextResponse.json({ popularNewProducts, bestsellerProducts });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            popularNewProducts: [],
            bestsellerProducts: [],
        });
    }
}


