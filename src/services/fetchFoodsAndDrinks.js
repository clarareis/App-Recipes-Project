import { changeEndPointByFilter } from './_end_points';

export const requestRecipesByfilter = async (filter, data) => {
  try {
    const recipeApiResponse = await fetch(changeEndPointByFilter(filter, data));
    const sufleRecipesRequest = recipeApiResponse.json();
    return sufleRecipesRequest;
  } catch (error) {
    console.log(error);
  }
};

export const requestRecipes = async () => {

};
