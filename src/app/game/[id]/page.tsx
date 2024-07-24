import StarRating from '@/app/components/star-rating';
import GameDetails from '@/app/components/game-details';
import SimilarGamesList from '@/app/components/similar-games-list';
import { fetchGameById } from '@/lib/api';

interface GamePageProps {
    params: {
      id: string;
    };
  }
  
  export default async function GamePage({ params }: GamePageProps) {
    const { id } = params;
    const game = await fetchGameById(id);
  
    if (!game) {
      return <p>Game not found</p>;
    }
  
    const { name, cover, total_rating, total_rating_count, summary, storyline, similar_games } = game;
  
    return (
      <div className="px-16 py-4 flex flex-col gap-2 overflow-hidden">
        <GameDetails name={name} cover={cover} storyline={storyline} summary={summary} />
        <div className="flex items-center">
          <StarRating rating={total_rating} />
          <span className="ml-2">({total_rating_count} votes)</span>
        </div>
        <SimilarGamesList similarGames={similar_games} />
      </div>
    );
  }


