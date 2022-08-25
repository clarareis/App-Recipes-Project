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
  const [recipe, setRecipes] = useState({});
  // const [buttonDisable, setButtonDisable] = useState(false);
  const { id } = useParams();

  const inProgressRecipes = getLocalStore('inProgressRecipes');
  // const [Receita, setReceita] = useState([]);

  const keys = {
    name: (endpoint === 'foods') ? 'strMeal' : 'strDrink',
    img: (endpoint === 'foods') ? 'strMealThumb' : 'strDrinkThumb',
    category: (endpoint === 'foods') ? 'strCategory' : 'strAlcoholic',
  };

  const localStorageDoneRecipes = () => {
    const { idMeal, idDrink, strTags, strCategory,
      strMealThumb, strDrinkThumb,
      strDrink, strMeal, strArea, strAlcoholic } = recipe;
      // else ternario com o pype
    const doneRecipes = getLocalStore('doneRecipes') || [];
    updateLocalStore('doneRecipes', [...doneRecipes, {
      id: endpoint === 'foods' ? idMeal : idDrink,
      type: strTags,
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: endpoint === 'foods' ? 'Food Dont Have alcool' : strAlcoholic,
      name: endpoint === 'foods' ? strMeal : strDrink,
      image: endpoint === 'foods' ? strMealThumb : strDrinkThumb,
      doneDate: '',
      tags: strTags,
    }]);
  };

  // const { idMeal, idDrink } = recipe;

  const getItemLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  console.log(getItemLocalStorage);
  const { idDrink, idMeal } = recipe;
  // updateLocalStore('inProgressRecipes',
  const saveId = () => {
    const getDrinksAndMels = {
      ...getItemLocalStorage,
      cocktails: {
        ...getItemLocalStorage.cocktails,
        idDrink,
      },
      meals: {
        ...getItemLocalStorage.meals,
        idMeal,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(getDrinksAndMels));
  };
  const localStorageStartRecipes = () => {
    if (endpoint === 'foods') {
      const ids = Object.keys(inProgressRecipes.meals);
      return ids.includes(id);
    }
    const idsArrays = Object.keys(inProgressRecipes.cocktails);
    return idsArrays.includes(id);
  };

  const isRecipesProgress = getItemLocalStorage;

  const text = isRecipesProgress ? 'Continue Recipe' : 'Start Recipe';

  const startRecipe = () => {
    saveId();
    localStorageStartRecipes();
    // history.push(`/${endpoint}/${id}-in-progress`);
  };

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
        onClick={ () => startRecipe() }
      >
        {text}
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
