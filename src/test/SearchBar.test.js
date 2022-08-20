import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './RenderWith';
import Header from '../Components/Header';
import { ingredientMock } from '../../_Mocks/SearchMock';

const searchInputId = 'search-input';
const showSearchBtnId = 'search-top-btn';

const ingredientsBtnId = 'ingredient-search-radio';
const nameBtnId = 'name-search-radio';
const firsLetterBtnId = 'first-letter-search-radio';
const searchBtnId = 'exec-search-btn';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(ingredientMock),
}));

beforeEach(() => {
  fetch.mockClear();
});

describe('test in search component', () => {
  test('verify components in screen', () => {
    renderWithRouterAndRedux(<Header
      headerName="foods"
    />);

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
    renderWithRouterAndRedux(<Header
      headerName="foods"
    />);

    const ingredientBtn = screen.getByTestId(ingredientsBtnId);
    const searchBtn = screen.getByTestId(searchBtnId);
    const showSearch = screen.getByTestId(showSearchBtnId);

    userEvent.click(showSearch);
    const searchInput = screen.getByTestId(searchInputId);
    expect(searchInput).toBeInTheDocument();

    userEvent.type(searchInput, 'Salmon');
    userEvent.click(ingredientBtn);
    userEvent.click(searchBtn);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
