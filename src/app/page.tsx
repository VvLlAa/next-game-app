
import { SortFilter } from '@/src/shared/components/Filter/Home/SortFilter';
import styles from './page.module.scss';
import {VideoBackground} from "@/src/shared/components/UI/Video/VideoBackground";

import {fetchGamesHome} from "@/src/app/api/home/fetchGamesHome";
import {GameCardLarge} from "@/src/shared/components/GameCards/GameList/GameCardLarge";


export default async function HomePage() {
  const res = await fetchGamesHome();

  return (
    <main className={styles['main-page']}>
        <VideoBackground/>
        <section className={styles['main-page__content']}>
        <div className={styles['main-page__games-content']}>
            <GameCardLarge initialGames={res}/>
            <SortFilter />
        </div>
        </section>
    </main>
  );
}
