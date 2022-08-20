import React, { useState } from 'react';

function Filters() {
  const [filter, setFilter] = useState('');

  return (
    <section>
      <label
        htmlFor="filter"
      >
        Ingredient
        <input
          id="ingredient"
          name="filter"
          onChange={ ({ target }) => setFilter(target.name) }
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
          onChange={ ({ target }) => setFilter(target.name) }
          data-testid="first-letter-search-radio"
          type="radio"
        />
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
      >
        Buscar
      </button>
    </section>
  );
}

export default Filters;
