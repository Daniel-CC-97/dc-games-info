import { fetchGameById } from "@/lib/api";
import GameCover from "./game-cover";
import Link from "next/link";

interface SimilarGameProps {
  id: string;
}

export default async function SimilarGame( {id} : SimilarGameProps) {
    
    const game = await fetchGameById(id); // Fetch game details by ID

    return (
        <div className="flex flex-col items-center">
            <Link href={`/game/${id}`} passHref>
                <GameCover id={game.cover} small={true}></GameCover>
                <h4>{game.name}</h4>
            </Link>
        </div>
    );
}