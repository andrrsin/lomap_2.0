// import React from 'react';
// import { render, fireEvent, screen, waitFor } from '@testing-library/react';
// import Friends from '../components/friends/friends';
// import { useSession } from '@inrupt/solid-ui-react';


// describe('Friends', () => {
  
  

//   beforeEach(() => {
//     // let useSession = jest.requireMock('@inrupt/solid-ui-react').useSession;
//     let getSolidFriends = jest.requireMock('../utils/solid').getSolidFriends;
//     let addSolidFriend = jest.requireMock('../utils/solid').addSolidFriend;

//     const sessionMock = {
//         session: {
//           info: {
//             webId: 'https://example.com/profile#me',
//           },
//         }
//         };
//     // useSession.mockReturnValue(sessionMock);
//     getSolidFriends.mockResolvedValue([
//       { webID: 'https://example.com/friend1', username: 'Friend 1' },
//       { webID: 'https://example.com/friend2', username: 'Friend 2' },
//     ]);
//     addSolidFriend.mockResolvedValue({ error: false, errorMessage: '' });
//   });

//   test('renders friends list', async () => {
//     render(<Friends />);
//     await waitFor(() => screen.getByText('Friend 1'));
//     expect(screen.getByText('Friend 1')).toBeInTheDocument();
//     expect(screen.getByText('Friend 2')).toBeInTheDocument();
//   });

//   test('adds a new friend', async () => {
//     const sessionMock = {
//         session: {
//           info: {
//             webId: 'https://example.com/profile#me',
//           },
//         }
//         };


//     let addSolidFriend = jest.requireMock('../utils/solid').addSolidFriend;
//     render(<Friends />);
//     const newFriendInput = screen.getByPlaceholderText("Enter friend's name");
//     const addFriendButton = screen.getByText('Add Friend');

//     fireEvent.change(newFriendInput, { target: { value: 'New Friend' } });
//     fireEvent.click(addFriendButton);

//     await waitFor(() => expect(addSolidFriend).toHaveBeenCalledWith(sessionMock.session.info.webId, 'New Friend'));
//     expect(newFriendInput).toHaveValue('');
//     expect(screen.getByText('New Friend')).toBeInTheDocument();
//   });

//   test('displays an error message if adding a friend fails', async () => {
//     const sessionMock = {
//         session: {
//           info: {
//             webId: 'https://example.com/profile#me',
//           },
//         }
//         };

//     let addSolidFriend = jest.requireMock('../utils/solid').addSolidFriend;
//     addSolidFriend.mockResolvedValue({ error: true, errorMessage: 'User not found!' });

//     render(<Friends />);
//     const newFriendInput = screen.getByPlaceholderText("Enter friend's name");
//     const addFriendButton = screen.getByText('Add Friend');

//     fireEvent.change(newFriendInput, { target: { value: 'Invalid Friend' } });
//     fireEvent.click(addFriendButton);

//     await waitFor(() => expect(addSolidFriend).toHaveBeenCalledWith(sessionMock.session.info.webId, 'Invalid Friend'));
//     expect(newFriendInput).toHaveValue('User not found!');
//     expect(screen.queryByText('Invalid Friend')).not.toBeInTheDocument();
//   });
// });
