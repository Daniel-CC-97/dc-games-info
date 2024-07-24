import GameCover from '@/app/components/game-cover';

interface GameDetailsProps {
  name: string;
  cover: number;
  storyline: string;
  summary: string;
}

const GameDetails: React.FC<GameDetailsProps> = ({ name, cover, storyline, summary }) => (
  <div className="px-16 py-4 flex flex-col gap-2 overflow-hidden">
    <h1 className="font-bold text-2xl">{name}</h1>
    <div className="flex gap-2 h-[400px]">
      <div className="relative w-[300px] h-[400px]">
        <GameCover id={cover} small={false} />
      </div>
      <p className="bg-darkGrey p-2 rounded h-1/2 overflow-scroll">{storyline}</p>
    </div>
    <p className="bg-darkGrey p-2 rounded">{summary}</p>
  </div>
);

export default GameDetails;
