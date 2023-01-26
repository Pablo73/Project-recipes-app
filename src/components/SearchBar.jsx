function SearchBar() {
  return (
    <>
      <div>
        <input
          data-testid="search-input"
          name="search"
          type="texto"
          placeholder="Busca"
        />
        <input
          type="radio"
          name="button"
          data-testid="ingredient-search-radio"
        />
        <input
          type="radio"
          name="button"
          data-testid="name-search-radio"
        />
        <input
          type="radio"
          name="button"
          data-testid="first-letter-search-radio"
        />
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        BUSCAR
      </button>
    </>
  );
}

export default SearchBar;
