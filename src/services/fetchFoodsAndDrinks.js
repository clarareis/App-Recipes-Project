import { DRINK_LIST_ENDPOINT, MEAL_LIST_ENDPOINT } from './endpointsTypes';
import { changeEndPointByFilterOrPage } from './_end_points';

export const requestRecipesByfilter = async (page, filter, data) => {
  try {
    const recipeApiResponse = await
    fetch(changeEndPointByFilterOrPage(page, filter, data));
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
  console.log(path);
  try {
    const recipeApiResponse = await fetch(endpointByPath(path));
    const successRecipesRequest = await recipeApiResponse.json();
    if (path === 'Drinks') return successRecipesRequest.drinks;
    return successRecipesRequest.meals;
  } catch (error) {
    console.log(error);
  }
};

export const lintKiler = async () => {};
