import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './RenderWith';
import Header from '../Components/Header';
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

  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({ ...ingredientMock }),
  }));

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
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(),
  }));

  test('test if meal api is called in food area with name filter selected', () => {
    renderWithRouterAndRedux(<Header
      headerName="foods"
    />);

    const nameRadio = screen.getByTestId(nameBtnId);
    const showSearch = screen.getByTestId(showSearchBtnId);
    const searchBtn = screen.getByTestId(searchBtnId);

    userEvent.click(showSearch);

    const searchInput = screen.getByTestId(searchInputId);

    userEvent.type(searchInput, 'Arrabiata');
    userEvent.click(nameRadio);
    userEvent.click(searchBtn);

    expect(fetch).toHaveBeenCalledTimes(2);
  });

  test(`verify if alert is called case first latter filter
    with active and input have more one latter`, async () => {
    // https://stackoverflow.com/questions/53611098/how-can-i-mock-the-window-alert-method-in-jest
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    renderWithRouterAndRedux(
      <Header
        headerName="foods"
      />,
    );

    const firstLatter = screen.getByTestId(firsLetterBtnId);
    const showSearch = screen.getByTestId(showSearchBtnId);
    const searchBtn = screen.getByTestId(searchBtnId);

    userEvent.click(showSearch);

    const searchInput = screen.getByTestId(searchInputId);

    userEvent.type(searchInput, 'aaa');
    userEvent.click(firstLatter);
    userEvent.click(searchBtn);

    expect(alert).toHaveBeenCalled();
  });

  test('fetch is redirect for id page in case de api return one item', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');

    const nameBtn = screen.getByTestId(nameBtnId);
    const searchBtn = screen.getByTestId(searchBtnId);
    const showSearch = screen.getByTestId(showSearchBtnId);

    userEvent.click(showSearch);
    const searchInput = screen.getByTestId(searchInputId);

    userEvent.type(searchInput, 'Arrabiata');
    userEvent.click(nameBtn);
    userEvent.click(searchBtn);
  });

  test('category is render in screen', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');
  });
});
