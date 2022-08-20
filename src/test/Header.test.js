import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './RenderWith';
import Header from '../Components/Header';
import App from '../App';

const searchInputId = 'search-input';
const userBtnId = 'profile-top-btn';
const showSearchBtnId = 'search-top-btn';
const emailInput = 'email-input';
const SenhaInput = 'password-input';
const testEmail = 'test@test3.com';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve(),
  }));
});
afterEach(() => {
  jest.resetAllMocks();
});

describe('Testando o componente Header', () => {
  test('Testando compoentes em tela', () => {
    renderWithRouterAndRedux(<Header />);

    const header = screen.getByTestId('page-title');
    const profileBtn = screen.getByTestId(userBtnId);
    const showSearchBtn = screen.getByTestId(showSearchBtnId);
    expect(header).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(showSearchBtn).toBeInTheDocument();
  });

  test('testa se o search é exibido em tela', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId(emailInput);
    const senha = screen.getByTestId(SenhaInput);
    const button = screen.getByRole('button', { name: /enter/i });

    userEvent.type(email, testEmail);
    userEvent.type(senha, '1234567');
    userEvent.click(button);

    const search = screen.getByTestId(showSearchBtnId);
    userEvent.click(search);
    const searchInput = screen.getByTestId(searchInputId);
    expect(searchInput).toBeInTheDocument();
    userEvent.click(search);
    expect(searchInput).not.toBeInTheDocument();
  });

  test('testando se o userBtn redireciona para pagina de usuario', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(emailInput);
    const senha = screen.getByTestId(SenhaInput);
    const button = screen.getByRole('button', { name: /enter/i });

    userEvent.type(email, 'test@test3.com');
    userEvent.type(senha, '1234567');
    userEvent.click(button);

    const userBtn = screen.getByTestId(userBtnId);
    userEvent.click(userBtn);
    expect(history.location.pathname).toBe('/profile');
  });

  test('testando se o searchBtn não aparece na tela de done recipes', async () => {
    const { history } = renderWithRouterAndRedux(<Header headerName="Profile" />);
    history.push('/done-recipes');
    const goDoneRecipes = screen.getByTestId('done-recipe-top-btn');
    userEvent.click(goDoneRecipes);
    expect(history.location.pathname).toBe('/done-recipes');
    setTimeout(() => expect(showSearchBtn).not.toBeInTheDocument(), 0);
  });
});
