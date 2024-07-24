import GamesList from './components/games-list';
import { fetchTopGames, fetchNewestGames, fetchTopMultiplayerGames, fetchTopCoopGames } from '@/lib/api';


const Home: React.FC = () => {

  return (
    <div>
        <div className="p-4 flex flex-col gap-4 overflow-hidden">
          <GamesList title='Top 10 Games' fetchFunction={fetchTopGames}></GamesList>
          <GamesList title='New Games' fetchFunction={fetchNewestGames}></GamesList>
          <GamesList title='Top 10 Multiplayer Games' fetchFunction={fetchTopMultiplayerGames}></GamesList>
          <GamesList title='Top 10 Coop Games' fetchFunction={fetchTopCoopGames}></GamesList>
        </div>
    </div>
  );
};

export default Home;