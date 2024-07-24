import SimilarGame from '@/app/components/similar-game';

interface SimilarGamesListProps {
  similarGames: number[];
}

const SimilarGamesList: React.FC<SimilarGamesListProps> = ({ similarGames }) => (
  <div>
    <h2 className="font-bold text-xl">Games you might like</h2>
    <div className="flex gap-2 overflow-scroll">
      {similarGames.map((game) => (
        <SimilarGame key={game} id={game.toString()} />
      ))}
    </div>
  </div>
);

export default SimilarGamesList;
