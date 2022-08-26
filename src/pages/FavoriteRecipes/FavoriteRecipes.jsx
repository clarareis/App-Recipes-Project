import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import icon from '../../images/shareIcon.svg';
import favIcon from '../../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [typeBtn, setTypeBtn] = useState('');
  const [msg, setMsg] = useState(false);
  const [fav, setFav] = useState([]);

  const MSG_TIMEOUT = 3000;

  const shareRecipe = (type, id) => {
    copy(`${window.location.origin}/${type}s/${id}`);
    setMsg(true);
    setTimeout(() => setMsg(false), MSG_TIMEOUT);
  };

  const selectedFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
  useEffect(() => {
    setFav(selectedFav);
  }, []);

  const removeFavorites = (id) => {
    const selectedRecipe = selectedFav.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(selectedRecipe));
    console.log(selectedRecipe);
    setFav(selectedRecipe);
  };

  return (
    <div>
      <Header headerName="Favorite Recipes" />
      <h1>FavoriteRecipes</h1>
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
        className="recipes_cards_container"
      >
        {msg && <p>Link copied!</p>}
        {fav && fav.filter((element) => (!typeBtn ? element
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

              <input
                data-testid={ `${index}-horizontal-share-btn` }
                type="image"
                src={ icon }
                alt="shareIcon"
                onClick={ () => shareRecipe(recipe.type, recipe.id) }
              />

              <input
                data-testid={ `${index}-horizontal-favorite-btn` }
                type="image"
                src={ favIcon }
                alt="shareIcon"
                onClick={ () => removeFavorites(recipe.id) }
              />
            </div>
          ))}
      </section>

    </div>
  );
}
export default FavoriteRecipes;
