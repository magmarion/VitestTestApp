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
    winner
    
}: EmojiMatchProps) {

    const getButtonClass = (emoji: string, isEliminated: boolean) => {
        let baseClass = "text-5xl p-4 rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-4 border-2 ";

        if (winner === emoji) {
            return baseClass + "bg-green-200 border-green-400 scale-110 cursor-default";
        }

        if (isEliminated) {
            return baseClass + "bg-gray-300 border-gray-400 opacity-50 cursor-not-allowed";
        }

        return baseClass + "bg-white border-gray-300 hover:shadow-lg hover:scale-110 hover:border-blue-300 cursor-pointer";
    };

    return (
        <div className="flex items-center justify-center gap-6 p-4">
            <button
                onClick={() => !isEliminated1 && onWinner(emoji1)}
                className={getButtonClass(emoji1, isEliminated1)}
                disabled={isEliminated1}
            >
                {emoji1}
            </button>

            <span className="text-xl text-gray-500 font-medium">vs</span>

            <button
                onClick={() => !isEliminated2 && onWinner(emoji2)}
                className={getButtonClass(emoji2, isEliminated2)}
                disabled={isEliminated2}
            >
                {emoji2}
            </button>
        </div>
    );
}