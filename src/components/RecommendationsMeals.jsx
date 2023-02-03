import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../assets/css/Recipes.css';

const SIX = 6;

function RecommendationsMeals({ recommendation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (recommendation) {
      const nameCarosel = recommendation.filter((recom, index) => index < SIX);
      setData(nameCarosel);
    }
  }, [recommendation]);

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
                  src={ ele.strMealThumb }
                  alt="First slide"
                />
                <h3
                  data-testid={ `${index}-recommendation-title` }
                >
                  { ele.strMeal}
                </h3>
              </div>
            </Carousel.Item>))
        }
      </Carousel>
    </div>)
  );
}

export default RecommendationsMeals;

RecommendationsMeals.propTypes = PropTypes.shape({}).isRequired;
