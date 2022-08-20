import React from 'react';
import propTypes from 'prop-types';
import Header from '../../Components/Header/Header';

function FavoriteRecipe({ history }) {
  return (
    <section>
      <Header headerName="Favorite Recipes" history={ history } />
      <h1>FavoriteRecipe</h1>
    </section>
  );
}

FavoriteRecipe.propTypes = {
  history: propTypes.node.isRequired,
};

export default FavoriteRecipe;
