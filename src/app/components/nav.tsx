// components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container flex gap-4 items-center">
          <Link href="/">
            <h1 className="text-3xl font-bold text-secondary">DC-Games-Info</h1>
          </Link>
          <Link href="/find-my-game">
            <h4 className="text-white font-bold">Find My Perfect Game</h4>
          </Link>
      </div>
    </nav>
  );
};

export default Navbar;
