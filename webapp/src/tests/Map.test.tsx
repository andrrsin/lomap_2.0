import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GoogleMapComponent from '../components/map/map';
import { wait } from '@testing-library/user-event/dist/utils';
import App from '../App';
import ButtonMenu from '../components/buttonMenu/buttonMenu';
import Login from '../pages/Login';


test('renders app', async() => {
  render(<App />);
  await waitFor(() => expect(screen.getByText('Login')).toBeInTheDocument());
  
})




  test('logs out when Logout button is clicked', async () => {
    let logout = jest.fn();
    logout.mockImplementation(() => {
      render(<Login />);
    });

    render(<ButtonMenu handleProfileToggle={jest.fn()} profileOpen={false} logout={logout}/>);
    await waitFor(() => {
    const logoutButton = screen.getByTestId('logout-button');
    userEvent.click(logoutButton);
    });

    await waitFor(() => expect(screen.getByText('Login')).toBeInTheDocument());
  });

  // You can add more tests for other functionalities as needed



export{}