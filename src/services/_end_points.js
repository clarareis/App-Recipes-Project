export const MEAL_INGREDIENT_ENDPOINT = (data) => `https://www.themealdb.com/api/json/v1/1/filter.php?i=${data}`;
export const MEAL_NAME_ENDPOINT = (data) => `https://www.themealdb.com/api/json/v1/1/search.php?s=${data}`;
export const MEAL_FIRST_LETTER_ENDPOINT = (data) => `https://www.themealdb.com/api/json/v1/1/search.php?f=${data}`;

export const DRINK_INGREDIENT_ENDPOINT = (data) => `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${data}`;
export const DRINK_NAME_ENDPOINT = (data) => `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${data}`;
export const DRINK_FIRST_LETTER_ENDPOINT = (data) => `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${data}`;

const getMealEndpoints = (filter, data) => {
  if (filter === 'ingredient') return MEAL_INGREDIENT_ENDPOINT(data).toString();
  if (filter === 'name') return MEAL_NAME_ENDPOINT(data).toString();
  if (filter === 'first-letter') return MEAL_FIRST_LETTER_ENDPOINT(data).toString();
};

const getDrinksEndpoints = (filter, data) => {
  if (filter === 'ingredient') return DRINK_INGREDIENT_ENDPOINT(data).toString();
  if (filter === 'name') return DRINK_NAME_ENDPOINT(data).toString();
  if (filter === 'first-letter') return DRINK_FIRST_LETTER_ENDPOINT(data).toString();
};

export const changeEndPointByFilterOrPage = (page, filter, data) => {
  if (page === 'foods') return getMealEndpoints(filter, data);
  return getDrinksEndpoints(filter, data);
};
