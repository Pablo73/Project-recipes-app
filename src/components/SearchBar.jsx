import { useContext, useRef, useState } from 'react';
import RecipesContext from '../context/RecipesContext';

function SearchBar() {
  const [search, setSearch] = useState('');
  const selectOption = useRef('');
  const { handleFetch } = useContext(RecipesContext);

  const handleInput = ({ target }) => {
    // setSelectOption(target.value);
    selectOption.current = target.value;
    console.log(selectOption.current);
  };

  const handletwo = () => {
    const ONE = 1;
    if (selectOption.current === 'firstLetter' && search.length > ONE) {
      global.alert('Your search must have only 1 (one) character');
    }
    return handleFetch(selectOption.current, search);
  };

  return (
    <>
      <div>
        <input
          data-testid="search-input"
          name="search"
          type="texto"
          placeholder="Busca"
          onChange={ (a) => setSearch(a.target.value) }
        />
        <br />
        <label htmlFor="Ingredient">
          <input
            type="radio"
            name="Ingredient"
            value="ingredient"
            checked={ selectOption.current === 'ingredient' }
            data-testid="ingredient-search-radio"
            onChange={ handleInput }
          />
          Ingredient
        </label>
        <label htmlFor="Name">
          <input
            type="radio"
            name="Name"
            value="name"
            checked={ selectOption.current === 'name' }
            data-testid="name-search-radio"
            onChange={ handleInput }
          />
          Name
        </label>
        <label htmlFor="First letter">
          <input
            type="radio"
            name="First letter"
            value="firstLetter"
            checked={ selectOption.current === 'firstLetter' }
            data-testid="first-letter-search-radio"
            onChange={ handleInput }
          />
          First letter
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handletwo() }
      >
        BUSCAR
      </button>
    </>
  );
}

export default SearchBar;
