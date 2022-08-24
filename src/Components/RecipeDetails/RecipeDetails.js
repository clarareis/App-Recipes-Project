import React from 'react';
import PropTypes from 'prop-types';
import RecomendationFoods from '../Recomendation/RecomendationFoods';
import RecomenationDrinks from '../Recomendation/RecomendationDrinks';

function RecipeDetails({ recipe, keys, endpoint, recomendacao }) {
  const { name, category, img } = keys;
  const recipesIncrements = () => {
    const allRecipes = [];
    const vinteIngredientes = 20;
    for (let i = 1; i <= vinteIngredientes; i += 1) {
      if (recipe[`strIngredient${i}`]) {
        allRecipes.push(
          <li
            data-testid={ `${i - 1}-ingredient-name-and-measure` }
            key={ i }
          >
            { recipe[`strMeasure${i}`] }
            { recipe[`strIngredient${i}`] }
          </li>,
        );
      }
    }

    return <ul>{allRecipes}</ul>;
  };

  return (
    <div>
      <h1
        className="recipeContent"
        data-testid="recipe-title"
      >
        { recipe[name] }

      </h1>
      <img
        data-testid="recipe-photo"
        className="imgRecipe"
        style={ { width: '100px' } }
        src={ recipe[img] }
        alt={ recipe.strTags }
      />
      <p data-testid="recipe-category">
        {recipe[category]}
      </p>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      { recipesIncrements() }
      {recipe.strYoutube && <iframe
        width="350"
        data-testid="video"
        height="100"
        src={ recipe.strYoutube }
        frameBorder="0"
        title="videos "
      />}
      {recomendacao.map((recomendation, i) => (
        <div key={ i }>
          {
            endpoint === 'Foods'
              ? <RecomendationFoods recomendation={ recomendation } i={ i } />
              : <RecomenationDrinks recomendation={ recomendation } i={ i } />
          }
        </div>
      ))}
    </div>
  );
}

export default RecipeDetails;

RecipeDetails.propTypes = {
  recipe: PropTypes.shape({
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strSource: PropTypes.string,
    strTags: PropTypes.string,
    strMeal: PropTypes.string,
    strYoutube: PropTypes.string,
  }).isRequired,
  keys: PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    img: PropTypes.string,
  }).isRequired,
  endpoint: PropTypes.string.isRequired,
  recomendacao: PropTypes.arrayOf(PropTypes.object).isRequired,
};
