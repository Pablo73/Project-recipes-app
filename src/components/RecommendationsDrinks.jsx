import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import RecipesContext from '../context/RecipesContext';
import '../assets/css/Recipes.css';

const SIX = 6;

function RecommendationsDrinks() {
  const [data, setData] = useState([]);

  const { drinksRecommendation } = useContext(RecipesContext);

  useEffect(() => {
    if (drinksRecommendation) {
      const nameCarosel = drinksRecommendation.filter((recom, index) => index < SIX);
      setData(nameCarosel);
    }
  }, [drinksRecommendation]);

  const [indexs, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (data.length > 1
  && (
    <div>
      <Carousel activeIndex={ indexs } onSelect={ handleSelect } variant="dark">
        {
          data.map((ele, index) => (
            <Carousel.Item
              data-testid={ `${index}-recommendation-card` }
              key={ `${index} = ${ele}` }
            >
              <div className="recipe-rec">
                <img
                  className="d-block w-100"
                  src={ ele.strDrinkThumb }
                  alt="First slide"
                />
                <h3
                  data-testid={ `${index}-recommendation-title` }
                >
                  { ele.strDrink}
                </h3>
              </div>
            </Carousel.Item>))
        }
      </Carousel>
    </div>)
  );
}

export default RecommendationsDrinks;

RecommendationsDrinks.propTypes = PropTypes.shape({}).isRequired;
