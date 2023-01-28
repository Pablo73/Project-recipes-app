import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../assets/css/Recipes.css';

const TWELVE = 12;

function Meals() {
  const { renderMeals } = useContext(RecipesContext);
  return (
    <div>
      <Header
        title="Meals"
        withSearchIcon
      />
      <Footer />
      <div className="cardRecipe">
        {
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
              </div>
            ))
        }
      </div>
    </div>
  );
}

export default Meals;
