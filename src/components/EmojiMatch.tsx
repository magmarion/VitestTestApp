import React from "react";

interface EmojiMatchProps {
    emoji1: string;
    emoji2: string;
    onWinner: (winner: string) => void;
}

export default function EmojiMatch({ emoji1, emoji2, onWinner }: EmojiMatchProps) {
    return (
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <button
                onClick={() => onWinner(emoji1)}
            >
                {emoji1}
            </button>

            <button
                onClick={() => onWinner(emoji2)}
            >
                {emoji2}
            </button>
        </div>
    );
}