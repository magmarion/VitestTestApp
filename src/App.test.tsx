// src/App.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component', () => {
    it('should render the headline', () => {
        render(<App />);
        const headline = screen.getByText("Emoji Tournament 🏆");
        expect(headline).toBeInTheDocument();
    });

    it('should start with two emojis for the first match', () => {
        render(<App />);
        const emoji1 = screen.getByText("😂");
        const emoji2 = screen.getByText("❤️");
        expect(emoji1).toBeInTheDocument();
        expect(emoji2).toBeInTheDocument();
    });

    it('should progress through matches and declare a winner', () => {
        render(<App />);
        // Keep clicking the first button until a winner is declared
        while (!screen.queryByText(/Winner: is/)) {
            const buttons = screen.getAllByRole('button');
            fireEvent.click(buttons[0]);
        }
        // Verify the winner is displayed
        expect(screen.getByText(/Winner: is/)).toBeInTheDocument();
    });
});
