import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import RecipesContext from '../context/RecipesContext';
import '../assets/css/Recipes.css';

const twelve = 12;

function RecommendationsDrinks() {
  const [data, setData] = useState([]);

  const { drinksRecommendation } = useContext(RecipesContext);

  useEffect(() => {
    if (drinksRecommendation !== undefined && drinksRecommendation.length > 1) {
      const nameCarosel = drinksRecommendation.filter((recom, index) => index < twelve);
      setData(nameCarosel);
    }
  }, [drinksRecommendation]);

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
              src={ data[0].strDrinkThumb }
              alt="First slide"
            />
            <h4
              data-testid="1-recommendation-title"
            >
              { data[0].strDrink}
            </h4>
            <img
              className="d-block w-100"
              src={ data[1].strDrinkThumb }
              alt="First slide"
            />
            <h4
              data-testid="2-recommendation-title"
            >
              { data[1].strDrink }

            </h4>
          </div>
        </Carousel.Item>
        <Carousel.Item data-testid="2-recommendation-card">
          <div className="recipe-rec">
            <img
              className="d-block w-100"
              src={ data[2].strDrinkThumb }
              alt="First slide"
            />
            <h3
              data-testid="3-recommendation-title"
            >
              { data[2].strDrink }

            </h3>
            <img
              className="d-block w-100"
              src={ data[3].strDrinkThumb }
              alt="First slide"
            />
            <h3
              data-testid="4-recommendation-title"
            >
              { data[3].strDrink }

            </h3>
          </div>
        </Carousel.Item>
        <Carousel.Item data-testid="3-recommendation-card">
          <div className="recipe-rec">
            <img
              className="d-block w-100"
              src={ data[4].strDrinkThumb }
              alt="First slide"
            />
            <h3
              data-testid="5-recommendation-title"
            >
              { data[4].strDrink }

            </h3>
            <img
              className="d-block w-100"
              src={ data[5].strDrinkThumb }
              alt="First slide"
            />
            <h3
              data-testid="6-recommendation-title"
            >
              { data[5].strDrink }

            </h3>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>)
  );
}

export default RecommendationsDrinks;

RecommendationsDrinks.propTypes = PropTypes.shape({}).isRequired;
