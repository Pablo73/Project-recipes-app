import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import Buttons from './Buttons';

function RecipeDetails({ recipeId, url }) {
  const [detailsMeals, setDetailsMeals] = useState([]);
  const [detailsDrinks, setDetailsDrinks] = useState([]);
  const isMealsLocation = url.includes(`/meals/${recipeId}`);
  const isDrinksLocation = url.includes(`/drinks/${recipeId}`);
  const history = useHistory();

  useEffect(() => {
    if (isMealsLocation) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
        .then((res) => res.json())
        .then((res) => setDetailsMeals(res.meals))
        .catch((error) => console.error(error));
    }
    if (isDrinksLocation) {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
        .then((res) => res.json())
        .then((res) => setDetailsDrinks(res.drinks))
        .catch((error) => console.error(error));
    }
  }, [isDrinksLocation, isMealsLocation]);


  const progress = () => {
    if (isMealsLocation) {
      return history.push(`/meals/${recipeId}/in-progress`);
    }
    return history.push(`/drinks/${recipeId}/in-progress`);
  };

  // console.log(detailsMeals, detailsDrinks);

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
            />
            <p data-testid="instructions">
              Intructions:
              {' '}
              {meals.strInstructions}

            </p>
            <iframe
              data-testid="video"
              width="420"
              height="315"
              title={ meals.strMeal }
              src={ `${meals.strYoutube}autoplay=1&mute=1` }
            />
          </div>))
          : detailsDrinks.map((drink) => (
            <div key={ drink.idDrink }>
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
