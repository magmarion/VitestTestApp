import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EmojiTournament from './EmojiTournament';

// Mocka EmojiMatch-komponenten
vi.mock('./EmojiMatch', () => ({
    default: ({ emoji1, emoji2, onWinner }: { emoji1: string; emoji2: string; onWinner: (winner: string) => void }) => (
        <div>
            <button onClick={() => onWinner(emoji1)}>{emoji1}</button>
            <button onClick={() => onWinner(emoji2)}>{emoji2}</button>
        </div>
    ),
}));

const EMOJIES = ["😀", "😂", "😍", "🤣"];

describe('EmojiTournament', () => {
    it('should render the first match with two emojis', () => {
        render(<EmojiTournament emojis={EMOJIES} />);
        expect(screen.getByRole('button', { name: "😀" })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: "😂" })).toBeInTheDocument();
    });

    it('should progress winner to the next round', () => {
        render(<EmojiTournament emojis={EMOJIES} />);
        fireEvent.click(screen.getByRole('button', { name: "😀" }));
        fireEvent.click(screen.getByRole('button', { name: "😍" }));
        expect(screen.getByRole('button', { name: "😀" })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: "😍" })).toBeInTheDocument();
    });

    it('should declare a final winner', () => {
        render(<EmojiTournament emojis={EMOJIES} />);
        // Simulera att användaren klickar på vinnarna i varje omgång
        fireEvent.click(screen.getByRole('button', { name: "😀" })); // Vinnare: 😀
        fireEvent.click(screen.getByRole('button', { name: "😍" })); // Vinnare: 😍
        fireEvent.click(screen.getByRole('button', { name: "😀" })); // Vinnare: 😀
        expect(screen.getByText("Winner: is 😀")).toBeInTheDocument();
    });

    // Edge case: Tom lista
    it('should handle empty emojis list', () => {
        render(<EmojiTournament emojis={[]} />);
        expect(screen.getByText("Winner: is undefined")).toBeInTheDocument();
    });

    // Edge case: En emoji
    it('should declare the single emoji as winner', () => {
        render(<EmojiTournament emojis={["😀"]} />);
        expect(screen.getByText("Winner: is 😀")).toBeInTheDocument();
    });
});
