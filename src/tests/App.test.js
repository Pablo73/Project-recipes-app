import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Verifica se a Página de Login', () => {
  test(' possui o input de Email', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
    const inputBtn = screen.getByTestId('login-submit-btn');
    expect(inputBtn).toBeInTheDocument();

    userEvent.type(inputEmail, 'test@test.com');
    userEvent.type(inputPassword, 'comidinhas');
    userEvent.click(inputBtn);
    expect(history.location.pathname).toBe('/meals');
  });
});
