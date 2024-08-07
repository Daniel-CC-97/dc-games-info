// app/components/GameCoverServer.tsx
import { fetchCover } from '@/lib/api';
import GameCover from '../components/game-cover';

interface GameCoverServerProps {
  id: number;
  small: boolean;
}

const GameCoverServer: React.FC<GameCoverServerProps> = async ({ id, small }) => {
  try {
    const coverData = await fetchCover(id);

    if (!coverData || coverData.length === 0) {
      return <p className="text-center text-sm">No cover available</p>;
    }

    const gameCover = coverData[0]; // Assuming fetchCover returns an array
    const imageUrl = `https://images.igdb.com/igdb/image/upload/t_cover_big/${gameCover.image_id}.jpg`;

    const containerSize = small ? { height: 200, width: 150 } : { height: 400, width: 300 };

    return (
      <GameCover
        imageUrl={imageUrl}
        height={containerSize.height}
        width={containerSize.width}
      />
    );
  } catch (error) {
    console.error('Error fetching cover:', error);
    return <p className="text-center text-sm">Error loading cover</p>;
  }
};

export default GameCoverServer;
