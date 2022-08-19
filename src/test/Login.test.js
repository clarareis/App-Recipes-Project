import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './RenderWith';
import App from '../App';
// import Login from '../pages/Login/Login';

const emailInput = 'email-input';
const SenhaInput = 'password-input';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve(),
  }));
});
afterEach(() => {
  jest.resetAllMocks();
});

describe('Testes na Pagina Inicial de Login', () => {
  it('É renderizado um botão com o texto Entrar e verifica se os inputs existem', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId(emailInput);
    const senha = screen.getByTestId(SenhaInput);
    const button = screen.getByRole('button', { name: /enter/i });

    expect(email).toBeDefined();
    expect(senha).toBeDefined();
    expect(button).toBeDefined();
  });
  test('É renderizado um botão que te manda para outro local', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId(emailInput);
    const senha = screen.getByTestId(SenhaInput);
    const button = screen.getByRole('button', { name: /enter/i });

    userEvent.type(email, 'test@test3.com');
    userEvent.type(senha, '123456');

    expect(button).toBeDisabled();

    userEvent.type(senha, '1234567');
    expect(button).not.toBeDisabled();
    userEvent.click(button);
    const MyEmailLocal = localStorage.getItem('user', 'test@test3.com');
    const pratosToken = localStorage.getItem('mealsToken', 1);
    const drinksToken = localStorage.getItem('cocktailsToken', 1);
    expect(MyEmailLocal).toBeDefined();
    expect(pratosToken).toBeDefined();
    expect(drinksToken).toBeDefined();
  });
  test('É renderizado um botão que te manda para outro local', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(),
    });
    renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId(emailInput);
    const senha = screen.getByTestId(SenhaInput);
    const button = screen.getByRole('button', { name: /enter/i });

    userEvent.type(email, 'test@test.com');
    userEvent.type(senha, '123456');

    expect(button).toBeDefined();
    userEvent.click(button);
  });
});
