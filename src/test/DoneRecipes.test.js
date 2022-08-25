import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './RenderWith';
import App from '../App';

const mockLocalDoneRecipes = [
  { id: '52771', type: 'food', nationality: 'Italian', category: 'Vegetarian', alcoholicOrNot: '', name: 'Spicy Arrabiata Penne', image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg', doneDate: '23/06/2020', tags: ['Pasta', 'Curry'],
  },
  { id: '178319', type: 'drink', nationality: '', category: 'Cocktail', alcoholicOrNot: 'Alcoholic', name: 'Aquamarine', image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg', doneDate: '23/06/2020', tags: [],
  },
];
describe('Testa a tela de Done-Recipes', () => {
  it('Verifica se é renderizado três botões na tela', () => {
    localStorage.clear();
    localStorage.setItem('doneRecipes', JSON.stringify(mockLocalDoneRecipes));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/done-recipes');

    const btnAll = screen.getByTestId('filter-by-all-btn');
    expect(btnAll).toBeInTheDocument();
    const btnFood = screen.getByTestId('filter-by-food-btn');
    expect(btnFood).toBeInTheDocument();
    const btnDrink = screen.getByTestId('filter-by-drink-btn');
    expect(btnDrink).toBeInTheDocument();
  });
});
