import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 px-1 py-4 lg:px-2 shadow-lg">
      <div className="container flex items-center gap-6">
        <Link href="/" className="text-3xl font-bold text-secondary">
          DC Games
        </Link>
        <Link href="/find-my-game" className="text-white font-bold">
          Find My Perfect Game
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;


