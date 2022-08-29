import { MAX_CATEGORY } from '../Redux/types/reduxTypes';
import {
  DRINK_LIST_ENDPOINT,
  MEAL_LIST_ENDPOINT } from './endpointsTypes';
import { changeCategoryEndPoins, changeEndPointByFilterOrPage } from './_end_points';

export const requestRecipesByfilter = async (page, filter, data, id) => {
  try {
    const recipeApiResponse = await
    fetch(changeEndPointByFilterOrPage(page, filter, data, id));
    const successRecipesRequest = await recipeApiResponse.json();
    if (page === 'drinks') return successRecipesRequest.drinks;
    return successRecipesRequest.meals;
  } catch (error) {
    console.log(error);
  }
};

const endpointByPath = (path) => {
  if (path === 'Foods') {
    return MEAL_LIST_ENDPOINT;
  }
  return DRINK_LIST_ENDPOINT;
};

export const requestRecipesList = async (path) => {
  try {
    const recipeApiResponse = await fetch(endpointByPath(path));
    const successRecipesRequest = await recipeApiResponse.json();
    if (path === 'Drinks') return successRecipesRequest.drinks;
    return successRecipesRequest.meals;
  } catch (error) {
    console.log(error);
  }
};

export const requestCategorys = async (path) => {
  try {
    const fetchCategories = await fetch(changeCategoryEndPoins(path));
    const successFetchCategories = await fetchCategories.json();
    if (path === '/drinks') return successFetchCategories.drinks.slice(0, MAX_CATEGORY);
    return successFetchCategories.meals.slice(0, MAX_CATEGORY);
  } catch (error) {
    console.log(error);
  }
};
