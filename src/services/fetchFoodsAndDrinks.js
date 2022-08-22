/* eslint-disable no-alert */
import { changeEndPointByFilterOrPage } from './_end_points';

export const requestRecipesByfilter = async (page, filter, data) => {
  try {
    const recipeApiResponse = await
    fetch(changeEndPointByFilterOrPage(page, filter, data));
    const successRecipesRequest = await recipeApiResponse.json();
    if (page === 'drinks') {
      if (!successRecipesRequest.drinks) {
        return 0;
      }
      return successRecipesRequest.drinks;
    }
    if (!successRecipesRequest.meals) {
      return 0;
    }
    return successRecipesRequest.meals;
  } catch (error) {
    console.log(error);
  }
};

export const lintKiler = async () => {};
