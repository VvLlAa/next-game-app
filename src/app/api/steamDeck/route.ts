import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';
import {getGamesSteamDeck} from "@/src/utils/getGamesSteamDeck";

export async function GET() {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto('https://store.steampowered.com/charts/steamdecktopplayed/pastweek/', {
            waitUntil: 'networkidle2',
            timeout: 60000,
        });

        for (let i = 0; i < 3; i++) {
            await page.evaluate(() => {
                window.scrollBy(0, window.innerHeight);
            });
            await new Promise((resolve) => setTimeout(resolve, 300));
        }

        const games =
            (await getGamesSteamDeck(page)) || [];


        await browser.close();

        return NextResponse.json({ games });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            popularNewProducts: [],
            bestsellerProducts: [],
        });
    }
}


