import {
  DRINK_FIRST_LETTER_ENDPOINT,
  DRINK_INGREDIENT_ENDPOINT,
  DRINK_NAME_ENDPOINT,
  MEAL_FIRST_LETTER_ENDPOINT,
  MEAL_INGREDIENT_ENDPOINT,
  MEAL_NAME_ENDPOINT } from './endpointsTypes';

const getMealEndpoints = (filter, data) => {
  if (filter === 'ingredient') return MEAL_INGREDIENT_ENDPOINT(data).toString();
  if (filter === 'name') return MEAL_NAME_ENDPOINT(data).toString();
  if (filter === 'first-letter') return MEAL_FIRST_LETTER_ENDPOINT(data).toString();
};

export const getDrinksEndpoints = (filter, data) => {
  if (filter === 'ingredient') return DRINK_INGREDIENT_ENDPOINT(data).toString();
  if (filter === 'name') return DRINK_NAME_ENDPOINT(data).toString();
  if (filter === 'first-letter') return DRINK_FIRST_LETTER_ENDPOINT(data).toString();
};

export const changeEndPointByFilterOrPage = (page, filter, data) => {
  if (page === 'foods') return getMealEndpoints(filter, data);
  return getDrinksEndpoints(filter, data);
};
