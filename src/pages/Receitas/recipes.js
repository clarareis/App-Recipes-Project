import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecipeDetails from '../../Components/RecipeDetails/RecipeDetails';
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
  const { id } = useParams();
  const keys = {
    name: (endpoint === 'foods') ? 'strMeal' : 'strDrink',
    img: (endpoint === 'foods') ? 'strMealThumb' : 'strDrinkThumb',
    category: (endpoint === 'foods') ? 'strCategory' : 'strAlcoholic',
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
    <RecipeDetails
      keys={ keys }
      endpoint={ endpoint }
      recomendacao={ recomendacao }
      recipe={ recipe }
    />
  );
}

export default Recipes;
