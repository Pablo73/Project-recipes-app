import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [searchFood, setSearchFood] = useState([]);

  const handleFetch = async (searchType, searchTerm) => {
    console.log(searchType);
    const object = {
      ingredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`,
      name: `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`,
      firstLetter: `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchTerm}`,
    };

    const handleSearch = object[searchType];

    const responseFood = await fetch(handleSearch);

    const results = await responseFood.json();

    setSearchFood(results);
    console.log(results);
  };

  // const contexValue = {
  //   handleFetch,
  //   searchFood,
  // };
  const value = useMemo(() => ({
    handleFetch,
    searchFood,
  }), [searchFood]);

  return (
    <div>
      <RecipesContext.Provider value={ value }>
        { children }
      </RecipesContext.Provider>
    </div>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
