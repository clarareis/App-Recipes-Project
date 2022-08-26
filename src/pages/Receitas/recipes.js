import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecipeDetails from '../../Components/RecipeDetails/RecipeDetails';
import '../../Components/RecipeDetails/RecipeDetails.css';
import { getLocalStore, updateLocalStore } from '../../LocalStore/LocalStore';
import { endpointByIdDrinks,
  endpointByIdFood,
  endpointDrinkRecomendation,
  endpointFoodRecomendation } from '../../services/_end_points';

function Recipes() {
  const history = useHistory();
  const { pathname } = history.location;
  const lastI = pathname.lastIndexOf('/');
  const endpoint = pathname.slice(1, lastI);
  const [recomendacao, setRecomendacao] = useState([]);
  const [TextRecipes, setTextRecipes] = useState('Start Recipe');
  const [recipe, setRecipes] = useState({});
  // const [buttonDisable, setButtonDisable] = useState(false);
  const { id } = useParams();

  // const inProgressRecipes = getLocalStore('inProgressRecipes');
  // const [Receita, setReceita] = useState([]);
  const endpointType = endpoint === 'foods' ? 'foods' : 'drinks';
  const keys = {
    name: (endpoint === 'foods') ? 'strMeal' : 'strDrink',
    img: (endpoint === 'foods') ? 'strMealThumb' : 'strDrinkThumb',
    category: (endpoint === 'foods') ? 'strCategory' : 'strAlcoholic',
  };

  const checkDoneRecipe = () => {
    const result = getLocalStore('doneRecipes');
    return result.some((item) => item.id === id);
  };

  // const { idMeal, idDrink } = recipe;

  // updateLocalStore('inProgressRecipes',
  const saveId = () => {
    const getItemLocalStorage = localStorage.getItem('inProgressRecipes')
      ? JSON.parse(localStorage.getItem('inProgressRecipes')) : {};

    const newItem = {
      ...getItemLocalStorage,
      [endpointType]: { ...getItemLocalStorage[endpointType],
        [id]: [] } };

    localStorage.setItem('inProgressRecipes', JSON.stringify(newItem));

    history.push(`${pathname}-in-progress`);
  };

  const button = () => {
    if (localStorage.getItem('inProgressRecipes')) {
      const progres = JSON.parse(localStorage.getItem('inProgressRecipes'));
      console.log(progres);
      // const verification = Object.keys(progres[endpointType])
      //   .some((item) => item === id);
      // if (verification) {
      //   setTextRecipes('Continue Recipe');
      // }
    }
    // asdasd
  };

  useEffect(() => {
    button();
    checkDoneRecipe();
    // localStorageStartRecipes();
    localStorageDoneRecipes();
  }, []);

  useEffect(() => {
    const testFoodOrDrink = async () => {
      if (endpoint === 'foods') {
        setRecipes(await endpointByIdFood(id));
        setRecomendacao(await endpointFoodRecomendation());
      } if (endpoint === 'drinks') {
        setRecomendacao(await endpointDrinkRecomendation());
        setRecipes(await endpointByIdDrinks(id));
      }
    };
    testFoodOrDrink();
  }, []);
  return (
    <>
      <button
        type="button"
        className="startRecipeBtn"
        data-testid="start-recipe-btn"
        onClick={ () => saveId() }
      >
        {TextRecipes}
      </button>
      <RecipeDetails
        keys={ keys }
        endpoint={ endpoint }
        recomendacao={ recomendacao }
        recipe={ recipe }
      />
    </>
  );
}

export default Recipes;
