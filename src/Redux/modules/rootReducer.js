import { combineReducers } from 'redux';
import drinkReducer from './drinksReducer/dringReducer';
import foodReducer from './foodsReducer/foodReducer';

const rootReducer = combineReducers({
  drinkReducer,
  foodReducer,
});

export default rootReducer;
