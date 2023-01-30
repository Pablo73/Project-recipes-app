import PropTypes from 'prop-types';

function Card({ index, image, name }) {
  return (
    <div className="recipe-card" data-testid={ `${index}-recipe-card` }>
      <img src={ image } alt="" data-testid={ `${index}-card-img` } />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </div>
  );
}

Card.propTypes = PropTypes.shape({}).isRequired;
export default Card;
