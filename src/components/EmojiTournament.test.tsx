import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import EmojiTournament from './EmojiTournament';

const EMOJIES = ["😀", "😂", "😍", "🤣"];

describe('EmojiTournament', () => {

    beforeEach(() => {
        vi.spyOn(Storage.prototype, "setItem");
    });

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
        expect(screen.getByText("Winner: 😀")).toBeInTheDocument();

        expect(localStorage.setItem).toHaveBeenCalledWith("winner", "😀");
    });

    it('should handle empty emojis list', () => {
        render(<EmojiTournament emojis={[]} />);
        expect(screen.getByText("Winner: is undefined")).toBeInTheDocument();
    });

    it('should declare the single emoji as winner', () => {
        render(<EmojiTournament emojis={["😀"]} />);
        expect(screen.getByText("Winner: 😀")).toBeInTheDocument();

        expect(localStorage.setItem).toHaveBeenCalledWith("winner", "😀");
    });

    it('should progress through all rounds and declare a winner', () => {
        render(<EmojiTournament emojis={["😀", "😂", "😍", "🤣"]} />);
        fireEvent.click(screen.getByRole('button', { name: "😀" }));
        fireEvent.click(screen.getByRole('button', { name: "😍" }));
        fireEvent.click(screen.getByRole('button', { name: "😀" }));
        expect(screen.getByText(/Winner:.*😀/)).toBeInTheDocument();

        expect(localStorage.setItem).toHaveBeenCalledWith("winner", "😀");
    });

    it('should not progress to next round until all matches are played', () => {
        render(<EmojiTournament emojis={["😀", "😂", "😍", "🤣"]} />);
        fireEvent.click(screen.getByRole('button', { name: "😀" }));
        expect(screen.queryByText(/Winner:/)).not.toBeInTheDocument();
        expect(screen.getByText("Round of 4")).toBeInTheDocument();
    });
});
