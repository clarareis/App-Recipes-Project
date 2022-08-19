import { FETCH_FOODS } from '../../types/reduxTypes';

const INITIAL_STATE_VALUE = {
  foods: [],
  favoriteFoods: [],
};

function foodReducer(state = INITIAL_STATE_VALUE, action) {
  switch (action.type) {
  case FETCH_FOODS:
    return state;
  default:
    return state;
  }
}

export default foodReducer;
