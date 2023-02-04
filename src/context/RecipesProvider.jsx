import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [searchFood, setSearchFood] = useState([]);
  const [renderDrinks, setRenderDrinks] = useState([]);
  const [renderMeals, setRenderMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mealsRecommendation, setMealsRecommendation] = useState([]);
  const [drinksRecommendation, setDrinksRecommendation] = useState([]);
  const [detailsMeals, setDetailsMeals] = useState([]);
  const [detailsDrinks, setDetailsDrinks] = useState([]);
  const location = useLocation();

  const defineFetchApi = useCallback((searchType, searchTerm) => {
    setIsLoading(true);
    if (location.pathname.includes('meals')) {
      const mealsApi = {
        ingredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`,
        name: `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`,
        firstLetter: `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchTerm}`,
      };
      return mealsApi[searchType];
    }
    if (location.pathname.includes('drinks')) {
      const drinksApi = {
        ingredient: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchTerm}`,
        name: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`,
        firstLetter: `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchTerm}`,
      };
      return drinksApi[searchType];
    }
  }, [location]);

  const handleFetch = useCallback(async (searchType, searchTerm) => {
    try {
      const apiUrl = defineFetchApi(searchType, searchTerm);
      const responseFood = await fetch(apiUrl);
      const results = await responseFood.json();
      if (location.pathname.includes('drinks') && results.drinks !== null) {
        setSearchFood(results.drinks);
      }
      if (location.pathname.includes('meals') && results.meals !== null) {
        setSearchFood(results.meals);
      }
      if (results.drinks === null || results.meals === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      setIsLoading(false);
      return searchFood;
    } catch (error) {
      console.log(error);
    }
  }, [searchFood, defineFetchApi, location]);

  const clearsearchFood = () => {
    setSearchFood([]);
  };

  const value = useMemo(() => ({
    handleFetch,
    searchFood,
    setRenderDrinks,
    renderDrinks,
    setRenderMeals,
    renderMeals,
    isLoading,
    clearsearchFood,
    setIsLoading,
    mealsRecommendation,
    setMealsRecommendation,
    drinksRecommendation,
    setDrinksRecommendation,
    detailsMeals,
    setDetailsMeals,
    detailsDrinks,
    setDetailsDrinks,
  }), [
    handleFetch,
    searchFood,
    renderDrinks,
    renderMeals,
    isLoading,
    mealsRecommendation,
    drinksRecommendation,
    detailsMeals,
    detailsDrinks,
  ]);

  return (
    <RecipesContext.Provider value={ value }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
