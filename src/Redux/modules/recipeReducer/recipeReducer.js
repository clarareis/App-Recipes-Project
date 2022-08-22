import { SET_FILTER_RECIPES, SET_RECIPES } from '../../types/reduxTypes';

const INITIAL_STATE_VALUE = {
  recipes: [],
  favoriteFoods: [],
  filterdRecipes: [],
};

function recipeReducer(state = INITIAL_STATE_VALUE, action) {
  switch (action.type) {
  case SET_RECIPES:
    return { ...state, recipes: [...action.recipes] };
  case SET_FILTER_RECIPES:
    return { ...state, filterdRecipes: [...action.filtedRecipes] };
  default:
    return state;
  }
}

export default recipeReducer;
