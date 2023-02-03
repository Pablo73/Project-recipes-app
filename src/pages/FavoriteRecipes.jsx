import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import RecipesFavorites from '../components/RecipesFavorites';
import FilterButton from '../components/FilterButton';

export default function FavoriteRecipes() {
  const [data, setData] = useState([]);
  const [shared, setShared] = useState('');

  const shareRecipe = (link, id) => {
    copy(link);
    setShared(id);
  };

  const clearFilter = () => {
    setData(JSON.parse(localStorage.getItem('favoriteRecipes')));
  };

  const setFilter = (type) => {
    const filter = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setData(filter.filter((e) => e.type === type));
  };

  const unFavorite = (id) => {
    const filter = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const refresh = filter.filter((e) => e.id !== id);
    localStorage.removeItem('favoriteRecipes');
    setData(refresh);
    localStorage.setItem('favoriteRecipes', JSON.stringify(refresh));
  };

  useEffect(() => {
    if (localStorage.favoriteRecipes) {
      setData(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  }, []);

  return (
    <div>
      <Header
        title="Favorite Recipes"
        withSearchIcon={ false }
      />
      <div>
        <FilterButton
          testId="filter-by-all-btn"
          onFilterClick={ clearFilter }
          categoryName="All"
        />
        <FilterButton
          testId="filter-by-meal-btn"
          onFilterClick={ () => setFilter('meal') }
          categoryName="Meals"
        />
        <FilterButton
          testId="filter-by-drink-btn"
          onFilterClick={ () => setFilter('drink') }
          categoryName="Drinks"
        />
      </div>
      <div>
        { data.length > 0 && data.map((item, index) => (<RecipesFavorites
          key={ index }
          index={ index }
          func={ shareRecipe }
          nationality={ item.nationality }
          category={ item.category }
          alcohol={ item.alcoholicOrNot }
          name={ item.name }
          img={ item.image }
          type={ item.type }
          id={ item.id }
          share={ shared }
          favoriteFunc={ unFavorite }
        />))}
      </div>
    </div>
  );
}
