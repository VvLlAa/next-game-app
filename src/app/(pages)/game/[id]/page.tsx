import styles from './page.module.scss';
import { GameType } from '@/src/type/type';
import { fetchCardGame } from '@/src/app/api/card/fetchCardGame';
import { fetchGamesHome } from '@/src/app/api/home/fetchGamesHome';
import { GameDetail } from '@/src/app/(pages)/game/components/GameDetail';
import { fetchSteamDeck } from '@/src/app/api/steamDeck/fetchSteamDeck';

export const revalidate = 60;

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
  const res = await fetchGamesHome();
  const resSteamDeck = await fetchSteamDeck();

  const popularNewProductIds =
    res?.popularNewProducts?.map((card: GameType) => ({
      id: String(card.id),
    })) || [];

  const bestsellerProductIds =
    res?.bestsellerProducts?.map((card: GameType) => ({
      id: String(card.id),
    })) || [];

  const steamDeck =
    resSteamDeck?.map((card: GameType) => ({
      id: String(card.id),
    })) || [];

  return [...popularNewProductIds, ...bestsellerProductIds, ...steamDeck];
}

export default async function GamePage(props: { params: Params }) {
  const params = await props.params;
  const gameCard = await fetchCardGame(params.id);

  if (!gameCard) {
    return <div>Game not found</div>;
  }

  return (
    <div className={styles['game-page']}>
      <GameDetail gameCard={gameCard} />
    </div>
  );
}
