import React from 'react';
import './card.css';

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

export default RecipeCard;
