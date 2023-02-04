import { useState, useEffect, useContext } from 'react';
import '../assets/css/Recipes.css';
import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import NotFavorite from '../images/whiteHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';
import Favorite from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function Buttons({ url }) {
  const { detailsMeals, detailsDrinks } = useContext(RecipesContext);
  const [copy, setCopy] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const getLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));

  useEffect(() => {
    const fav = [];
    if (getLocal === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(fav));
    }
  }, []);

  useEffect(() => {
    if (detailsMeals.length === 1) {
      const meals = getLocal.filter((ele) => ele.type === 'meal');
      const isFavoriteMeals = meals.some((ele) => +ele.id === +detailsMeals[0].idMeal);
      setIsFavorite(isFavoriteMeals);
    }

    if (detailsDrinks.length === 1) {
      const drink = getLocal.filter((ele) => ele.type === 'drink');
      const isFavoriteDrinks = drink.some((ele) => +ele.id === +detailsDrinks[0].idDrink);
      setIsFavorite(isFavoriteDrinks);
    }
  }, [detailsMeals, detailsDrinks, getLocal]);

  function favoriteClick() {
    if (detailsDrinks.length === 1) {
      const objDrinks = {
        id: detailsDrinks[0].idDrink,
        type: 'drink',
        nationality: '',
        category: detailsDrinks[0].strCategory,
        alcoholicOrNot: detailsDrinks[0].strAlcoholic,
        name: detailsDrinks[0].strDrink,
        image: detailsDrinks[0].strDrinkThumb,
      };
      localStorage.setItem('favoriteRecipes', JSON.stringify([...getLocal, objDrinks]));
    }
    if (detailsMeals.length === 1) {
      const objMeals = {
        id: detailsMeals[0].idMeal,
        type: 'meal',
        nationality: detailsMeals[0].strArea,
        category: detailsMeals[0].strCategory,
        alcoholicOrNot: '',
        name: detailsMeals[0].strMeal,
        image: detailsMeals[0].strMealThumb,
      };
      localStorage.setItem('favoriteRecipes', JSON.stringify([...getLocal, objMeals]));
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
      { isFavorite ? (
        <input
          type="image"
          alt="favorite"
          data-testid="favorite-btn"
          onClick={ favoriteClick }
          src={ Favorite }
        />
      )
        : (
          <input
            type="image"
            alt="favorite"
            data-testid="favorite-btn"
            onClick={ favoriteClick }
            src={ NotFavorite }
          />
        )}
    </div>
  );
}

Buttons.propTypes = {
  url: PropTypes.string,
  receita: PropTypes.shape(),
  capital: PropTypes.shape(),
}.isRequired;
