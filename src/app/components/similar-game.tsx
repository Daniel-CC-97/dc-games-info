import { fetchGameById } from "@/lib/api";
import GameCoverServer from "../server-components/game-cover-server";
import Link from "next/link";

interface SimilarGameProps {
  id: string;
}

export default async function SimilarGame( {id} : SimilarGameProps) {
    
    const game = await fetchGameById(id); // Fetch game details by ID

    return (
        <div className="flex flex-col items-center">
            <Link href={`/game/${id}`} passHref>
                <GameCoverServer id={game.cover} small={true} />
                <h4 className="text-white text-center">{game.name}</h4>
            </Link>
        </div>
    );
}