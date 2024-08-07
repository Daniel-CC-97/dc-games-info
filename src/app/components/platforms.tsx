import { fetchPlatformsById } from '@/lib/api';

interface Platform {
  id: number;
  name: string;
}

interface GamePlatformsProps {
  platformIds: number[];
}

export default async function GamePlatforms({ platformIds }: GamePlatformsProps) {
  try {
    const platformsData = await fetchPlatformsById(platformIds);
    
    if (!platformsData || platformsData.length === 0) {
      return <p>No platforms available.</p>;
    }

    return (
      <div>
        <h2 className="font-bold text-xl">Platforms</h2>
        <div className="flex flex-wrap gap-2">
          {platformsData.map((platform: Platform) => (
            <span key={platform.id} className="bg-darkGrey text-white px-2 py-1 rounded">
              {platform.name}
            </span>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching platforms:', error);
    return <p>Error loading platforms. Please try again later.</p>;
  }
}
