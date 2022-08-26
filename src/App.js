import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import DoneRecipes from './pages/DoneRecipes/DoneRecipes';
import Foods from './pages/Foods/Foods';
import Drinks from './pages/Drinks/Drinks';
import profile from './pages/Profile/Profile';

import FavoriteRecipes from './pages/FavoriteRecipes/FavoriteRecipes';
import ProgressFood from './pages/ProgressFood/ProgressFood';
import DrinkProgress from './pages/DrinkProgress/DrinkProgress';
import Receitas from './pages/Receitas/recipes';

const id = 'id-da-receita';

function App() {
  return (
    <main className="meals">
      <Switch>
        <Route component={ Login } path="/" exact />
        <Route component={ Foods } path="/foods" exact />
        <Route component={ Drinks } path="/drinks" exact />
        <Route component={ Receitas } path="/foods/:id" exact>
          {/* <RecipeDetails recipeType="meal" /> */}
        </Route>
        <Route component={ Receitas } path="/drinks/:id" exact />
        <Route
          component={ ProgressFood }
          path={ `/foods/${id}/in-progress` }
          exact
        />
        <Route
          component={ DrinkProgress }
          path={ `/drinks/${id}/in-progress` }
          exact
        />
        <Route component={ profile } path="/profile" exact />
        <Route component={ DoneRecipes } path="/done-recipes" exact />
        <Route component={ FavoriteRecipes } path="/favorite-recipes" exact />
      </Switch>
    </main>
  );
}

export default App;
