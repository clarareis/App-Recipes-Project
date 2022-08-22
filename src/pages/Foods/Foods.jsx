import React from 'react';
import Header from '../../Components/Header';
import Recipes from '../../Components/Recipes';
import './Foods.css';

function Foods() {
  return (
    <section
      className="foods_content"
    >
      <Header headerName="Foods" />
      <Recipes />
    </section>
  );
}

export default Foods;
