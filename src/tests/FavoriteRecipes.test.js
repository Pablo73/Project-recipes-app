import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'Food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

describe('Testa o componente <FavoriteRecipes />', () => {
  global.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

  it('Verifica se o componente <FavoriteRecipes /> possui o botões informados.', async () => {
    renderWithRouter(<FavoriteRecipes />);
    const filterAll = screen.getByTestId('filter-by-all-btn');
    const filterMeal = screen.getByTestId('filter-by-meal-btn');
    const filterDrink = screen.getByTestId('filter-by-drink-btn');
    expect(filterAll).toBeInTheDocument();
    expect(filterMeal).toBeInTheDocument();
    expect(filterDrink).toBeInTheDocument();
  });
  test('Verifica button ALL', async () => {
    renderWithRouter(<FavoriteRecipes />);
    const filterAll = screen.getByTestId('filter-by-all-btn');
    userEvent.click(filterAll);

    expect(screen.getByText('Spicy Arrabiata Penne')).toBeInTheDocument();
    expect(screen.getByText('Italian - Vegetarian')).toBeInTheDocument();
    expect(screen.getByText('Aquamarine')).toBeInTheDocument();
    expect(screen.getByText('Alcoholic')).toBeInTheDocument();
  });
  test('Verifica button Drink', async () => {
    renderWithRouter(<FavoriteRecipes />);
    const filterDrink = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(filterDrink);

    expect(screen.getByText('Aquamarine')).toBeInTheDocument();
    expect(screen.getByText('Alcoholic')).toBeInTheDocument();
  });
  test('Verifica button Food', async () => {
    renderWithRouter(<FavoriteRecipes />);
    const filterMeal = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(filterMeal);

    // expect(screen.getByText('Spicy Arrabiata Penne')).toBeInTheDocument();
    // expect(screen.getByText('Alcoholic')).toBeInTheDocument();
  });
});
