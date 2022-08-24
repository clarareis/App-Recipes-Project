/* eslint-disable no-alert */
// import { requestRecipesByfilter } from '../../../services/fetchFoodsAndDrinks';

import { isAItem } from '../../../Components/SearchBar/verifyData';
import { requestRecipesList } from '../../../services/fetchFoodsAndDrinks';
import { MAX_RECIPES_CARDS,
  SET_FILTER_RECIPES,
  SET_RECIPES_LIST } from '../../types/reduxTypes';

export const setRecipes = (filtedRecipes) => ({
  type: SET_FILTER_RECIPES,
  filtedRecipes,
});

export const fetchRecipes = ({ nowPath, history, recipes }) => async (dispatch) => {
  if (!recipes) {
    const message = 'Sorry, we haven\'t found any recipes for these filters.';
    alert(message);
    return;
  }
  isAItem(recipes, history, nowPath);
  dispatch(setRecipes(recipes.slice(0, MAX_RECIPES_CARDS)));
};

export const setRecipesList = (recipesList) => ({
  type: SET_RECIPES_LIST,
  recipesList,
});

export const fetchRecipeList = (nowPath) => async (dispatch) => {
  const recipes = await requestRecipesList(nowPath);
  dispatch(setRecipesList(recipes.slice(0, MAX_RECIPES_CARDS)));
};

const changePathUrlByPath = (path, category) => {
  if (path === '/drinks') return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  return `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
};

export const fetchRecipesByCategory = (category, path) => async (dispatch) => {
  console.log(path);
  const recipes = await (await fetch(changePathUrlByPath(path, category))).json();
  const successRecipes = path === '/drinks' ? recipes.drinks : recipes.meals;
  console.log(successRecipes);
  dispatch(setRecipes(successRecipes.slice(0, MAX_RECIPES_CARDS)));
};

export const resetRecipeList = (Path) => async (dispatch) => {
  const recipes = await requestRecipesList(Path);
  dispatch(setRecipes(recipes.slice(0, MAX_RECIPES_CARDS)));
};

export const setUser = (email) => ({
  type: 'SET_USER',
  email,
});
