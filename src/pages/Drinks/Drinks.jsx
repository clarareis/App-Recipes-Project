import React from 'react';
import Header from '../../Components/Header';
import Recipes from '../../Components/Recipes';
import './Drinks.css';

function Drinks() {
  return (
    <section
      className="drinks_content"
    >
      <Header headerName="Drinks" />
      <Recipes recipeType="Drinks" />
    </section>
  );
}

export default Drinks;
