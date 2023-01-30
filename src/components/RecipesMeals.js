import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Loading from '../pages/Loading';
import '../assets/css/Recipes.css';

const TWELVE = 12;

function RecipesMeals() {
  const { renderMeals, isLoading } = useContext(RecipesContext);
  return (
    <div className="cardRecipe">
      {isLoading ? <Loading />
        : (
          renderMeals.filter((meals, index) => index < TWELVE)
            .map((ele, index) => (
              <div
                key={ ele.idMeal }
                data-testid={ `${index}-recipe-card` }
                className="card"
              >
                <img
                  src={ ele.strMealThumb }
                  alt={ ele.strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{ ele.strMeal }</p>
              </div>)))}
    </div>
  );
}

export default RecipesMeals;
