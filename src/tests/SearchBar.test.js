import { screen, waitForElementToBeRemoved } from '@testing-library/react';
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

  const duplicatingLoading = 'Loading...';
  const duplicatingInput = 'search-input';
  const duplicatingBtn = 'search-btn';

  test('Verifica se a busca por ingrediente é realizada', async () => {
    renderWithRouter(<Meals />);
    await act(async () => renderWithRouter(<Meals />));
    const imgSearch = screen.getAllByTestId(duplicatingBtn);
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

    const imgResult = screen.getAllByRole('img');
    expect(imgResult.length).toBe(8);
  });

  test('Verifica se o resultado da pesquisa está correto', async () => {
    const { history } = renderWithRouter(<Meals />);

    const imgSearch = await screen.getAllByTestId(duplicatingBtn);
    userEvent.click(imgSearch[0]);

    const radioLetterButton = screen.getByTestId('first-letter-search-radio');
    userEvent.click(radioLetterButton);

    expect(radioLetterButton).toBeChecked();

    const inputSearch = screen.getByTestId(duplicatingInput);
    userEvent.type(inputSearch, 'A');

    const searchBtn = screen.getByRole('button', { name: /buscar/i });
    userEvent.click(searchBtn);

    const loading = screen.getByText(duplicatingLoading);

    await waitForElementToBeRemoved(() => screen.getByText(duplicatingLoading));
    expect(loading).not.toBeInTheDocument();

    expect(history.location.pathname).toBe('/meals/53049');
  });

  test('Verifica se o resultado for uma receita redireciona para a pagina correta', async () => {
    const { history } = renderWithRouter(<Meals />);

    const imgSearch = await screen.getAllByTestId(duplicatingBtn);
    userEvent.click(imgSearch[0]);

    const radioLetterButton = screen.getByTestId('name-search-radio');
    userEvent.click(radioLetterButton);

    expect(radioLetterButton).toBeChecked();

    const inputSearch = screen.getByTestId(duplicatingInput);
    userEvent.type(inputSearch, 'Arrabiata');

    const searchBtn = screen.getByRole('button', { name: /buscar/i });
    userEvent.click(searchBtn);

    const loading = screen.getByText(duplicatingLoading);
    await waitForElementToBeRemoved(() => screen.getByText(duplicatingLoading));
    expect(loading).not.toBeInTheDocument();

    expect(history.location.pathname).toBe('/meals/53049');
    // const imgResult = screen.getAllByRole('img');
    // expect(imgResult.length).toBe(1);
  });
});
