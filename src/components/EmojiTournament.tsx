import { useState } from "react";
import EmojiMatch from "./EmojiMatch";

interface EmojiTournamentProps {
    emojies: string[];
}

export default function EmojiTournament({ emojies }: EmojiTournamentProps) {
    const [currentRound, setCurrentRound] = useState(emojies);
    const [nextRound, setNextRound] = useState<string[]>([]);
    const [matchIndex, setMatchIndex] = useState(0);

    if (currentRound.length === 1) {
        return <h2>Winner: is {currentRound[0]}</h2>;
    }

    const emoji1 = currentRound[matchIndex * 2];
    const emoji2 = currentRound[matchIndex * 2 + 1];

    const handleWiinner = (winner: string) => {
        setNextRound([...nextRound, winner]);


        if (matchIndex === Math.floor(currentRound.length / 2) - 1) {
            setCurrentRound([...nextRound, winner]);
            setNextRound([]);
            setMatchIndex(0);
        } else {
            setMatchIndex(matchIndex + 1);
        }
    };

    return (
        <div>
            <h2>Round with {currentRound.length} emojies</h2>
            <EmojiMatch emoji1={emoji1} emoji2={emoji2} onWinner={handleWiinner} />
        </div>
    );
}
