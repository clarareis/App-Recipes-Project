import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './RenderWith';
import Header from '../Components/Header';
import App from '../App';

const searchInputId = 'search-input';
const userBtnId = 'profile-top-btn';
const showSearchBtnId = 'search-top-btn';
const searchBtnId = 'exec-search-btn';

beforeEach(() => {
  // jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
  //   json: () => Promise.resolve(),
  // }));
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
    renderWithRouterAndRedux(<Header />);

    const search = screen.getByTestId(showSearchBtnId);
    userEvent.click(search);
    const searchInput = screen.getByTestId(searchInputId);
    expect(searchInput).toBeInTheDocument();
    userEvent.click(search);
    expect(searchInput).not.toBeInTheDocument();
  });

  test('testando se o userBtn redireciona para pagina de usuario', () => {
    const { history } = renderWithRouterAndRedux(<Header />);

    const userBtn = screen.getByTestId(userBtnId);
    userEvent.click(userBtn);
    expect(history.location.pathname).toBe('/profile');
  });

  test('testando se search aparece na pagina de profile', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/profile');
    const searchInput = screen.getByTestId(searchBtnId);
    expect(searchInput).toBeInTheDocument();
  });
});
