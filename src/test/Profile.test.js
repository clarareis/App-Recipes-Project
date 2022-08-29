import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './RenderWith';
import App from '../App';

describe('Testa a tela de Profile', () => {
  it('Verifica se é renderizado o e-mail do usuário', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/profile');

    const localEmail = screen.getByTestId('profile-email');
    expect(localEmail).toBeInTheDocument();
    const MyEmailLocal = localStorage.getItem('user');
    expect(MyEmailLocal).toBeDefined();
  });

  it('Verifica se é renderizado o botão de Done Recipes', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/profile');

    const btn = screen.getByRole('button', { name: /done recipes/i });
    expect(btn).toBeDefined();

    userEvent.click(btn);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Verifica se é renderizado o botão de Favorite Recipes', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/profile');

    const btn = screen.getByRole('button', { name: /favorite recipes/i });
    expect(btn).toBeDefined();

    userEvent.click(btn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('Verifica se é renderizado o botão de Logout', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/profile');

    const btn = screen.getByRole('button', { name: /logout/i });
    expect(btn).toBeDefined();

    userEvent.click(btn);
    expect(history.location.pathname).toBe('/');
  });
});
