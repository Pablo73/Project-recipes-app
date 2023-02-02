import React from 'react';
import Header from '../components/Header';
import FilterButton from '../components/FilterButton';
import DoneCard from '../components/DoneCard';
import '../assets/css/DoneRecipes.css';

// Requisito passando com dados mockados, precisa integrar!
const mockRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

function DoneRecipes() {
  return (
    <div>
      <header>
        <Header
          title="Done Recipes"
          withSearchIcon={ false }
        />
      </header>
      <section>
        <div>
          <FilterButton testId="filter-by-all-btn" categoryName="All" />
          <FilterButton testId="filter-by-meal-btn" categoryName="Meals" />
          <FilterButton testId="filter-by-drink-btn" categoryName="Drinks" />
        </div>

        <div className="done-cards-container">
          { mockRecipes.map((recipe, index) => (
            <DoneCard
              key={ index }
              index={ index }
              img={ recipe.image }
              recipeCategory={ recipe.category }
              recipeNationality={ recipe.nationality }
              recipeName={ recipe.name }
              recipeDate={ recipe.doneDate }
              isAlcoholic={ recipe.alcoholicOrNot }
              tags={ recipe.tags }
            />))}
        </div>

      </section>
    </div>
  );
}

export default DoneRecipes;
