import {
  DRINKS_CATEGORYS_ENDPOINT,
  DRINK_FIRST_LETTER_ENDPOINT,
  DRINK_INGREDIENT_ENDPOINT,
  DRINK_NAME_ENDPOINT,
  MEAL_CATEGORYS_ENDPOINT,
  MEAL_FIRST_LETTER_ENDPOINT,
  MEAL_INGREDIENT_ENDPOINT,
  MEAL_NAME_ENDPOINT,
} from './endpointsTypes';

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

export const endpointByIdFood = async (id) => {
  const EndPointId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { meals } = await fetch(EndPointId).then((resposta) => resposta.json());
  return meals[0];
};

export const endpointByIdDrinks = async (id) => {
  const EndPointId = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { drinks } = await fetch(EndPointId).then((resposta) => resposta.json());
  return drinks[0];
};

export const endpointFoodRecomendation = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const resposta = await fetch(endpoint);
  const data = await resposta.json();
  return data.drinks;
};

export const endpointDrinkRecomendation = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const resposta = await fetch(endpoint);
  const data = await resposta.json();
  return data.meals;
};

export const changeEndPointByFilterOrPage = (page, filter, data) => {
  if (page === 'foods') return getMealEndpoints(filter, data);
  return getDrinksEndpoints(filter, data);
};

export const changeCategoryEndPoins = (path) => {
  if (path === '/foods') return MEAL_CATEGORYS_ENDPOINT;
  return DRINKS_CATEGORYS_ENDPOINT;
};
