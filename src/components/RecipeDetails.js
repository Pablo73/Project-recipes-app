import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';
import RecommendationsMeals from './RecommendationsMeals';
import RecommendationsDrinks from './RecommendationsDrinks';
import combineIngredientsAndMeasures from '../helpers/combineIngredientsAndMeasures';
import '../assets/css/Recipes.css';

const thirtyTwo = 32;
const eleven = 11;
// import Buttons from './Buttons';

function RecipeDetails({ recipeId, url }) {
  const [detailsMeals, setDetailsMeals] = useState([]);
  const [detailsDrinks, setDetailsDrinks] = useState([]);
  const isMealsLocation = url === `/meals/${recipeId}`;
  const isDrinksLocation = url === `/drinks/${recipeId}`;
  const { data: mealsRecommendations } = useFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { data: drinksRecommendations } = useFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');

  const { setMealsRecommendation, setDrinksRecommendation } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    if (isMealsLocation) {
      setDrinksRecommendation(drinksRecommendations && drinksRecommendations.drinks);

      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
        .then((res) => res.json())
        .then((res) => setDetailsMeals(res.meals))
        .catch((error) => console.error(error));
    }
    if (isDrinksLocation) {
      setMealsRecommendation(mealsRecommendations && mealsRecommendations.meals);

      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
        .then((res) => res.json())
        .then((res) => setDetailsDrinks(res.drinks))
        .catch((error) => console.error(error));
    }
  }, [isDrinksLocation, isMealsLocation, drinksRecommendations, mealsRecommendations]);

  const progress = () => {
    if (isMealsLocation) {
      return history.push(`/meals/${recipeId}/in-progress`);
    }
    return history.push(`/drinks/${recipeId}/in-progress`);
  };

  return (
    <div>
      <h1>RecipeDetails</h1>
      {
        isMealsLocation ? detailsMeals.map((meals) => (
          <div key={ meals.idMeal }>
            <RecommendationsDrinks />
            <h3 data-testid="recipe-title">{meals.strMeal}</h3>
            <ul>
              {combineIngredientsAndMeasures(detailsMeals)
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
          : detailsDrinks.map((drink) => (
            <div key={ drink.idDrink }>
              <RecommendationsMeals />
              <h3 data-testid="recipe-title">{drink.strDrink}</h3>
              <ul>
                {combineIngredientsAndMeasures(detailsDrinks)
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
      }
      <button
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => progress() }
        className="start-recipe-btn"
      >
        Start Recipe
      </button>
    </div>
  );
}

export default RecipeDetails;

RecipeDetails.propTypes = {
  recipeId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
