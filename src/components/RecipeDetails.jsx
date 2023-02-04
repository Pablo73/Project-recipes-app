// import PropTypes from 'prop-types';
import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Button from './Button';
import RecommendationsMeals from './RecommendationsMeals';
import RecommendationsDrinks from './RecommendationsDrinks';
import combineIngredientsAndMeasures from '../helpers/combineIngredientsAndMeasures';
import Buttons from './ShareAndFavoriteButtons';
import '../assets/css/Recipes.css';

const thirtyTwo = 32;
const eleven = 11;

function RecipeDetails() {
  const location = useLocation();
  const isMealsLocation = location.pathname.includes('/meals');
  const { id: recipeId } = useParams();
  const url = isMealsLocation
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;

  const { data: recipe } = useFetch(url);
  const { data: mealsRecommendations } = useFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { data: drinksRecommendations } = useFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');

  const history = useHistory();

  const progress = () => {
    if (isMealsLocation) {
      return history.push(`/meals/${recipeId}/in-progress`);
    }
    return history.push(`/drinks/${recipeId}/in-progress`);
  };

  function isInProgress() {
    const path = location.pathname.split('/');
    const type = path[1];
    const typeId = path[2];
    let inProgress = false;
    const inProgressRecipe = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    if (inProgressRecipe) {
      Object.keys(inProgressRecipe[type]).forEach((reciId) => {
        if (reciId === typeId) {
          inProgress = true;
        }
      });
    }
    return inProgress;
  }

  return (
    <div>
      <h1>RecipeDetails</h1>
      {
        recipe && (
          isMealsLocation ? recipe.meals.map((meals) => (
            <div key={ meals.idMeal }>
              <RecommendationsDrinks
                recommendation={ drinksRecommendations
                && drinksRecommendations.drinks }
              />
              <h3 data-testid="recipe-title">{meals.strMeal}</h3>
              <ul>
                {combineIngredientsAndMeasures(recipe.meals)
                  .map((ingredient, index) => ((
                    <li
                      key={ index }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {ingredient}
                    </li>)))}
              </ul>
              <p data-testid="recipe-category">
                Category:
                {' '}
                {meals.strCategory}

              </p>
              <img
                src={ meals.strMealThumb }
                alt={ meals.strMeal }
                data-testid="recipe-photo"
                className="card"
              />
              <p data-testid="instructions">
                Intructions:
                {' '}
                {meals.strInstructions}

              </p>
              <iframe
                data-testid="video"
                width="560"
                height="315"
                src={ `https://www.youtube.com/embed/${meals.strYoutube.substr(thirtyTwo, eleven)}` }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write;
                encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>))
            : recipe.drinks.map((drink) => (
              <div key={ drink.idDrink }>
                <RecommendationsMeals
                  recommendation={ mealsRecommendations
                  && mealsRecommendations.meals }
                />
                <h3 data-testid="recipe-title">{drink.strDrink}</h3>
                <ul>
                  {combineIngredientsAndMeasures(recipe.drinks)
                    .map((ingredient, dIndex) => ((
                      <li
                        key={ dIndex }
                        data-testid={ `${dIndex}-ingredient-name-and-measure` }
                      >
                        {ingredient}
                      </li>)))}

                </ul>
                <p data-testid="recipe-category">
                  Drink:
                  {' '}
                  {drink.strAlcoholic}
                </p>
                <img
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  data-testid="recipe-photo"
                  className="card"
                />
                <p data-testid="instructions">
                  Intructions:
                  {' '}
                  {drink.strInstructions}
                </p>
              </div>))
        )
      }
      <Button
        testId="start-recipe-btn"
        onButtonClick={ () => progress() }
        buttonClass="start-recipe-btn"
        buttonName={ isInProgress() ? 'Continue Recipe' : 'Start Recipe' }
      />
      <div>
        <Buttons
          url={ location.pathname }
          detailsMeals={ recipe && recipe.meals }
          detailsDrinks={ recipe && recipe.drinks }
        />
      </div>
    </div>
  );
}

export default RecipeDetails;
