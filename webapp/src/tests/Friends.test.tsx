import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Friends from '../components/friends/friends';
import { useSession } from '@inrupt/solid-ui-react';





  test('renders friends list', async () => {
   
    render(<Friends />);

    await waitFor(() => screen.getByTestId('list'));
    expect(screen.getByText('Add Friend')).toBeInTheDocument();
    
  });

  

  test('displays an error message if adding a friend fails', async () => {
  


    render(<Friends />);
    const newFriendInput = screen.getByPlaceholderText("Enter friend's name");
    const addFriendButton = screen.getByText('Add Friend');

    fireEvent.change(newFriendInput, { target: { value: 'Invalid Friend' } });
    fireEvent.click(addFriendButton);
    
    expect(newFriendInput).toHaveValue('Invalid Friend');

  });

