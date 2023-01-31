import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import React from 'react';
import renderWithRouter from '../renderWithRouter';
import Meals from '../pages/Meals';
import milkMeals from './mocks/mocks';
import oneDrink from './mocks/oneDrink';
import App from '../App';
import twelve from './mocks/twelve';

const testInpu = 'search-input';
const duplicatingBtn = 'search-btn';
const testExe = 'exec-search-btn';
const btnTop = 'search-top-btn';

describe('Teste o componente Search Bar', () => {
  test('Verifica se a busca por ingrediente é realizada', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(milkMeals),
    });
    renderWithRouter(<Meals />);
    await act(async () => renderWithRouter(<Meals />));
    const imgSearch = screen.getAllByTestId(duplicatingBtn);
    expect(imgSearch[0]).toBeInTheDocument();

    userEvent.click(imgSearch[0]);

    const inputSearch = screen.getByTestId(testInpu);
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
    expect(global.fetch).toHaveBeenCalledTimes(5);

    const imgResult = screen.getAllByRole('img');
    expect(imgResult.length).toBe(8);
    jest.restoreAllMocks();
  });

  test('Verifica se o resultado da pesquisa está correto', () => {
    renderWithRouter(<Meals />);
    window.alert = () => { };
    const mensageAlert = jest.spyOn(global, 'alert');

    const searchBtn = screen.getByTestId(btnTop);
    userEvent.click(searchBtn);
    const searchText = screen.getByTestId(testInpu);
    userEvent.type(searchText, 'aa');
    const radio = screen.getByTestId('first-letter-search-radio');
    userEvent.click(radio);
    const execSearch = screen.getByTestId(testExe);
    userEvent.click(execSearch);
    expect(mensageAlert).toHaveBeenCalledTimes(1);
    mensageAlert.mockClear();
  });

  test('Verifica se o resultado da pesquisa 2 está correto', () => {
    renderWithRouter(<Meals />);

    const searchBtn = screen.getByTestId(btnTop);
    userEvent.click(searchBtn);
    const searchText = screen.getByTestId(testInpu);
    userEvent.type(searchText, 'ovo');
    const radio = screen.getByTestId('name-search-radio');
    userEvent.click(radio);
    const execSearch = screen.getByTestId(testExe);
    userEvent.click(execSearch);
  });
  test('Verifica se o resultado for uma receita redireciona para a pagina correta', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue('default')
        .mockResolvedValueOnce(oneDrink)
        .mockResolvedValueOnce(twelve),
    });
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });

    // const drink = screen.getByTestId('drinks-bottom-btn');
    // userEvent.click(drink);

    const searchBtn = screen.getByTestId(btnTop);
    userEvent.click(searchBtn);
    const searchText = screen.getByTestId(testInpu);
    userEvent.type(searchText, 'Aquamarine');
    const radio = screen.getByTestId('name-search-radio');
    userEvent.click(radio);
    const execSearch = screen.getByTestId(testExe);
    userEvent.click(execSearch);

    await waitFor(() => expect(history.location.pathname).toBe('drinks/178319'));

    userEvent.click(execSearch);
  });
});
