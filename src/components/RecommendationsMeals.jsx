import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import RecipesContext from '../context/RecipesContext';
import '../assets/css/Recipes.css';

const twelve = 12;

function RecommendationsMeals() {
  const [data, setData] = useState([]);

  const { mealsRecommendation } = useContext(RecipesContext);

  useEffect(() => {
    if (mealsRecommendation !== undefined && mealsRecommendation.length > 1) {
      const nameCarosel = mealsRecommendation.filter((recom, index) => index < twelve);
      setData(nameCarosel);
    }
  }, [mealsRecommendation]);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (data.length > 1
  && (
    <div>
      <Carousel activeIndex={ index } onSelect={ handleSelect } variant="dark">
        <Carousel.Item data-testid="1-recommendation-card">
          <div className="recipe-rec">
            <img
              className="d-block w-100"
              src={ data[0].strMealThumb }
              alt="First slide"
            />
            <h4
              data-testid="1-recommendation-title"
            >
              {data[0].strMeal}
            </h4>
            <img
              className="d-block w-100"
              src={ data[1].strMealThumb }
              alt="First slide"
            />
            <h4
              data-testid="2-recommendation-title"
            >
              { data[1].strMeal }

            </h4>
          </div>
        </Carousel.Item>
        <Carousel.Item data-testid="2-recommendation-card">
          <div className="recipe-rec">
            <img
              className="d-block w-100"
              src={ data[2].strMealThumb }
              alt="First slide"
              data-testid="3-recommendation-card"
            />
            <h3
              data-testid="3-recommendation-title"
            >
              {data[2].strMeal }

            </h3>
            <img
              className="d-block w-100"
              src={ data[3].strMealThumb }
              alt="First slide"
            />
            <h3
              data-testid="4-recommendation-title"
            >
              {data[3].strMeal }

            </h3>
          </div>
        </Carousel.Item>
        <Carousel.Item data-testid="3-recommendation-card">
          <div className="recipe-rec">
            <img
              className="d-block w-100"
              src={ data[4].strMealThumb }
              alt="First slide"
              data-testid="5-recommendation-card"
            />
            <h3
              data-testid="5-recommendation-title"
            >
              {data[4].strMeal || data[4].strDrink}

            </h3>
            <img
              className="d-block w-100"
              src={ data[5].strMealThumb }
              alt="First slide"
            />
            <h3
              data-testid="6-recommendation-title"
            >
              { data[5].strMeal }

            </h3>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>)
  );
}

export default RecommendationsMeals;

RecommendationsMeals.propTypes = PropTypes.shape({}).isRequired;
