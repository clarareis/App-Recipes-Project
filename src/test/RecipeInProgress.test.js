import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './RenderWith';
import { ingredientMock } from '../../_Mocks/SearchMock';
import App from '../App';
import { updateLocalStore } from '../LocalStore/LocalStore';

const titleId = 'recipe-title';
const imgId = 'recipe-photo';
const categoryid = 'recipe-category';
const favbtnId = 'favorite-btn';
const shareBtnId = 'share-btn';
const instructionsId = 'instructions';
const firstIngredientId = '0-ingredient-step';
const buttonFinishId = 'finish-recipe-btn';
const foodPath = '/foods/53026/in-progress';
const drinkPath = '/drinks/17203/in-progress';

describe('tests in progress', () => {
  it('veirify all items in screen', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(drinkPath);

    const title = await screen.findByTestId(titleId);
    const image = await screen.findByTestId(imgId);
    const category = await screen.findByTestId(categoryid);
    const favBtn = await screen.findByTestId(favbtnId);
    const shareBtn = await screen.findByTestId(shareBtnId);
    const instruc = await screen.findByTestId(instructionsId);
    const firstIngredient = await screen.findByTestId(firstIngredientId);
    const btnFinish = await screen.findByTestId(buttonFinishId);

    expect(title).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(favBtn).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(instruc).toBeInTheDocument();
    expect(firstIngredient).toBeInTheDocument();
    expect(btnFinish).toBeInTheDocument();
    expect(btnFinish).toBeDisabled();
  });

  it('save in favorite', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(drinkPath);

    const favBtn = await screen.findByTestId(favbtnId);
    userEvent.click(favBtn);
  });

  it('verify share', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(drinkPath);
  });

  it('btn finish enabled if all ingredients is cheked', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(drinkPath);

    const firstIngredient = await screen.findByTestId('my-check-0');
    const secondIngredient = await screen.findByTestId('my-check-1');
    const finishTbn = await screen.findByTestId(buttonFinishId);

    expect(finishTbn).toBeDisabled();
    userEvent.click(firstIngredient);
    userEvent.click(secondIngredient);
    expect(finishTbn).not.toBeDisabled();
    userEvent.click(finishTbn);
  });

  it('remove recipe of favorite', async () => {
    updateLocalStore('favoriteRecipes', [{ id: '17203' }]);
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/drinks/17203/in-progress');

    const favBtn = await screen.findByTestId(favbtnId);
    userEvent.click(favBtn);
  });

  it('test api is clled in food in progress', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(foodPath);

    const favBtn = await screen.findByTestId(favbtnId);
    userEvent.click(favBtn);
  });

  it('remove recipe of favorite in foods', async () => {
    updateLocalStore('favoriteRecipes', [{ id: '17203' }]);
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(foodPath);

    const favBtn = await screen.findByTestId(favbtnId);
    userEvent.click(favBtn);
  });

  it('verify all checks in  foods', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(foodPath);
  });

  it('if item dont exist', async () => {
    updateLocalStore('favoriteRecipes', [{ id: '53026' }]);
    global.fetch = async () => ({
      json: async () => ({
        meals: ingredientMock.meal,
      }),
    });
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods/53026/in-progress');
  });
});
