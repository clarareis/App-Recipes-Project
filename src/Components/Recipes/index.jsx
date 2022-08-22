import React from 'react';
import './recipes.css';
import { useSelector } from 'react-redux';
import RecipeCard from '../RecipeCard/RecipeCard';

function Recipes() {
  const recipes = useSelector((state) => state.recipeReducer.recipes);
  const filtedRecipes = useSelector((state) => state.recipeReducer.filterdRecipes);

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

export default Recipes;
