import PropTypes from 'prop-types';
import '../assets/css/Recipes.css';

function Card({ index, image, name, onButtonClick }) {
  return (
    <button
      type="button"
      onClick={ onButtonClick }
      className="card"
      data-testid={ `${index}-recipe-card` }
    >
      <img src={ image } alt="" data-testid={ `${index}-card-img` } />
      <span data-testid={ `${index}-card-name` } className="recipe-name">{name}</span>
    </button>
  );
}

Card.propTypes = PropTypes.shape({}).isRequired;
export default Card;
