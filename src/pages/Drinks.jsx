import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesDrinks from '../components/RecipesDrinks';

function Drinks() {
  return (
    <div>
      <header>
        <Header
          title="Drinks"
          withSearchIcon
        />
        <RecipesDrinks />
      </header>
      <Footer />
    </div>
  );
}

export default Drinks;
