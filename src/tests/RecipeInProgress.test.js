import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import lasagneMock from './mocks/lasagneMock.json';

describe('Teste a página de Receitas em Progresso', () => {
  afterEach(() => jest.clearAllMocks());
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: async () => lasagneMock,
    }));
  });

  it('Teste se os itens se encontram na página', async () => {
    act(() => {
      const { history } = renderWithRouter(<App />);
      history.push('/meals/52844/in-progress');
    });

    await waitFor(() => {
      expect(screen.getByRole('img', { name: /lasagne/i })).toBeInTheDocument();
      expect(screen.getByTestId('instructions')).toBeInTheDocument();
      expect(screen.getByText(/chopped tomatoes 800g/i)).toBeInTheDocument();
      expect(screen.getAllByRole('checkbox')).toHaveLength(15);
    });
  });

  it('Teste se ao selecionar um ingrediente a label é riscada', async () => {
    act(() => {
      const { history } = renderWithRouter(<App />);
      history.push('/meals/52844/in-progress');
    });

    await waitFor(() => {
      expect(screen.getByRole('checkbox', {
        name: /olive oil 1 tblsp/i,
      })).toBeInTheDocument();
    });

    act(() => {
      const check = screen.getByRole('checkbox', {
        name: /olive oil 1 tblsp/i,
      });
      userEvent.click(check);
    });

    await waitFor(() => {
      const check = screen.getByRole('checkbox', {
        name: /olive oil 1 tblsp/i,
      });
      expect(check).toBeChecked();
      const ingredientLabel = screen.getByTestId('0-ingredient-step');
      expect(ingredientLabel).toHaveClass('step-done');
    });
  });
});
