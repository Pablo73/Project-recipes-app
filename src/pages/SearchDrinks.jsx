// import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeDetails from '../components/RecipeDetails';
// import FavoriteButton from '../components/FavoriteButton';
// import Buttons from '../components/Buttons';

function SearchDrinks(props) {
  // const link = `/${type}s/${id}`;
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

export default SearchDrinks;

SearchDrinks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }),
}.isRequired;
