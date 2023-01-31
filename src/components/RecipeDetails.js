import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import Recommendations from './Recommendations';
import '../assets/css/Recipes.css';

const thirtyTwo = 32;
const eleven = 11;

function RecipeDetails({ recipeId, url }) {
  const [detailsMeals, setDetailsMeals] = useState([]);
  const [detailsDrinks, setDetailsDrinks] = useState([]);
  const isMealsLocation = url.includes(`/meals/${recipeId}`);
  const isDrinksLocation = url.includes(`/drinks/${recipeId}`);
  const { data: mealsRecommendations } = useFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const [mealsRecommendation, setMealsRecommendation] = useState([]);

  const { data: drinksRecommendations } = useFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const [drinksRecommendation, setDrinksRecommendation] = useState([]);

  useEffect(() => {
    if (isMealsLocation) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
        .then((res) => res.json())
        .then((res) => setDetailsMeals(res.meals))
        .catch((error) => console.error(error));

      setDrinksRecommendation(drinksRecommendations.drinks);
    }
    if (isDrinksLocation) {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
        .then((res) => res.json())
        .then((res) => setDetailsDrinks(res.drinks))
        .catch((error) => console.error(error));

      setMealsRecommendation(mealsRecommendations.meals);
    }
  }, [isDrinksLocation, isMealsLocation]);

  // console.log(detailsMeals, detailsDrinks);

  return (
    <div>
      <h1>RecipeDetails</h1>
      <Recommendations
        mealsRecommendation={ mealsRecommendation }
        drinksRecommendation={ drinksRecommendation }
      />
      {
        isMealsLocation ? detailsMeals.map((meals) => (
          <div key={ meals.idMeal }>
            <h3 data-testid="recipe-title">{meals.strMeal}</h3>
            <ol>
              {/* {detailsMeals.forEach((ele) => {
                const ingredient = Object.keys(ele)
                  .filter((ingr) => ingr.includes('strIngredient'));

                const measure = Object.keys(ele)
                  .filter((ingr) => ingr.includes('strMeasure'));

                const ingredientListed = ingredient
                  .filter((a) => ele[a] !== '' && ele[a] !== null);

                const measureListed = measure
                  .filter((a) => ele[a] !== '' && ele[a] !== null);

                return ingredientListed.map((vai) => (
                  <li
                    key={ vai }
                    // data-testid={ `${index + 1}-ingredient-name-and-measure` }
                  >
                    {`${ele[vai]} -`}
                  </li>
                ));
              })} */}
            </ol>
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
