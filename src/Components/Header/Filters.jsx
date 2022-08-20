/* eslint-disable no-alert */
import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { requestRecipesByfilter } from '../../services/fetchFoodsAndDrinks';

function Filters({ nameOfItem }) {
  const [filter, setFilter] = useState('');
  const nowPath = useHistory().location.pathname;

  const getRecipes = async () => {
    if (filter === 'first-letter' && nameOfItem.length > 1) {
      alert('Your search must have only 1 (one) character');
    }
    const recipes = await requestRecipesByfilter(nowPath, filter, nameOfItem);
    return recipes;
  };

  return (
    <section>
      <label
        htmlFor="filter"
      >
        Ingredient
        <input
          id="ingredient"
          name="filter"
          onChange={ ({ target }) => setFilter(target.id) }
          data-testid="ingredient-search-radio"
          type="radio"
        />
      </label>
      <label
        htmlFor="filter"
      >
        name
        <input
          id="name"
          name="filter"
          onChange={ ({ target }) => setFilter(target.id) }
          data-testid="name-search-radio"
          type="radio"
        />
      </label>
      {' '}
      <label
        htmlFor="filter"
      >
        first letter
        <input
          id="first-letter"
          name="filter"
          onChange={ ({ target }) => setFilter(target.id) }
          data-testid="first-letter-search-radio"
          type="radio"
        />
      </label>
      <button
        onClick={ getRecipes }
        data-testid="exec-search-btn"
        type="button"
      >
        Buscar
      </button>
    </section>
  );
}

Filters.propTypes = {
  nameOfItem: propTypes.string.isRequired,
};

export default Filters;
