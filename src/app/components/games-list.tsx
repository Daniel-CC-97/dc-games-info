import GameCover from './game-cover';
import Link from 'next/link';
import { Game } from '@/types';

interface GamesListProps {
  title: string;
  fetchFunction: () => Promise<Game[]>;
}

export default async function GamesList({ title, fetchFunction }: GamesListProps) {
  const games = await fetchFunction();

  return (
    <div className="flex flex-col gap-2 overflow-hidden">
      <h1 className="font-bold text-2xl">{title}</h1>
      <ul className="flex gap-2 lg:gap-4 overflow-x-auto">
        {games.length > 0 ? (
          games.map((game: Game) => (
            <li
              key={game.id}
              className="flex flex-col items-center"
            >
              <Link href={`/game/${game.id}`} passHref>
                <div className="relative overflow-hidden">
                  <GameCover id={game.cover} small={false} />
                </div>
                <h2 className="mt-2 text-center text-sm">{game.name}</h2>
              </Link>
            </li>
          ))
        ) : (
          <li className="text-center">No games available</li>
        )}
      </ul>
    </div>
  );
}