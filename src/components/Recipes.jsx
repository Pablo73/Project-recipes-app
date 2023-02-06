import React, { useEffect, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';
import Card from './Card';
import FilterButton from './FilterButton';
import '../assets/css/Recipes.css';

function Recipes() {
  const { renderMeals, renderDrinks } = useContext(RecipesContext);
  const location = useLocation();
  const isMealsLocation = location.pathname.includes('/meals');
  const categoryUrl = isMealsLocation
    ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const { data: categories, loading } = useFetch(categoryUrl);
  const recipeUrl = isMealsLocation
    ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const [recipes, setRecipes] = useState(null);
  const { data: apiRecipes } = useFetch(recipeUrl);
  const [refresh, setRefresh] = useState(false);
  const history = useHistory();
  const [previousValueButton, setPreviousValueButton] = useState('initial');

  const defineIfMealOrDrink = (element) => element
  && (isMealsLocation ? element.meals : element.drinks);

  useEffect(() => {
    setRecipes(apiRecipes);
  }, [apiRecipes, refresh]);

  const MAX_RECIPES = 12;
  const MAX_CATEGORIES = 5;

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
      setRecipes(response);
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
      <div className="filters">
        {categories && defineIfMealOrDrink(categories)
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
          onFilterClick={ () => setRecipes(apiRecipes) }
          testId="All-category-filter"
        />
      </div>
      <div className="recipes-container">
        { loading && <p>{loading}</p> }
        { renderDrinks.length || renderMeals.length
          ? (isMealsLocation ? renderMeals : renderDrinks)
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
          : recipes && (isMealsLocation ? recipes.meals : recipes.drinks)
            .filter((el, index) => index < MAX_RECIPES)
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
