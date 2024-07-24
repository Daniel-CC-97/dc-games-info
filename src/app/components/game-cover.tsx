import { fetchCover } from '@/lib/api';
import Image from 'next/image';

interface GameCoverProps {
  id: number;
  small: boolean;
}

export default async function GameCover({ id, small }: GameCoverProps) {
  try {
    const coverData = await fetchCover(id);
    
    if (!coverData || coverData.length === 0) {
      return <p className="text-center text-sm">No cover available</p>;
    }

    const gameCover = coverData[0]; // Assuming fetchCover returns an array
    const imageUrl = `https://images.igdb.com/igdb/image/upload/t_cover_big/${gameCover.image_id}.jpg`;

    // Use responsive height and width
    let containerHeight: string | number = '';
    let containerWidth: string | number = '';

    if ( small ) {
      containerHeight = small ? 200 : 400;
      containerWidth = small ? 150 : 300;
    }

    return (
      <div className="relative w-cover-small h-cover-small lg:w-cover-large lg:h-cover-large" style={{ height: containerHeight, width: containerWidth }}>
        <Image
          src={imageUrl}
          alt={`Cover image for game with ID ${id}`}
          fill={true}
          objectFit='cover'
          quality={100}
          className="transition-transform duration-300 ease-in-out transform hover:scale-105"
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching cover:', error);
    return <p className="text-center text-sm">Error loading cover</p>;
  }
}
