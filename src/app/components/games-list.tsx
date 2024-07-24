import { fetchTopGames } from '@/lib/api';
import GamesCover from './game';
import Link from 'next/link';

import { Game } from '@/types'

export default async function GamesList() {
  const games = await fetchTopGames();
  
  return (
    <div className="flex flex-col gap-2 overflow-hidden">
      <h1 className="font-bold text-2xl">Top 10 Games</h1>
      <ul className="flex gap-3 overflow-scroll">
        {games.length > 0 ? (
          games.map((game : Game) => (
            <li key={game.id} className="flex flex-col items-center">
                <Link href={`/game/${game.id}`} passHref>
                    <GamesCover id={game.cover} small={false} />
                    <h2 className="mt-2 text-center">{game.name}</h2>
                </Link>
            </li>
          ))
        ) : (
          <li>No games available</li>
        )}
      </ul>
    </div>
  );
}

