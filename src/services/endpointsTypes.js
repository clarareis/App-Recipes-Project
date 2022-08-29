export const MEAL_INGREDIENT_ENDPOINT = (data) => `https://www.themealdb.com/api/json/v1/1/filter.php?i=${data}`;
export const MEAL_NAME_ENDPOINT = (data) => `https://www.themealdb.com/api/json/v1/1/search.php?s=${data}`;
export const MEAL_FIRST_LETTER_ENDPOINT = (data) => `https://www.themealdb.com/api/json/v1/1/search.php?f=${data}`;
// export const MEAL_RECIPE = (idFoods) => `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idFoods}`;

export const DRINK_INGREDIENT_ENDPOINT = (data) => `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${data}`;
export const DRINK_NAME_ENDPOINT = (data) => `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${data}`;
export const DRINK_FIRST_LETTER_ENDPOINT = (data) => `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${data}`;

export const DRINK_LIST_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export const MEAL_LIST_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export const MEAL_CATEGORYS_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
export const DRINKS_CATEGORYS_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

// export const DRINK_RECIPE = (idDrinks) => `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idDrinks}`;
