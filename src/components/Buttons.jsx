import { useState, useEffect } from 'react';
import '../assets/css/Recipes.css';
import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import NotFavorite from '../images/whiteHeartIcon.svg';
// import Favorite from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function Buttons({ url, meals, drinks }) {
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    const fav = [];
    const getLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getLocal === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(fav));
    }
  }, []);

  function favoriteClick() {
    const getLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (drinks.length === 1) {
      const objDrinks = {
        id: drinks[0].idDrink,
        type: 'drink',
        nationality: '',
        category: drinks[0].strCategory,
        alcoholicOrNot: drinks[0].strAlcoholic,
        name: drinks[0].strDrink,
        image: drinks[0].strDrinkThumb,
      };
      localStorage.setItem('favoriteRecipes', JSON.stringify([...getLS, objDrinks]));
    }
    if (meals.length === 1) {
      const objMeals = {
        id: meals[0].idMeal,
        type: 'meal',
        nationality: meals[0].strArea,
        category: meals[0].strCategory,
        alcoholicOrNot: '',
        name: meals[0].strMeal,
        image: meals[0].strMealThumb,
      };
      console.log(localStorage.getItem('favoriteRecipes'));
      localStorage.setItem('favoriteRecipes', JSON.stringify([...getLS, objMeals]));
    }
  }

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
        alt="favorite"
        data-testid="favorite-btn"
        onClick={ favoriteClick }
        src={ NotFavorite }
      />
    </div>
  );
}

Buttons.propTypes = {
  url: PropTypes.string,
  receita: PropTypes.shape(),
  capital: PropTypes.shape(),
}.isRequired;
