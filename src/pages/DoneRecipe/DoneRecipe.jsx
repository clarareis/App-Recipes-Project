import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import icon from '../../images/shareIcon.svg';
import './doneRecipes.css';

function DoneRecipe() {
  const localRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [typeBtn, setTypeBtn] = useState('');
  const [msg, setMsg] = useState(false);

  const MSG_TIMEOUT = 3000;

  const shareRecipe = (type, id) => {
    copy(`${window.location.origin}/${type}s/${id}`);
    setMsg(true);
    setTimeout(() => setMsg(false), MSG_TIMEOUT);
  };

  return (
    <div
      className="done_recipes_container"
    >
      <Header headerName="Done Recipes" />
      <h3>DoneRecipe</h3>
      <section
        className="btn_filter_area"
      >
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setTypeBtn('') }
        >
          All
        </button>

        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => setTypeBtn('food') }
        >
          Food
        </button>

        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setTypeBtn('drink') }
        >
          Drinks
        </button>

      </section>
      <section
        className="recipes_cards_caontainer"
      >
        {msg && <p>Link copied!</p>}
        {localRecipes && localRecipes.filter((element) => (!typeBtn ? element
          : element.type === typeBtn))
          .map((recipe, index) => (
            <div key={ index }>

              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt="card"
                  width="150px"
                />
              </Link>

              <p data-testid={ `${index}-horizontal-top-text` }>
                { recipe.type === 'food' ? `${recipe.nationality} - ${recipe.category}`
                  : recipe.alcoholicOrNot }
              </p>

              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <h5
                  data-testid={ `${index}-horizontal-name` }
                >
                  {recipe.name}
                </h5>
              </Link>

              <p data-testid={ `${index}-horizontal-done-date` }>
                done in:
                { recipe.doneDate }
              </p>

              {recipe.tags.map((tag) => (
                <p
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  { tag }
                </p>
              ))}
              <input
                data-testid={ `${index}-horizontal-share-btn` }
                type="image"
                src={ icon }
                alt="shareIcon"
                onClick={ () => shareRecipe(recipe.type, recipe.id) }
              />
            </div>
          ))}
      </section>

    </div>
  );
}

export default DoneRecipe;
