import GameDetails from '@/app/components/game-details';
import SimilarGamesList from '@/app/components/similar-games-list';
import Navbar from '@/app/components/nav';
import GameWebsites from '@/app/components/websites';
import { fetchGameById } from '@/lib/api';

interface GamePageProps {
  params: {
    id: string;
  };
}

const GamePage = async ({ params }: GamePageProps) => {
  const { id } = params;

  let game;
  try {
    game = await fetchGameById(id);
  } catch (error) {
    console.error("Error fetching game details:", error);
    return <p>Error loading game details</p>;
  }
  
  if (!game) {
    return <p>Game not found</p>;
  }

  const {
    name, cover, total_rating, total_rating_count, summary, storyline,
    similar_games, first_release_date, themes, platforms, websites, screenshots
  } = game;

  return (
    <div>
      <Navbar />
      <div className="p-1 lg:p-2 flex flex-col gap-2 lg:gap-4 overflow-hidden">
        <GameDetails
          name={name}
          summary={summary}
          total_rating={total_rating}
          total_rating_count={total_rating_count}
          first_release_date={first_release_date}
          themes={themes}
          platforms={platforms}
          screenshots={screenshots}
        />
        <SimilarGamesList similarGames={similar_games} />
        {storyline && <StorySection storyline={storyline} />}
        <GameWebsites websites={websites} />
      </div>
    </div>
  );
};

const StorySection = ({ storyline }: { storyline: string }) => (
  <div>
    <h2 className="font-bold text-xl">Story</h2>
    <p className="bg-darkGrey text-white p-2 rounded h-1/2 overflow-scroll whitespace-pre-wrap">
      {storyline}
    </p>
  </div>
);

export default GamePage;
