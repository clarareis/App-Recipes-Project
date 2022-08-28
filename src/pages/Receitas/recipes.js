import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecipeDetails from '../../Components/RecipeDetails/RecipeDetails';
import '../../Components/RecipeDetails/RecipeDetails.css';
import { updateLocalStore } from '../../LocalStore/LocalStore';
import { endpointByIdDrinks,
  endpointByIdFood,
  endpointDrinkRecomendation,
  endpointFoodRecomendation } from '../../services/_end_points';
import './Recipes.css';

function Recipes() {
  const history = useHistory();
  const { pathname } = history.location;
  const lastI = pathname.lastIndexOf('/');
  const endpoint = pathname.slice(1, lastI);
  const [recomendacao, setRecomendacao] = useState([]);
  const [TextRecipes, setTextRecipes] = useState('Start Recipe');
  const [recipe, setRecipes] = useState({});
  const [showBtn, setShowBtn] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  // const [buttonDisable, setButtonDisable] = useState(false);
  const { id } = useParams();

  // const inProgressRecipes = getLocalStore('inProgressRecipes');
  // const [Receita, setReceita] = useState([]);
  // const endpointType = endpoint === 'foods' ? 'foods' : 'drinks';
  const keyOfInprogress = endpoint === 'foods' ? 'meals' : 'cocktails';
  const keys = {
    name: (endpoint === 'foods') ? 'strMeal' : 'strDrink',
    img: (endpoint === 'foods') ? 'strMealThumb' : 'strDrinkThumb',
    category: (endpoint === 'foods') ? 'strCategory' : 'strAlcoholic',
  };

  const checkDoneRecipe = () => {
    const result = JSON.parse(localStorage.getItem('doneRecipes'));
    const isDone = result && result.some((item) => item.id === id);
    if (isDone) {
      setShowBtn(false);
    }
  };

  const buildIngredients = async (myRecipe) => {
    const VINTE = 20;
    const myIngredients = [];
    for (let i = 1; i <= VINTE; i += 1) {
      if (myRecipe[`strIngredient${i}`]) {
        myIngredients.push({
          ingredient: `${myRecipe[`strMeasure${i}`]} ${myRecipe[`strIngredient${i}`]}`,
          isConclude: false,
        });
      }
      setIngredients(myIngredients);
    }
  };

  const saveId = async () => {
    const getItemLocalStorage = localStorage.getItem('inProgressRecipes')
      ? JSON.parse(localStorage.getItem('inProgressRecipes')) : {};
    if (getItemLocalStorage[keyOfInprogress][id]) {
      history.push(`${pathname}/in-progress`);
      return;
    }
    const newItem = {
      ...getItemLocalStorage,
      [keyOfInprogress]: { ...getItemLocalStorage[keyOfInprogress],
        [id]: ingredients } };

    localStorage.setItem('inProgressRecipes', JSON.stringify(newItem));

    history.push(`${pathname}/in-progress`);
  };

  const verifyIsProgress = () => {
    if (localStorage.getItem('inProgressRecipes')) {
      const progres = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const verification = Object.keys(progres[keyOfInprogress])
        .some((item) => item === id);
      console.log(verification);
      if (verification) {
        setTextRecipes('Continue Recipe');
      }
      return;
    }
    updateLocalStore('inProgressRecipes', { cocktails: {}, meals: {} });
  };

  useEffect(() => {
    verifyIsProgress();
    checkDoneRecipe();
  }, []);

  useEffect(() => {
    const testFoodOrDrink = async () => {
      if (endpoint === 'foods') {
        const fetchRecipes = await endpointByIdFood(id);
        buildIngredients(await fetchRecipes);
        setRecipes(fetchRecipes);
        setRecomendacao(await endpointFoodRecomendation());
      } if (endpoint === 'drinks') {
        const fetchRecipes = await endpointByIdDrinks(id);
        buildIngredients(await fetchRecipes);
        setRecomendacao(await endpointDrinkRecomendation());
        setRecipes(fetchRecipes);
      }
    };
    testFoodOrDrink();
  }, []);
  return (
    <>
      {
        showBtn && (
          <button
            className="btn_start"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => saveId() }
          >
            {TextRecipes}
          </button>
        )
      }

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
