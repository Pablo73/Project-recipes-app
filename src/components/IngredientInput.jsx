import React, { useState } from 'react';
import PropTypes from 'prop-types';

function IngredientInput({ testId, ingredient }) {
  const [stepDone, setStepDone] = useState(false);

  return (
    <label
      data-testid={ testId }
      htmlFor={ ingredient }
      className={ stepDone ? 'step-done' : 'undone' }
    >
      <input
        type="checkbox"
        id={ ingredient }
        defaultChecked={ stepDone }
        name={ ingredient }
        className="check"
        onChange={ ({ target }) => setStepDone(target.checked) }
        checked={ stepDone }
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
