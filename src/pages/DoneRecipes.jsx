import React from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  return (
    <div>
      <header>
        <Header
          title="Done Recipes"
          withSearchIcon={ false }
        />
      </header>
    </div>
  );
}

export default DoneRecipes;
