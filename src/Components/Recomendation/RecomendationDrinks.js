import React from 'react';
import PropTypes from 'prop-types';

function RecomenationDrinks({ recomendation, i }) {
  const { strDrink, strDrinkThumb } = recomendation;
  return (
    <div>
      <h5
        className="item"
        data-testid={ `${i}-recomendation-card` }
      >
        {strDrink}
      </h5>

      <img src={ strDrinkThumb } alt="thumDrink" width="50px" className="img" />
    </div>

  );
}

export default RecomenationDrinks;

RecomenationDrinks.propTypes = {
  recomendation: PropTypes.string.isRequired,
  i: PropTypes.string.isRequired,
};
