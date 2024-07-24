import { fetchCover } from '@/lib/api';
import Image from 'next/image';

interface GamesCoverProps {
  id: number;
  small: boolean;
}

export default async function GamesCover({ id, small }: GamesCoverProps) {
  try {
    const coverData = await fetchCover(id);
    
    if (!coverData || coverData.length === 0) {
      return <p>No cover available</p>;
    }

    const gameCover = coverData[0]; // Assuming fetchCover returns an array
    const imageUrl = `https://images.igdb.com/igdb/image/upload/t_cover_big/${gameCover.image_id}.jpg`;

    // Determine the size based on the 'small' prop
    const containerHeight = small ? 200 : 400;
    const containerWidth = small ? 150 : 300;

    return (
      <div style={{ height: containerHeight, width: containerWidth, position: 'relative' }}>
        <Image
          src={imageUrl}
          alt={`Cover image for game with ID ${id}`}
          fill={true}
          objectFit="cover" // Ensure the image covers the area without distortion
          quality={100}
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching cover:', error);
    return <p>Error loading cover</p>;
  }
}



