'use client'
import { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/nav';

interface Genre {
  id: number;
  name: string;
}

interface Theme {
  id: number;
  name: string;
}

interface Platform {
  id: number;
  name: string;
}

interface Game {
  id: number;
  name: string;
  cover?: {
    image_id: string;
  };
}

export default function FindMyGame() {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<number[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<number[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch genres, themes, and platforms on mount
    const fetchData = async () => {
      try {
        const [genresRes, themesRes, platformsRes] = await Promise.all([
          fetch('/api/genres'),
          fetch('/api/themes'),
          fetch('/api/platforms')
        ]);
        
        const genresData = await genresRes.json();
        const themesData = await themesRes.json();
        const platformsData = await platformsRes.json();

        setGenres(genresData);
        setThemes(themesData);
        setPlatforms(platformsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleGenreChange = (genreId: number) => {
    setSelectedGenres((prevSelected) =>
      prevSelected.includes(genreId)
        ? prevSelected.filter((id) => id !== genreId)
        : [...prevSelected, genreId]
    );
  };

  const handleThemeChange = (themeId: number) => {
    setSelectedThemes((prevSelected) =>
      prevSelected.includes(themeId)
        ? prevSelected.filter((id) => id !== themeId)
        : [...prevSelected, themeId]
    );
  };

  const handlePlatformChange = (platformId: number) => {
    setSelectedPlatforms((prevSelected) =>
      prevSelected.includes(platformId)
        ? prevSelected.filter((id) => id !== platformId)
        : [...prevSelected, platformId]
    );
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);
    try {
      const response = await fetch('/api/find-games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ genres: selectedGenres, themes: selectedThemes, platforms: selectedPlatforms }),
      });

      const data: Game[] = await response.json();
      setGames(data);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div>
        <Navbar></Navbar>
        <div className='p-4'>
            <h1 className="text-2xl font-bold mb-4">Find My Game</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className='flex flex-col gap-4'>
                    <div>
                        <h2 className="text-xl font-semibold">Genres</h2>
                        <div className='flex gap-2 flex-wrap'>
                            {genres.map((genre) => (
                            <div key={genre.id} className="flex items-center">
                                <input
                                type="checkbox"
                                value={genre.id}
                                onChange={() => handleGenreChange(genre.id)}
                                checked={selectedGenres.includes(genre.id)}
                                className="hidden"
                                id={`genre-${genre.id}`}
                                />
                                <label
                                htmlFor={`genre-${genre.id}`}
                                className={`cursor-pointer p-2 border rounded-lg transition-colors duration-300 ${
                                    selectedGenres.includes(genre.id)
                                    ? 'bg-success text-white border-success'
                                    : 'bg-darkGrey text-secondary border-border'
                                }`}
                                >
                                {genre.name}
                                </label>
                            </div>
                            ))}
                        </div>
                    </div>

                <div>
                    <h2 className="text-xl font-semibold">Themes</h2>
                    <div className='flex gap-2 flex-wrap'>
                        {themes.map((theme) => (
                        <div key={theme.id} className="flex items-center">
                            <input
                            type="checkbox"
                            value={theme.id}
                            onChange={() => handleThemeChange(theme.id)}
                            checked={selectedThemes.includes(theme.id)}
                            className="hidden"
                            id={`theme-${theme.id}`}
                            />
                            <label
                            htmlFor={`theme-${theme.id}`}
                            className={`cursor-pointer p-2 border rounded-lg transition-colors duration-300 ${
                                selectedThemes.includes(theme.id)
                                ? 'bg-success text-white border-success'
                                : 'bg-darkGrey text-secondary border-border'
                            }`}
                            >
                            {theme.name}
                            </label>
                        </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">Platforms</h2>
                    <div className='flex gap-2 flex-wrap'>
                        {platforms.map((platform) => (
                        <div key={platform.id} className="flex items-center">
                            <input
                            type="checkbox"
                            value={platform.id}
                            onChange={() => handlePlatformChange(platform.id)}
                            checked={selectedPlatforms.includes(platform.id)}
                            className="hidden"
                            id={`platform-${platform.id}`}
                            />
                            <label
                            htmlFor={`platform-${platform.id}`}
                            className={`cursor-pointer p-2 border rounded-lg transition-colors duration-300 ${
                                selectedPlatforms.includes(platform.id)
                                ? 'bg-success text-white border-success'
                                : 'bg-darkGrey text-secondary border-border'
                            }`}
                            >
                            {platform.name}
                            </label>
                        </div>
                        ))}
                    </div>
                </div>
                </div>

                <button
                type="submit"
                className="bg-primary text-white py-2 px-4 rounded-lg"
                >
                {loading ? 'Loading...' : 'Find Games'}
                </button>
            </form>

            <div className="mt-8">
                <div className="flex flex-col gap-2 overflow-hidden">
                    <h2 className="text-xl font-semibold mb-2">Games</h2>
                    <ul className='flex gap-2 lg:gap-4 overflow-x-auto'>
                    {games.map((game) => (
                        <Link href={`/game/${game.id}`} passHref>
                            <li key={game.id} className="flex flex-col items-center">
                                {game.cover?.image_id && (
                                    <div className='relative w-cover-small h-cover-small lg:w-cover-large lg:h-cover-large'>
                                        <Image 
                                            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                                            alt={`Cover image for game: ${game.name}`}
                                            fill={true}
                                            objectFit='cover'
                                            quality={100}
                                            className='transtion-transform duration-300 ease-in-out transform hover:scale-105'
                                        />
                                    </div>
                                )}
                                <span>{game.name}</span>
                            </li>
                        </Link>
                    ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
  );
}
