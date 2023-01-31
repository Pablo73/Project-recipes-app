import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/Recipes.css';

function Card({ index, image, name }) {
  return (
    <div className="card" data-testid={ `${index}-recipe-card` }>
      <img src={ image } alt="" data-testid={ `${index}-card-img` } />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </div>
  );
}

Card.propTypes = PropTypes.shape({}).isRequired;
export default Card;
