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
      <filter>
        <button data-testid="filter-by-all-btn">All</button>
        <button data-testid="filter-by-meal-btn">Meals</button>
        <button data-testid="filter-by-drink-btn">Drinks</button>
        <img
          // data-testid="${index}-horizontal-image"
          src="image"
          alt="name"
        />
        <div>
          {/* data-testid="${index}-horizontal-image" */}
          <h1>
            {/* data-testid="${index}-horizontal-name" */}
            O texto do nome da receita
          </h1>
          <p>
            {/* data-testid="${index}-horizontal-done-date" */}
            O texto da data que a receita
          </p>
          <input
            type="button"
            // data-testid="${index}-horizontal-share-btn"
          />
        </div>
      </filter>
    </div>
  );
}

export default DoneRecipes;
