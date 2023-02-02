import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <div>
      <header>
        <Header
          title="Drinks"
          withSearchIcon
        />
        <Recipes />
      </header>
      <Footer />
    </div>
  );
}

export default Drinks;
