import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../Components/Header';
import Recipes from '../../Components/Recipes/Recipes';
import { fetchRecipeList } from '../../Redux/actions/recipesActions/recipeActions';
import './Drinks.css';
import Footer from '../../Components/Footer/Footer';
import Categorys from '../../Components/Categorys/Categorys';

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
      <Categorys />
      <Recipes recipeType="Drinks" />
      <Footer />
    </section>
  );
}

export default Drinks;
