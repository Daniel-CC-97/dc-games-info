import { fetchPlatforms } from '@/lib/api';

interface GamePlatformsProps {
  platforms: number[];
}

export default async function GamePlatforms({ platforms }: GamePlatformsProps) {
  try {
    const platformsData = await fetchPlatforms(platforms);
    
    if (!platformsData || platformsData.length === 0) {
      return <p>No Platforms available</p>;
    }

    return (
      <div>
        <h2 className="font-bold text-xl">Platforms:</h2>
        <div className="flex flex-wrap gap-2"> {/* Flex container for inline display */}
          {platformsData.map((platform: { name: string }, index: number) => (
            <span key={index} className="bg-darkGrey text-white px-2 py-1 rounded">
              {platform.name}
            </span>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching platforms:', error);
    return <p>Error loading platforms</p>;
  }
}