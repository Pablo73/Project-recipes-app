import React from 'react';

function FilterButton({ categoryName, onFilterClick }) {
  return (
    <button
      type="button"
      data-testid={ `${categoryName}-category-filter` }
      onClick={ onFilterClick }
    >
      {categoryName}
    </button>
  );
}

export default FilterButton;

FilterButton.propTypes = ({}).isRequired;
