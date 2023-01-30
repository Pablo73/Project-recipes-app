import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';
import Card from './Card';
import FilterButton from './FilterButton';

function Recipes() {
  const { renderMeals, renderDrinks } = useContext(RecipesContext);
  const [recipes, setRecipes] = useState([]);
  const { data: mealCategories } = useFetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const { data: drinkCategories } = useFetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const isMealsLocation = location.pathname.includes('/meals');
  const isDrinksLocation = location.pathname.includes('/drinks');

  useEffect(() => {
    if (isMealsLocation) {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((res) => res.json())
        .then((res) => setRecipes(res.meals))
        .catch((error) => console.error(error));

      setCategories(mealCategories.meals);
    }
    if (isDrinksLocation) {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((res) => res.json())
        .then((res) => setRecipes(res.drinks))
        .catch((error) => console.error(error));

      setCategories(drinkCategories.drinks);
    }
  }, [isDrinksLocation, isMealsLocation, mealCategories, drinkCategories]);

  const isRenderItemLengthBiggerThan = renderMeals.length > 1 || renderDrinks.length > 1;
  const MAX_RECIPES = 12;
  const MAX_CATEGORIES = 5;
  const listToRender = isMealsLocation ? renderMeals : renderDrinks;

  return (
    <div>
      <h1>Recipes</h1>
      <div className="filters">
        {categories && categories
          .filter((el, index) => index < MAX_CATEGORIES)
          .map((el, index) => (
            <FilterButton key={ index } categoryName={ el.strCategory } />
          ))}
      </div>
      <div>
        {isRenderItemLengthBiggerThan
          ? listToRender
            .filter((rec, index) => index < MAX_RECIPES)
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
          : (recipes && recipes
            .filter((recipe, index) => index < MAX_RECIPES))
            .map((recipe, index) => (
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
