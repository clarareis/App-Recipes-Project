import React from 'react';
import PropTypes from 'prop-types';
import '../RecipeDetails/recipeDetails.css';

function RecomendationFoods({ recomendation, i }) {
  const { strMeal, strMealThumb } = recomendation;
  return (
    <>
      <h5
        data-testid={ `${i}-recomendation-card` }
      >
        {strMeal}
      </h5>

      <img src={ strMealThumb } alt="thumDrink" width="50px" />
      |

    </>
  );
}

export default RecomendationFoods;

RecomendationFoods.propTypes = {
  i: PropTypes.string.isRequired,
  recomendation: PropTypes.string.isRequired,
};
