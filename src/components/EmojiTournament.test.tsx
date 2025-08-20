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
        render(<EmojiTournament emojis={["😀", "😂"]} />);
        fireEvent.click(screen.getByRole('button', { name: "😀" }));
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

    // Edge case: Udda antal emojis
    it('should handle odd number of emojis', () => {
        render(<EmojiTournament emojis={["😀", "😂", "😍"]} />);
        fireEvent.click(screen.getByRole('button', { name: "😀" }));
        expect(screen.getByText("Winner: is 😀")).toBeInTheDocument();
    });

    // Omfattande test: Alla omgångar
    it('should progress through all rounds and declare a winner', () => {
        render(<EmojiTournament emojis={["😀", "😂", "😍", "🤣"]} />);
        // Första omgången
        fireEvent.click(screen.getByRole('button', { name: "😀" }));
        fireEvent.click(screen.getByRole('button', { name: "😍" }));
        // Andra omgången
        fireEvent.click(screen.getByRole('button', { name: "😀" }));
        // Vinnare deklareras
        expect(screen.getByText("Winner: is 😀")).toBeInTheDocument();
    });

    // Omfattande test: State-updatering
    it('should update currentRound and nextRound correctly', () => {
        render(<EmojiTournament emojis={["😀", "😂", "😍", "🤣"]} />);
        // Första omgången
        fireEvent.click(screen.getByRole('button', { name: "😀" }));
        fireEvent.click(screen.getByRole('button', { name: "😍" }));
        // Kontrollera att nästa omgång har rätt emojis
        expect(screen.getByRole('button', { name: "😀" })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: "😍" })).toBeInTheDocument();
    });
});
