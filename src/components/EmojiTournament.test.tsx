import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EmojiTournament from './EmojiTournament';


const EMOJIES = ["😀", "😂", "😍", "🤣"];

describe('EmojiTournament', () => {
    it('should rendern the first match with two emojies', () => {
        render(<EmojiTournament emojies={EMOJIES} />);

        expect(screen.getByRole('button', { name: "😀" })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: "😂" })).toBeInTheDocument();
    });

    it('should progress winner to the next round', () => {
        render(<EmojiTournament emojies={EMOJIES} />);

        fireEvent.click(screen.getByRole('button', { name: "😀" }));

        fireEvent.click(screen.getByRole('button', { name: "😍" }));

        expect(screen.getByRole('button', { name: "😀" })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: "😍" })).toBeInTheDocument();
    });

    it('should declare a final winner', () => {
        render(<EmojiTournament emojies={EMOJIES} />);

        fireEvent.click(screen.getByRole('button', { name: "😀" }));

        fireEvent.click(screen.getByRole('button', { name: "😍" }));

        fireEvent.click(screen.getByRole('button', { name: "😀" }));

        expect(screen.getByText("Winner: is 😀")).toBeInTheDocument();
    });
});