import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './RenderWith';
import App from '../App';

const allId = 'All-category-filter';

beforeEach(() => {
  global.fetch = async () => ({
    json: async () => ({
      meals: [
        { strCategory: 'Beef' },
        { strCategory: 'Breakfast' },
        { strCategory: 'Chicken' },
        { strCategory: 'Dessert' },
        { strCategory: 'Goat' },
      ],
    }),
  });
});
afterEach(() => {
  jest.resetAllMocks();
});

describe('Testa a tela de Profile', () => {
  test('all components in screen', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');

    const allCategory = await screen.findByTestId(allId);
    const BreakfastCategory = await screen.findByTestId('Breakfast-category-filter');
    const ChickenCategory = await screen.findByTestId('Chicken-category-filter');
    const DessertCategory = await screen.findByTestId('Dessert-category-filter');
    const AllCategory = await screen.findByTestId('All-category-filter');
    const GoatCategory = await screen.findByTestId('Goat-category-filter');
    expect(allCategory).toBeInTheDocument();
    expect(ChickenCategory).toBeInTheDocument();
    expect(DessertCategory).toBeInTheDocument();
    expect(BreakfastCategory).toBeInTheDocument();
    expect(AllCategory).toBeInTheDocument();
    expect(GoatCategory).toBeInTheDocument();
  });
  test('click in a categoty', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');

    const BreakfastCategory = await screen.findByTestId('Breakfast-category-filter');

    userEvent.click(BreakfastCategory);
    userEvent.click(BreakfastCategory);
  });

  test('click 2 times in All category', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');

    const allCategory = await screen.findByTestId(allId);
    userEvent.click(allCategory);
    userEvent.click(allCategory);
  });
});
