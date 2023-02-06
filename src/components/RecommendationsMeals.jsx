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
              <div>
                <h3
                  data-testid={ `${index}-recommendation-title` }
                >
                  { ele.strMeal}
                </h3>
                <img
                  className="recipe-rec"
                  src={ ele.strMealThumb }
                  alt="First slide"
                />
                <br />
                <br />
              </div>
            </Carousel.Item>))
        }
      </Carousel>
    </div>)
  );
}

export default RecommendationsMeals;

RecommendationsMeals.propTypes = PropTypes.shape({}).isRequired;
