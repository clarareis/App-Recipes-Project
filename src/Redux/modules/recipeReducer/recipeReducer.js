import { SET_FILTER_RECIPES, SET_RECIPES_LIST } from '../../types/reduxTypes';

const INITIAL_STATE_VALUE = {
  recipes: [],
  favoriteFoods: [],
  filterdRecipes: [],
};

function recipeReducer(state = INITIAL_STATE_VALUE, action) {
  switch (action.type) {
  case SET_RECIPES_LIST:
    return { ...state, recipes: action.recipesList };
  case SET_FILTER_RECIPES:
    return { ...state, filterdRecipes: action.filtedRecipes };
  default:
    return state;
  }
}

export default recipeReducer;
