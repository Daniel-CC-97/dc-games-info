import { fetchThemes } from '@/lib/api';

interface GameThemesProps {
  themes: number[];
}

export default async function GameThemes({ themes }: GameThemesProps) {
  try {
    const themesData = await fetchThemes(themes);
    
    if (!themesData || themesData.length === 0) {
      return <p>No themes available</p>;
    }

    return (
      <div>
        <p className="font-bold">Themes:</p>
        <div className="flex flex-wrap gap-2"> {/* Flex container for inline display */}
          {themesData.map((theme: { name: string }, index: number) => (
            <span key={index} className="bg-darkGrey text-white px-2 py-1 rounded">
              {theme.name}
            </span>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching themes:', error);
    return <p>Error loading themes</p>;
  }
}

