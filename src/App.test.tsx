import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component', () => {
    it('should render the headline', () => {
        render(<App />);
        const headline = screen.getByText(/Emoji Tournament/);
        expect(headline).toBeInTheDocument();
    });

});
