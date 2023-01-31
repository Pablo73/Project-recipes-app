import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

function RecipeDetails({ recipeId, url }) {
  const [detailsMeals, setDetailsMeals] = useState([]);
  const [detailsDrinks, setDetailsDrinks] = useState([]);
  const isMealsLocation = url.includes(`/meals/${recipeId}`);
  const isDrinksLocation = url.includes(`/drinks/${recipeId}`);

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

  // console.log(detailsMeals, detailsDrinks);

  return (
    <div>
      <h1>RecipeDetails</h1>
      {
        isMealsLocation ? detailsMeals.map((meals) => (
          <div key={ meals.idMeal }>
            <h3 data-testid="recipe-title">{meals.strMeal}</h3>
            {/* <ol>
              {detailsMeals.forEach((ele) => {
                const ingredient = Object.keys(ele)
                  .filter((ingr) => ingr.includes('strIngredient'));

                const measure = Object.keys(ele)
                  .filter((ingr) => ingr.includes('strMeasure'));

                const ingredientListed = ingredient
                  .filter((a) => ele[a] !== '' && ele[a] !== null);

                const measureListed = measure
                  .filter((a) => ele[a] !== '' && ele[a] !== null);

                console.log(ingredientListed.map((vai) => ele[vai]));
              })}
            </ol> */}
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
          : detailsDrinks.map((drink, index) => (
            <div key={ drink.idDrink }>
              <h3 data-testid="recipe-title">{drink.strDrink}</h3>
              <ol>
                <li
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${drink.strIngredient1} - ${drink.strMeasure1}`}
                </li>
                <li
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${drink.strIngredient2} - ${drink.strMeasure2}`}
                </li>
                <li
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${drink.strIngredient3} - ${drink.strMeasure3}`}
                </li>
              </ol>
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
    </div>
  );
}

export default RecipeDetails;

RecipeDetails.propTypes = {
  recipeId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
