import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GoogleMapComponent from '../components/map/map';
import { wait } from '@testing-library/user-event/dist/utils';
import App from '../App';
import ButtonMenu from '../components/buttonMenu/buttonMenu';


test('renders app', async() => {
  render(<App />);
  await waitFor(() => expect(screen.getByText('Login')).toBeInTheDocument());
  
})




  test('logs out when Logout button is clicked', async () => {
    render(<ButtonMenu handleProfileToggle={jest.fn()} profileOpen={false} logout={jest.fn()}/>);
    await waitFor(() => {
    const logoutButton = screen.getByTestId('logout-button');
    userEvent.click(logoutButton);
    });

    expect(global.window.location.pathname).toContain('/login');
  });

  // You can add more tests for other functionalities as needed



export{}