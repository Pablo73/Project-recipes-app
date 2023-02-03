import React from 'react';
import PropTypes from 'prop-types';

function IngredientInput({ testId, ingredient, onCheck, checked }) {
  return (
    <label
      data-testid={ testId }
      htmlFor={ ingredient }
      className={ checked ? 'step-done' : 'undone' }
    >
      <input
        type="checkbox"
        id={ ingredient }
        defaultChecked={ checked }
        name={ ingredient }
        onChange={ onCheck }
        className="check"
      />
      {ingredient}
    </label>
  );
}

IngredientInput.propTypes = {
  testId: PropTypes.string,
  ingredient: PropTypes.string,
}.isRequired;

export default IngredientInput;
