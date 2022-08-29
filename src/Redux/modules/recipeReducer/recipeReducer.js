import { SET_FILTER_RECIPES, SET_RECIPES_LIST } from '../../types/reduxTypes';

const INITIAL_STATE_VALUE = {
  recipes: [],
  favoriteFoods: [],
  filterdRecipes: [],
  progress: [],
  btnDone: false,
};

function recipeReducer(state = INITIAL_STATE_VALUE, action) {
  switch (action.type) {
  case SET_RECIPES_LIST:
    return { ...state, recipes: action.recipesList };
  case SET_FILTER_RECIPES:
    return { ...state, filterdRecipes: action.filtedRecipes };
  case 'SET_PROGRESS':
    return { ...state, progress: action.myProgress };
  case 'UPDATE_PRGRESS':
    return { ...state, progress: action.progress };
  case 'ENABLE_BTN':
    return { ...state, btnDone: true };
  case 'DISABLEBTN':
    return { ...state, btnDone: false };
  default:
    return state;
  }
}

export default recipeReducer;
