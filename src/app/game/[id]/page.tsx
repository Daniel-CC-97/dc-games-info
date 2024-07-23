import GamesCover from '@/app/components/game';
import SimilarGame from '@/app/components/similar-game';
import { fetchGameById } from '@/lib/api'; // Ensure this function is defined to fetch game data by ID

interface GamePageProps {
  params: {
    id: string;
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = params;
  const game = await fetchGameById(id); // Fetch game details by ID
  
  if (!game) {
    return <p>Game not found</p>;
  }

  const { name, cover, total_rating, total_rating_count, summary, storyline, similar_games } = game;

  return (
    <div className="px-16 py-4 flex flex-col gap-2">
      <h1 className="font-bold text-2xl">{name}</h1>
      <div className="flex gap-2 h-[400px]">
        <div className="relative w-[300px] h-[400px]">
            <GamesCover id={cover} small={false}></GamesCover>
        </div>
        <p className="bg-darkGrey p-2 rounded h-1/2 overflow-scroll">{storyline}</p>
      </div>
      <p>Rating: {total_rating} ({total_rating_count} votes)</p>
      <p className="bg-darkGrey p-2 rounded">{summary}</p>
      <h2 className="font-bold text-xl">Games you might like</h2>
      <div className="flex gap-2">
        {similar_games.map((game : number) => (
            <SimilarGame id={game.toString()}></SimilarGame>
        ))}
      </div>
    </div>
  );
}
