import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './RenderWith';
import App from '../App';

describe('', () => {
  test('', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId(emailInput);
    const senha = screen.getByTestId(SenhaInput);
    const button = screen.getByRole('button', { name: /enter/i });

    userEvent.type(email, 'test@test3.com');
    userEvent.type(senha, '1234567');
    userEvent.click(button);
  });
});
