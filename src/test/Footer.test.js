import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './RenderWith';
import App from '../App';
import Foods from '../pages/Foods/Foods';

describe('Footer Test', () => {
  test('Footer Test Defined', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /enter/i });

    userEvent.type(email, 'test@test3.com');

    userEvent.type(senha, '1234567');

    userEvent.click(button);
    expect(history.location.pathname).toBe('/foods');

    const drinkBottom = screen.getByTestId('drinks-bottom-btn');
    const foodBottom = screen.getByTestId('food-bottom-btn');
    const footerId = screen.getByTestId('footer');

    expect(drinkBottom).toBeDefined();
    expect(foodBottom).toBeDefined();
    expect(footerId).toBeDefined();
  });
  test('Footer te manda a outro lugar', () => {
    const { history } = renderWithRouterAndRedux(<Foods />);

    const drinkBottom = screen.getByTestId('drinks-bottom-btn');
    const foodBottom = screen.getByTestId('food-bottom-btn');

    userEvent.click(drinkBottom);
    expect(history.location.pathname).toBe('/drinks');

    userEvent.click(foodBottom);
    expect(history.location.pathname).toBe('/foods');
  });
});
