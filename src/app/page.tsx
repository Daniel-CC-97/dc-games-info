import GamesList from './components/games-list';

const Home: React.FC = () => {

  return (
    <div>
        <div className="p-4">
          {/* Main content visible after the welcome screen */}
          <GamesList></GamesList>
        </div>
    </div>
  );
};

export default Home;


