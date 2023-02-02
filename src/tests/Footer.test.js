import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Meals from '../pages/Meals';
import renderWithRouter from '../renderWithRouter';

describe('Verifica se o footer', () => {
  test(' possui o input de Email', () => {
    const { history } = renderWithRouter(<Meals />);
    const inputBtnDrink = screen.getByTestId('drinks-bottom-btn');
    expect(inputBtnDrink).toBeInTheDocument();
    const inputBtnMeals = screen.getByTestId('meals-bottom-btn');
    expect(inputBtnMeals).toBeInTheDocument();

    userEvent.click(inputBtnDrink);
    expect(history.location.pathname).toBe('/drinks');

    userEvent.click(inputBtnMeals);
    expect(history.location.pathname).toBe('/meals');
  });
});
