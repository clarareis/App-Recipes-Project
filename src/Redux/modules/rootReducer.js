import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer/recipeReducer';

const rootReducer = combineReducers({
  recipeReducer,
});

export default rootReducer;
