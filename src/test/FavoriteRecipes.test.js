import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './RenderWith';
import App from '../App';

const mockLocalDoneRecipes = [
  {
    id: '52977',
    type: 'food',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
  {
    id: '17222',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'A1',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
  },
];
const done = '/favorite-recipes';

describe('Testa a tela de Favorite-Recipes', () => {
  Object.assign(navigator, {
    clipboard: {
      writeText: () => { },
    },
  });
  it('Verifica se é renderizado três botões na tela', () => {
    localStorage.clear();
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalDoneRecipes));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(done);

    const btnFood = screen.getByTestId('filter-by-food-btn');
    expect(btnFood).toBeInTheDocument();
    userEvent.click(btnFood);
    const img = screen.getAllByTestId('0-horizontal-image');
    expect(img).toHaveLength(1);

    const btnAll = screen.getByTestId('filter-by-all-btn');
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);
    const text = screen.getAllByTestId('0-horizontal-top-text');
    expect(text).toHaveLength(1);

    const btnDrink = screen.getByTestId('filter-by-drink-btn');
    expect(btnDrink).toBeInTheDocument();
    userEvent.click(btnDrink);
    const date = screen.getAllByTestId('0-horizontal-top-text');
    expect(date).toHaveLength(1);
  });

  it('Verifica o botão de remover a receita favorita', async () => {
    localStorage.clear();
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalDoneRecipes));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/favorite-recipes');

    const firstRecipe = await screen.findByTestId('1-horizontal-top-text');
    expect(firstRecipe).toBeInTheDocument();
    const getFavoriteButton = screen.getByTestId('1-horizontal-favorite-btn');
    expect(getFavoriteButton).toBeInTheDocument();
    userEvent.click(getFavoriteButton);
    expect(firstRecipe).not.toBeInTheDocument();
  });

  it('Verifica funcionalidade do clipboard ', async () => {
    localStorage.clear();
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalDoneRecipes));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(done);

    jest.spyOn(navigator.clipboard, 'writeText');
    const btnShare = await screen.findByTestId('0-horizontal-share-btn');
    userEvent.click(btnShare);

    expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost/foods/52977');
  });
});
