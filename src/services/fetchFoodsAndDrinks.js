import { changeEndPointByFilterOrPage } from './_end_points';

export const requestRecipesByfilter = async (page, filter, data) => {
  try {
    const recipeApiResponse = await fetch(changeEndPointByFilterOrPage(filter, data));
    const successRecipesRequest = recipeApiResponse.json();
    return successRecipesRequest;
  } catch (error) {
    console.log(error);
  }
};

export const requestRecipes = async (page) => {
  try {
    const recipeApiResponse = await fetch(changeEndPointByFilterOrPage(page));
    const sufleRecipesRequest = recipeApiResponse.json();
    return sufleRecipesRequest;
  } catch (error) {
    console.log(error);
  }
};
