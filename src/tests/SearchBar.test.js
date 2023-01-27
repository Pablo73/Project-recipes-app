import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import React from 'react';
import renderWithRouter from '../renderWithRouter';
import Meals from '../pages/Meals';
import milkMeals from './mocks';

describe('Teste o componente Search Bar', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(milkMeals),
    });
  });

  afterEach(() => jest.clearAllMocks());

  test('Verifica se a busca por ingrediente é realizada', async () => {
    renderWithRouter(<Meals />);
    await act(async () => renderWithRouter(<Meals />));
    const imgSearch = screen.getAllByTestId('search-btn');
    expect(imgSearch[0]).toBeInTheDocument();

    userEvent.click(imgSearch[0]);

    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();

    await act(async () => {
      const radioLetterButton = screen.getByRole('radio', { name: /ingredient/i });
      expect(radioLetterButton).toBeInTheDocument();
      userEvent.click(radioLetterButton);
      expect(radioLetterButton).toBeChecked();
      userEvent.type(inputSearch, 'milk');
      const searchBtn = screen.getByRole('button', { name: /buscar/i });
      userEvent.click(searchBtn);
    });
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
