import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Footer from '../../Components/Footer/Footer';
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
      <Footer />
    </section>
  );
}

export default Foods;
