import React, { useEffect, useState } from 'react';
import './Progress.css';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getLocalStore, updateLocalStore } from '../../LocalStore/LocalStore';
import { setProgressInStore,
  updateProgressInStore } from '../../Redux/actions/recipesActions/recipeCprogressAction';
import { endpointByIdDrinks, endpointByIdFood } from '../../services/_end_points';
import favIcon from '../../images/blackHeartIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import BtnSearch from './BtnSearch';

function RecipeInProgress() {
  const [currRecipe, setCurrRecipe] = useState({});
  const currProgress = useSelector((state) => state.recipeReducer.progress);
  const [doneBtn, setDoneBtn] = useState(true);
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [ingredients, setIngredients] = useState([]);
  const [isFavorite, setIsFavorie] = useState(false);

  const keyOfInprogress = () => {
    if (history.location.pathname.includes('foods')) {
      return 'meals';
    }
    return 'cocktails';
  };

  const getProgressInLocalStorage = () => {
    dispatch(setProgressInStore(id, history.location.pathname, setDoneBtn));
  };

  const buildIngredients = async (myRecipe) => {
    console.log(myRecipe);
    const VINTE = 20;
    const myIngredients = [];
    for (let i = 1; i <= VINTE; i += 1) {
      if (myRecipe[`strIngredient${i}`]) {
        myIngredients.push({
          ingredient: `${myRecipe[`strMeasure${i}`]} ${myRecipe[`strIngredient${i}`]}`,
          isConclude: false,
        });
      }
    }
    setIngredients(myIngredients);
  };

  const saveInLocalStore = async () => {
    const getItemLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const newItem = {
      ...getItemLocalStorage,
      [keyOfInprogress()]: { ...getItemLocalStorage[keyOfInprogress()],
        [id]: ingredients } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newItem));
    console.log(newItem);
    getProgressInLocalStorage();
  };

  const createItemInStore = () => {
    saveInLocalStore();
  };

  const fetchRecipeData = async () => {
    if (history.location.pathname.includes('foods')) {
      const requestRecipe = await endpointByIdFood(id);
      buildIngredients(await requestRecipe);
      setCurrRecipe(await requestRecipe);
      return;
    }
    const requestRecipe = await endpointByIdDrinks(id);
    buildIngredients(await requestRecipe);
    setCurrRecipe(await requestRecipe);
  };

  const updateCheck = (index) => {
    dispatch(updateProgressInStore(index, history.location.pathname, id, setDoneBtn));
  };

  const checkItemExist = () => {
    const progress = getLocalStore('inProgressRecipes');
    return progress && Object
      .keys(progress[keyOfInprogress()]).some((keyOfProgress) => keyOfProgress === id);
  };

  const doneRecipe = () => {
    const fav = {
      id: keyOfInprogress() === 'meals' ? currRecipe.idMeal : currRecipe.idDrink,
      type: keyOfInprogress() === 'meals' ? 'food' : 'drink',
      nationality: currRecipe.strArea ? currRecipe.strArea : '',
      category: currRecipe.strCategory,
      alcoholicOrNot: keyOfInprogress() === 'meals' ? '' : currRecipe.strAlcoholic,
      name: keyOfInprogress() === 'meals' ? currRecipe.strMeal : currRecipe.strDrink,
      doneDate: 'hoje',
      image: keyOfInprogress() === 'meals'
        ? currRecipe.strMealThumb : currRecipe.strDrinkThumb,
      tags: [],
    };
    const progress = getLocalStore('doneRecipes') || [];
    const add = [...progress, fav];
    updateLocalStore('doneRecipes', add);
    history.push('/done-recipes');
  };

  const checkIsFavorite = () => {
    const progress = getLocalStore('favoriteRecipes') || [];
    const verify = progress.some((currFav) => currFav.id === id);
    console.log(verify);
    if (verify) {
      setIsFavorie(true);
      return;
    }
    setIsFavorie(false);
  };

  const favoriteRecipe = () => {
    const fav = {
      id: keyOfInprogress() === 'meals' ? currRecipe.idMeal : currRecipe.idDrink,
      type: keyOfInprogress() === 'meals' ? 'food' : 'drink',
      nationality: currRecipe.strArea ? currRecipe.strArea : '',
      category: currRecipe.strCategory,
      alcoholicOrNot: keyOfInprogress() === 'meals' ? '' : currRecipe.strAlcoholic,
      name: keyOfInprogress() === 'meals' ? currRecipe.strMeal : currRecipe.strDrink,
      image: keyOfInprogress() === 'meals'
        ? currRecipe.strMealThumb : currRecipe.strDrinkThumb,
    };
    const progress = getLocalStore('favoriteRecipes') || [];
    if (isFavorite) {
      const remove = progress.filter((currFav) => currFav.id !== id);
      updateLocalStore('favoriteRecipes', remove);
      setIsFavorie(false);
      return;
    }
    setIsFavorie(true);
    const add = [...progress, fav];
    updateLocalStore('favoriteRecipes', add);
  };

  useEffect(() => {
    fetchRecipeData();
    const progress = getLocalStore('inProgressRecipes');
    checkIsFavorite();
    if (progress) {
      if (!checkItemExist()) {
        createItemInStore();
      }
      getProgressInLocalStorage();
    }
  }, []);

  useEffect(() => {
    const progress = getLocalStore('inProgressRecipes');
    checkIsFavorite();
    if (progress) {
      if (checkItemExist()) {
        return;
      }
      createItemInStore();
    }
  }, [ingredients]);

  useEffect(() => {
    const progress = getLocalStore('inProgressRecipes');
    checkIsFavorite();
    if (!progress) {
      updateLocalStore('inProgressRecipes', { cocktails: {}, meals: {} });
    }
  }, []);

  return (
    <section>
      <h1 data-testid="recipe-title">
        {keyOfInprogress() === 'meals' ? currRecipe.strMeal : currRecipe.strDrink}
      </h1>
      <img
        data-testid="recipe-photo"
        style={ { width: 200 } }
        src={ keyOfInprogress() === 'meals'
          ? currRecipe.strMealThumb : currRecipe.strDrinkThumb }
        alt={ keyOfInprogress() === 'meals' ? currRecipe.idMeal : currRecipe.idDrink }
      />

      <p data-testid="recipe-category">
        { currRecipe.strCategory }
      </p>
      <p>
        {keyOfInprogress() === 'meals' ? '' : currRecipe.strAlcoholic}
      </p>
      <input
        type="image"
        data-testid="favorite-btn"
        onClick={ favoriteRecipe }
        src={ isFavorite ? favIcon : whiteHeart }
        value="fav"
        alt="fav"
      />

      <BtnSearch />
      <p data-testid="instructions">{currRecipe.strInstructions}</p>
      {
        currProgress.map((nowProgress, index) => (
          <label
            data-testid={ `${index}-ingredient-step` }
            key={ nowProgress.ingredient }
            htmlFor={ index }
          >
            <input
              id={ index }
              onChange={ () => updateCheck(index) }
              type="checkbox"
              checked={ nowProgress.isConclude }
              name={ `recipe-check-${index}` }
            />
            <span
              style={ {
                textDecoration: nowProgress.isConclude ? 'line-through' : 'none' } }
            >
              {nowProgress.ingredient}
            </span>
          </label>

        ))
      }
      <button
        data-testid="finish-recipe-btn"
        disabled={ doneBtn }
        type="button"
        onClick={ doneRecipe }
      >
        Ta pronto
      </button>
    </section>
  );
}

export default RecipeInProgress;
