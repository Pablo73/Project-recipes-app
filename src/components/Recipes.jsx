import React, { useEffect, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';
import Card from './Card';
import FilterButton from './FilterButton';
import '../assets/css/Recipes.css';

function Recipes() {
  const { renderMeals, renderDrinks } = useContext(RecipesContext);
  const [recipes, setRecipes] = useState([]);
  const { data: mealCategories } = useFetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const { data: drinkCategories } = useFetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const isMealsLocation = location.pathname.includes('/meals');
  const isDrinksLocation = location.pathname.includes('/drinks');
  const [previousValueButton, setPreviousValueButton] = useState('initial');

  useEffect(() => {
    if (isMealsLocation) {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((res) => res.json())
        .then((res) => setRecipes(res.meals))
        .catch((error) => console.error(error));

      setCategories(mealCategories && mealCategories.meals);
    }
    if (isDrinksLocation) {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((res) => res.json())
        .then((res) => setRecipes(res.drinks))
        .catch((error) => console.error(error));

      setCategories(drinkCategories && drinkCategories.drinks);
    }
  }, [isDrinksLocation, isMealsLocation, mealCategories, drinkCategories, refresh]);

  const isRenderItemLengthBiggerThan = renderMeals.length > 1 || renderDrinks.length > 1;
  const MAX_RECIPES = 12;
  const MAX_CATEGORIES = 5;
  const listToRender = isMealsLocation ? renderMeals : renderDrinks;

  const filterByCategory = async (filter) => {
    let apiUrl = '';
    if (isMealsLocation) {
      apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`;
    } else {
      apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`;
    }
    try {
      const request = await fetch(apiUrl);
      const response = await request.json();
      setRecipes(isMealsLocation ? response.meals : response.drinks);
    } catch (error) {
      console.error(error);
    }
  };

  const redirectToDetails = (id) => {
    if (isMealsLocation) {
      return history.push(`/meals/${id}`);
    }
    return history.push(`/drinks/${id}`);
  };

  return (
    <div>
      <h1>Recipes</h1>
      <div className="filters">
        {categories && categories
          .filter((el, index) => index < MAX_CATEGORIES)
          .map((el, index) => (
            <FilterButton
              key={ index }
              testId={ `${el.strCategory}-category-filter` }
              categoryName={ el.strCategory }
              onFilterClick={ (prev) => (previousValueButton === prev.target.innerHTML
                ? (setRefresh(!refresh))
                : (filterByCategory(el.strCategory)
              && setPreviousValueButton(el.strCategory))) }
            />
          ))}
        <FilterButton
          categoryName="All"
          onFilterClick={ () => setRefresh(!refresh) }
          testId="All-category-filter"
        />
      </div>
      <div className="recipe-card">
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
                onButtonClick={ () => redirectToDetails(isMealsLocation
                  ? recipe.idMeal : recipe.idDrink) }
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
                onButtonClick={ () => redirectToDetails(isMealsLocation
                  ? recipe.idMeal : recipe.idDrink) }
              />
            ))}
      </div>
    </div>
  );
}

export default Recipes;
