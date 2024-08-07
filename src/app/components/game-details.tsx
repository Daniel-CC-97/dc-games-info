import StarRating from './star-rating';
import GameThemes from './themes';
import GamePlatforms from './platforms';
import GameScreenshots from './screenshots';

interface GameDetailsProps {
  name: string;
  summary: string;
  total_rating: number;
  total_rating_count: number;
  first_release_date: number; // Unix timestamp
  themes: number[];
  platforms: number[];
  screenshots: number[];
}

const GameDetails: React.FC<GameDetailsProps> = ({
  name,
  summary,
  total_rating,
  total_rating_count,
  first_release_date,
  themes,
  platforms,
  screenshots
}) => {
  const releaseDate = new Date(first_release_date * 1000).toLocaleDateString();

  return (
    <div className="flex flex-col gap-2 overflow-hidden h-full"> {/* Ensure parent has a height */}
      <h1 className="font-bold text-2xl">{name}</h1>
      <div className="flex gap-2">
        <div className='w-full'>
          <div className='flex gap-4'></div>
          <div className="flex items-center">
            <StarRating rating={total_rating} />
            <span className="ml-2">({total_rating_count} votes)</span>
          </div>
          <p className="mt-2 text-lg"><span className="font-bold text-lg">Release Date:</span> {releaseDate}</p>
          <GameThemes themes={themes} />
          <GameScreenshots screenshots={screenshots} />
        </div>
      </div>
      <div>
        <GamePlatforms platformIds={platforms} />
        {summary && (
          <div>
            <h2 className="font-bold text-xl">Summary</h2>
            <p className="bg-darkGrey text-white p-2 rounded">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetails;
