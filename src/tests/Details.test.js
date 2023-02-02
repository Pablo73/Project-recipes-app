import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
// import { screen } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
// import App from '../App';
import RecipeDetails from '../components/RecipeDetails';
import renderWithRouter from '../renderWithRouter';
import oneDrink from './mocks/oneDrink';
import oneFood from './mocks/oneFood';

// const drink = 178319;
// const idMeals = 52771;

const mocks = () => {
  jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve(oneDrink),
  })).mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve(oneFood),
  }));
};

describe('Testando o component Details', () => {
  jest.clearAllMocks();
  beforeEach(mocks);
  afterEach(() => jest.clearAllMocks());

  test('testando rota', async () => {
    const { history } = renderWithRouter(<RecipeDetails />);

    const start = screen.getByTestId('start-recipe-btn');
    expect(start).toBeInTheDocument();

    userEvent.click(start);
    expect(history.location.pathname).toBe('/drinks/undefined/in-progress');
  });
  // test('testando rota de meals', async () => {
  //   renderWithRouter(<RecipeDetails />);

  //   const start = screen.getByTestId('start-recipe-btn');
  //   expect(start).toBeInTheDocument();

  //   userEvent.click(start);
  // });
});
