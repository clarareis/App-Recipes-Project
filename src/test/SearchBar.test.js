import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './RenderWith';
import { ingredientMock } from '../../_Mocks/SearchMock';
import App from '../App';

const searchInputId = 'search-input';
const showSearchBtnId = 'search-top-btn';

const ingredientsBtnId = 'ingredient-search-radio';
const nameBtnId = 'name-search-radio';
const firsLetterBtnId = 'first-letter-search-radio';
const searchBtnId = 'exec-search-btn';

describe('test in search component', () => {
  test('verify components in screen', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');

    const ingredientBtn = screen.getByTestId(ingredientsBtnId);
    const nameBtn = screen.getByTestId(nameBtnId);
    const firstLetter = screen.getByTestId(firsLetterBtnId);
    const searchBtn = screen.getByTestId(searchBtnId);
    const showSearch = screen.getByTestId(showSearchBtnId);

    expect(ingredientBtn).toBeInTheDocument();
    expect(nameBtn).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(showSearch);
    const searchInput = screen.getByTestId(searchInputId);
    expect(searchInput).toBeInTheDocument();
  });

  test('fetch is calles', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');
    const ingredientBtn = screen.getByTestId(ingredientsBtnId);
    const searchBtn = screen.getByTestId(searchBtnId);
    const showSearch = screen.getByTestId(showSearchBtnId);

    userEvent.click(showSearch);
    const searchInput = screen.getByTestId(searchInputId);
    expect(searchInput).toBeInTheDocument();

    userEvent.type(searchInput, 'Salmon');
    userEvent.click(ingredientBtn);
    userEvent.click(searchBtn);
  });

  test('is first-latter and more one caracter', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');
    const firstLetter = screen.getByTestId(firsLetterBtnId);

    const searchBtn = screen.getByTestId(searchBtnId);
    const showSearch = screen.getByTestId(showSearchBtnId);

    userEvent.click(showSearch);
    const searchInput = screen.getByTestId(searchInputId);
    expect(searchInput).toBeInTheDocument();

    userEvent.type(searchInput, 'aa');
    userEvent.click(firstLetter);
    userEvent.click(searchBtn);
  });

  test('test name search', async () => {
    global.fetch = async () => ({
      json: async () => ({
        meals: ingredientMock.meal,
      }),
    });
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');
    const nameBtn = screen.getByTestId(nameBtnId);

    const searchBtn = screen.getByTestId(searchBtnId);
    const showSearch = screen.getByTestId(showSearchBtnId);

    userEvent.click(showSearch);
    const searchInput = screen.getByTestId(searchInputId);
    expect(searchInput).toBeInTheDocument();

    userEvent.type(searchInput, 'Salmon');
    userEvent.click(nameBtn);
    userEvent.click(searchBtn);
  });
});
