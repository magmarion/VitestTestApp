import { useState } from "react";
import EmojiMatch from "./EmojiMatch";

interface EmojiTournamentProps {
    emojis: string[];
}

export default function EmojiTournament({ emojis }: EmojiTournamentProps) {
    const [currentRound, setCurrentRound] = useState(emojis);
    const [nextRound, setNextRound] = useState<string[]>([]);
    const [winners, setWinners] = useState<Record<number, string>>({});

    // Hantera tom lista
    if (currentRound.length === 0) {
        return <h2 className="text-2xl font-bold text-center my-8">Winner: is undefined</h2>;
    }

    // Hantera endast en emoji
    if (currentRound.length === 1) {
        return <h2 className="text-4xl font-bold text-center my-8">Winner: is {currentRound[0]}</h2>;
    }

    // Wrapper för att hantera vinnare för en specifik match
    const handleWinnerForMatch = (matchIndex: number) => (winner: string) => {
        setWinners((prev) => ({ ...prev, [matchIndex]: winner }));
        setNextRound((prev) => {
            const newNextRound = [...prev];
            newNextRound[matchIndex] = winner;
            return newNextRound;
        });

        // När alla matcher i runda har en vinnare
        if (Object.keys({ ...winners, [matchIndex]: winner }).length === currentRound.length / 2) {
            setCurrentRound([...nextRound, winner].filter(Boolean));
            setNextRound([]);
            setWinners({});
        }
    };

    // Rendera alla matcher i nuvarande runda
    const renderAllMatches = () => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                {Array.from({ length: currentRound.length / 2 }).map((_, i) => {
                    const emoji1 = currentRound[i * 2];
                    const emoji2 = currentRound[i * 2 + 1];
                    const matchWinner = winners[i];

                    return (
                        <div
                            key={i}
                            className={`p-4 bg-white rounded-xl shadow-lg border-2 border-gray-100`}
                        >
                            <div className="text-sm text-gray-500 mb-2">Match {i + 1}</div>
                            <EmojiMatch
                                emoji1={emoji1}
                                emoji2={emoji2}
                                onWinner={handleWinnerForMatch(i)}
                                isEliminated1={matchWinner !== undefined && matchWinner !== emoji1}
                                isEliminated2={matchWinner !== undefined && matchWinner !== emoji2}
                                winner={matchWinner}
                            />
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="py-8 px-4">
            <h2 className="text-2xl font-bold text-center mb-8">
                Round of {currentRound.length}
            </h2>
            {renderAllMatches()}
        </div>
    );
}
