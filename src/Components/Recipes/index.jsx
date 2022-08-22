import React from 'react';
import './recipes.css';
import { useSelector } from 'react-redux';
import propTypes from 'prop-types';
import RecipeCard from '../RecipeCard/RecipeCard';

function Recipes({ recipeType }) {
  const recipes = useSelector((state) => state.recipeReducer.recipes);
  const filtedRecipes = useSelector((state) => state.recipeReducer.filterdRecipes);

  if (!recipes || !filtedRecipes) {
    return (
      <section />
    );
  }

  return (
    <section
      className="recipes_container"
    >
      {
        filtedRecipes.length ? (
          <>
            {
              filtedRecipes.map((recipe, index) => (
                <RecipeCard
                  recipeType={ recipeType }
                  key={ recipe.strMeal }
                  recipe={ recipe }
                  index={ index }
                />
              ))
            }
          </>
        ) : (
          <>
            {
              recipes.map((nowRecipe, index) => (
                <RecipeCard
                  recipeType={ recipeType }
                  key={ nowRecipe.strMeal }
                  recipe={ nowRecipe }
                  index={ index }
                />
              ))
            }
          </>

        )
      }
    </section>

  );
}

Recipes.propTypes = {
  recipeType: propTypes.string.isRequired,
};

export default Recipes;
