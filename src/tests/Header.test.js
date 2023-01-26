import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Meals from '../pages/Meals';
import renderWithRouter from '../renderWithRouter';

describe('Testando componente Hearder', () => {
  test('testando tela', () => {
    const { history } = renderWithRouter(<Meals />);

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();

    const pageProfile = screen.getByTestId('profile-top-btn');
    expect(pageProfile).toBeInTheDocument();

    const btnSearch = screen.getByTestId('search-top-btn');
    expect(btnSearch).toBeInTheDocument();

    userEvent.click(pageProfile);

    expect(history.location.pathname).toBe('/profile');
  });

  test('Verifica input de busca', () => {
    renderWithRouter(<Meals />);

    const imgSearch = screen.getByRole('img', { name: /search icon/i });
    expect(imgSearch).toBeInTheDocument();

    userEvent.click(imgSearch);

    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();

    userEvent.click(imgSearch);
    expect(inputSearch).not.toBeInTheDocument();
  });
});
