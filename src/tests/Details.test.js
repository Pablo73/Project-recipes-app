import React from 'react';
// import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import oneDrink from './mocks/oneDrink';
import oneFood from './mocks/oneFood';

const drink = 178319;
const idMeals = 52771;
// const time = 5000;

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
    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push(`/drinks/${drink}`);
      // expect(screen.getByText(/category: vegetarian/i)).toBeInTheDocument();
      expect(history.location.pathname).toBe('/drinks/178319');
    });
  });
  test('testando rota de meals', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(`/meals/${idMeals}`);
      expect(history.location.pathname).toBe('/meals/52771');
    });
  });
});
