/* eslint-disable no-alert */
import { isAItem } from '../../../Components/SearchBar/verifyData';
import { MAX_RECIPES_CARDS, SET_FILTER_RECIPES } from '../../types/reduxTypes';

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

export const setUser = (email) => ({
  type: 'SET_USER',
  email,
});
