import GameCover from '@/app/components/game-cover';
import StarRating from './star-rating';
import GameThemes from './themes';
import GamePlatforms from './platforms';

interface GameDetailsProps {
  name: string;
  cover: number;
  summary: string;
  total_rating: number;
  total_rating_count: number;
  first_release_date: number; // Unix timestamp
  themes: [number];
  platforms: [number];
}

const GameDetails: React.FC<GameDetailsProps> = ({
  name,
  cover,
  summary,
  total_rating,
  total_rating_count,
  first_release_date,
  themes,
  platforms
}) => {
  // Convert Unix timestamp to a human-readable date
  const releaseDate = new Date(first_release_date * 1000).toLocaleDateString(); // Convert to milliseconds

  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <h1 className="font-bold text-2xl">{name}</h1>
      <div className="flex gap-2">
        <div className="relative">
          <GameCover id={cover} small={false} />
        </div>
        <div>
          <div className="flex items-center">
            <StarRating rating={total_rating} />
            <span className="ml-2">({total_rating_count} votes)</span>
          </div>
          <p className="mt-2 text-sm"><span className="font-bold text-base">Release Date:</span> {releaseDate}</p> {/* Display formatted date */}
        <GameThemes themes={themes}></GameThemes>
        </div>
      </div>
      <div>
        <GamePlatforms platforms={platforms}></GamePlatforms>
        <h2 className="font-bold text-xl">Summary</h2>
        <p className="bg-darkGrey text-white p-2 rounded">{summary}</p>
      </div>
    </div>
  );
};

export default GameDetails;

