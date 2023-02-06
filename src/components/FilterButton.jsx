import React from 'react';

function FilterButton({ categoryName, onFilterClick, testId }) {
  return (
    <button
      type="button"
      data-testid={ testId }
      className="filter-button"
      onClick={ onFilterClick }
    >
      {categoryName}
    </button>
  );
}

export default FilterButton;

FilterButton.propTypes = ({}).isRequired;
