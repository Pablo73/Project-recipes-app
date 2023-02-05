import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Buttons from '../components/ShareAndFavoriteButtons';
import IngredientInput from '../components/IngredientInput';
import combineIngredientsAndMeasures from '../helpers/combineIngredientsAndMeasures';

function RecipeInProgress() {
  const location = useLocation();
  const isMealsLocation = location.pathname.includes('/meals');
  const { id: routeId } = useParams();
  const url = isMealsLocation
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${routeId}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${routeId}`;

  const { data: recipe, loading } = useFetch(url);

  const dataPrefix = isMealsLocation ? 'strMeal' : 'strDrink';

  const defineRecipeKey = (sufix = '') => recipe
    && (isMealsLocation
      ? recipe.meals[0][`${dataPrefix}${sufix}`]
      : recipe.drinks[0][`${dataPrefix}${sufix}`]);

  return (
    <div className="done-card">
      {loading && <p>{loading}</p>}
      {recipe && (
        <div>
          <img
            src={ defineRecipeKey('Thumb') }
            alt={ defineRecipeKey() }
            data-testid="recipe-photo"
            className="done-img"
          />
          <p data-testid="recipe-title" className="recipe-name">
            {defineRecipeKey()}
          </p>
          <p data-testid="recipe-category" className="recipe-category">
            {isMealsLocation
              ? recipe.meals[0].strCategory
              : recipe.drinks[0].strCategory}
          </p>
          <p data-testid="instructions">
            {isMealsLocation
              ? recipe.meals[0].strInstructions
              : recipe.drinks[0].strInstructions}
          </p>
          <div className="ingredients-list">
            {combineIngredientsAndMeasures(
              isMealsLocation ? recipe.meals : recipe.drinks,
            ).map((ingredient, index) => (
              <IngredientInput
                key={ index }
                testId={ `${index}-ingredient-step` }
                ingredient={ ingredient }
              />
            ))}
          </div>
          <Buttons />
          <button data-testid="finish-recipe-btn">Finish Recipe</button>
        </div>
      )}
    </div>
  );
}

export default RecipeInProgress;
