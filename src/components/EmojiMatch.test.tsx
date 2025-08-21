import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EmojiMatch from './EmojiMatch';

describe('EmojiMatch', () => {
    it('should render two emojis as buttons', () => {
        render(<EmojiMatch emoji1="😃" emoji2="😂" onWinner={vi.fn()} />);
        expect(screen.getByRole('button', { name: "😃" })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: "😂" })).toBeInTheDocument();
    });

    it('should call onWinner with the selected emoji', () => {
        const mockOnWinner = vi.fn();
        render(<EmojiMatch emoji1="😃" emoji2="😂" onWinner={mockOnWinner} />);
        const button1 = screen.getByRole('button', { name: "😃" });
        fireEvent.click(button1);
        expect(mockOnWinner).toHaveBeenCalledWith("😃");
        const button2 = screen.getByRole('button', { name: "😂" });
        fireEvent.click(button2);
        expect(mockOnWinner).toHaveBeenCalledWith("😂");
        expect(mockOnWinner).toHaveBeenCalledTimes(2);
    });

    it('should disable and style eliminated button correctly', () => {
        render(
            <EmojiMatch
                emoji1="😃"
                emoji2="😂"
                onWinner={vi.fn()}
                isEliminated1
            />
        );
        const button1 = screen.getByRole('button', { name: "😃" });
        expect(button1).toBeDisabled();
        expect(button1.className).toMatch(/bg-gray-300/);
    });

    it('should highlight the winner button', () => {
        render(
            <EmojiMatch
                emoji1="😃"
                emoji2="😂"
                onWinner={vi.fn()}
                winner="😂"
            />
        );
        const button2 = screen.getByRole('button', { name: "😂" });
        expect(button2.className).toMatch(/bg-green-200/);
    });

    it('should apply correct styles for eliminated emoji2', () => {
        render(
            <EmojiMatch
                emoji1="😃"
                emoji2="😂"
                onWinner={vi.fn()}
                isEliminated2
            />
        );
        const button2 = screen.getByRole('button', { name: "😂" });
        expect(button2).toBeDisabled();
        expect(button2.className).toMatch(/bg-gray-300/);
    });

    it('should apply correct styles for winner emoji1', () => {
        render(
            <EmojiMatch
                emoji1="😃"
                emoji2="😂"
                onWinner={vi.fn()}
                winner="😃"
            />
        );
        const button1 = screen.getByRole('button', { name: "😃" });
        expect(button1.className).toMatch(/bg-green-200/);
    });

    it('should apply default styles when neither is eliminated nor winner', () => {
        render(
            <EmojiMatch
                emoji1="😃"
                emoji2="😂"
                onWinner={vi.fn()}
            />
        );
        const button1 = screen.getByRole('button', { name: "😃" });
        const button2 = screen.getByRole('button', { name: "😂" });
        expect(button1.className).toMatch(/bg-white/);
        expect(button2.className).toMatch(/bg-white/);
    });
});
