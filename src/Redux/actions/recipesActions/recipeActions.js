// import { requestRecipesByfilter } from '../../../services/fetchFoodsAndDrinks';
import { MAX_RECIPES_CARDS, SET_FILTER_RECIPES } from '../../types/reduxTypes';

export const setRecipes = (filtedRecipes) => ({
  type: SET_FILTER_RECIPES,
  filtedRecipes,
});

export const fetchRecipes = (recipes) => async (dispatch) => {
  dispatch(setRecipes(recipes.slice(0, MAX_RECIPES_CARDS)));
};

export const filterRecipe = () => {

};
