import { requestRecipesByfilter } from '../../../services/fetchFoodsAndDrinks';
import { MAX_RECIPES_CARDS, SET_FILTER_RECIPES } from '../../types/reduxTypes';

export const setRecipes = (filtedRecipes) => ({
  type: SET_FILTER_RECIPES,
  filtedRecipes,
});

export const fetchRecipes = (nowPath, filter, nameOfItem) => async (dispatch) => {
  try {
    const recipes = await requestRecipesByfilter(nowPath, filter, nameOfItem);
    dispatch(await setRecipes(recipes.slice(0, MAX_RECIPES_CARDS)));
  } catch (error) {
    console.log(error);
  }
};

export const filterRecipe = () => {

};
