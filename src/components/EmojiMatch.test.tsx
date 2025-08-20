import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EmojiMatch from './EmojiMatch';

describe('EmojiMatch', () => {
    it('should render two emojies as buttons', () => {
        render(<EmojiMatch emoji1="😃" emoji2="😂" onWinner={vi.fn()} />);

        expect(screen.getByRole('button', { name: "😃" })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: "😂" })).toBeInTheDocument();
    });

    it('should call onWinner with the selected emoji', () => {
        const onWinner = vi.fn();
        render(<EmojiMatch emoji1="😃" emoji2="😂" onWinner={onWinner} />);

        const button1 = screen.getByRole('button', { name: "😃" });

        fireEvent.click(button1);

        expect(onWinner).toHaveBeenCalledWith("😃");
    });
});