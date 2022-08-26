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
    id: '53060',
    type: 'food',
    nationality: 'Croatian',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Burek',
    image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
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
    localStorage.setItem('doneRecipes', JSON.stringify(mockLocalDoneRecipes));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(done);

    const btnFood = screen.getByTestId('filter-by-food-btn');
    expect(btnFood).toBeInTheDocument();
    userEvent.click(btnFood);
    const img = screen.getAllByTestId(/horizontal-image/i);
    expect(img).toHaveLength(1);

    const btnAll = screen.getByTestId('filter-by-all-btn');
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);
    const text = screen.getAllByTestId(/horizontal-top-text/i);
    expect(text).toHaveLength(2);

    const btnDrink = screen.getByTestId('filter-by-drink-btn');
    expect(btnDrink).toBeInTheDocument();
    userEvent.click(btnDrink);
    const date = screen.getAllByTestId(/horizontal-done-date/i);
    expect(date).toHaveLength(1);
  });

  it('Verifica se é renderizado as informações da receita', () => {
    localStorage.clear();
    localStorage.setItem('doneRecipes', JSON.stringify(mockLocalDoneRecipes));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(done);

    const img = screen.getAllByTestId(/horizontal-image/i);
    expect(img).toHaveLength(2);

    const text = screen.getAllByTestId(/horizontal-top-text/i);
    expect(text).toHaveLength(2);

    const name = screen.getAllByTestId(/horizontal-name/i);
    expect(name).toHaveLength(2);

    const date = screen.getAllByTestId(/horizontal-done-date/i);
    expect(date).toHaveLength(2);

    const btnShare = screen.getByTestId('0-horizontal-share-btn');
    expect(btnShare).toBeInTheDocument();
  });

  it('Verifica funcionalidade do clipboard ', () => {
    localStorage.clear();
    localStorage.setItem('doneRecipes', JSON.stringify(mockLocalDoneRecipes));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(done);

    jest.spyOn(navigator.clipboard, 'writeText');
    const btnShare = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(btnShare);

    expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost/foods/52771');
  });
});
