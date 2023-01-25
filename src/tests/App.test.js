import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';

describe('Verifica se a Página de Login', () => {
  test(' possui o input de Email', () => {
    render(<Login />);
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
    const inputBtn = screen.getByTestId('login-submit-btn');
    expect(inputBtn).toBeInTheDocument();

    userEvent.type(inputEmail, 'test@test.com');
    userEvent.type(inputPassword, 'comidinhas');
    userEvent.click(inputBtn);
  });

  // test(' possui o input de Nome', () => {
  //   render(<Login />);
  // });

  // test(' possui um Botão de Play', () => {
  //   render(<Login />);
  // });
});
