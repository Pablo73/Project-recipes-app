import { useContext, useRef, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function SearchBar() {
  const [search, setSearch] = useState('');
  const selectOption = useRef('');
  const { handleFetch, searchFood } = useContext(RecipesContext);
  const history = useHistory();
  const location = useLocation();

  const handleInput = ({ target }) => {
    if (target.checked) {
      selectOption.current = target.value;
    }
  };

  const handleSearch = () => {
    const ONE = 1;
    if (selectOption.current === 'firstLetter' && search.length > ONE) {
      global.alert('Your search must have only 1 (one) character');
    }
    handleFetch(selectOption.current, search);
    // console.log(searchFood);
  };

  useEffect(() => {
    if (location.pathname.includes('meals') && searchFood.length === 1) {
      // console.log(searchFood[0].idMeal);
      const idMeals = searchFood[0].idMeal;
      history.push(`/meals/${idMeals}`);
    }

    if (location.pathname.includes('drinks') && searchFood.length === 1) {
      // console.log(searchFood[0].idDrink);
      const idDrinks = searchFood[0].idDrink;
      history.push(`/drinks/${idDrinks}`);
    }
  }, [handleFetch]);

  return (
    <div>
      <div>
        <input
          data-testid="search-input"
          name="search"
          type="texto"
          placeholder="Busca"
          onChange={ ({ target }) => setSearch(target.value) }
        />
        <br />
        <label htmlFor="ingredient">
          <input
            type="radio"
            name="searchKind"
            id="ingredient"
            value="ingredient"
            defaultChecked={ selectOption.current === 'ingredient' }
            data-testid="ingredient-search-radio"
            onChange={ handleInput }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            name="searchKind"
            id="name"
            value="name"
            defaultChecked={ selectOption.current === 'name' }
            data-testid="name-search-radio"
            onChange={ handleInput }
          />
          Name
        </label>
        <label htmlFor="First letter">
          <input
            type="radio"
            name="searchKind"
            id="firstLetter"
            value="firstLetter"
            defaultChecked={ selectOption.current === 'firstLetter' }
            data-testid="first-letter-search-radio"
            onChange={ handleInput }
          />
          First letter
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        BUSCAR
      </button>
    </div>
  );
}

export default SearchBar;
