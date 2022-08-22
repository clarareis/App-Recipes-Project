import React from 'react';
import './card.css';
import propTypes from 'prop-types';

function RecipeCard({ recipe, index }) {
  return (
    <button
      type="button"
      className="recipes_card"
    >
      <img
        alt={ recipe.strMeal }
        className="recipe_img"
        src={ recipe.strMealThumb }
      />
      {recipe.strMeal}
    </button>
  );
}

RecipeCard.propTypes = {
  recipe: propTypes.shape({
    strMeal: propTypes.string.isRequired,
    strMealThumb: propTypes.string.isRequired,
  }).isRequired,
  index: propTypes.number.isRequired,
};

export default RecipeCard;
