import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';
import RecommendationsMeals from './RecommendationsMeals';
import RecommendationsDrinks from './RecommendationsDrinks';
import '../assets/css/Recipes.css';

const thirtyTwo = 32;
const eleven = 11;

function RecipeDetails({ recipeId, url }) {
  const [detailsMeals, setDetailsMeals] = useState([]);
  const [detailsDrinks, setDetailsDrinks] = useState([]);
  const isMealsLocation = url === `/meals/${recipeId}`;
  const isDrinksLocation = url === `/drinks/${recipeId}`;
  const { data: mealsRecommendations } = useFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { data: drinksRecommendations } = useFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');

  const { setMealsRecommendation, setDrinksRecommendation } = useContext(RecipesContext);

  useEffect(() => {
    if (isMealsLocation) {
      setDrinksRecommendation(drinksRecommendations.drinks);

      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
        .then((res) => res.json())
        .then((res) => setDetailsMeals(res.meals))
        .catch((error) => console.error(error));
    }
    if (isDrinksLocation) {
      setMealsRecommendation(mealsRecommendations.meals);

      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
        .then((res) => res.json())
        .then((res) => setDetailsDrinks(res.drinks))
        .catch((error) => console.error(error));
    }
  }, [isDrinksLocation, isMealsLocation, drinksRecommendations, mealsRecommendations]);

  const combineIngredientsAndMeasures = (details) => {
    // Extraindo os ingredientes nas chaves que incluem strIngredient;
    const ingredients = Object.keys(details[0])
      .filter((key) => key.includes('strIngredient'))
      .reduce((obj, key) => Object.assign(obj, {
        [key]: details[0][key],
      }), {});

    // Extraindo as medidas nas chaves que incluem strMeasure;
    const measures = Object.keys(details[0])
      .filter((key) => key.includes('strMeasure'))
      .reduce((obj, key) => Object.assign(obj, {
        [key]: details[0][key],
      }), {});

    const measuresArray = Object.values(measures);

    const combinedValues = Object.values(ingredients)
      .map((ingredient, index) => `${ingredient} ${!measuresArray[index]
        ? ''
        : measuresArray[index]}`)
      .filter((combination) => combination !== '  ' && !combination.includes(null));

    return combinedValues;
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
    </div>
  );
}

export default RecipeDetails;

RecipeDetails.propTypes = {
  recipeId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
