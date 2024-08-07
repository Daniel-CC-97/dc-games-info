// components/GameCover.tsx
import Image from 'next/image';

interface GameCoverProps {
  imageUrl: string;
  height: number;
  width: number;
}

const GameCover: React.FC<GameCoverProps> = ({ imageUrl, height, width }) => {
  return (
    <div
      className="relative"
      style={{ height, width }}
    >
      <Image
        src={imageUrl}
        alt="Game cover"
        fill
        objectFit="cover"
        quality={100}
        className="transition-transform duration-300 ease-in-out transform hover:scale-105"
      />
    </div>
  );
};

export default GameCover;
