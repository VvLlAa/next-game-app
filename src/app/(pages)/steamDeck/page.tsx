
import styles from './page.module.scss'
import {Video} from "@/src/app/(pages)/steamDeck/components/video/Video";
import {fetchSteamDeck} from "@/src/app/api/steamDeck/fetchSteamDeck";
import {SteamDeckLarge} from "@/src/app/(pages)/steamDeck/components/SteamDeckLarge";

export const revalidate = 60;


export default async function steamDeck() {
    const res = await fetchSteamDeck()

    const gameData = res.games;

    console.log(gameData)

    if(!gameData) return null;

    return (
        <main className={styles['page']}>
            <Video
                web={'https://clan.cloudflare.steamstatic.com/images//39049601/9e43ee4ba768ed4055fd47579b77aedf0864d1e4.mp4?origin=https://store.steampowered.com/'}
                mp4={'https://clan.cloudflare.steamstatic.com/images//39049601/dd6da56135cd31316490b8a83544d7fda29a4a7e.webm?origin=https://store.steampowered.com/'}
            />
            <div className={`${styles['page__description']} container`}>
                <h1 className={styles['page__h1']}>Мощный портативный компьютер, <br/> созданный для удобной игры как <br/> на консоли.</h1>
            </div>
            <Video
                web={'https://clan.cloudflare.steamstatic.com/images//39049601/e9e38855027abe43282cc404e5b2a0c3401c5972.mp4?origin=https://store.steampowered.com/'}
                mp4={'https://clan.cloudflare.steamstatic.com/images//39049601/5631a3ae1ed0c086f12cbef7e134264d80a9d3d8.webm?origin=https://store.steampowered.com/'}
            />
            <SteamDeckLarge games={gameData}/>

            <div className={`${styles['page__description']} container`}>
                <h1 className={styles['page__h1']}>STEAM DECK OLED</h1>
                <span>
                    Всё, за что вы любите Steam Deck, — теперь с OLED-экраном, увеличенным временем работы, более быстрым Wi-Fi и не только.
                </span>
            </div>
            <Video
                web={'https://clan.cloudflare.steamstatic.com/images//39049601/f1784a83bb2425052db9484ba6a6d91ee9740d40.mp4?origin=https://store.steampowered.com/'}
                mp4={'https://clan.cloudflare.steamstatic.com/images//39049601/7a205953c9b08d21aa44cd6e6efa5aa43e142778.webm?origin=https://store.steampowered.com/'}
            />
        </main>
    );
}
