/* eslint-disable no-alert */
// import { requestRecipesByfilter } from '../../../services/fetchFoodsAndDrinks';
import { requestRecipesByfilter,
  requestRecipesList } from '../../../services/fetchFoodsAndDrinks';
import { MAX_RECIPES_CARDS,
  SET_FILTER_RECIPES,
  SET_RECIPES_LIST } from '../../types/reduxTypes';

export const setRecipes = (filtedRecipes) => ({
  type: SET_FILTER_RECIPES,
  filtedRecipes,
});

export const fetchRecipes = (nowPath, filter, nameOfItem) => async (dispatch) => {
  const recipes = await requestRecipesByfilter(nowPath, filter, nameOfItem);
  dispatch(setRecipes(recipes.slice(0, MAX_RECIPES_CARDS)));
};

export const setRecipesList = (recipesList) => ({
  type: SET_RECIPES_LIST,
  recipesList,
});

export const fetchRecipeList = (nowPath) => async (dispatch) => {
  console.log(nowPath);
  const recipes = await requestRecipesList(nowPath);
  console.log(recipes);
  dispatch(setRecipesList(recipes.slice(0, MAX_RECIPES_CARDS)));
};
