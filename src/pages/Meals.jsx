import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesMeals from '../components/RecipesMeals';

function Meals() {
  return (
    <div>
      <Header
        title="Meals"
        withSearchIcon
      />
      <RecipesMeals />
      <Footer />
    </div>
  );
}

export default Meals;
