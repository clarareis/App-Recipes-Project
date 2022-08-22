/* eslint-disable no-alert */
// import { requestRecipesByfilter } from '../../../services/fetchFoodsAndDrinks';
import { requestRecipesByfilter } from '../../../services/fetchFoodsAndDrinks';
import { MAX_RECIPES_CARDS, SET_FILTER_RECIPES } from '../../types/reduxTypes';

export const setRecipes = (filtedRecipes) => ({
  type: SET_FILTER_RECIPES,
  filtedRecipes,
});

export const fetchRecipes = (nowPath, filter, nameOfItem) => async (dispatch) => {
  const recipes = await requestRecipesByfilter(nowPath, filter, nameOfItem);
  dispatch(setRecipes(recipes.slice(0, MAX_RECIPES_CARDS)));
};

export const filterRecipe = () => {

};
