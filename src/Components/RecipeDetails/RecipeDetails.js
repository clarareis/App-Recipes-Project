import React, { useState } from 'react';
// import './recipeDetails.css';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import { getLocalStore, updateLocalStore } from '../../LocalStore/LocalStore';
import './RecipeDetails.css';

const six = 6;

function RecipeDetails({ recipe, keys, endpoint, recomendacao }) {
  const { name, category, img } = keys;
  const [buttonDisable, setButtonDisable] = useState(false);
  const doneRecipes = getLocalStore('doneRecipes');
  // console.log(keys);
  // console.log(recomendacao);
  const recipesIncrements = () => {
    const allRecipes = [];
    const vinteIngredientes = 20;
    for (let i = 1; i <= vinteIngredientes; i += 1) {
      if (recipe[`strIngredient${i}`]) {
        allRecipes.push(
          <li
            data-testid={ `${i - 1}-ingredient-name-and-measure` }
            key={ i }
          >
            { recipe[`strMeasure${i}`] }
            { recipe[`strIngredient${i}`] }
          </li>,
        );
      }
    }
    return <ul>{allRecipes}</ul>;
  };

  const localStorageDoneRecipes = () => {
    const { idMeal, idDrink, strTags, strCategory,
      strMealThumb, strDrinkThumb,
      strDrink, strMeal, strArea, strAlcoholic } = recipe;
    const addARecipe = [updateLocalStore(doneRecipes), {
      id: endpoint === foods ? idMeal : idDrink,
      type: strTags,
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: endpoint === foods ? 'Food Dont Have alcool' : strAlcoholic,
      name: endpoint === foods ? strMeal : strDrink,
      image: endpoint === foods ? strMealThumb : strDrinkThumb,
      doneDate: '',
      tags: strTags }];
    return addARecipe;
  };

  const BtnLocalStorage = () => {
    localStorageDoneRecipes();
  };

  const seisReceitas = recomendacao.filter((e, i) => i < six);
  // para fazer o carrossel utilizei esse link//https://react-bootstrap.github.io/components/carousel/
  return (
    <div>
      <h1
        className="recipeContent"
        data-testid="recipe-title"
      >
        { recipe[name] }

      </h1>
      <img
        data-testid="recipe-photo"
        className="imgRecipe"
        style={ { width: '100px' } }
        src={ recipe[img] }
        alt={ recipe.strTags }
      />
      <p data-testid="recipe-category">
        {recipe[category]}
      </p>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      { recipesIncrements() }
      {recipe.strYoutube && <iframe
        width="350"
        data-testid="video"
        height="100"
        src={ recipe.strYoutube }
        frameBorder="0"
        title="videos "
      />}

      <Carousel>
        { seisReceitas.map((receitas, i) => {
          const { strDrink, strDrinkThumb, strMeal, strMealThumb } = receitas;
          return (
            endpoint === 'foods' ? (
              <Carousel.Item
                key={ strDrink }
                data-testid={ `${i}-recomendation-card` }
              >
                <img
                  width="200px"
                  heigth="200"
                  alt={ strDrink }
                  src={ strDrinkThumb }
                />
                <Carousel.Caption>
                  <span data-testid={ `${i}-recomendation-title` }>{ strDrink }</span>
                </Carousel.Caption>
              </Carousel.Item>
            ) : (
              <Carousel.Item
                data-testid={ `${i}-recomendation-card` }
              >
                <img
                  width="100%"
                  heigth="200"
                  alt={ strMeal }
                  src={ strMealThumb }
                />
                <Carousel.Caption>
                  <span data-testid={ `${i}-recomendation-title` }>{ strMeal }</span>
                </Carousel.Caption>
              </Carousel.Item>
            )
          );
        })}
      </Carousel>
      <button
        type="button"
        onClick={ BtnLocalStorage }
      >
        aa
      </button>
      <button
        type="button"
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
        // onClick={ () => startRecipes() }
      >
        Start Recipe
      </button>
    </div>
  );
}

export default RecipeDetails;

RecipeDetails.propTypes = {
  recipe: PropTypes.shape({
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strSource: PropTypes.string,
    strTags: PropTypes.string,
    strMeal: PropTypes.string,
    strYoutube: PropTypes.string,
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strArea: PropTypes.string,
    strAlcoholic: PropTypes.string,
  }).isRequired,
  keys: PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    img: PropTypes.string,
  }).isRequired,
  endpoint: PropTypes.string.isRequired,
  recomendacao: PropTypes.arrayOf(PropTypes.object).isRequired,
};
