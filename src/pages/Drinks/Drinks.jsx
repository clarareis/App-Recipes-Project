import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../Components/Header';
import Recipes from '../../Components/Recipes';
import { fetchRecipeList } from '../../Redux/actions/recipesActions/recipeActions';
import './Drinks.css';
import Footer from '../../Components/Footer/Footer';

function Drinks() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRecipeList('Drinks'));
  }, []);
  return (
    <section
      className="drinks_content"
    >
      <Header headerName="Drinks" />
      <Recipes recipeType="Drinks" />
      <Footer />
    </section>
  );
}

export default Drinks;
