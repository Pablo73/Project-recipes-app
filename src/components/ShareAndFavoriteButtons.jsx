import React, { useState } from 'react';
import '../assets/css/Recipes.css';
import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import favoriteIcon from '../images/blackHeartIcon.svg';

import shareIcon from '../images/shareIcon.svg';

export default function ShareButton({ url }) {
  const [copy, setCopy] = useState(false);

  function handleShare() {
    clipboardCopy(`http://localhost:3000${url}`);
    setCopy(true);
  }

  return (
    <div className="buttons">
      <input
        type="image"
        data-testid="share-btn"
        onClick={ handleShare }
        src={ shareIcon }
        alt="share-button"
      />
      { copy ? <p>Link copied!</p> : '' }
      <input
        type="image"
        data-testid="favorite-btn"
        src={ favoriteIcon }
        alt="favorite button"
      />
    </div>
  );
}

ShareButton.propTypes = {
  url: PropTypes.string,
}.isRequired;
