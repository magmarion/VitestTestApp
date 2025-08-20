import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import App from './App';

describe('App Component', () => {
    it('should render the headline', () => {
        render(<App />);

        const headline = screen.getByText("Emoji World Cup 🏆");
        expect(headline).toBeInTheDocument();
    });

    it('should start with two emojies for the first match', () => {
        render(<App />);

        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBe(2);
    });

    it('should progress through matches and declare a winner', () => {
        render(<App />);

        while (!screen.queryByText(/Winner is/)) {
            const buttons = screen.getAllByRole('button');
            fireEvent.click(buttons[0]); // always click the first option
        }

        expect(screen.getByText(/Winner: is/)).toBeInTheDocument();
    });
});