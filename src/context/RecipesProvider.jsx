import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [searchFood, setSearchFood] = useState([]);
  const location = useLocation();

  const defineFetchApi = (searchType, searchTerm) => {
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
  };

  const handleFetch = async (searchType, searchTerm) => {
    try {
      const apiUrl = defineFetchApi(searchType, searchTerm);
      const responseFood = await fetch(apiUrl);
      const results = await responseFood.json();
      setSearchFood(results);
    } catch (error) {
      console.log(error);
    }
  };

  const value = useMemo(() => ({
    handleFetch,
    searchFood,
  }), [searchFood]);

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
