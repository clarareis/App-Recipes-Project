import React from 'react';
import './Progress.css';
import { useParams } from 'react-router-dom';

function RecipeInProgress() {
  const { id } = useParams();
  console.log(id);

  return (
    <section>
      <h1>Recipe Progress</h1>
    </section>
  );
}

export default RecipeInProgress;
