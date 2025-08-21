interface EmojiMatchProps {
    emoji1: string;
    emoji2: string;
    onWinner: (winner: string) => void;
    isEliminated1?: boolean;
    isEliminated2?: boolean;
    winner?: string;
}

export default function EmojiMatch({
    emoji1,
    emoji2,
    onWinner,
    isEliminated1 = false,
    isEliminated2 = false,
    winner,
}: EmojiMatchProps) {
    return (
        <div className="flex gap-2 justify-center items-center my-2">
            <button
                onClick={() => onWinner(emoji1)}
                disabled={isEliminated1}
                className={`
                    text-4xl p-4 rounded-lg border-2
                    ${isEliminated1 ? "bg-gray-300 border-gray-400" :
                        winner === emoji1 ? "bg-green-200 border-green-500" :
                            "bg-white border-gray-500"}
                `}
            >
                {emoji1}
            </button>
            <button
                onClick={() => onWinner(emoji2)}
                disabled={isEliminated2}
                className={`
                    text-4xl p-4 rounded-lg border-2
                    ${isEliminated2 ? "bg-gray-300 border-gray-400" :
                        winner === emoji2 ? "bg-green-200 border-green-500" :
                            "bg-white border-gray-500"}
                `}
            >
                {emoji2}
            </button>
        </div>
    );
}
