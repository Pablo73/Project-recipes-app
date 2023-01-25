import React from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  return (
    <div>
      <header>
        <Header
          title="Favorite Recipes"
          withSearchIcon={ false }
        />
      </header>
    </div>
  );
}

export default FavoriteRecipes;
