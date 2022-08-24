import React from 'react';
import PropTypes from 'prop-types';
import './recomendation.css';

function RecomendationFoods({ recomendation, i }) {
  const { strMeal } = recomendation;
  return (
    <h5
      className="recomendation"
      data-testid={ `${i}-recomendation-card` }
    >
      {strMeal}
      {' '}
    </h5>
  );
}

export default RecomendationFoods;

RecomendationFoods.propTypes = {
  recomendation: PropTypes.string.isRequired,
  i: PropTypes.string.isRequired,
};
