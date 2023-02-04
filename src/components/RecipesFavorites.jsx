import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import favoriteItem from '../images/blackHeartIcon.svg';
import '../assets/css/RecipesFavorites.css';

function RecipesFavorites({
  img, name, category, id, favoriteFunc,
  func, index, nationality, alcohol, type, share }) {
  const link = `http://localhost:3000/${type}s/${id}`;

  return (
    <div>
      <Link to={ `/${type}s/${id}` }>
        <img
          src={ img }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          className="RecipePic"
        />
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
      </Link>
      { nationality && (
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          {`${nationality} - ${category}`}
        </p>)}
      {alcohol && (
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { alcohol }
        </p>
      )}
      <div>
        <button
          onClick={ () => favoriteFunc(id) }
        >
          <img
            src={ favoriteItem }
            alt="favorite button"
            data-testid={ `${index}-horizontal-favorite-btn` }
          />
        </button>
        <button
          onClick={ () => func(link, id) }
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="share button"
          />
        </button>
        {share === id && <p>Link copied!</p>}
      </div>
    </div>
  );
}

RecipesFavorites.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string,
  index: PropTypes.number,
  func: PropTypes.func,
  alcohol: PropTypes.string,
  nationality: PropTypes.string,
  id: PropTypes.number,
  type: PropTypes.string,
  share: PropTypes.number,
  favoriteFunc: PropTypes.func,
}.isRequired;

export default RecipesFavorites;
