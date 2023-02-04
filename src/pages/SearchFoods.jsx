import PropTypes from 'prop-types';
import RecipeDetails from '../components/RecipeDetails';
// import Buttons from '../components/Buttons';

function SearchFoods(props) {
  const { match: { params: { id }, url } } = props;
  // const [recipe] = useState('');
  // const [capitalKey] = useState();

  return (
    <div>
      <RecipeDetails
        recipeId={ id }
        url={ url }
      />
      {/* <Buttons url={ url } receita={ recipe } capital={ capitalKey } /> */}
    </div>
  );
}

export default SearchFoods;

SearchFoods.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }),
}.isRequired;
