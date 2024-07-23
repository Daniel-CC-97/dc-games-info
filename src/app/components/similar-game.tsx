import { fetchGameById } from "@/lib/api";
import GamesCover from "./game";

interface SimilarGameProps {
  id: string;
}

export default async function SimilarGame( {id} : SimilarGameProps) {
    
    const game = await fetchGameById(id); // Fetch game details by ID

    return (
        <div className="flex flex-col items-center">
            <GamesCover id={game.cover} small={true}></GamesCover>
            <h4>{game.name}</h4>
        </div>
    );
}