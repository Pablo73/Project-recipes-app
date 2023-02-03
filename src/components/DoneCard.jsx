import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import shareIcon from '../images/shareIcon.svg';

function DoneCard({
  img,
  recipeCategory,
  recipeNationality,
  recipeName,
  recipeDate,
  isAlcoholic,
  tags,
  index,
}) {
  return (
    <div className="done-card">
      <img
        src={ img }
        alt={ recipeName }
        data-testid={ `${index}-horizontal-image` }
        className="done-img"
      />
      <p
        data-testid={ `${index}-horizontal-top-text` }
        className="recipe-category"
      >
        { `${!recipeNationality ? isAlcoholic : recipeNationality} - ${recipeCategory}` }
      </p>
      <p
        data-testid={ `${index}-horizontal-name` }
        className="recipe-name"
      >
        {recipeName}
      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>{recipeDate}</p>
      <Button
        buttonImg={ { src: shareIcon,
          alt: 'Compartilhar',
          testId: `${index}-horizontal-share-btn` } }
      />
      <div className="tags-container">
        {tags.map((tag, i) => (
          <span key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default DoneCard;

DoneCard.propTypes = {
  img: PropTypes.string,
  recipeCategory: PropTypes.string,
  recipeName: PropTypes.string,
  recipeDate: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  index: PropTypes.number,
}.isRequired;
