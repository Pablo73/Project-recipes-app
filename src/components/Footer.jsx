import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Button from './Button';
import DrinkIcon from '../images/drinkIcon.svg';
import MealIcon from '../images/mealIcon.svg';
import '../assets/css/Footer.css';

function Footer() {
  const history = useHistory();
  const { clearsearchFood } = useContext(RecipesContext);

  function toggleRedirect(path) {
    clearsearchFood();
    history.push(path);
  }
  return (
    <footer data-testid="footer">
      <Button
        onButtonClick={ () => toggleRedirect('/drinks') }
        buttonImg={ {
          src: DrinkIcon,
          alt: 'drink',
          testId: 'drinks-bottom-btn',
        } }
      />
      <Button
        onButtonClick={ () => toggleRedirect('/meals') }
        buttonImg={ { src: MealIcon, alt: 'meal', testId: 'meals-bottom-btn' } }
      />
    </footer>
  );
}

export default Footer;
