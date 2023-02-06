import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import SearchFoods from './pages/SearchFoods';
import SearchDrinks from './pages/SearchDrinks';
import RecipeInProgress from './pages/RecipeInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/meals/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/drinks/:id" component={ SearchDrinks } />
        <Route exact path="/meals/:id" component={ SearchFoods } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
