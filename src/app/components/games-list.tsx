// components/games-list.tsx
import Link from 'next/link';
import { Game } from '@/types';
import GameCoverServer from '../server-components/game-cover-server';

interface GamesListProps {
  title: string;
  games: Game[];
}

const GamesList: React.FC<GamesListProps> = ({ title, games }) => {
  return (
    <div className="flex flex-col gap-2 overflow-hidden">
      <h1 className="font-bold text-2xl">{title}</h1>
      <ul className="flex gap-2 lg:gap-4 overflow-x-auto">
        {games.length > 0 ? (
          games.map((game) => (
            <li key={game.id} className="flex flex-col items-center">
              <Link href={`/game/${game.id}`} passHref>
                <div className="relative overflow-hidden">
                  <GameCoverServer id={game.cover} small={false} />
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
};

export default GamesList;
