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

        // 1st btn test
        const button1 = screen.getByRole('button', { name: "😃" });
        fireEvent.click(button1);
        expect(mockOnWinner).toHaveBeenCalledWith("😃");

        // 2nd btn test
        const button2 = screen.getByRole('button', { name: "😂" });
        fireEvent.click(button2);
        expect(mockOnWinner).toHaveBeenCalledWith("😂");

        // Check if both btns were clicked
        expect(mockOnWinner).toHaveBeenCalledTimes(2);
    });
});
