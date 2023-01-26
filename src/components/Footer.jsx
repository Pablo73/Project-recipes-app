import React from 'react';
import { useHistory } from 'react-router-dom';
import DrinkIcon from '../images/drinkIcon.svg';
import MealIcon from '../images/mealIcon.svg';
import '../assets/css/Footer.css';

function Footer() {
  const history = useHistory();

  function toggleRedirect(path) {
    history.push(path);
  }
  return (
    <footer data-testid="footer">
      <button type="button" onClick={ () => toggleRedirect('/drinks') }>
        <img src={ DrinkIcon } data-testid="drinks-bottom-btn" alt="drink" />
      </button>
      <button type="button" onClick={ () => toggleRedirect('/meals') }>
        <img src={ MealIcon } data-testid="meals-bottom-btn" alt="meal" />
      </button>
    </footer>
  );
}

export default Footer;
