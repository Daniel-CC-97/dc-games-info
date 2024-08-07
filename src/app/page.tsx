// app/page.tsx
import Navbar from './components/nav';
import GamesList from './components/games-list';
import { fetchTopGames, fetchNewestGames, fetchTopMultiplayerGames, fetchTopCoopGames } from '@/lib/api';

const Home = async () => {
  // Fetch data server-side
  const [topGames, newestGames, topMultiplayerGames, topCoopGames] = await Promise.all([
    fetchTopGames(),
    fetchNewestGames(),
    fetchTopMultiplayerGames(),
    fetchTopCoopGames(),
  ]);

  const gamesListData = [
    { title: 'Top 10 Games', games: topGames },
    { title: 'New Games', games: newestGames },
    { title: 'Top 10 Multiplayer Games', games: topMultiplayerGames },
    { title: 'Top 10 Coop Games', games: topCoopGames },
  ];

  return (
    <div>
      <Navbar />
      <div className="p-1 lg:p-2 flex flex-col gap-4 overflow-hidden">
        {gamesListData.map(({ title, games }) => (
          <GamesList key={title} title={title} games={games} />
        ))}
      </div>
    </div>
  );
};

export default Home;
