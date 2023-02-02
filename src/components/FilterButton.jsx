import React from 'react';

function FilterButton({ categoryName, onFilterClick, testId }) {
  console.log(testId);
  return (
    <button
      type="button"
      data-testid={ testId }
      onClick={ onFilterClick }
    >
      {categoryName}
    </button>
  );
}

export default FilterButton;

FilterButton.propTypes = ({}).isRequired;
