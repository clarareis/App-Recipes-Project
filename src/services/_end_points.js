export const INGREDIENT_ENDPOINT = (data) => `https://www.themealdb.com/api/json/v1/1/filter.php?i=${data}`;
export const NAME_ENDPOINT = (data) => `https://www.themealdb.com/api/json/v1/1/search.php?s=${data}`;
export const FIRST_LETTER_ENDPOINT = (data) => `https://www.themealdb.com/api/json/v1/1/search.php?f=${data}`;

export const changeEndPointByFilter = (filter, data) => {
  if (filter === 'ingredient') return INGREDIENT_ENDPOINT(data).toString();
  if (filter === 'name') return NAME_ENDPOINT(data).toString();
  if (filter === 'first-letter') return FIRST_LETTER_ENDPOINT(data).toString();
};
