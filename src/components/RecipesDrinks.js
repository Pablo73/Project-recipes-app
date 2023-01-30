import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Loading from '../pages/Loading';
import '../assets/css/Recipes.css';

const TWELVE = 12;

function RecipesDrinks() {
  const { renderDrinks, isLoading } = useContext(RecipesContext);

  return (
    <div className="cardRecipe">
      {isLoading ? <Loading />
        : (
          renderDrinks.filter((drink, index) => index < TWELVE)
            .map((ele, index) => (
              <div
                key={ ele.idDrink }
                data-testid={ `${index}-recipe-card` }
                className="card"
              >
                <img
                  src={ ele.strDrinkThumb }
                  alt={ ele.strDrink }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{ ele.strDrink }</p>
              </div>)))}
    </div>
  );
}

export default RecipesDrinks;
