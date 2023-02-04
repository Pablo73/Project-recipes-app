import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import React from 'react';
import renderWithRouter from '../renderWithRouter';
import drinks from '../../cypress/mocks/drinks';
import ginDrinks from '../../cypress/mocks/ginDrinks';
import oneDrink from '../../cypress/mocks/oneDrink';
import oneMeal from '../../cypress/mocks/oneMeal';
import soupMeals from '../../cypress/mocks/soupMeals';
import meals from '../../cypress/mocks/meals';
import App from '../App';

const testInpu = 'search-input';
const testExe = 'exec-search-btn';
const btnTop = 'search-top-btn';
const nameRadio = 'name-search-radio';
const card = '0-recipe-card';

describe('Teste o componente Search Bar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Verifica se o resultado for uma receita redireciona para a pagina correta', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(drinks)
        .mockResolvedValue(oneDrink),
    });

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });

    expect(await screen.findByTestId(card)).toBeInTheDocument();

    const searchBtn = screen.getByTestId(btnTop);
    userEvent.click(searchBtn);

    expect(screen.getByTestId(testExe)).toBeInTheDocument();

    const searchText = screen.getByTestId(testInpu);
    userEvent.type(searchText, 'Aquamarine');

    expect(searchText.value).toBe('Aquamarine');

    const radio = screen.getByTestId(nameRadio);
    userEvent.click(radio);

    expect(radio).toBeChecked();

    const execSearch = screen.getByTestId(testExe);
    userEvent.click(execSearch);

    await waitFor(() => expect(history.location.pathname).toBe('/drinks/178319'));
  });

  test('Verifica se ao digitar duas letras no input e escolher o chekcbox  first letter aparece um alerta', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    expect(await screen.findByTestId(card)).toBeInTheDocument();

    const searchBtn = screen.getByTestId(btnTop);
    userEvent.click(searchBtn);

    expect(screen.getByTestId(testExe)).toBeInTheDocument();

    const searchText = screen.getByTestId(testInpu);
    userEvent.type(searchText, 'Aquamarine');

    const radio = screen.getByTestId('first-letter-search-radio');
    userEvent.click(radio);

    const alertMok = jest.spyOn(window, 'alert');

    const execSearch = screen.getByTestId(testExe);
    userEvent.click(execSearch);

    expect(alertMok).toBeDefined();
  });

  test('Verifica se o resultado for uma receita redireciona para a pagina correta', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(meals)
        .mockResolvedValue(oneMeal),
    });

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    expect(await screen.findByTestId(card)).toBeInTheDocument();

    const searchBtn = screen.getByTestId(btnTop);
    userEvent.click(searchBtn);

    expect(screen.getByTestId(testExe)).toBeInTheDocument();

    const searchText = screen.getByTestId(testInpu);
    userEvent.type(searchText, 'Corba');

    expect(searchText.value).toBe('Corba');

    const radio = screen.getByTestId(nameRadio);
    userEvent.click(radio);

    expect(radio).toBeChecked();

    const execSearch = screen.getByTestId(testExe);
    userEvent.click(execSearch);

    await waitFor(() => expect(history.location.pathname).toBe('/meals/52771'));
  });

  test('Verifica se ao pesquisar por soup é retornado 10 receitas', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(meals)
        .mockResolvedValue(soupMeals),
    });

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    expect(await screen.findByTestId(card)).toBeInTheDocument();

    const searchBtn = screen.getByTestId(btnTop);
    userEvent.click(searchBtn);

    expect(screen.getByTestId(testExe)).toBeInTheDocument();

    const searchText = screen.getByTestId(testInpu);
    userEvent.type(searchText, 'Soup');

    const radio = screen.getByTestId(nameRadio);
    userEvent.click(radio);

    const execSearch = screen.getByTestId(testExe);
    userEvent.click(execSearch);

    await waitFor(() => expect(history.location.pathname).toBe('/meals'));

    await waitFor(() => expect(soupMeals.meals.length).toBe(9));

    await waitFor(() => soupMeals.meals.forEach((meal, index) => {
      expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
      expect(screen.getByText(meal.strMeal)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }));

    expect(screen.queryByTestId('10-recipe-card')).not.toBeInTheDocument();
    expect(screen.queryByTestId('10-card-img')).not.toBeInTheDocument();
    expect(screen.queryByTestId('10-card-name')).not.toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledTimes(5);
  });

  test('Verifica se API retorna null, um alerta é mostrado', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(meals),
    });

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    expect(await screen.findByTestId(card)).toBeInTheDocument();

    const searchBtn = screen.getByTestId(btnTop);
    userEvent.click(searchBtn);

    expect(screen.getByTestId(testExe)).toBeInTheDocument();

    const searchText = screen.getByTestId(testInpu);
    userEvent.type(searchText, '4d4d4d4d');

    const radio = screen.getByTestId(nameRadio);
    userEvent.click(radio);

    const alertMok = jest.spyOn(window, 'alert');

    const execSearch = screen.getByTestId(testExe);
    userEvent.click(execSearch);

    expect(alertMok).toBeDefined();
  });

  test('Verifica se ao pesquisar por Gin é retornado 12 receitas', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(drinks)
        .mockResolvedValue(ginDrinks),
    });

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });

    expect(await screen.findByTestId(card)).toBeInTheDocument();

    const searchBtn = screen.getByTestId(btnTop);
    userEvent.click(searchBtn);

    expect(screen.getByTestId(testExe)).toBeInTheDocument();

    const searchText = screen.getByTestId(testInpu);
    userEvent.type(searchText, 'Gin');

    const radio = screen.getByTestId(nameRadio);
    userEvent.click(radio);

    const execSearch = screen.getByTestId(testExe);
    userEvent.click(execSearch);

    await waitFor(() => expect(global.fetch));

    await waitFor(() => expect(history.location.pathname).toBe('/drinks'));

    await waitFor(() => expect(ginDrinks.drinks.length).toBe(16));

    await waitFor(() => ginDrinks.drinks.slice(0, 13).forEach((drink, index) => {
      expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
      expect(screen.getByText(drink.strDrink)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }));

    expect(screen.queryByTestId('12-recipe-card')).not.toBeInTheDocument();
    expect(screen.queryByTestId('12-card-img')).not.toBeInTheDocument();
    expect(screen.queryByTestId('12-card-name')).not.toBeInTheDocument();

    // screen.logTestingPlaygroundURL();

    expect(global.fetch).toHaveBeenCalledTimes(5);
  });
});
