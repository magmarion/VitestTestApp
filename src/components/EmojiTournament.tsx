import { useState } from "react";
import EmojiMatch from "./EmojiMatch";

interface EmojiTournamentProps {
    emojis: string[];
}

export default function EmojiTournament({ emojis }: EmojiTournamentProps) {
    const [currentRound, setCurrentRound] = useState<string[]>(emojis);
    const [nextRound, setNextRound] = useState<string[]>([]);
    const [eliminated, setEliminated] = useState<string[]>([]);
    const [winners, setWinners] = useState<Record<number, string>>({});

    if (currentRound.length === 0) {
        return (
            <h2 className="text-2xl font-bold text-center my-8">
                Winner: is undefined
            </h2>
        );
    }
    if (currentRound.length === 1) {
        return (
            <h2 className="text-4xl font-bold text-center my-8">
                Winner: is {currentRound[0]}
            </h2>

        );
    }

    const handleWinner = (matchIndex: number, winner: string) => {
        const emojiA = currentRound[matchIndex * 2];
        const emojiB = currentRound[matchIndex * 2 + 1];
        const loser = winner === emojiA ? emojiB : emojiA;

        setEliminated((prev) => [...prev, loser]);
        setWinners((prev) => ({ ...prev, [matchIndex]: winner }));

        setNextRound((prev) => {
            const newNextRound = [...prev];
            newNextRound[matchIndex] = winner;
            return newNextRound;
        });

        const totalMatches = currentRound.length / 2;
        const playedMatches = Object.keys({ ...winners, [matchIndex]: winner }).length;
        if (playedMatches === totalMatches) {
            setCurrentRound(nextRound.filter(Boolean).concat(winner));
            setNextRound([]);
            setEliminated([]);
            setWinners({});
        }
    };

    const renderRound = () => {
        return (
            <div className="flex flex-row justify-center items-center gap-4 my-8">
                {Array.from({ length: currentRound.length / 2 }).map((_, i) => {
                    const emojiA = currentRound[i * 2];
                    const emojiB = currentRound[i * 2 + 1];
                    const isEliminatedA = eliminated.includes(emojiA);
                    const isEliminatedB = eliminated.includes(emojiB);
                    const winner = winners[i];

                    return (
                        <EmojiMatch
                            key={i}
                            emoji1={emojiA}
                            emoji2={emojiB}
                            onWinner={(winner) => handleWinner(i, winner)}
                            isEliminated1={isEliminatedA}
                            isEliminated2={isEliminatedB}
                            winner={winner}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <div className="py-8 px-4"> {/* <--- ingen bg-färg här längre */}
            <h2 className="text-2xl font-bold text-center mb-8">
                Round of {currentRound.length}
            </h2>
            {renderRound()}
        </div>
    );
}
