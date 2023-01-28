import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/css/Recipes.css';

const TWELVE = 12;

function Drinks() {
  const { renderDrinks } = useContext(RecipesContext);
  return (
    <div>
      <header>
        <Header
          title="Drinks"
          withSearchIcon
        />
      </header>
      <div className="cardRecipe">
        {
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
              </div>
            ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
