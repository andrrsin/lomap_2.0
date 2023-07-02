import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from '../pages/Login';

describe('Login', () => {
  test('renders input field with initial value', () => {
    render(<Login />);
    const inputElement = screen.getByPlaceholderText('Identity Provider');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('https://inrupt.net');
  });

  test('updates input value on change', () => {
    render(<Login />);
    const inputElement = screen.getByPlaceholderText('Identity Provider');
    fireEvent.change(inputElement, { target: { value: 'https://example.com' } });
    expect(inputElement).toHaveValue('https://example.com');
  });

  
});
