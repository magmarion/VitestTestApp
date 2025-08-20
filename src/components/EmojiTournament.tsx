// src/components/EmojiTournament.tsx
import { useState } from "react";
import EmojiMatch from "./EmojiMatch";

interface EmojiTournamentProps {
    emojis: string[];
}

export default function EmojiTournament({ emojis }: EmojiTournamentProps) {
    const [currentRound, setCurrentRound] = useState(emojis);
    const [nextRound, setNextRound] = useState<string[]>([]);
    const [matchIndex, setMatchIndex] = useState(0);

    // Handle empty emojis array
    if (currentRound.length === 0) {
        return <h2>Winner: is undefined</h2>;
    }

    if (currentRound.length === 1) {
        return <h2>Winner: is {currentRound[0]}</h2>;
    }

    const emoji1 = currentRound[matchIndex * 2];
    const emoji2 = currentRound[matchIndex * 2 + 1];

    const handleWinner = (winner: string) => {
        const newNextRound = [...nextRound, winner];
        if (matchIndex === Math.floor(currentRound.length / 2) - 1) {
            // All matches in this round are done, move to the next round
            setCurrentRound(newNextRound);
            setNextRound([]);
            setMatchIndex(0);
        } else {
            // Move to the next match
            setNextRound(newNextRound);
            setMatchIndex(matchIndex + 1);
        }
    };

    return (
        <div>
            <h2>Round of {currentRound.length} </h2>
            <EmojiMatch
                emoji1={emoji1}
                emoji2={emoji2}
                onWinner={handleWinner}
            />
        </div>
    );
}
