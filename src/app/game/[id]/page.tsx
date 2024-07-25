import GameDetails from '@/app/components/game-details';
import SimilarGamesList from '@/app/components/similar-games-list';
import Navbar from '@/app/components/nav';
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
    
    const { name, cover, total_rating, total_rating_count, summary, storyline, similar_games, first_release_date, themes, platforms } = game;

    return (
        <div>
            <Navbar></Navbar>
            <div className="p-1 lg:p-2 flex flex-col gap-2 lg:gap-4 overflow-hidden">
                <GameDetails name={name} cover={cover} summary={summary} total_rating={total_rating} total_rating_count={total_rating_count} first_release_date={first_release_date} themes={themes} platforms={platforms} />
                <SimilarGamesList similarGames={similar_games} />
                <div>
                    <h2 className="font-bold text-xl">Story</h2>
                    <p className="bg-darkGrey text-white p-2 rounded h-1/2 overflow-scroll whitespace-pre-wrap">
                    {storyline}
                    </p>
                </div>
            </div>

        </div>
    );
}

