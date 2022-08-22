import { SET_FILTER_RECIPES, SET_RECIPES } from '../../types/reduxTypes';

const INITIAL_STATE_VALUE = {
  recipes: [
    {
      strMeal: 'Rappie Pie',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/ruwpww1511817242.jpg',
      idMeal: '52933',
    },
  ],
  favoriteFoods: [],
  filterdRecipes: [],
};

function recipeReducer(state = INITIAL_STATE_VALUE, action) {
  switch (action.type) {
  case SET_RECIPES:
    return { ...state, recipes: action.recipes };
  case SET_FILTER_RECIPES:
    return { ...state, filterdRecipes: action.filtedRecipes };
  default:
    return state;
  }
}

export default recipeReducer;
