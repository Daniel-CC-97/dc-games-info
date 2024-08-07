import { fetchThemesById } from '@/lib/api';

interface GameThemesProps {
  themes: number[];
}

interface Theme {
  id: number;
  name: string;
}

const GameThemes = async ({ themes }: GameThemesProps) => {
  let themesData: Theme[] = [];
  let error: string | null = null;

  try {
    themesData = await fetchThemesById(themes);
  } catch (err) {
    console.error('Error fetching themes:', err);
    error = 'Error loading themes';
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (themesData.length === 0) {
    return <p>No themes available</p>;
  }

  return (
    <div className="text-lg">
      <p className="font-bold text-xl">Themes</p>
      <div className="flex flex-wrap gap-2">
        {themesData.map((theme) => (
          <span key={theme.id} className="bg-darkGrey text-white px-2 py-1 rounded">
            {theme.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default GameThemes;
