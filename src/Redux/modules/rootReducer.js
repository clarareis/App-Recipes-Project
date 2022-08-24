import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer/recipeReducer';
import userReducer from './userReducer/userReducer';

const rootReducer = combineReducers({
  recipeReducer,
  userReducer,
});

export default rootReducer;
