import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../Components/Header';
import Recipes from '../../Components/Recipes';
import { fetchRecipeList } from '../../Redux/actions/recipesActions/recipeActions';
import './Foods.css';

function Foods() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRecipeList('Foods'));
  }, []);

  return (
    <section
      className="foods_content"
    >
      <Header headerName="Foods" />
      <Recipes recipeType="Foods" />
    </section>
  );
}

export default Foods;
