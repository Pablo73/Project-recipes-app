import { useContext, useRef, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Button from './Button';
import '../assets/css/SearchBar.css';

function SearchBar() {
  const [search, setSearch] = useState('');
  const selectOption = useRef('');

  const { handleFetch,
    searchFood,
    setRenderDrinks,
    setRenderMeals } = useContext(RecipesContext);

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

      return search;
    }
    handleFetch(selectOption.current, search);
    setSearch('');
  };

  useEffect(() => {
    if (location.pathname.includes('meals') && searchFood.length === 1) {
      const idMeals = searchFood[0].idMeal;
      history.push(`/meals/${idMeals}`);
    }
    if (location.pathname.includes('drinks') && searchFood.length === 1) {
      const idDrinks = searchFood[0].idDrink;
      history.push(`/drinks/${idDrinks}`);
    }
    if (location.pathname.includes('drinks') && searchFood.length > 1) {
      setRenderDrinks(searchFood);
    }
    if (location.pathname.includes('meals') && searchFood.length > 1) {
      setRenderMeals(searchFood);
    }
  }, [handleFetch,
    history,
    location,
    searchFood,
    setRenderDrinks,
    setRenderMeals]);

  return (
    <div className="search-bar">
      <form>
        <input
          data-testid="search-input"
          className="search-input"
          name="search"
          type="texto"
          placeholder="Busca"
          onChange={ ({ target }) => setSearch(target.value) }
        />
        <div className="form-inputs">
          <label htmlFor="ingredient" className="label">
            <input
              type="radio"
              name="searchKind"
              className="input"
              id="ingredient"
              value="ingredient"
              defaultChecked={ selectOption.current === 'ingredient' }
              data-testid="ingredient-search-radio"
              onChange={ handleInput }
            />
            Ingredient
          </label>
          <label htmlFor="name" className="label">
            <input
              type="radio"
              name="searchKind"
              className="input"
              id="name"
              value="name"
              defaultChecked={ selectOption.current === 'name' }
              data-testid="name-search-radio"
              onChange={ handleInput }
            />
            Name
          </label>
          <label htmlFor="firstLetter" className="label">
            <input
              type="radio"
              name="searchKind"
              className="input"
              id="firstLetter"
              value="firstLetter"
              defaultChecked={ selectOption.current === 'firstLetter' }
              data-testid="first-letter-search-radio"
              onChange={ handleInput }
            />
            First letter
          </label>
        </div>
      </form>
      <Button
        testId="exec-search-btn"
        onButtonClick={ handleSearch }
        buttonName="Search"
        buttonClass="search-btn"
      />
    </div>
  );
}

export default SearchBar;
