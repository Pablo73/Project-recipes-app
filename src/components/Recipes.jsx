import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Card from './Card';

function Recipes() {
  const { renderMeals, renderDrinks } = useContext(RecipesContext);
  const [recipes, setRecipes] = useState([]);
  const location = useLocation();
  const isMealsLocation = location.pathname.includes('/meals');
  const isDrinksLocation = location.pathname.includes('/drinks');

  useEffect(() => {
    if (isMealsLocation && !renderMeals.length) {
      console.log('entrou meals');

      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((res) => res.json())
        .then((res) => setRecipes(res.meals))
        .catch((error) => console.error(error));
    }
    if (isDrinksLocation && !renderDrinks.length) {
      console.log('entrou drink');
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((res) => res.json())
        .then((res) => setRecipes(res.drinks))
        .catch((error) => console.error(error));
    }
  }, []);

  const isRenderItemLengthBiggerThan = renderMeals.length > 1 || renderDrinks.length > 1;
  const MAX_INDEX = 12;
  const recipesFilteredByMaxIndex = recipes.filter((recipe, index) => index < MAX_INDEX);
  const listToRender = isMealsLocation ? renderMeals : renderDrinks;

  return (
    <div>
      <h1>Recipes</h1>
      <div>
        {isRenderItemLengthBiggerThan
          ? listToRender
            .filter((rec, index) => index < MAX_INDEX)
            .map((recipe, index) => (
              <Card
                key={ index }
                index={ index }
                image={
                  isMealsLocation ? recipe.strMealThumb : recipe.strDrinkThumb
                }
                name={ isMealsLocation ? recipe.strMeal : recipe.strDrink }
              />
            ))
          : recipesFilteredByMaxIndex.map((recipe, index) => (
            <Card
              key={ index }
              index={ index }
              image={
                isMealsLocation ? recipe.strMealThumb : recipe.strDrinkThumb
              }
              name={ isMealsLocation ? recipe.strMeal : recipe.strDrink }
            />
          ))}
      </div>
    </div>
  );
}

export default Recipes;
