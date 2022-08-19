import { FETCH_DRINKS } from '../../types/reduxTypes';

const INITIAL_STATE_VALUE = {
  drinks: [],
  favoriteFoods: [],
  filtedFoods: [],
  favoriteRecipes: [],
};

function drinkReducer(state = INITIAL_STATE_VALUE, action) {
  switch (action.type) {
  case FETCH_DRINKS:
    return state;
  default:
    return state;
  }
}

export default drinkReducer;
