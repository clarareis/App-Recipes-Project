import React from 'react';
import PropTypes from 'prop-types';

function RecomenationDrinks({ recomendation, i }) {
  const { strDrink } = recomendation;
  return (
    <h5
      className="recomendation"
      data-testid={ `${i}-recomendation-card` }
    >
      {strDrink}

    </h5>
  );
}

export default RecomenationDrinks;

RecomenationDrinks.propTypes = {
  recomendation: PropTypes.string.isRequired,
  i: PropTypes.string.isRequired,

};
