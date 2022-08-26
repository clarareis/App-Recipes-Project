/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  requestRecipesByfilter } from '../../services/fetchFoodsAndDrinks';
import './SearchBar.css';
import {
  fetchRecipes } from '../../Redux/actions/recipesActions/recipeActions';

function SearchBar({ nameOfItem, showSearch, setNameOfItem }) {
  const [filter, setFilter] = useState('');
  const [nowPath, setNowpath] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setNowpath(history.location.pathname.slice(1));
  }, [history.location.pathname]);

  const verifyIsALetter = () => {
    if (filter === 'first-letter' && nameOfItem.length > 1) {
      alert('Your search must have only 1 (one) character');
    }
  };

  const getRecipes = async () => {
    verifyIsALetter();
    const recipes = await requestRecipesByfilter(nowPath, filter, nameOfItem);
    const dispatchParams = {
      nowPath, filter, nameOfItem, history, recipes,
    };
    dispatch(fetchRecipes(dispatchParams));
  };

  return (
    <section
      className="searchbar_container"
    >
      {
        showSearch && (
          <input
            onChange={ ({ target }) => setNameOfItem(target.value) }
            data-testid="search-input"
            value={ nameOfItem }
            name="search"
          />
        )
      }
      <section
        className="radio_area"
      >
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
      </section>
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

SearchBar.propTypes = {
  nameOfItem: propTypes.string.isRequired,
  showSearch: propTypes.bool.isRequired,
  setNameOfItem: propTypes.func.isRequired,
};

export default SearchBar;
